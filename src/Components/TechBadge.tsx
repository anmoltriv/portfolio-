import type { ReactNode } from "react";

const ICON_CLASS = "w-3.5 h-3.5 transition-colors duration-300";

interface BrandEntry {
  /** Matched against the normalized tag; first hit wins, so order matters. */
  keywords: string[];
  color: string;
  icon: ReactNode;
}

const BRANDS: BrandEntry[] = [
  {
    keywords: ["react"],
    color: "#15ccef",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(30, 50, 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(90, 50, 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(150, 50, 50)" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </svg>
    )
  },
  {
    keywords: ["node"],
    color: "#39b54a",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 22V12" />
        <path d="M12 12l9-5" />
        <path d="M12 12L3 7" />
      </svg>
    )
  },
  {
    keywords: ["express"],
    color: "#F5A623",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 2-2 10h9L11 22l2-10H4L13 2z" />
      </svg>
    )
  },
  {
    keywords: ["postgres", "neon", "sql"],
    color: "#00E599",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    )
  },
  {
    keywords: ["clerk"],
    color: "#6C47FF",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    keywords: ["cloudinary"],
    color: "#2A7BE6",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21a6 6 0 0 1-5.007-2.693 5 5 0 0 1-.393-8.8A7 7 0 1 1 19 11.5a5.1 5.1 0 0 1-7 9.5z" />
      </svg>
    )
  },
  {
    keywords: ["gemini", "ai"],
    color: "#A259FF",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    )
  },
  {
    keywords: ["tailwind"],
    color: "#38BDF8",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    keywords: ["mongo"],
    color: "#13AA52",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-.5 0-9 4.5-9 10a9 9 0 0 0 9 9c.5 0 9-4.5 9-10A9 9 0 0 0 12 2z" />
        <path d="M12 2v20" />
      </svg>
    )
  },
  {
    keywords: ["redux"],
    color: "#764ABC",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0" />
      </svg>
    )
  },
  {
    keywords: ["typescript"],
    color: "#3178C6",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="#0a0a0a">
          TS
        </text>
      </svg>
    )
  },
  {
    keywords: ["websocket", "socket"],
    color: "#22D3EE",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 3 4 4-4 4" />
        <path d="M20 7H4" />
        <path d="m8 21-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    )
  },
  {
    keywords: ["jwt"],
    color: "#FB015B",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      </svg>
    )
  }
];

const FALLBACK_BRAND: BrandEntry = {
  keywords: [],
  color: "#94A3B8",
  icon: (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
};

function resolveBrand(tag: string): BrandEntry {
  const normalized = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    BRANDS.find((brand) => brand.keywords.some((keyword) => normalized.includes(keyword))) ??
    FALLBACK_BRAND
  );
}

/** Technology pill whose logo desaturates until the badge is hovered. */
export default function TechBadge({ tag }: { tag: string }) {
  const brand = resolveBrand(tag);

  return (
    <div className="group/badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-[10.5px] font-mono tracking-wide text-white/50 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-default">
      <span
        className="transition-all duration-500 filter grayscale opacity-60 group-hover/badge:grayscale-0 group-hover/badge:opacity-100"
        style={{ color: brand.color }}
      >
        {brand.icon}
      </span>
      <span className="group-hover/badge:text-white transition-colors duration-300">{tag}</span>
    </div>
  );
}
