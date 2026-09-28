export type ThemeName = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

type ViewTransitionCapable = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => { finished: Promise<void> };
};

const glowByTheme: { dark: string; light: string } = {
  dark: "emerald",
  light: "sage"
};

export function registerGlow(theme: ThemeName, glow: string): void {
  glowByTheme[theme] = glow;
}

export function getStoredTheme(): ThemeName {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function persistTheme(theme: ThemeName): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode can block storage; the in-memory class still applies.
  }
}

/** Apply the html class, color-scheme, and glow in one write so paint never splits. */
export function applyAppearance(theme: ThemeName): void {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  root.dataset.glow = glowByTheme[theme];
}

/**
 * Capture the current screen, run `update`, then crossfade to the new screen.
 * Falls back to a synchronous update when the API is missing or motion is reduced.
 */
export function withThemeTransition(update: () => void): void {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionCapable;

  if (!reduce && typeof doc.startViewTransition === "function") {
    doc.startViewTransition(update);
    return;
  }
  update();
}
