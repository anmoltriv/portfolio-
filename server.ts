import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { ANMOL_PROFILE } from "./profile.ts";
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini with server-side API Key
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("GEMINI_API_KEY present:", !!apiKey);
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
          error: "Messages array is required.",
        });
      }

      if (!apiKey) {
        return res.status(200).json({
          message:
            "Hi! I'm Anmol's AI twin. The Gemini API key isn't configured yet, but I can tell you that Anmol is a pre-final year student at NIT Rourkela pursuing Industrial Design with a CS Minor and is actively looking for software engineering opportunities.",
        });
      }

      const systemInstruction = `
You are Anmol Trivedi's AI twin.

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
      const userQuery = lastMessage.content.toLowerCase();

      const profileKeywords = [
        "anmol",
        "who are you",
        "about",
        "resume",
        "cv",
        "education",
        "college",
        "nit",
        "cgpa",
        "skills",
        "tech stack",
        "stack",
        "project",
        "projects",
        "content.ai",
        "shopsphere",
        "experience",
        "achievement",
        "leetcode",
        "dsa",
        "contact",
        "email",
        "phone",
        "internship",
        "hire",
        "work",
        "career",
        "rank",
      ];

      const needsProfile = profileKeywords.some((keyword) =>
        userQuery.includes(keyword),
      );

      const prompt = needsProfile
        ? `
PROFILE INFORMATION:

${ANMOL_PROFILE}

VISITOR QUESTION:

${lastMessage.content}
`
        : lastMessage.content;

      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction,
          temperature: 0.8,
        },
        history,
      });

      const response = await chat.sendMessage({
        message: prompt,
      });

      res.json({
        message: response.text,
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);

      res.status(500).json({
        error: error.message || "Failed to generate response.",
      });
    }
  });

  // Serve static files / Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0");

  server.on("listening", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on("error", (err: any) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Try setting PORT to a different value or stop the process using that port.`,
      );
    } else {
      console.error("Server error:", err);
    }
    process.exit(1);
  });
}

startServer();
