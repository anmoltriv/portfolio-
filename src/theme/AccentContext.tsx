import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DARK_ACCENTS,
  LIGHT_ACCENTS,
  LIGHT_GLOW_STORAGE_KEY,
  isDarkAccentName,
  isLightAccentName
} from "./accent";
import type { AccentName, AccentTokens, DarkAccentName, LightAccentName } from "./accent";
import { useTheme } from "./ThemeContext";

interface AccentContextValue {
  accent: AccentName;
  setAccent: (accent: AccentName) => void;
  tokens: AccentTokens;
}

const AccentContext = createContext<AccentContextValue | null>(null);

function readStoredLightGlow(): LightAccentName {
  try {
    const stored = localStorage.getItem(LIGHT_GLOW_STORAGE_KEY);
    if (stored && isLightAccentName(stored)) return stored;
  } catch {
    // Private mode can block storage.
  }
  return "sage";
}

function applyGlowDataset(name: AccentName): void {
  document.documentElement.dataset.glow = name;
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [darkAccent, setDarkAccent] = useState<DarkAccentName>("emerald");
  const [lightAccent, setLightAccent] = useState<LightAccentName>(readStoredLightGlow);

  const accent: AccentName = theme === "light" ? lightAccent : darkAccent;
  const tokens = theme === "light" ? LIGHT_ACCENTS[lightAccent] : DARK_ACCENTS[darkAccent];

  useEffect(() => {
    applyGlowDataset(accent);
  }, [accent]);

  useEffect(() => {
    try {
      localStorage.setItem(LIGHT_GLOW_STORAGE_KEY, lightAccent);
    } catch {
      // Private mode can block storage; the in-memory class still applies.
    }
  }, [lightAccent]);

  const setAccent = useCallback(
    (next: AccentName) => {
      if (theme === "light" && isLightAccentName(next)) {
        setLightAccent(next);
        return;
      }
      if (theme === "dark" && isDarkAccentName(next)) {
        setDarkAccent(next);
      }
    },
    [theme]
  );

  const value = useMemo(
    () => ({ accent, setAccent, tokens }),
    [accent, setAccent, tokens]
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used inside an AccentProvider");
  return ctx;
}
