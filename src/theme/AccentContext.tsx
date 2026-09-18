import { createContext, useContext, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
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

  const tokens = ACCENTS[accent];

  const value = useMemo(
    () => ({ accent, setAccent, tokens }),
    [accent, tokens]
  );

  return (
    <AccentContext.Provider value={value}>
      <div
        className="contents"
        style={
          {
            "--accent": tokens.hex,
            "--accent-rgb": tokens.rgb
          } as CSSProperties
        }
      >
        {children}
      </div>
    </AccentContext.Provider>
  );
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used inside an AccentProvider");
  return ctx;
}
