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

let calendarRequest: Promise<GitCalendar> | null = null;

async function fetchGitCalendar(): Promise<GitCalendar> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const res = await fetch(`${API_BASE_URL}/api/github-contributions`, {
    headers: { Accept: "application/json" }
  });

  if (!res.ok) {
    throw new Error(`GitHub contributions request failed with status ${res.status}`);
  }

  const parsed = parseCalendar(await res.json());
  if (!parsed) throw new Error("GitHub contributions payload was malformed.");
  return parsed;
}

function loadGitCalendar(): Promise<GitCalendar> {
  if (!calendarRequest) {
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

    loadGitCalendar()
      .then((next) => {
        if (!active) return;
        setCalendar(next);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("unavailable");
      });

    return () => {
      active = false;
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
