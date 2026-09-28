import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative h-10 w-10 shrink-0 rounded-full border border-fg/10 bg-fg/[0.03] text-muted hover:text-fg hover:bg-fg/[0.08] hover:border-fg/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 flex items-center justify-center cursor-pointer"
    >
      <Sun
        className={`absolute w-4 h-4 ${isDark ? "opacity-100" : "opacity-0"}`}
        strokeWidth={2}
      />
      <Moon
        className={`absolute w-4 h-4 ${isDark ? "opacity-0" : "opacity-100"}`}
        strokeWidth={2}
      />
    </button>
  );
}
