export type AccentName = "emerald" | "blue" | "amber";

// Every value here must be a complete, literal class string. Tailwind scans
// source text, so a class assembled at runtime (`hover:${tokens.text}`) is
// never compiled and silently does nothing.
export interface AccentTokens {
  text: string;
  hoverText: string;
  groupHoverText: string;
  bg: string;
  hoverBg: string;
  beforeBg: string;
  ping: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  focusBorder: string;
  pickerRing: string;
  radialFrom: string;
  ringGlow: string;
  /** Lift + glow applied to bento/project/experience cards on hover. */
  cardHover: string;
  /** Same as cardHover, plus a tinted background fill. */
  cardHoverTinted: string;
  /** Much fainter glow for the large chat panel. */
  panelHover: string;
  photoGlow: string;
  orbs: [string, string, string];
  selection: string;
}

export const ACCENTS: Record<AccentName, AccentTokens> = {
  emerald: {
    text: "text-emerald-400 light:text-emerald-700",
    hoverText: "hover:text-emerald-400 light:hover:text-emerald-700",
    groupHoverText: "group-hover:text-emerald-400 light:group-hover:text-emerald-700",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-500",
    beforeBg: "before:bg-emerald-500",
    ping: "bg-emerald-400 light:bg-emerald-600",
    border: "border-emerald-500/20 light:border-emerald-700/25",
    badgeBg: "bg-emerald-950/40 light:bg-emerald-100/90",
    badgeText: "text-emerald-300 light:text-emerald-800",
    focusBorder: "focus:border-emerald-500 light:focus:border-emerald-600",
    pickerRing: "ring-emerald-500/40 light:ring-emerald-600/40",
    radialFrom: "from-emerald-500/10 light:from-emerald-500/20",
    ringGlow: "bg-emerald-500",
    cardHover: "hover:shadow-emerald-500/5 hover:border-emerald-500/30 light:hover:shadow-emerald-700/10 light:hover:border-emerald-600/35",
    cardHoverTinted:
      "hover:shadow-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-950/15 light:hover:shadow-emerald-700/10 light:hover:border-emerald-600/35 light:hover:bg-emerald-50/90",
    panelHover: "hover:shadow-emerald-500/[0.015] light:hover:shadow-emerald-700/10",
    photoGlow: "bg-emerald-500/20 shadow-[0_0_20px_#10b981] light:bg-emerald-400/25 light:shadow-[0_0_24px_#34d399]",
    orbs: ["bg-emerald-950/25 light:bg-emerald-200/55", "bg-teal-950/20 light:bg-teal-100/50", "bg-[#0b1210]/20 light:bg-amber-100/45"],
    selection: "selection:bg-emerald-500/30 selection:text-emerald-400 light:selection:text-emerald-800"
  },
  blue: {
    text: "text-blue-400 light:text-blue-700",
    hoverText: "hover:text-blue-400 light:hover:text-blue-700",
    groupHoverText: "group-hover:text-blue-400 light:group-hover:text-blue-700",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-500",
    beforeBg: "before:bg-blue-500",
    ping: "bg-blue-400 light:bg-blue-600",
    border: "border-blue-500/20 light:border-blue-700/25",
    badgeBg: "bg-blue-950/40 light:bg-blue-100/90",
    badgeText: "text-blue-300 light:text-blue-800",
    focusBorder: "focus:border-blue-500 light:focus:border-blue-600",
    pickerRing: "ring-blue-500/40 light:ring-blue-600/40",
    radialFrom: "from-blue-500/10 light:from-blue-500/20",
    ringGlow: "bg-blue-500",
    cardHover: "hover:shadow-blue-500/5 hover:border-blue-500/30 light:hover:shadow-blue-700/10 light:hover:border-blue-600/35",
    cardHoverTinted:
      "hover:shadow-blue-500/5 hover:border-blue-500/30 hover:bg-blue-950/15 light:hover:shadow-blue-700/10 light:hover:border-blue-600/35 light:hover:bg-blue-50/90",
    panelHover: "hover:shadow-blue-500/[0.015] light:hover:shadow-blue-700/10",
    photoGlow: "bg-blue-500/20 shadow-[0_0_20px_#3b82f6] light:bg-blue-400/25 light:shadow-[0_0_24px_#60a5fa]",
    orbs: ["bg-blue-950/25 light:bg-blue-200/50", "bg-indigo-950/20 light:bg-indigo-100/45", "bg-[#091122]/20 light:bg-sky-100/40"],
    selection: "selection:bg-blue-500/30 selection:text-blue-400 light:selection:text-blue-800"
  },
  amber: {
    text: "text-yellow-400 light:text-amber-700",
    hoverText: "hover:text-yellow-400 light:hover:text-amber-700",
    groupHoverText: "group-hover:text-yellow-400 light:group-hover:text-amber-700",
    bg: "bg-yellow-500",
    hoverBg: "hover:bg-yellow-500",
    beforeBg: "before:bg-yellow-500",
    ping: "bg-yellow-400 light:bg-amber-500",
    border: "border-yellow-500/20 light:border-amber-700/25",
    badgeBg: "bg-yellow-950/40 light:bg-amber-100/90",
    badgeText: "text-yellow-300 light:text-amber-800",
    focusBorder: "focus:border-yellow-500 light:focus:border-amber-600",
    pickerRing: "ring-yellow-500/40 light:ring-amber-600/40",
    radialFrom: "from-yellow-500/10 light:from-amber-500/20",
    ringGlow: "bg-amber-500",
    cardHover: "hover:shadow-yellow-500/5 hover:border-yellow-500/30 light:hover:shadow-amber-700/10 light:hover:border-amber-600/35",
    cardHoverTinted:
      "hover:shadow-yellow-500/5 hover:border-yellow-500/30 hover:bg-yellow-950/15 light:hover:shadow-amber-700/10 light:hover:border-amber-600/35 light:hover:bg-amber-50/90",
    panelHover: "hover:shadow-yellow-500/[0.015] light:hover:shadow-amber-700/10",
    photoGlow: "bg-yellow-500/20 shadow-[0_0_20px_#f59e0b] light:bg-amber-400/25 light:shadow-[0_0_24px_#fbbf24]",
    orbs: ["bg-amber-950/25 light:bg-amber-200/50", "bg-yellow-950/15 light:bg-yellow-100/45", "bg-[#1c1208]/20 light:bg-orange-100/40"],
    selection: "selection:bg-amber-500/30 selection:text-yellow-400 light:selection:text-amber-800"
  }
};

export const ACCENT_PICKER: { name: AccentName; label: string; swatch: string }[] = [
  { name: "emerald", label: "Emerald Garden", swatch: "bg-emerald-500" },
  { name: "blue", label: "Oceanic Obsidian", swatch: "bg-blue-500" },
  { name: "amber", label: "Aura Amber", swatch: "bg-yellow-500" }
];
