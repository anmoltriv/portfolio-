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
}

export const ACCENTS: Record<AccentName, AccentTokens> = {
  emerald: {
    text: "text-emerald-400",
    hoverText: "hover:text-emerald-400",
    groupHoverText: "group-hover:text-emerald-400",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-500",
    beforeBg: "before:bg-emerald-500",
    ping: "bg-emerald-400",
    border: "border-emerald-500/20",
    badgeBg: "bg-emerald-950/40",
    badgeText: "text-emerald-300",
    focusBorder: "focus:border-emerald-500",
    pickerRing: "ring-emerald-500/40",
    radialFrom: "from-emerald-500/10",
    ringGlow: "bg-emerald-500",
    cardHover: "hover:shadow-emerald-500/5 hover:border-emerald-500/30",
    cardHoverTinted:
      "hover:shadow-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-950/15",
    panelHover: "hover:shadow-emerald-500/[0.015]",
    photoGlow: "bg-emerald-500/20 shadow-[0_0_20px_#10b981]",
    orbs: ["bg-emerald-950/25", "bg-teal-950/20", "bg-[#0b1210]/20"]
  },
  blue: {
    text: "text-blue-400",
    hoverText: "hover:text-blue-400",
    groupHoverText: "group-hover:text-blue-400",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-500",
    beforeBg: "before:bg-blue-500",
    ping: "bg-blue-400",
    border: "border-blue-500/20",
    badgeBg: "bg-blue-950/40",
    badgeText: "text-blue-300",
    focusBorder: "focus:border-blue-500",
    pickerRing: "ring-blue-500/40",
    radialFrom: "from-blue-500/10",
    ringGlow: "bg-blue-500",
    cardHover: "hover:shadow-blue-500/5 hover:border-blue-500/30",
    cardHoverTinted:
      "hover:shadow-blue-500/5 hover:border-blue-500/30 hover:bg-blue-950/15",
    panelHover: "hover:shadow-blue-500/[0.015]",
    photoGlow: "bg-blue-500/20 shadow-[0_0_20px_#3b82f6]",
    orbs: ["bg-blue-950/25", "bg-indigo-950/20", "bg-[#091122]/20"]
  },
  amber: {
    text: "text-yellow-400",
    hoverText: "hover:text-yellow-400",
    groupHoverText: "group-hover:text-yellow-400",
    bg: "bg-yellow-500",
    hoverBg: "hover:bg-yellow-500",
    beforeBg: "before:bg-yellow-500",
    ping: "bg-yellow-400",
    border: "border-yellow-500/20",
    badgeBg: "bg-yellow-950/40",
    badgeText: "text-yellow-300",
    focusBorder: "focus:border-yellow-500",
    pickerRing: "ring-yellow-500/40",
    radialFrom: "from-yellow-500/10",
    ringGlow: "bg-amber-500",
    cardHover: "hover:shadow-yellow-500/5 hover:border-yellow-500/30",
    cardHoverTinted:
      "hover:shadow-yellow-500/5 hover:border-yellow-500/30 hover:bg-yellow-950/15",
    panelHover: "hover:shadow-yellow-500/[0.015]",
    photoGlow: "bg-yellow-500/20 shadow-[0_0_20px_#f59e0b]",
    orbs: ["bg-amber-950/25", "bg-yellow-950/15", "bg-[#1c1208]/20"]
  }
};

export const ACCENT_PICKER: { name: AccentName; label: string; swatch: string }[] = [
  { name: "emerald", label: "Emerald Garden", swatch: "bg-emerald-500" },
  { name: "blue", label: "Oceanic Obsidian", swatch: "bg-blue-500" },
  { name: "amber", label: "Aura Amber", swatch: "bg-yellow-500" }
];
