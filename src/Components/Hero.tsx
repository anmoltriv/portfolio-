import { useEffect, useState } from "react";
import { Code, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { SITE } from "../site";
import { springGentle, springSoft } from "../lib/motion";
import { useAccent } from "../theme/AccentContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import AccentPicker from "./AccentPicker";

const LETTERS = SITE.firstName.toUpperCase().split("");

export default function Hero() {
  const { tokens } = useAccent();
  const reduced = usePrefersReducedMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % SITE.taglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-screen"
      className="w-full h-[100dvh] flex flex-col justify-between pt-28 pb-6 relative overflow-hidden select-none z-10"
    >
      <section className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center relative z-10 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springSoft}
          className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full mb-8 backdrop-blur-md ${tokens.badgeBg} ${tokens.border}`}
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tokens.ping}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${tokens.bg}`} />
          </span>
          <span className={`text-[10px] font-mono font-semibold uppercase tracking-[0.15em] ${tokens.badgeText}`}>
            {SITE.availability}
          </span>
        </motion.div>

        <h1 className="flex justify-center text-[18vw] sm:text-[14vw] md:text-[9.5rem] font-black leading-[0.78] tracking-tighter uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 cursor-default">
          {LETTERS.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={reduced ? false : { y: 90, opacity: 0, rotateX: 50 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ ...springGentle, delay: 0.06 * index }}
              className="inline-block origin-bottom hover:tracking-[0.08em] transition-[letter-spacing] duration-700"
              style={{ transformPerspective: 600 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-lg md:text-2xl font-light tracking-wide max-w-3xl text-white/80 leading-relaxed"
        >
          <span className="block text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-white/40 mb-3">
            {SITE.headline}
          </span>
          <span className="inline-block min-h-[1.4em]">
            <motion.span
              key={taglineIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45 }}
              className="italic font-serif text-2xl md:text-4xl font-normal tracking-normal bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, #fff 10%, var(--accent) 55%, #fb7185)`
              }}
            >
              {SITE.taglines[taglineIndex]}
            </motion.span>
          </span>
          <span className="italic font-serif text-white/50 text-base md:text-lg mt-5 block">
            “{SITE.quote}”
          </span>
        </motion.p>

        <AccentPicker />
      </section>

      <div className="w-full max-w-7xl mx-auto flex justify-between items-end pb-2 px-6 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 z-10">
        <div className="flex items-center gap-2">
          <MapPin className={`w-4 h-4 ${tokens.text}`} />
          <div className="flex flex-col text-left">
            <span className="text-white/40">Based in Rourkela,</span>
            <span className="font-bold text-white mt-0.5">India</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <Code className={`w-4 h-4 ${tokens.text}`} />
          <div className="flex flex-col text-right">
            <span className="text-white/40">Full Stack Dev,</span>
            <span className="font-bold text-white mt-0.5">&amp; System Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
