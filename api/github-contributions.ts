import { fetchContributionCalendar } from "../src/git/fetchCalendar";

interface JsonResponse {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string) => void;
}

export default async function handler(_req: unknown, res: JsonResponse) {
  try {
    const body = await fetchContributionCalendar();
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).json(body);
  } catch (error) {
    console.error("GitHub contributions fetch failed:", error);
    res.status(502).json({ error: "Failed to load GitHub contributions." });
  }
}
