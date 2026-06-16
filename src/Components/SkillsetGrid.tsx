import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

// Skill Definition
interface SkillItem {
  id: string;
  name: string;
  color: string; // Shadow & hover highlight hex code
  logo: React.ReactNode;
}

export const SkillsetGrid: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // High-fidelity SVG icons for all skills
  const skillsList: SkillItem[] = [
    // Row 1
    {
      id: "react",
      name: "ReactJS",
      color: "rgba(34, 211, 238, 0.4)", // Cyan
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#22d3ee" strokeWidth="3" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#22d3ee" strokeWidth="3" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#22d3ee" strokeWidth="3" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="6" fill="#22d3ee" />
        </svg>
      )
    },
    {
      id: "nextjs",
      name: "NextJS",
      color: "rgba(255, 255, 255, 0.4)", // White
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="4" />
          <path d="M72 73L39 31.5H33V68.5H39V40L67 75.5H72V73Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "typescript",
      name: "TypeScript",
      color: "rgba(59, 130, 246, 0.4)", // Blue
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 rounded-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="10" fill="#3178c6" />
          <path d="M32 45H15V37H44V45H32V75H23V45H32Z" fill="#ffffff" />
          <path d="M51 64C51 71.5 57 76 66 76C75 76 81 70.5 81 63C81 55 74 52.5 67 49C61 46 56 44 56 39.5C56 35.5 60 33 66 33C71.5 33 76 35 77.5 39.5L84.5 35.5C81.5 29.5 75 25.5 66 25.5C57.5 25.5 48.5 30.5 48.5 39C48.5 47 55.5 50.5 62.5 53.5C69 56.5 73.5 58 73.5 63C73.5 67.5 69 70 65 70C59 70 54.5 66.5 53 60.5L46 64C47.8 62 49.5 63 51 64Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      color: "rgba(56, 189, 248, 0.4)", // Sky Blue
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50C25 35 37.5 30 50 30C62.5 30 75 35 75 50C75 65 62.5 70 50 70C37.5 70 25 65 25 50Z" fill="#38bdf8" fillOpacity="0.2" />
          <path d="M50 35C40 35 25 42.5 25 55C25 67.5 35 75 45 75C55 75 60 70 65 65C70 60 75 62.5 80 65" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 65C60 65 75 57.5 75 45C75 32.5 65 25 55 25C45 25 40 30 35 35C30 40 25 37.5 20 35" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "motion",
      name: "Motion",
      color: "rgba(224, 219, 23, 0.4)", // Yellow
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 20H85L50 80L15 20Z" stroke="#e0db17" strokeWidth="5" strokeLinejoin="round" />
          <path d="M30 35H70L50 69L30 35Z" fill="#e0db17" />
        </svg>
      )
    },
    {
      id: "sanity",
      name: "Sanity",
      color: "rgba(244, 63, 94, 0.4)", // Rose
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="70" height="70" rx="12" stroke="#f43f5e" strokeWidth="4" />
          <path d="M30 45C30 35 38 32 50 32C62 32 70 35 70 45C70 55 30 52 30 65C30 72 38 75 50 75C62 75 70 72 70 65" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
        </svg>
      )
    },

    // Row 2
    {
      id: "contentful",
      name: "Contentful",
      color: "rgba(249, 115, 22, 0.4)", // Orange
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" stroke="#f97316" strokeWidth="5" />
          <circle cx="50" cy="30" r="10" fill="#f97316" />
          <circle cx="35" cy="55" r="7" fill="#ffffff" />
          <circle cx="65" cy="55" r="7" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "nodejs",
      name: "NodeJS",
      color: "rgba(34, 197, 94, 0.4)", // Green
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,12 85,32 85,72 50,92 15,72 15,32" stroke="#22c55e" strokeWidth="5" strokeLinejoin="round" />
          <path d="M50 12V92" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M30 40C30 33 40 33 50 33" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 71C60 71 70 71 70 62" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "expressjs",
      name: "ExpressJS",
      color: "rgba(156, 163, 175, 0.4)", // Silver
      logo: (
        <div className="text-[10px] font-black tracking-widest text-[#9ca3af] font-mono leading-none border border-[#9ca3af]/40 px-1 py-0.5 rounded-sm">
          EX
        </div>
      )
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      color: "rgba(51, 144, 255, 0.4)", // Royal Blue
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 30C75 22 65 18 55 20C45 15 30 18 25 28C20 38 22 55 35 65C30 75 35 83 45 83C55 83 62 76 68 70C75 65 82 50 82 40" stroke="#3390ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 40C33 38 30 38 28 40" stroke="#3390ff" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: "mongodb",
      name: "MongoDB",
      color: "rgba(16, 185, 129, 0.4)", // Emerald
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15C50 15 25 38 25 60C25 78 40 85 50 85C60 85 75 78 75 60C75 38 50 15 50 15Z" stroke="#10b981" strokeWidth="4" />
          <path d="M50 15V85" stroke="#10b981" strokeWidth="2.5" />
          <path d="M38 52C42 48 46 48 50 50" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "prisma",
      name: "Prisma",
      color: "rgba(255, 255, 255, 0.4)", // White
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,15 85,75 15,75" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" />
          <polygon points="50,35 73,70 27,70" fill="#ffffff" fillOpacity="0.2" />
        </svg>
      )
    },

    // Row 3
    {
      id: "zustand",
      name: "Zustand",
      color: "rgba(167, 139, 250, 0.4)", // Lavender Bear
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="14" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="3" />
          <circle cx="65" cy="35" r="14" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="3" />
          <circle cx="50" cy="55" r="28" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="4" />
          <circle cx="42" cy="48" r="3" fill="#ffffff" />
          <circle cx="58" cy="48" r="3" fill="#ffffff" />
          <path d="M47 58C47 60 53 60 53 58" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "zod",
      name: "Zod",
      color: "rgba(59, 130, 246, 0.4)", // Blue Diamond
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,15 85,42 50,85 15,42" stroke="#3b82f6" strokeWidth="4.5" strokeLinejoin="round" />
          <polyline points="20,40 50,55 80,40" stroke="#3b82f6" strokeWidth="3" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="#3b82f6" strokeWidth="2.5" />
        </svg>
      )
    },
    {
      id: "pnpm",
      name: "pnpm",
      color: "rgba(245, 158, 11, 0.4)", // Orange/Yellow Grid
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="30" height="30" rx="4" fill="#f59e0b" />
          <rect x="55" y="15" width="30" height="30" rx="4" fill="#f59e0b" />
          <rect x="15" y="55" width="30" height="30" rx="4" fill="#f59e0b" />
          <rect x="55" y="55" width="30" height="30" rx="4" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "bun",
      name: "Bun",
      color: "rgba(245, 230, 211, 0.4)", // Soft tan
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15C33 15 18 28 18 48C18 64 28 72 35 76C40 78 45 85 50 85C55 85 60 78 65 76C72 72 82 64 82 48C82 28 67 15 50 15Z" stroke="#f5e6d3" strokeWidth="4.5" fill="#f5e6d3" fillOpacity="0.1" />
          <ellipse cx="40" cy="45" rx="3" ry="5" fill="#f5e6d3" />
          <ellipse cx="60" cy="45" rx="3" ry="5" fill="#f5e6d3" />
          <path d="M45 55C45 58 55 58 55 55" stroke="#f5e6d3" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "git",
      name: "Git",
      color: "rgba(240, 80, 50, 0.4)", // Red-Orange
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="8" transform="rotate(45 50 50)" stroke="#f05032" strokeWidth="5" />
          <circle cx="50" cy="35" r="7" fill="#f05032" />
          <circle cx="50" cy="65" r="7" fill="#ffffff" />
          <circle cx="65" cy="50" r="7" fill="#f05032" />
          <path d="M50 42V58" stroke="#ffffff" strokeWidth="4" />
          <path d="M50 50C58 50 58 50 58 50" stroke="#f05032" strokeWidth="4" />
        </svg>
      )
    },
    {
      id: "github",
      name: "GitHub",
      color: "rgba(255, 255, 255, 0.4)", // White
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 12C29 12 12 29 12 50C12 67 23 81 38 86C40 86 41 85 41 84V79C30 81 28 74 28 74C26 70 23 69 23 69C20 67 23 67 23 67C26 67 28 70 28 70C31 75 36 73 38 72C38 70 39 68 40 67C31 66 22 62 22 47C22 43 24 40 26 37C26 36 24 32 27 27C27 27 30 26 37 31C40 30 43 30 46 30C49 30 52 30 55 31C62 26 65 27 65 27C68 32 66 36 66 37C68 40 70 43 70 47C70 62 61 66 52 67C54 69 55 72 55 76V84C55 85 56 86 58 86C73 81 84 67 84 50C84 29 67 12 50 12Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "vercel",
      name: "Vercel",
      color: "rgba(255, 255, 255, 0.4)", // White Triangle
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,18 88,82 12,82" fill="#ffffff" />
        </svg>
      )
    },

    // Row 4
    {
      id: "aws",
      name: "AWS",
      color: "rgba(255, 153, 0, 0.4)", // Orange
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70C35 78 65 78 80 70" stroke="#ff9900" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M74 65L81 72L81 61" stroke="#ff9900" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="50" fill="#ffffff" fontSize="23" fontWeight="black" textAnchor="middle" fontFamily="monospace">aws</text>
        </svg>
      )
    },
    {
      id: "docker",
      name: "Docker",
      color: "rgba(14, 165, 233, 0.4)", // Sky Blue Container Whale
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="25" width="10" height="10" rx="1" fill="#0ea5e9" />
          <rect x="38" y="25" width="10" height="10" rx="1" fill="#0ea5e9" />
          <rect x="51" y="25" width="10" height="10" rx="1" fill="#0ea5e9" />
          <rect x="38" y="38" width="10" height="10" rx="1" fill="#0ea5e9" />
          <rect x="51" y="38" width="10" height="10" rx="1" fill="#0ea5e9" />
          <rect x="64" y="38" width="10" height="10" rx="1" fill="#0ea5e9" />
          <path d="M15 55C15 55 25 55 35 60C50 63 65 63 75 52C82 46 85 52 85 56C85 68 70 73 50 73C25 73 15 55 15 55Z" stroke="#0ea5e9" strokeWidth="3" fill="#0ea5e9" fillOpacity="0.2" />
        </svg>
      )
    },
    {
      id: "expo",
      name: "Expo",
      color: "rgba(255, 255, 255, 0.4)", // Caret Up
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 78L50 22L82 78L71 78L50 41L29 78L18 78Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "clerk",
      name: "Clerk",
      color: "rgba(99, 102, 241, 0.4)", // Indigo lock/avatar
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="42" width="50" height="40" rx="8" stroke="#6366f1" strokeWidth="5.5" />
          <path d="M38 42V32C38 23 43 18 50 18C57 18 62 23 62 32V42" stroke="#6366f1" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="50" cy="58" r="4" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: "linux",
      name: "Linux",
      color: "rgba(244, 180, 0, 0.4)", // Golden Tux colors
      logo: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="22" ry="26" stroke="#f4b400" strokeWidth="4.5" fill="#f4b400" fillOpacity="0.1" />
          <ellipse cx="42" cy="42" rx="3" ry="5" fill="#ffffff" />
          <ellipse cx="58" cy="42" rx="3" ry="5" fill="#ffffff" />
          <circle cx="42" cy="43" r="1.5" fill="#000000" />
          <circle cx="58" cy="43" r="1.5" fill="#000000" />
          <polygon points="45,55 55,55 50,62" fill="#f4b400" stroke="#f4b400" strokeWidth="2" />
        </svg>
      )
    }
  ];

  // Helper arrays for dividing the elements exactly like the original rows
  const row1 = skillsList.slice(0, 6);
  const row2 = skillsList.slice(6, 12);
  const row3 = skillsList.slice(12, 19);
  const row4 = skillsList.slice(19);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-2 relative select-none">
      
      {/* Immersive display headers exact translation of customer design spec */}
      <div className="text-center mb-14 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#8e9bb0] font-mono block mb-3 font-semibold">
          MY SKILLSET
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase select-none leading-none relative">
          The Magic{" "}
          <span className="relative inline-block">
            {/* Real-time high-fidelity glow element behind */}
            <span className="absolute inset-0 font-serif italic text-transparent bg-clip-text animate-magic-gradient select-none pointer-events-none blur-[12px] opacity-75">
              Behind
            </span>
            <span className="relative font-serif italic text-transparent bg-clip-text animate-magic-gradient font-medium capitalize">
              Behind
            </span>
          </span>
        </h2>
        {/* Subtle drop shadow / glow behind "Behind" text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-indigo-500/10 blur-[80px] pointer-events-none rounded-full" />
      </div>

      {/* Structured Pill Board Grid rows */}
      <div className="w-full max-w-5xl flex flex-col items-center gap-4 relative z-20">
        
        {/* Row 1 */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {row1.map((skill) => (
            <SkillBadge 
              key={skill.id} 
              skill={skill} 
              isHovered={hoveredIndex === skill.id}
              onMouseEnter={() => setHoveredIndex(skill.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {row2.map((skill) => (
            <SkillBadge 
              key={skill.id} 
              skill={skill} 
              isHovered={hoveredIndex === skill.id}
              onMouseEnter={() => setHoveredIndex(skill.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {row3.map((skill) => (
            <SkillBadge 
              key={skill.id} 
              skill={skill} 
              isHovered={hoveredIndex === skill.id}
              onMouseEnter={() => setHoveredIndex(skill.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Row 4 */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {row4.map((skill) => (
            <SkillBadge 
              key={skill.id} 
              skill={skill} 
              isHovered={hoveredIndex === skill.id}
              onMouseEnter={() => setHoveredIndex(skill.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

      </div>

      {/* Ambient background accent guide instructions */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 font-bold uppercase tracking-[0.2em] mt-12">
        <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
        <span>Hover technology capsules for magic high-fidelity glowing feedback</span>
      </div>

    </div>
  );
};

// Custom interactive capsule badge
interface SkillBadgeProps {
  skill: SkillItem;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        boxShadow: isHovered 
          ? `0 12px 30px -4px ${skill.color}, 0 0 15px 0px ${skill.color}`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderColor: isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
        background: isHovered ? "rgba(10, 12, 22, 0.95)" : "rgba(8, 8, 8, 0.65)"
      }}
      className="flex items-center gap-3 px-5 py-2.5 rounded-xl border backdrop-blur-md cursor-pointer transition-colors duration-300 relative overflow-hidden group select-none shrink-0"
    >
      {/* Tech brand dynamic logo overlay flare */}
      <div 
        className="absolute -inset-x-6 -inset-y-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`
        }}
      />
      
      {/* Brand logo container */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {skill.logo}
      </div>

      {/* Brand name label */}
      <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors duration-200 relative z-10 select-none">
        {skill.name}
      </span>
    </motion.div>
  );
};
