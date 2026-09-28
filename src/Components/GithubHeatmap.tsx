import { GITHUB_PROFILE_URL } from "../config";
import { formatISODate, heatLevel, monthLabel } from "../git/github";
import { useGit } from "../git/GitContext";
import { useAccent } from "../theme/AccentContext";

function monthLabelsForWeeks(weeks: { date: string }[][]): (string | null)[] {
  const today = formatISODate(new Date());

  return weeks.map((week, index) => {
    const monthStart = week.find((day) => day.date.endsWith("-01"));
    if (monthStart && monthStart.date <= today) return monthLabel(monthStart.date);

    // Keep the opening month, unless the next week already carries the 1st.
    if (index === 0 && !weeks[1]?.some((day) => day.date.endsWith("-01"))) {
      return monthLabel(week[0].date);
    }
    return null;
  });
}

export default function GithubHeatmap() {
  const { tokens } = useAccent();
  const { weeks, total, status, username } = useGit();
  const max = Math.max(0, ...weeks.flatMap((week) => week.map((day) => day.count)));
  const labels = monthLabelsForWeeks(weeks);
  const ready = status === "ready";

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[10px] text-faint uppercase tracking-[0.2em] font-mono">
          GitHub Activity
        </span>
        <span className={`text-[10px] font-mono tracking-widest ${ready ? tokens.text : "text-ghost"}`}>
          {status === "loading" ? "SYNCING" : ready ? `${total} / 2 MO` : "OFFLINE"}
        </span>
      </div>

      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={`Last two months of GitHub contributions for ${username}`}
        className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/30"
      >
        <div
          className="grid mb-1"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 10px)`, columnGap: 3 }}
        >
          {labels.map((label, index) => (
            <span key={`label-${weeks[index][0].date}`} className="relative h-3">
              {label ? (
                <span className="absolute left-0 text-[8px] font-mono text-faint leading-none whitespace-nowrap">
                  {label}
                </span>
              ) : null}
            </span>
          ))}
        </div>

        <div className="flex gap-[3px]">
          {weeks.map((week) => (
            <div key={week[0].date} className="flex flex-col gap-[3px]">
              {week.map((day) => {
                const level = ready ? heatLevel(day.count, max) : 0;
                return (
                  <div
                    key={day.date}
                    title={
                      ready
                        ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                        : undefined
                    }
                    className={`w-[9px] h-[9px] rounded-[2px] ${tokens.heat[level]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </a>

      <div className="flex items-center justify-end gap-1 mt-2">
        <span className="text-[8px] font-mono text-faint uppercase tracking-widest">Less</span>
        {tokens.heat.map((swatch) => (
          <span key={swatch} className={`w-[9px] h-[9px] rounded-[2px] ${swatch}`} />
        ))}
        <span className="text-[8px] font-mono text-faint uppercase tracking-widest">More</span>
      </div>
    </div>
  );
}
