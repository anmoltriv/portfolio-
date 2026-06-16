import { motion } from "motion/react";

// Unified skills array with custom brand-color configurations and inline SVG logos
const updatedSkillsData = [
  {
    name: "ReactJS",
    hex: "#61DAFB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2" className="w-4 h-4 shrink-0">
        <ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(0 12 12)" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    )
  },
  {
    name: "NextJS",
    hex: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 bg-white/10 rounded-full p-0.5">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.318 15.655l-4.14-5.341v5.127H11.02V8.373h1.151l4.08 5.275V8.373h1.168v9.282h-1.101z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: "TypeScript",
    hex: "#3178C6",
    icon: (
      <div className="w-4 h-4 bg-[#3178C6] text-white font-sans font-bold text-[9px] flex items-center justify-center rounded-sm shrink-0 select-none">TS</div>
    )
  },
  {
    name: "Tailwind CSS",
    hex: "#38BDF8",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#38BDF8]">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.567.89 2.29 1.628C13.674 10.64 15.111 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.567-.89-2.29-1.628C16.328 6.16 14.891 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.567.89 2.29 1.628C8.675 17.84 10.111 19 13.002 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.567-.89-2.29-1.628C11.328 13.36 9.891 12 7.001 12z" />
      </svg>
    )
  },
  {
    name: "Framer Motion",
    hex: "#F107A3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#F107A3]">
        <path d="M0 0h12l12 12H12v12L0 12h12V0z" />
      </svg>
    )
  },
  {
    name: "NodeJS",
    hex: "#339933",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#339933]">
        <path d="M12.441 1.343a1.11 1.11 0 00-1.114.004L2.946 6.111a1.11 1.11 0 00-.555.961v9.544a1.11 1.11 0 00.555.96l8.382 4.765a1.11 1.11 0 001.113 0l8.383-4.765a1.11 1.11 0 00.554-.96V7.072a1.11 1.11 0 00-.554-.961l-8.382-4.768h-.006zm-.441 2.213l6.98 3.97v7.653l-6.98 3.97-6.98-3.97V7.526l6.98-3.97z"/>
      </svg>
    )
  },
  {
    name: "ExpressJS",
    hex: "#828282",
    icon: (
      <div className="w-4 h-4 bg-white/10 text-white font-mono font-bold text-[8px] flex items-center justify-center rounded-sm shrink-0 border border-white/5 select-none">EX</div>
    )
  },
  {
    name: "PostgreSQL",
    hex: "#4169E1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4169E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3z" />
        <path d="M21 6.5v5c0 1.93-4.03 3.5-9 3.5s-9-1.57-9-3.5v-5" />
        <path d="M21 11.5v5c0 1.93-4.03 3.5-9 3.5s-9-1.57-9-3.5v-5" />
      </svg>
    )
  },
  {
    name: "MongoDB",
    hex: "#47A248",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#47A248]">
        <path d="M12 1.5c-.3 0-.6.1-.9.2C8.7 2.9 5 7.6 5 12.8c0 4.1 2.3 7.8 5.7 9.5.3.1.6.2.9.2s.6-.1.9-.2C16.8 20.6 19 16.9 19 12.8c0-5.2-3.7-9.9-6.1-11.1-.3-.1-.6-.2-.9-.2z" />
      </svg>
    )
  },
  {
    name: "Prisma",
    hex: "#5A67D8",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#5A67D8]">
        <path d="M12 2L2 20h20L12 2zm1 4.25v7.5l4-2.25-4-5.25zM11 7L7 12.25l4 2.25V7z" />
      </svg>
    )
  },
  {
    name: "Zustand",
    hex: "#8B5A2B",
    icon: (
      <span className="text-xs shrink-0 select-none">🐻</span>
    )
  },
  {
    name: "Zod",
    hex: "#3E67B1",
    icon: (
      <div className="w-4 h-4 bg-[#3E67B1] text-white font-sans font-black text-[9px] flex items-center justify-center rounded-sm shrink-0 italic select-none">Z</div>
    )
  },
  {
    name: "pnpm",
    hex: "#F69220",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#F69220]">
        <rect x="1" y="1" width="6" height="6" />
        <rect x="9" y="1" width="6" height="6" />
        <rect x="17" y="1" width="6" height="6" />
        <rect x="1" y="9" width="6" height="6" />
        <rect x="9" y="9" width="6" height="6" />
        <rect x="17" y="9" width="6" height="6" />
        <rect x="1" y="17" width="6" height="6" />
        <rect x="9" y="17" width="6" height="6" />
        <rect x="17" y="17" width="6" height="6" />
      </svg>
    )
  },
  {
    name: "Bun",
    hex: "#F5CBA7",
    icon: (
      <span className="text-xs shrink-0 select-none">🥟</span>
    )
  },
  {
    name: "Git",
    hex: "#F05032",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#F05032]">
        <path d="M23.55 11.89L12.11.45a1.6 1.6 0 0 0-2.22 0l-1.8 1.8 3.03 3.03a3.52 3.52 0 1 1-1 4.95L7.09 7.21v5.6a3.55 3.55 0 0 1-1.63 3.01 3.54 3.54 0 1 1-1.12-4.9l2.76-2.76V5.2L4.54 7.84a1.6 1.6 0 0 0 0 2.22l11.44 11.44a1.6 1.6 0 0 0 2.22 0l5.35-5.35a1.6 1.6 0 0 0 0-2.26z" />
      </svg>
    )
  },
  {
    name: "GitHub",
    hex: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-white">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    name: "Vercel",
    hex: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-white">
        <path d="M24 22.525H0L12 1.736l12 20.789Z" />
      </svg>
    )
  },
  {
    name: "AWS",
    hex: "#FF9900",
    icon: (
      <div className="text-[10px] font-sans font-black tracking-tighter text-[#FF9900] shrink-0 select-none">AWS</div>
    )
  },
  {
    name: "Docker",
    hex: "#2496ED",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#2496ED]">
        <path d="M13.983 8.871h-1.993a.134.134 0 0 0-.134.134v1.845c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V9.005a.134.134 0 0 0-.134-.134zm-2.33 0H9.661a.134.134 0 0 0-.134.134v1.845c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V9.005a.134.134 0 0 0-.134-.134zm0-2.29h-1.993a.134.134 0 0 0-.134.134V8.56c0 .075.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V6.715a.134.134 0 0 0-.134-.134zm-2.33 2.29H7.329a.134.134 0 0 0-.134.134v1.845c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V9.005a.134.134 0 0 0-.134-.134zm0-2.29H7.329a.134.134 0 0 0-.134.134V8.56c0 .075.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V6.715a.134.134 0 0 0-.134-.134zm-2.33 2.29H4.999a.134.134 0 0 0-.134.134v1.845c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V9.005a.134.134 0 0 0-.134-.134zm-2.33 0H2.668a.134.134 0 0 0-.134.134v1.845c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V9.005a.134.134 0 0 0-.134-.134zm6.99-4.582h-1.99a.134.134 0 0 0-.135.135V4.28c0 .074.06.134.134.134h1.993a.134.134 0 0 0 .134-.134V2.428a.134.134 0 0 0-.134-.134zm4.14 11.233c.126.012.25-.09.243-.223-.018-1.224-.483-2.227-1.385-2.98-.077-.064-.191-.019-.21.077-.282 1.4-1.006 2.227-2.213 2.784-.067.03-.086.116-.04.17.653.774 1.8 1.134 3.605.172zm8.877-3.085c-.094-.035-.198-.016-.273.05a8.77 8.77 0 0 1-5.836 2.233c-3.13 0-5.87-1.636-7.44-4.108-.06-.094-.188-.112-.271-.04-.504.437-.923 1.258-.85 2.158.156 1.83 1.34 2.893 2.138 3.4 2.8 1.777 6.402 1.26 8.711-.784a10.024 10.024 0 0 0 3.916-2.617c.068-.073.037-.197-.095-.232z" />
      </svg>
    )
  },
  {
    name: "Clerk Auth",
    hex: "#6C47FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#6C47FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    name: "Cloudinary",
    hex: "#3448C5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#3448C5]">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    )
  },
  {
    name: "C++",
    hex: "#00599C",
    icon: (
      <div className="text-[10px] font-sans font-black text-[#00599C] tracking-tighter shrink-0 select-none">C++</div>
    )
  },
  {
    name: "Python",
    hex: "#3776AB",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#3776AB]">
        <path d="M11.91 2c-3.26 0-3.07 1.39-3.07 1.39v1.44H12c1.78 0 3.2 1.28 3.2 3.01v1.1c0 .24-.1.45-.26.6a1.1 1.1 0 0 1-.58.26h-4.32a2.02 2.02 0 0 0-2.01 2.01v4.86a2.02 2.02 0 0 0 2.01 2.01h1.4v-1.95c0-1.63 1.32-2.95 2.95-2.95h2.17c.21 0 .41-.1.55-.24a.8.8 0 0 0 .23-.51V9.92A7.92 7.92 0 0 0 12.01 2h-.1zm-4.43 14H3.88a2.02 2.02 0 0 0-2.01 2.01v1.43c0 3.26 1.39 3.07 1.39 3.07h1.44v-3.17c0-1.78 1.28-3.2 3.01-3.2h1.1c.24 0 .45.1.6.26.15.15.26.34.26.58v4.32a2.02 2.02 0 0 1-2.01 2.01H2.82c.26.15.47.26.63.26s.42-.08.56-.22l2.37-2.37a.8.8 0 0 1 .52-.23h2.12v-1.4a7.92 7.92 0 0 0-3.17-6.31h.01V16z" />
      </svg>
    )
  },
  {
    name: "C Language",
    hex: "#A8B9CC",
    icon: (
      <div className="text-[11px] font-sans font-black text-[#A8B9CC] tracking-tighter shrink-0 select-none">C</div>
    )
  },
  {
    name: "JavaScript / ES6+",
    hex: "#F7DF1E",
    icon: (
      <div className="w-4 h-4 bg-[#F7DF1E] text-black font-sans font-extrabold text-[9px] flex items-center justify-center rounded-[3px] shrink-0 outline outline-1 outline-black/10 select-none">JS</div>
    )
  }
];

