export interface ContributionDay {
  date: string;
  count: number;
}

export interface GitCalendar {
  username: string;
  total: number;
  weeks: ContributionDay[][];
}

/** ~two months of Sunday-start weeks, matching GitHub's contribution grid. */
export const HEATMAP_WEEK_COUNT = 10;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** GitHub omits days before `from` and after today; pad so every column is Sun–Sat. */
export function padWeekToSundayGrid(week: ContributionDay[]): ContributionDay[] {
  if (week.length === 0) return week;
  if (week.length === 7 && parseLocalDate(week[0].date).getDay() === 0) return week;

  const first = parseLocalDate(week[0].date);
  const days: ContributionDay[] = [];
  for (let offset = first.getDay(); offset > 0; offset -= 1) {
    days.push({ date: formatISODate(addDays(first, -offset)), count: 0 });
  }
  days.push(...week);
  while (days.length < 7) {
    const last = parseLocalDate(days[days.length - 1].date);
    days.push({ date: formatISODate(addDays(last, 1)), count: 0 });
  }
  return days.slice(0, 7);
}

function startOfWeekSunday(date: Date): Date {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  start.setDate(start.getDate() - start.getDay());
  return start;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function shiftISODate(isoDate: string, days: number): string {
  return formatISODate(addDays(parseLocalDate(isoDate), days));
}

/**
 * Calendar day used to anchor the grid. Shifted toward UTC+14 so a contribution
 * made "today" in Asia is already inside the window while UTC is still yesterday.
 */
export function contributionReferenceDate(now = new Date()): Date {
  const shifted = new Date(now.getTime() + 14 * 60 * 60 * 1000);
  return new Date(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate());
}

export function buildEmptyWeeks(
  weekCount = HEATMAP_WEEK_COUNT,
  today = contributionReferenceDate()
): ContributionDay[][] {
  const currentWeekStart = startOfWeekSunday(today);
  const weeks: ContributionDay[][] = [];

  for (let week = weekCount - 1; week >= 0; week -= 1) {
    const weekStart = addDays(currentWeekStart, -7 * week);
    const days: ContributionDay[] = [];
    for (let day = 0; day < 7; day += 1) {
      days.push({ date: formatISODate(addDays(weekStart, day)), count: 0 });
    }
    weeks.push(days);
  }

  return weeks;
}

export function weeksFromCounts(
  counts: ReadonlyMap<string, number>,
  weekCount = HEATMAP_WEEK_COUNT
): ContributionDay[][] {
  return buildEmptyWeeks(weekCount).map((week) =>
    week.map((day) => ({ date: day.date, count: counts.get(day.date) ?? 0 }))
  );
}

export function totalContributions(weeks: ContributionDay[][]): number {
  return weeks.reduce((sum, week) => sum + week.reduce((daySum, day) => daySum + day.count, 0), 0);
}

export function monthLabel(isoDate: string): string {
  return parseLocalDate(isoDate).toLocaleString("en-US", { month: "short" });
}

/** GitHub-style 0–4 buckets, scaled to the busiest day in the window. */
export function heatLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0 || max <= 0) return 0;
  if (max === 1) return 2;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

export function parseCalendar(payload: unknown): GitCalendar | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Partial<GitCalendar>;
  if (typeof data.username !== "string" || typeof data.total !== "number" || !Array.isArray(data.weeks)) {
    return null;
  }

  const weeks = data.weeks
    .map((week) =>
      Array.isArray(week)
        ? week.filter(
            (day): day is ContributionDay =>
              !!day &&
              typeof day === "object" &&
              typeof day.date === "string" &&
              typeof day.count === "number"
          )
        : []
    )
    .map(padWeekToSundayGrid)
    .filter((week) => week.length === 7);

  if (weeks.length === 0) return null;

  return {
    username: data.username,
    total: data.total,
    weeks: weeks.slice(-HEATMAP_WEEK_COUNT)
  };
}
