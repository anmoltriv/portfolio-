export type DarkAccentName = "emerald" | "blue" | "amber";
export type LightAccentName = "sage" | "azure" | "violet";
export type AccentName = DarkAccentName | LightAccentName;

export const LIGHT_GLOW_STORAGE_KEY = "light-glow";

export function isLightAccentName(name: string): name is LightAccentName {
  return name === "sage" || name === "azure" || name === "violet";
}

export function isDarkAccentName(name: string): name is DarkAccentName {
  return name === "emerald" || name === "blue" || name === "amber";
}

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
  /** Text sitting on the solid accent fill (send / enquire hover). */
  onSolid: string;
}

export const DARK_ACCENTS: Record<DarkAccentName, AccentTokens> = {
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
    cardHoverTinted: "hover:shadow-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-950/15",
    panelHover: "hover:shadow-emerald-500/[0.015]",
    photoGlow: "bg-emerald-500/20 shadow-[0_0_20px_#10b981]",
    orbs: ["bg-emerald-950/25", "bg-teal-950/20", "bg-[#0b1210]/20"],
    selection: "selection:bg-emerald-500/30 selection:text-emerald-400",
    onSolid: "text-black"
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
    cardHoverTinted: "hover:shadow-blue-500/5 hover:border-blue-500/30 hover:bg-blue-950/15",
    panelHover: "hover:shadow-blue-500/[0.015]",
    photoGlow: "bg-blue-500/20 shadow-[0_0_20px_#3b82f6]",
    orbs: ["bg-blue-950/25", "bg-indigo-950/20", "bg-[#091122]/20"],
    selection: "selection:bg-blue-500/30 selection:text-blue-400",
    onSolid: "text-black"
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
    cardHoverTinted: "hover:shadow-yellow-500/5 hover:border-yellow-500/30 hover:bg-yellow-950/15",
    panelHover: "hover:shadow-yellow-500/[0.015]",
    photoGlow: "bg-yellow-500/20 shadow-[0_0_20px_#f59e0b]",
    orbs: ["bg-amber-950/25", "bg-yellow-950/15", "bg-[#1c1208]/20"],
    selection: "selection:bg-amber-500/30 selection:text-yellow-400",
    onSolid: "text-black"
  }
};

/**
 * Light-mode glow palettes used on paper portfolios — sage, azure, violet.
 * No red/coral: that family fights the ink-on-paper contrast.
 */
export const LIGHT_ACCENTS: Record<LightAccentName, AccentTokens> = {
  sage: {
    text: "text-teal-800",
    hoverText: "hover:text-teal-800",
    groupHoverText: "group-hover:text-teal-800",
    bg: "bg-teal-600",
    hoverBg: "hover:bg-teal-600",
    beforeBg: "before:bg-teal-600",
    ping: "bg-teal-600",
    border: "border-teal-500/35",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-900",
    focusBorder: "focus:border-teal-600",
    pickerRing: "ring-teal-500/45",
    radialFrom: "from-teal-400/20",
    ringGlow: "bg-teal-400",
    cardHover: "hover:shadow-teal-500/15 hover:border-teal-300",
    cardHoverTinted: "hover:shadow-teal-500/15 hover:border-teal-300 hover:bg-teal-50",
    panelHover: "hover:shadow-teal-500/12",
    photoGlow: "bg-teal-400/30 shadow-[0_0_28px_#2dd4bf]",
    orbs: ["bg-teal-200/65", "bg-emerald-100/50", "bg-stone-100/60"],
    selection: "selection:bg-teal-200 selection:text-teal-900",
    onSolid: "text-white"
  },
  azure: {
    text: "text-sky-700",
    hoverText: "hover:text-sky-700",
    groupHoverText: "group-hover:text-sky-700",
    bg: "bg-sky-500",
    hoverBg: "hover:bg-sky-500",
    beforeBg: "before:bg-sky-500",
    ping: "bg-sky-500",
    border: "border-sky-400/40",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-800",
    focusBorder: "focus:border-sky-500",
    pickerRing: "ring-sky-400/50",
    radialFrom: "from-sky-400/25",
    ringGlow: "bg-sky-400",
    cardHover: "hover:shadow-sky-400/20 hover:border-sky-300",
    cardHoverTinted: "hover:shadow-sky-400/20 hover:border-sky-300 hover:bg-sky-50",
    panelHover: "hover:shadow-sky-400/15",
    photoGlow: "bg-sky-400/35 shadow-[0_0_28px_#38bdf8]",
    orbs: ["bg-sky-200/70", "bg-cyan-100/60", "bg-indigo-100/50"],
    selection: "selection:bg-sky-200 selection:text-sky-900",
    onSolid: "text-white"
  },
  violet: {
    text: "text-violet-700",
    hoverText: "hover:text-violet-700",
    groupHoverText: "group-hover:text-violet-700",
    bg: "bg-violet-500",
    hoverBg: "hover:bg-violet-500",
    beforeBg: "before:bg-violet-500",
    ping: "bg-violet-500",
    border: "border-violet-400/40",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-800",
    focusBorder: "focus:border-violet-500",
    pickerRing: "ring-violet-400/50",
    radialFrom: "from-violet-400/25",
    ringGlow: "bg-violet-400",
    cardHover: "hover:shadow-violet-400/20 hover:border-violet-300",
    cardHoverTinted: "hover:shadow-violet-400/20 hover:border-violet-300 hover:bg-violet-50",
    panelHover: "hover:shadow-violet-400/15",
    photoGlow: "bg-violet-400/35 shadow-[0_0_28px_#a78bfa]",
    orbs: ["bg-violet-200/65", "bg-indigo-100/55", "bg-slate-100/50"],
    selection: "selection:bg-violet-200 selection:text-violet-900",
    onSolid: "text-white"
  }
};

export const DARK_ACCENT_PICKER: { name: DarkAccentName; label: string; swatch: string }[] = [
  { name: "emerald", label: "Emerald Garden", swatch: "bg-emerald-500" },
  { name: "blue", label: "Oceanic Obsidian", swatch: "bg-blue-500" },
  { name: "amber", label: "Aura Amber", swatch: "bg-yellow-500" }
];

export const LIGHT_ACCENT_PICKER: { name: LightAccentName; label: string; swatch: string }[] = [
  { name: "sage", label: "Grove Sage", swatch: "bg-teal-600" },
  { name: "azure", label: "Studio Azure", swatch: "bg-sky-500" },
  { name: "violet", label: "Atelier Violet", swatch: "bg-violet-500" }
];
