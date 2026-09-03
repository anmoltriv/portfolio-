import { Layers } from "lucide-react";
import { useAccent } from "../theme/AccentContext";

const STATS = [
  { label: "B.Tech CGPA", value: "8.75 / 10" },
  { label: "Leetcode", value: "Solved 500+" },
  { label: "Extracurricular", value: "Kalaam's Technical Head" }
];

export default function PhilosophyCard() {
  const { tokens } = useAccent();

  return (
    <div
      className={`md:col-span-2 bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${tokens.cardHover}`}
    >
      {/* Pulsing light ring based on active accent selection */}
      <div
        className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[80px] opacity-15 transition-all duration-500 ${tokens.ringGlow}`}
      />

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Layers className={`w-4 h-4 ${tokens.text}`} />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-mono">
            My Philosophy
          </span>
        </div>

        <h2
          className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white transition-all duration-300 ${tokens.groupHoverText}`}
        >
          Fullstack Logic.<br />
          <span className="font-serif italic font-normal text-white/80">Systems that Scale</span>
        </h2>

        <p className="text-sm md:text-base text-white/60 mt-6 leading-relaxed">
          I do not simply construct isolated backend containers or write basic scripts. I sweat the
          system throughput, the database normalization, the relational schema index metrics, the
          edge-case algorithmic logic, and the end-to-end reliability. Code should be as optimized
          as it is architecturally sound.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
