import { useEffect, useState } from "react";
import { Code, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useAccent } from "../theme/AccentContext";
import AccentPicker from "./AccentPicker";

const TAGLINES = [
  "complex system design and seamless execution.",
  "high-performance architecture and practical scalability.",
  "aesthetics and functionality."
];

export default function Hero() {
  const { tokens } = useAccent();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-screen"
      className="w-full h-[100dvh] flex flex-col justify-between pt-28 pb-6 relative overflow-hidden select-none z-10"
    >
      {/* Center Stage Bold Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center relative z-10 flex-1">

        {/* Status indicator badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full mb-6 backdrop-blur-md ${tokens.badgeBg} ${tokens.border}`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tokens.ping}`}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${tokens.bg}`} />
          </span>
          <span
            className={`text-[10px] font-mono font-semibold uppercase tracking-[0.15em] ${tokens.badgeText}`}
          >
            Available for Work &amp; Internships
          </span>
        </motion.div>

        {/* Giant Monolithic Name Header */}
        <h1 className="text-[13vw] sm:text-[11vw] md:text-[9.5rem] font-black leading-[0.8] tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 cursor-default select-none transition-all duration-1000 hover:tracking-[0.06em] sm:hover:tracking-[0.08em] active:scale-98">
          ANMOL
        </h1>

        {/* Dynamic Catchphrase */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-2xl font-light tracking-wide max-w-3xl text-white/80 leading-relaxed font-sans hover:translate-y-[-2px] hover:text-white transition-all duration-500 cursor-default"
        >
          I bridge the gap between
          <br />
          <span className="inline-block mt-2">
            <motion.span
              key={taglineIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`font-semibold inline-block ${tokens.text}`}
            >
              {TAGLINES[taglineIndex]}
            </motion.span>
          </span>
          <br />
          <span className="italic font-serif text-white/60 text-base md:text-lg mt-3 block">
            &ldquo;Structuring clean logical architecture in code, engineering pristine interfaces in design.&rdquo;
          </span>
        </motion.p>

        <AccentPicker />
      </section>

      {/* Bottom meta rows */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-end pb-2 px-6 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 z-10">
        <div className="flex items-center gap-2 relative">
          <MapPin className={`w-4 h-4 ${tokens.text}`} />
          <div className="flex flex-col text-left">
            <span className="text-white/40">BASED IN ROURKELA,</span>
            <span className="font-bold text-white mt-0.5">INDIA</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right">
          <Code className={`w-4 h-4 ${tokens.text}`} />
          <div className="flex flex-col text-right">
            <span className="text-white/40">FULL STACK DEV,</span>
            <span className="font-bold text-white mt-0.5">&amp; SYSTEM ENGINEER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
