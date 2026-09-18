import { SITE } from "../site";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-12 mt-12 border-t border-white/10 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
      <div className="flex gap-8 md:gap-16">
        {SITE.footerFacts.map((fact) => (
          <div key={fact.label}>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-2">
              {fact.label}
            </p>
            <p className="text-xs font-extrabold text-white">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="text-left sm:text-right font-sans">
        <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-1">
          Architecture &amp; Design
        </p>
        <p className="text-xs font-bold text-white/60">
          {SITE.fullName} © 2026. All Rights Reserved.
        </p>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-white/70 transition"
        >
          Press ⌘K to navigate
        </button>
      </div>
    </footer>
  );
}
