import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ACCENTS } from "./accent";
import type { AccentName, AccentTokens } from "./accent";

interface AccentContextValue {
  accent: AccentName;
  setAccent: (accent: AccentName) => void;
  tokens: AccentTokens;
}

const AccentContext = createContext<AccentContextValue | null>(null);

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<AccentName>("emerald");

  const value = useMemo(
    () => ({ accent, setAccent, tokens: ACCENTS[accent] }),
    [accent]
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used inside an AccentProvider");
  return ctx;
}