interface SkillsSectionProps {
  glowConfig: any;
  accentGlow: "blue" | "emerald" | "amber";
}

export default function SkillsSection({ glowConfig, accentGlow }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10 scroll-mt-24 border-t border-white/5"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase select-none">
          The Magic <span className={`italic font-serif normal-case tracking-normal ${glowConfig[accentGlow].text} drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-colors duration-300`}>Behind</span>
        </h2>
      </div>

      {/* Modern Bubble/Capsule Flow Cloud with default glow and interactive animations */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-[90vw] md:max-w-5xl mx-auto">
        {updatedSkillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.015 }}
            whileHover={{
              y: -4,
              scale: 1.04,
              borderColor: `${skill.hex}50`,
              boxShadow: `0 8px 25px ${skill.hex}25, inset 0 0 10px ${skill.hex}15`,
              backgroundColor: "rgba(0, 0, 0, 0.85)"
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0b0b0b]/65 backdrop-blur-md border rounded-full text-white/80 cursor-default select-none transition-colors duration-300 ease-out hover:text-white"
            style={{
              borderColor: `${skill.hex}18`,
              boxShadow: `0 3px 12px ${skill.hex}0c, inset 0 0 6px ${skill.hex}08`
            }}
          >
            {skill.icon}
            <span className="tracking-wide font-mono text-[11px] font-medium leading-none uppercase filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
