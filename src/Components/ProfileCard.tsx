import { useRef, useState } from "react";
import { Code, Github, Linkedin, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties, MouseEvent } from "react";
import { useAccent } from "../theme/AccentContext";
import { PROFILE_PHOTO, PROFILE_PHOTO_FALLBACK } from "../profilePhoto";
import { SITE } from "../site";
import LiveClock from "./LiveClock";
import TiltCard from "./TiltCard";

const MAX_TILT_DEGREES = 12;

const SOCIAL_ICONS = {
  github: <Github className="w-3.5 h-3.5" />,
  linkedin: <Linkedin className="w-3.5 h-3.5 text-blue-400" />,
  codolio: <Code className="w-3.5 h-3.5 text-yellow-500" />
};

export default function ProfileCard() {
  const { tokens } = useAccent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - (event.clientY - rect.top)) / centerY) * MAX_TILT_DEGREES;
    const rotateY = ((event.clientX - rect.left - centerX) / centerX) * MAX_TILT_DEGREES;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.08s ease-out"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out"
    });
  };

  return (
    <TiltCard className={`md:col-span-1 bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden ${tokens.cardHover}`}>
      <div className="absolute inset-0 bg-radial from-white/[0.02] to-transparent pointer-events-none" />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative mb-6 rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-zinc-950 border border-white/15 select-none cursor-crosshair group/pfp"
      >
        <div className={`absolute -inset-1 blur-md rounded-xl transition-all duration-700 opacity-25 group-hover:opacity-75 pointer-events-none animate-pulse-slow ${tokens.photoGlow}`} />
        <div className={`absolute inset-0 opacity-40 bg-radial to-transparent z-10 pointer-events-none ${tokens.radialFrom}`} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "brightness(0.3) saturate(0.5) contrast(1.5)" }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.9, 0.6, 1],
            scale: [0.94, 1.03, 0.98, 1],
            filter: "brightness(1) saturate(1) contrast(1)"
          }}
          transition={{ duration: 1.3, ease: "easeInOut", times: [0, 0.15, 0.3, 0.5, 0.7, 1] }}
          className="w-full h-full relative z-0"
        >
          <img
            src={PROFILE_PHOTO}
            alt="Anmol Trivedi close-up portrait wearing a green polo shirt with evening river sunset backdrop"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.src = PROFILE_PHOTO_FALLBACK;
            }}
          />
        </motion.div>

        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white/70 z-20">
          AT-V.3.5
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold leading-tight flex items-center gap-1.5">
          {SITE.firstName} <span className="italic font-serif font-normal text-white/80">{SITE.lastName}</span>
        </h3>
        <p className="text-xs text-white/50 mt-1 font-mono">{SITE.shortRole}</p>

        <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/40 uppercase tracking-widest leading-none">
          <MapPin className={`w-3.5 h-3.5 ${tokens.text}`} />
          <LiveClock />
        </div>

        <div className="flex flex-wrap gap-2.5 mt-4">
          {SITE.socials.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              title={link.label}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition duration-200"
            >
              {SOCIAL_ICONS[link.kind]}
              <span className="font-mono text-[10px]">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
