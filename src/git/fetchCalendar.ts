import {
  buildEmptyWeeks,
  shiftISODate,
  totalContributions,
  weeksFromCounts
} from "./github";
import type { GitCalendar } from "./github";

const CACHE_MS = 60 * 1000;
const HTML_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "en-US,en;q=0.9"
};

const CONTRIBUTIONS_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
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

interface GraphqlDay {
  date?: string;
  contributionCount?: number;
}

interface GraphqlPayload {
  message?: string;
  errors?: { message?: string }[];
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: { contributionDays?: GraphqlDay[] }[];
        };
      };
    } | null;
  };
}

let cache: { username: string; expiresAt: number; body: GitCalendar } | null = null;

function defaultUsername(): string {
  return process.env.GITHUB_USERNAME?.trim() || "anmoltriv";
}

function assertUsername(username: string): string {
  if (!/^[A-Za-z0-9-]{1,39}$/.test(username)) {
    throw new Error("Invalid GitHub username.");
  }
  return username;
}

function attr(source: string, name: string): string | null {
  const match = source.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return match?.[1] ?? null;
}

function tooltipCount(text: string): number | null {
  const match = text.match(/(\d+)\s+contribution/i);
  if (match) return Number(match[1]);
  if (/no contributions/i.test(text)) return 0;
  return null;
}

/**
 * Reads the same contribution graph GitHub renders on the profile.
 * `data-level` is only a 0–4 bucket, so counts come from the English tooltip.
 * Returns null when the page has activity levels but the tooltips didn't parse.
 */
export function parseContributionHtml(html: string): Map<string, number> | null {
  const tips = new Map<string, string>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi)) {
    const id = attr(match[1], "for");
    if (id) tips.set(id, match[2].replace(/\s+/g, " ").trim());
  }

  const counts = new Map<string, number>();
  let levelSum = 0;
  let parsedTips = 0;

  for (const match of html.matchAll(/<td\b([^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*)>/gi)) {
    const date = attr(match[1], "data-date");
    const id = attr(match[1], "id");
    if (!date || !id) continue;

    levelSum += Number(attr(match[1], "data-level") ?? "0") || 0;
    const count = tooltipCount(tips.get(id) ?? "");
    if (count === null) continue;
    parsedTips += 1;
    counts.set(date, count);
  }

  if (counts.size === 0 || parsedTips === 0) return null;
  const countSum = [...counts.values()].reduce((sum, count) => sum + count, 0);
  if (countSum === 0 && levelSum > 0) return null;
  return counts;
}

async function fetchPublicCounts(username: string): Promise<Map<string, number> | null> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: HTML_HEADERS,
    cache: "no-store",
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) {
    throw new Error(`GitHub contribution page responded with status ${response.status}`);
  }
  return parseContributionHtml(await response.text());
}

async function fetchGraphqlCounts(username: string, token: string): Promise<Map<string, number>> {
  const skeleton = buildEmptyWeeks();
  const from = `${skeleton[0][0].date}T00:00:00Z`;
  const lastDay = skeleton[skeleton.length - 1][6].date;
  const to = `${shiftISODate(lastDay, 1)}T00:00:00Z`;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "anmol-portfolio-heatmap",
      Accept: "application/json"
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: username, from, to }
    })
  });

  const payload = (await response.json()) as GraphqlPayload;
  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!response.ok || payload.errors?.length || !weeks) {
    const message = payload.errors?.map((error) => error.message).filter(Boolean).join("; ");
    throw new Error(message || payload.message || `GitHub GraphQL status ${response.status}`);
  }

  const counts = new Map<string, number>();
  for (const week of weeks) {
    for (const day of week.contributionDays ?? []) {
      if (typeof day.date === "string" && typeof day.contributionCount === "number") {
        counts.set(day.date, day.contributionCount);
      }
    }
  }
  return counts;
}

function calendarFromCounts(username: string, counts: ReadonlyMap<string, number>): GitCalendar {
  const weeks = weeksFromCounts(counts);
  return { username, total: totalContributions(weeks), weeks };
}

async function loadContributionCalendar(username: string): Promise<GitCalendar> {
  const counts = new Map<string, number>();
  let publicOk = false;

  try {
    const publicCounts = await fetchPublicCounts(username);
    if (publicCounts) {
      publicOk = true;
      for (const [date, count] of publicCounts) counts.set(date, count);
    }
  } catch (error) {
    console.error("Public GitHub contribution graph fetch failed:", error);
  }

  const token = process.env.GITHUB_TOKEN?.trim() ?? "";
  if (token) {
    try {
      const privateCounts = await fetchGraphqlCounts(username, token);
      for (const [date, count] of privateCounts) {
        counts.set(date, Math.max(counts.get(date) ?? 0, count));
      }
      publicOk = publicOk || privateCounts.size > 0;
    } catch (error) {
      console.error("GitHub GraphQL contributions failed:", error);
      if (!publicOk) throw error;
    }
  }

  if (!publicOk) {
    throw new Error("GitHub contribution calendar was unavailable.");
  }

  return calendarFromCounts(username, counts);
}

export async function fetchContributionCalendar(username = defaultUsername()): Promise<GitCalendar> {
  const login = assertUsername(username);
  if (cache && cache.username === login && cache.expiresAt > Date.now()) {
    return cache.body;
  }

  const body = await loadContributionCalendar(login);
  cache = { username: login, expiresAt: Date.now() + CACHE_MS, body };
  return body;
}
