import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import type { ReactNode } from "react";
import {
  applyAppearance,
  getStoredTheme,
  persistTheme,
  withThemeTransition
} from "./theme";
import type { ThemeName } from "./theme";

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function commitTheme(next: ThemeName, setThemeState: (theme: ThemeName) => void): void {
  // Class + glow land before React paints so the view-transition snapshot is complete.
  applyAppearance(next);
  persistTheme(next);
  flushSync(() => {
    setThemeState(next);
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const initial = getStoredTheme();
    applyAppearance(initial);
    return initial;
  });

  const toggleTheme = useCallback(() => {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    withThemeTransition(() => commitTheme(next, setThemeState));
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
}
