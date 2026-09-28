import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import { connectDB, pgClient } from "./db";
import { ANMOL_PROFILE } from "./profile";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json());

  app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
  app.options("*", cors());
  await connectDB();

  const apiKey = process.env.GEMINI_API_KEY;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "anmoltriv";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
  console.log("GEMINI_API_KEY present:", !!apiKey);
  console.log("GITHUB_TOKEN present:", !!GITHUB_TOKEN);

  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-render-backend",
      },
    },
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      if (!apiKey) {
        return res.status(200).json({
          message:
            "Hi! The Gemini API key isn't configured on the backend. Configure GEMINI_API_KEY on Render to enable live chat.",
        });
      }

      const systemInstruction = `
You are Anmol Trivedi's AI twin. 

Here is your official background and profile context:
${JSON.stringify(ANMOL_PROFILE, null, 2)}

Rules:
- Speak in first person.
- Match the visitor's tone.
- Casual questions -> casual answers.
- Technical questions -> technical depth.
- Recruiter questions -> professional answers.
- Be conversational and natural.
- Do not sound like a chatbot.
- Keep answers concise unless asked for detail.
CRITICAL:
Never invent achievements, clubs, projects, internships, education details, certifications, or personal information.
If information is not present in the provided profile context, explicitly say:
"I don't have information about that."
`;

      const history = messages.slice(-6, -1).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const lastMessage = messages[messages.length - 1];
      const prompt = String(lastMessage.content);

      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction,
          temperature: 0.8,
        },
        history,
      });

      const response = await chat.sendMessage({ message: prompt });
      try {
        await pgClient.query(
          `
  INSERT INTO portfolio (user_prompt, ai_response)
  VALUES ($1, $2)
  `,
          [prompt, response.text],
        );
      } catch (err) {
        console.error("Error in db query ", err);
      }

      return res.json({ message: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to generate response." });
    }
  });

  let contributionsCache: { expiresAt: number; body: unknown } | null = null;
  const CONTRIBUTIONS_CACHE_MS = 5 * 60 * 1000;

  const CONTRIBUTIONS_QUERY = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  app.get("/api/github-contributions", async (_req, res) => {
    if (!GITHUB_TOKEN) {
      return res.status(503).json({
        error: "GITHUB_TOKEN is not configured on the backend."
      });
    }

    if (contributionsCache && contributionsCache.expiresAt > Date.now()) {
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.json(contributionsCache.body);
    }

    try {
      const to = new Date();
      const from = new Date(to);
      from.setUTCMonth(from.getUTCMonth() - 2);

      const ghRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "anmol-portfolio-heatmap",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: {
            login: GITHUB_USERNAME,
            from: from.toISOString(),
            to: to.toISOString()
          }
        })
      });

      const payload = await ghRes.json();
      if (!ghRes.ok || payload.errors || !payload.data?.user) {
        console.error("GitHub GraphQL error:", payload.errors || payload.message);
        return res.status(502).json({ error: "Failed to load GitHub contributions." });
      }

      const calendar = payload.data.user.contributionsCollection.contributionCalendar;
      const body = {
        username: GITHUB_USERNAME,
        total: calendar.totalContributions,
        weeks: calendar.weeks.map((week: { contributionDays: { date: string; contributionCount: number }[] }) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount
          }))
        )
      };

      contributionsCache = { expiresAt: Date.now() + CONTRIBUTIONS_CACHE_MS, body };
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.json(body);
    } catch (error) {
      console.error("GitHub contributions fetch failed:", error);
      return res.status(502).json({ error: "Failed to load GitHub contributions." });
    }
  });

  // Health endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Only start the listener when invoked directly
  const server = app.listen(PORT, () => {
    console.log(`Backend API listening on http://0.0.0.0:${PORT}`);
  });

  server.on("error", (err: any) => {
    console.error("Backend server error:", err);
    process.exit(1);
  });
}

startServer();
