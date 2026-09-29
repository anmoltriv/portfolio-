import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { API_BASE_URL, GITHUB_USERNAME } from "../config";
import { buildEmptyWeeks, parseCalendar } from "./github";
import type { ContributionDay, GitCalendar } from "./github";

export type GitStatus = "loading" | "ready" | "unavailable";

interface GitContextValue {
  username: string;
  total: number;
  weeks: ContributionDay[][];
  status: GitStatus;
}

const GitContext = createContext<GitContextValue | null>(null);

const CONTRIBUTION_PATH = "/api/github-contributions";
const REFRESH_MS = 5 * 60 * 1000;

let calendarRequest: Promise<GitCalendar> | null = null;

async function readCalendar(url: string): Promise<GitCalendar> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(12000)
  });

  if (!res.ok) {
    throw new Error(`GitHub contributions request failed with status ${res.status}`);
  }

  const parsed = parseCalendar(await res.json());
  if (!parsed) throw new Error("GitHub contributions payload was malformed.");
  return parsed;
}

async function fetchGitCalendar(): Promise<GitCalendar> {
  const urls = [CONTRIBUTION_PATH];
  if (API_BASE_URL) urls.push(`${API_BASE_URL}${CONTRIBUTION_PATH}`);

  let lastError: unknown;
  for (const url of urls) {
    try {
      return await readCalendar(url);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("GitHub contributions request failed.");
}

function loadGitCalendar(force = false): Promise<GitCalendar> {
  if (force || !calendarRequest) {
    calendarRequest = fetchGitCalendar().catch((error) => {
      calendarRequest = null;
      throw error;
    });
  }
  return calendarRequest;
}

export function GitProvider({ children }: { children: ReactNode }) {
  const [calendar, setCalendar] = useState<GitCalendar>({
    username: GITHUB_USERNAME,
    total: 0,
    weeks: buildEmptyWeeks()
  });
  const [status, setStatus] = useState<GitStatus>("loading");

  useEffect(() => {
    let active = true;

    const pull = (force: boolean) => {
      loadGitCalendar(force)
        .then((next) => {
          if (!active) return;
          setCalendar(next);
          setStatus("ready");
        })
        .catch(() => {
          if (!active) return;
          setStatus((current) => (current === "ready" ? "ready" : "unavailable"));
        });
    };

    pull(false);
    const timer = window.setInterval(() => pull(true), REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const value = useMemo(
    () => ({
      username: calendar.username,
      total: calendar.total,
      weeks: calendar.weeks,
      status
    }),
    [calendar, status]
  );

  return <GitContext.Provider value={value}>{children}</GitContext.Provider>;
}

export function useGit(): GitContextValue {
  const ctx = useContext(GitContext);
  if (!ctx) throw new Error("useGit must be used inside a GitProvider");
  return ctx;
}
