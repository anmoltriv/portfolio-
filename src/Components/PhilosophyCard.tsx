import { Layers } from "lucide-react";
import { useAccent } from "../theme/AccentContext";
import { SITE } from "../site";
import TiltCard from "./TiltCard";

const STATS = [
  { label: "B.Tech CGPA", value: SITE.cgpa },
  { label: "Leetcode", value: SITE.leetcode },
  { label: "Extracurricular", value: SITE.extracurricular }
];

export default function PhilosophyCard() {
  const { tokens } = useAccent();

  return (
    <TiltCard className={`md:col-span-2 bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 flex flex-col justify-between overflow-hidden ${tokens.cardHover}`}>
      <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[80px] opacity-15 ${tokens.ringGlow}`} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Layers className={`w-4 h-4 ${tokens.text}`} />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-mono">
            My Philosophy
          </span>
        </div>

        <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white transition-colors duration-300 ${tokens.groupHoverText}`}>
          {SITE.philosophyTitle}
          <br />
          <span className="font-serif italic font-normal text-white/80">{SITE.philosophyAccent}</span>
        </h2>

        <p className="text-sm md:text-base text-white/60 mt-6 leading-relaxed">
          {SITE.philosophyBody}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-4 relative z-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </TiltCard>
  );
}
