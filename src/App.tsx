import { useState, useRef, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  Code,
  Cpu,
  Paintbrush,
  Award,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Layers,
  Zap,
  X,
  FileText
} from "lucide-react";
import { projectsData, experiencesData, skillsData } from "./data";
import { Project, Experience, Skill, ChatMessage } from "./types";
import Markdown from "react-markdown";
import { motion } from "motion/react";
// @ts-ignore
import anmolPhoto from "./assets/images/anmol_photo.jpeg";
import SkillsSection from "./Components/SkillSection.tsx";

// Sleek responsive technology badge component with built-in official grayscale-to-brand color on hover
interface TechBadgeProps {
  tag: string;
  glowAccent: "blue" | "emerald" | "amber";
}

function TechBadge({ tag, glowAccent }: TechBadgeProps) {
  const formatted = tag.toLowerCase().replace(/[^a-z0-9]/g, "");

  let brandColor = "#94a3b8"; // fallback gray
  let icon = null;

  if (formatted.includes("react")) {
    brandColor = "#15ccef"; // glowing cyan
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(30, 50, 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(90, 50, 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(150, 50, 50)" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </svg>
    );
  } else if (formatted.includes("node")) {
    brandColor = "#39b54a"; // node green
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 22V12" />
        <path d="M12 12l9-5" />
        <path d="M12 12L3 7" />
      </svg>
    );
  } else if (formatted.includes("express")) {
    brandColor = "#F5A623"; // beautiful orange/gold
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 2-2 10h9L11 22l2-10H4L13 2z" />
      </svg>
    );
  } else if (formatted.includes("postgres") || formatted.includes("neon") || formatted.includes("sql")) {
    brandColor = "#00E599"; // Neon DB vivid green
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  } else if (formatted.includes("clerk")) {
    brandColor = "#6C47FF";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  } else if (formatted.includes("cloudinary")) {
    brandColor = "#2A7BE6";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21a6 6 0 0 1-5.007-2.693 5 5 0 0 1-.393-8.8A7 7 0 1 1 19 11.5a5.1 5.1 0 0 1-7 9.5z" />
      </svg>
    );
  } else if (formatted.includes("gemini") || formatted.includes("ai")) {
    brandColor = "#A259FF"; // AI cosmic violet
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    );
  } else if (formatted.includes("tailwind")) {
    brandColor = "#38BDF8";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  } else if (formatted.includes("mongo")) {
    brandColor = "#13AA52";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-.5 0-9 4.5-9 10a9 9 0 0 0 9 9c.5 0 9-4.5 9-10A9 9 0 0 0 12 2z" />
        <path d="M12 2v20" />
      </svg>
    );
  } else if (formatted.includes("redux")) {
    brandColor = "#764ABC";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0" />
      </svg>
    );
  } else {
    brandColor = "#94A3B8";
    icon = (
      <svg className="w-3.5 h-3.5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-[10.5px] font-mono tracking-wide text-white/50 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-default"
      style={{ "--brand-accent": brandColor } as React.CSSProperties}
    >
      <span
        className="transition-all duration-500 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
        style={{ color: brandColor }}
      >
        {icon}
      </span>
      <span className="group-hover:text-white transition-colors duration-300">{tag}</span>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // If the URL carries a hash (e.g. left over from clicking a nav link like
    // #twin-assistant before reloading), strip it so the browser doesn't
    // natively auto-scroll to that section's anchor on load.
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);

    // Images/fonts loading after the initial paint can shift layout and cause
    // some browsers to re-apply anchor scrolling. Re-assert the top position
    // once more after that settles.
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "experience">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mouse 3D Parallax Tilt State for Profile Photo
  const [imgTiltStyle, setImgTiltStyle] = useState<React.CSSProperties>({});
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Controlled parallax tilt angles
    const rotateX = ((centerY - y) / centerY) * 12; // tilt max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12; // tilt max 12 deg

    setImgTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.08s ease-out"
    });
  };

  const handleImgMouseLeave = () => {
    setImgTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s ease-out"
    });
  };

  // AI Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey there! I'm Anmol's AI twin. Ask me anything about my full-stack projects, design philosophy, my work at NIT Rourkela, or potential internship opportunities!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Tracks whether the chat auto-scroll effect has run before, so we don't
  // hijack the page's scroll position to the chatbot section on initial load
  const hasMountedChatScroll = useRef(false);

  // Custom theme controls (for subtle high-end interactive detail)
  const [accentGlow, setAccentGlow] = useState<"blue" | "emerald" | "amber">("emerald");

  const glowConfig = {
    emerald: {
      text: "text-emerald-400",
      hoverText: "hover:text-emerald-300",
      bg: "bg-emerald-500",
      ping: "bg-emerald-400",
      border: "border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      hoverBadgeBg: "hover:bg-emerald-950/10",
      badgeBg: "bg-emerald-950/40",
      badgeText: "text-emerald-300",
      glowBg: "bg-emerald-950/10",
      terminalColor: "text-emerald-400",
      pulse: "bg-emerald-400",
      activeText: "text-emerald-400",
      radial: "from-emerald-500/10",
      glowRing: "bg-emerald-500",
      shadow: "shadow-emerald-500/10",
      btnActive: "ring-emerald-500/40"
    },
    blue: {
      text: "text-blue-400",
      hoverText: "hover:text-blue-300",
      bg: "bg-blue-500",
      ping: "bg-blue-400",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      hoverBadgeBg: "hover:bg-blue-950/10",
      badgeBg: "bg-blue-950/40",
      badgeText: "text-blue-300",
      glowBg: "bg-blue-950/10",
      terminalColor: "text-blue-400",
      pulse: "bg-blue-400",
      activeText: "text-blue-400",
      radial: "from-blue-500/10",
      glowRing: "bg-blue-500",
      shadow: "shadow-blue-500/10",
      btnActive: "ring-blue-500/40"
    },
    amber: {
      text: "text-yellow-400",
      hoverText: "hover:text-yellow-300",
      bg: "bg-yellow-500",
      ping: "bg-yellow-400",
      border: "border-yellow-500/20",
      hoverBorder: "hover:border-yellow-500/40",
      hoverBadgeBg: "hover:bg-yellow-950/10",
      badgeBg: "bg-yellow-950/40",
      badgeText: "text-yellow-300",
      glowBg: "bg-yellow-950/10",
      terminalColor: "text-yellow-400",
      pulse: "bg-yellow-400",
      activeText: "text-yellow-400",
      radial: "from-yellow-500/10",
      glowRing: "bg-yellow-500",
      shadow: "shadow-yellow-500/10",
      btnActive: "ring-yellow-500/40"
    }
  };

  // Scroll active window tracker
  useEffect(() => {
    // Skip the very first run (triggered by the initial welcome message on
    // mount) so the page doesn't jump down to the chatbot on load/refresh.
    if (!hasMountedChatScroll.current) {
      hasMountedChatScroll.current = true;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("anmolop.works@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage;
    if (!messageToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customMessage) setInputMessage("");
    setIsChatLoading(true);

    try {
      const chatPayload = [...chatMessages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const envBase = (import.meta as any).env?.VITE_API_URL;

      const apiBase = envBase || "http://localhost:3001";

      const endpoint = `${apiBase}/api/chat`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatPayload })
      });

      if (!res.ok) {
        throw new Error("Failure contacting Anmol's brain");
      }
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.message || "I had trouble loading that response, but feel free to reach out directly to me!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const offlineFallback: ChatMessage = {
        id: "offline-fallback",
        role: "assistant",
        content: "Drafting connection... Looks like my primary server node is offline. Offline context: Anmol is an Industrial Design student with a Computer Science Minor at NIT Rourkela with an 8.75 CGPA, available for full-stack software development roles, contract work, and internships. You can contact him at anmolop.works@gmail.com or (+91) 6387297103!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, offlineFallback]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const starterQuestions = [
    "What is your tech stack?",
    "Tell me about NIT Rourkela",
    "Are you available for work and internships?",
    "Tell me about ShopSphere"
  ];

  const taglines = [
    "complex system design and seamless execution.",
    "high-performance architecture and practical scalability.",
    "aesthetics and functionality."
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="immersive-portfolio-root" className="min-h-screen  bg-[#050505] text-white font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-400">

      {/* Dynamic Glow Orbs in Outer Bounds */}
      <div className={`absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${accentGlow === "emerald" ? "bg-emerald-950/25" : accentGlow === "blue" ? "bg-blue-950/25" : "bg-amber-950/25"}`}></div>
      <div className={`absolute top-[35%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ${accentGlow === "emerald" ? "bg-teal-950/20" : accentGlow === "blue" ? "bg-indigo-950/20" : "bg-yellow-950/15"}`}></div>
      <div className={`absolute bottom-[5%] left-[10%] w-[45%] h-[45%] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ${accentGlow === "emerald" ? "bg-[#0b1210]/20" : accentGlow === "blue" ? "bg-[#091122]/20" : "bg-[#1c1208]/20"}`}></div>

      <header className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md bg-[#050505]/60 border-b border-white/5 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <span className={`text-2xl font-black tracking-tighter uppercase text-white hover:${glowConfig[accentGlow].text} transition cursor-default`}>
              AT
            </span>
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] ${glowConfig[accentGlow].bg} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></span>
          </div>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] font-mono text-white/30 uppercase mt-1">
            • CORE UNIT
          </span>
        </div>

        {/* Desktop Minimal Pill Navigation */}
        <nav className="hidden md:flex bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-xl gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/40">
          <a href="#hero-screen" className="text-white hover:text-white transition duration-200">
            Home
          </a>
          <a href="#bento" className="hover:text-white transition duration-200">
            Identity
          </a>
          <a href="#projects" className="hover:text-white transition duration-200">
            Showcase
          </a>
          <a href="#twin-assistant" className={`hover:text-white transition duration-200 flex items-center gap-1.5 ${glowConfig[accentGlow].text} hover:opacity-80`}>
            <span className={`w-1.5 h-1.5 rounded-full ${glowConfig[accentGlow].ping} animate-pulse`}></span>
            Clone Chat
          </a>
        </nav>

        {/* Desktop Direct Connect Action */}
        <div className="hidden md:block">
          <a
            href="#twin-assistant"
            className={`bg-white text-black active:scale-95 transition-all text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:text-black duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:${glowConfig[accentGlow].bg}`}
          >
            Enquire
          </a>
        </div>

        {/* Mobile Menu Button Container */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none p-2 z-50 relative"
            aria-label="Toggle Menu"
          >
            {/* Animated Hamburger / Close Icon */}
            <div className="w-6 h-5 flex flex-col justify-between relative overflow-hidden">
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-[4px] -translate-y-[1px]" : ""}`}></span>
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "-translate-x-full opacity-0" : ""}`}></span>
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-[4px] translate-y-[1px]" : ""}`}></span>
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 h-screen w-screen bg-[#050505]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-sm uppercase tracking-[0.2em] font-semibold text-white/50">
          <a 
            href="#hero-screen" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-white hover:text-white transition duration-200"
          >
            Home
          </a>
          <a 
            href="#bento" 
            onClick={() => setIsMenuOpen(false)} 
            className="hover:text-white transition duration-200"
          >
            Identity
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsMenuOpen(false)} 
            className="hover:text-white transition duration-200"
          >
            Showcase
          </a>
          <a 
            href="#twin-assistant" 
            onClick={() => setIsMenuOpen(false)} 
            className={`hover:text-white transition duration-200 flex items-center gap-2 ${glowConfig[accentGlow].text}`}
          >
            <span className={`w-2 h-2 rounded-full ${glowConfig[accentGlow].ping} animate-pulse`}></span>
            Clone Chat
          </a>
          
          <a
            href="#twin-assistant"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 bg-white text-black text-[11px] font-bold uppercase tracking-wider px-8 py-3 rounded-full"
          >
            Enquire
          </a>
        </nav>
      </div>
    </header>      {/* Screen 1: Full Viewport Cover (100dvh Landing) */}
      <div id="hero-screen" className="w-full h-[100dvh] flex flex-col justify-between pt-28 pb-6 relative overflow-hidden select-none z-10">

        {/* Placeholder to keep layout balance now that header is fixed */}
        <div className="h-0 w-full"></div>

        {/* Center Stage Bold Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center relative z-10 flex-1">

          {/* Status indicator badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`inline-flex items-center gap-2 ${glowConfig[accentGlow].badgeBg} border ${glowConfig[accentGlow].border} px-4 py-1.5 rounded-full mb-6 backdrop-blur-md`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${glowConfig[accentGlow].ping} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${glowConfig[accentGlow].bg}`}></span>
            </span>
            <span className={`text-[10px] font-mono font-semibold uppercase tracking-[0.15em] ${glowConfig[accentGlow].badgeText}`}>
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
                className={`font-semibold inline-block ${glowConfig[accentGlow].text}`}
              >
                {taglines[taglineIndex]}
              </motion.span>
            </span>
            <br />
            <span className="italic font-serif text-white/60 text-base md:text-lg mt-3 block">
              &ldquo;Structuring clean logical architecture in code, engineering pristine interfaces in design.&rdquo;
            </span>
          </motion.p>

          {/* Radial accent color customization picker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 1 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Glow Mode:</span>
            <button
              onClick={() => setAccentGlow("emerald")}
              className={`w-3 h-3 rounded-full bg-emerald-500 transition-all ${accentGlow === "emerald" ? "ring-4 ring-emerald-500/40 scale-125" : "opacity-40 hover:opacity-100"}`}
              title="Emerald Garden"
            ></button>
            <button
              onClick={() => setAccentGlow("blue")}
              className={`w-3 h-3 rounded-full bg-blue-500 transition-all ${accentGlow === "blue" ? "ring-4 ring-blue-500/40 scale-125" : "opacity-40 hover:opacity-100"}`}
              title="Oceanic Obsidian"
            ></button>
            <button
              onClick={() => setAccentGlow("amber")}
              className={`w-3 h-3 rounded-full bg-yellow-500 transition-all ${accentGlow === "amber" ? "ring-4 ring-yellow-500/40 scale-125" : "opacity-40 hover:opacity-100"}`}
              title="Aura Amber"
            ></button>
          </motion.div>
        </section>

        {/* Bottom meta rows */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-end pb-2 px-6 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 z-10">
          <div className="flex items-center gap-2 relative">
            <MapPin className={`w-4 h-4 ${glowConfig[accentGlow].text}`} />
            <div className="flex flex-col text-left">
              <span className="text-white/40">BASED IN ROURKELA,</span>
              <span className="font-bold text-white mt-0.5">INDIA</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <Code className={`w-4 h-4 ${glowConfig[accentGlow].text}`} />
            <div className="flex flex-col text-right">
              <span className="text-white/40">FULL STACK DEV,</span>
              <span className="font-bold text-white mt-0.5">&amp; SYSTEM ENGINEER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Bento Design Fold */}
      <section id="bento" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Profile Card displaying premium portrait */}
          <div className={`md:col-span-1 bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${accentGlow === "emerald"
            ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
            : accentGlow === "blue"
              ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
              : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
            }`}>
            <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none"></div>

            <div
              ref={imgContainerRef}
              onMouseMove={handleImgMouseMove}
              onMouseLeave={handleImgMouseLeave}
              style={imgTiltStyle}
              className="relative mb-6 rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-zinc-950 border border-white/15 select-none cursor-crosshair group/pfp transition-shadow duration-500"
            >
              {/* Subtle ambient outer glow matching active theme mode */}
              <div className={`absolute -inset-1 blur-md rounded-xl transition-all duration-700 opacity-25 group-hover:opacity-75 pointer-events-none animate-pulse-slow ${accentGlow === "emerald"
                ? "bg-emerald-500/20 shadow-[0_0_20px_#10b981]"
                : accentGlow === "blue"
                  ? "bg-blue-500/20 shadow-[0_0_20px_#3b82f6]"
                  : "bg-yellow-500/20 shadow-[0_0_20px_#f59e0b]"
                }`} />

              <div className={`absolute inset-0 opacity-40 bg-radial-gradient ${glowConfig[accentGlow].radial} to-transparent z-10 pointer-events-none`}></div>

              {/* Sci-fi "glitch-in" reveal animation when the page loads */}
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
                  src={anmolPhoto}
                  alt="Anmol Trivedi close-up portrait wearing a green polo shirt with evening river sunset backdrop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => {
                    // Elegant vector fallback if path load failed
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </motion.div>

              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white/70 z-20">
                AT-V.3.5
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold leading-tight flex items-center gap-1.5">
                Anmol <span className="italic font-serif font-normal text-white/80">Trivedi</span>
              </h3>
              <p className="text-xs text-white/50 mt-1 font-mono">Fullstack Developer & Designer</p>

              {/* Dynamic Location indicator with local current time context */}
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/40 uppercase tracking-widest leading-none">
                <MapPin className={`w-3.5 h-3.5 ${glowConfig[accentGlow].text}`} />
                <span>Rourkela, India • UTC+5:30</span>
              </div>

              {/* Rich Social link badges */}
              <div className="flex flex-wrap gap-2.5 mt-4">
                <a href="https://github.com/anmoltriv" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition duration-200" title="GitHub Profile">
                  <Github className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/anmol-trivedi-op/" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition duration-200" title="LinkedIn Profile">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono text-[10px]">LinkedIn</span>
                </a>
                <a href="https://codolio.com/profile/anmolop" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition duration-200" title="LeetCode Profile">
                  <Code className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="font-mono text-[10px]">Codolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Philosophy Card - Central Focus */}
          <div className={`md:col-span-2 bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${accentGlow === "emerald"
            ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
            : accentGlow === "blue"
              ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
              : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
            }`}>

            {/* Pulsing light ring based on active accent selection */}
            <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[80px] opacity-15 transition-all duration-500 ${accentGlow === "emerald" ? "bg-emerald-500" : accentGlow === "blue" ? "bg-blue-500" : "bg-amber-500"
              }`}></div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className={`w-4 h-4 ${glowConfig[accentGlow].text}`} />
                <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-mono">My Philosophy</span>
              </div>

              <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white transition-all duration-300 group-hover:${glowConfig[accentGlow].text}`}>
                Fullstack Logic.<br />
                <span className="font-serif italic font-normal text-white/80">Systems that Scale</span>
              </h2>

              <p className="text-sm md:text-base text-white/60 mt-6 leading-relaxed">
                I do not simply construct isolated backend containers or write basic scripts. I sweat the system throughput, the database normalization, the relational schema index metrics, the edge-case algorithmic logic, and the end-to-end reliability. Code should be as optimized as it is architecturally sound.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">B.Tech CGPA</p>
                <p className="text-lg font-bold text-white mt-1">8.75 / 10</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Leetcode</p>
                <p className="text-lg font-bold text-white mt-1">Solved 500+</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Extracurricular</p>
                <p className="text-lg font-bold text-white mt-1">Kalaam's Technical Head</p>
              </div>
            </div>
          </div>

          {/* Connected Work Status / Easy Contact Card */}
          <div className="md:col-span-1 flex flex-col gap-6">

            {/* Available Status Block */}
            <div className={`bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center gap-3.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${accentGlow === "emerald"
              ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-950/15"
              : accentGlow === "blue"
                ? "hover:shadow-blue-500/5 hover:border-blue-500/30 hover:bg-blue-950/15"
                : "hover:shadow-yellow-500/5 hover:border-yellow-500/30 hover:bg-yellow-950/15"
              }`}>
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${glowConfig[accentGlow].ping} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${glowConfig[accentGlow].bg}`}></span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider font-mono text-white/40">Status</p>
                <p className={`text-xs font-bold uppercase tracking-widest ${glowConfig[accentGlow].text} mt-0.5`}>Available for Work &amp; Internships</p>
              </div>
            </div>

            {/* Direct Copy Action Block */}
            <div className={`bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${accentGlow === "emerald"
              ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
              : accentGlow === "blue"
                ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
                : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
              }`}>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono block mb-1">Email Contact</span>
                <p className={`text-sm font-medium tracking-tight truncate font-mono ${glowConfig[accentGlow].text}`}>anmolop.works@gmail.com</p>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono block mt-3 mb-1">Phone Line</span>
                <p className="text-xs font-mono text-white/80">(+91) 6387297103</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs py-2 rounded-lg text-white/80 active:scale-95 transition-all font-semibold"
                >
                  {copiedEmail ? (
                    <>
                      <Check className={`w-3.5 h-3.5 ${glowConfig[accentGlow].text}`} />
                      <span className={`${glowConfig[accentGlow].text} font-mono`}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span className="font-mono">Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fast Resume Link to emphasize pre-final student preparedness */}
            <div className={`bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${accentGlow === "emerald"
              ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
              : accentGlow === "blue"
                ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
                : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
              }`} onClick={() => handleSendMessage("Tell me about your tech experiences and resume info")}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-950/20 text-orange-400 border border-orange-500/10">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Curriculum Vitae</p>
                  <p className="text-xs font-bold text-white mt-0.5">Quick Facts</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40" />
            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Content Showcases Stack - Sequential Scroll Reveal Sections */}

      {/* 1. Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 scroll-mt-24 border-t border-white/5"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className={`p-2.5 rounded-xl ${glowConfig[accentGlow].badgeBg} ${glowConfig[accentGlow].text} border ${glowConfig[accentGlow].border}`}>
            <Code className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block">Curated Work</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Selected Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-white/[0.0125] border border-white/10 rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col justify-between group h-[260px] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${accentGlow === "emerald"
                ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
                : accentGlow === "blue"
                  ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
                  : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
                }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none group-hover:bg-white/[0.03] transition-colors"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className={`text-xl font-bold tracking-tight text-white transition-all duration-300 group-hover:${glowConfig[accentGlow].text}`}>
                      {project.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">{project.tagline}</p>
                  </div>

                  {project.metrics && (
                    <div className={`bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${glowConfig[accentGlow].text}`}>
                      {project.metrics.value} <span className="text-white/50">{project.metrics.label}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-white/60 mb-6 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2.5 mb-4">
                  {project.tags.map(tag => (
                    <TechBadge key={tag} tag={tag} glowAccent={accentGlow} />
                  ))}
                </div>

                <div className={`flex justify-between items-center pt-2 text-[10px] font-mono tracking-widest ${glowConfig[accentGlow].text} uppercase font-semibold group-hover:translate-x-1 duration-300`}>
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 2. Skills Section */}
      <SkillsSection glowConfig={glowConfig} accentGlow={accentGlow} />

      {/* 3. EXPERIENCE SECTION */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 scroll-mt-24 border-t border-white/5"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className={`p-2.5 rounded-xl ${glowConfig[accentGlow].badgeBg} ${glowConfig[accentGlow].text} border ${glowConfig[accentGlow].border}`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block">Professional Journey</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Leadership &amp; Internships</h2>
          </div>
        </div>

        <div className="space-y-6">
          {experiencesData.map((exp) => (
            <div key={exp.id} className={`bg-white/[0.0125] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:bg-white/[0.025] ${accentGlow === "emerald"
              ? "hover:shadow-emerald-500/5 hover:border-emerald-500/30"
              : accentGlow === "blue"
                ? "hover:shadow-blue-500/5 hover:border-blue-500/30"
                : "hover:shadow-yellow-500/5 hover:border-yellow-500/30"
              }`}>
              <div className={`absolute top-6 right-6 text-[10px] font-mono tracking-widest ${glowConfig[accentGlow].text} uppercase font-semibold`}>
                {exp.period}
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl ${glowConfig[accentGlow].badgeBg} ${glowConfig[accentGlow].text} border ${glowConfig[accentGlow].border} flex items-center justify-center shrink-0`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white">{exp.role}</h4>
                  <p className="text-sm font-mono text-white/50">{exp.company} • <span className="text-white/30">{exp.location}</span></p>
                </div>
              </div>

              <ul className="space-y-3 mt-4 ml-2 pl-4 border-l border-white/10 text-sm text-white/70 leading-relaxed list-none">
                {exp.bulletPoints.map((bullet, idx) => (
                  <li key={idx} className={`relative before:content-[''] before:absolute before:left-[-20px] before:top-[8px] before:w-1.5 before:h-1.5 before:${glowConfig[accentGlow].bg} before:rounded-full`}>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4">
                <button
                  className="text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition cursor-pointer"
                  onClick={() => handleSendMessage(`What did you do during your role as ${exp.role} at ${exp.company}?`)}
                >
                  Ask Twin For Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive AI Assistant Twin Interactive Sandbox Card */}
      <section id="twin-assistant" className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 scroll-mt-24">

        <div className={`bg-[#090909] border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative transition-all duration-500 hover:border-white/25 hover:shadow-[0_40px_80px_rgba(0,0,0,0.95)] ${accentGlow === "emerald"
          ? "hover:shadow-emerald-500/[0.015]"
          : accentGlow === "blue"
            ? "hover:shadow-blue-500/[0.015]"
            : "hover:shadow-yellow-500/[0.015]"
          }`}>

          {/* Internal Top Terminal Strip */}
          <div className="bg-white/[0.02] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full ${glowConfig[accentGlow].bg} animate-pulse relative`}>
                <span className={`absolute inset-0 ${glowConfig[accentGlow].ping} animate-ping rounded-full opacity-60`}></span>
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight">Anmol &apos;s AI Digital Twin</h3>
                <p className={`text-[10px] ${glowConfig[accentGlow].text} font-mono`}>ONLINE • READY TO CHAT</p>
              </div>
            </div>

            <div className="flex gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
              <span>Model Reference</span>
              <span className={`${glowConfig[accentGlow].text}`}>gemini-3.5-flash</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* Live Context Prompt Selector Column (Left side) */}
            <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01]">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-3">Quick Prompts</span>
              <p className="text-xs text-white/50 mb-5 leading-relaxed">
                Click any pre-crafted question below to test my cognitive responsiveness, design opinions, or work status instantly.
              </p>

              <div className="space-y-2.5">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isChatLoading}
                    className="w-full text-left font-sans text-xs bg-white/[0.02] hover:bg-white/5 border border-white/10 px-4 py-3 rounded-xl block transition active:scale-98 text-white/80 hover:text-white group flex justify-between items-center"
                  >
                    <span>{q}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 text-white/30 group-hover:${glowConfig[accentGlow].text} transition`} />
                  </button>
                ))}
              </div>

              {/* Quick bio facts for Nit Rkl student */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-3">Offline Core Bio</span>
                <ul className="text-xs text-white/50 space-y-2 font-mono">
                  <li>📍 National Inst. of Technology, Rkl</li>
                  <li>🎓 Ind Design &amp; CS Minor &apos;28</li>
                  <li>⚡ Multi-disciplinary visual coding</li>
                </ul>
              </div>
            </div>

            {/* Chat Conversation Console (Right columns) */}
            <div className="md:col-span-2 p-6 flex flex-col justify-between h-[450px]">

              {/* Chat log body */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                      ? "bg-white text-black font-medium rounded-tr-none"
                      : "bg-white/5 border border-white/10 text-white/95 rounded-tl-none font-sans"
                      }`}>
                      {msg.role === "user" ? (
                        msg.content
                      ) : (
                        <div className="markdown-body text-sm max-w-none text-white/90 space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_strong]:text-white [&_strong]:font-bold [&_a]:text-pink-400 hover:[&_a]:text-pink-300 hover:[&_a]:underline">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-white/30 mt-1 uppercase tracking-widest">
                      {msg.role === "user" ? "Visitor" : "Anmol-Clone"} • {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex flex-col max-w-[85%] mr-auto items-start">
                    <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 rounded-tl-none font-mono text-xs flex items-center gap-2">
                      <Zap className={`w-3.5 h-3.5 ${glowConfig[accentGlow].text} animate-bounce`} />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me something..."
                  disabled={isChatLoading}
                  className={`flex-1 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-${accentGlow === "amber" ? "yellow" : accentGlow}-500 focus:outline-none px-5 py-3 rounded-xl text-sm transition font-sans`}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !inputMessage.trim()}
                  className={`${glowConfig[accentGlow].bg} text-black font-bold text-sm px-5 py-3 rounded-xl disabled:opacity-40 transition active:scale-95 flex items-center justify-center cursor-pointer`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>
      </section>

      {/* Aesthetic Project Specification Modal Detail overlay */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0b0b] border border-white/15 max-w-2xl w-full rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className={`text-[10px] font-mono tracking-[0.2em] ${glowConfig[accentGlow].text} uppercase`}>Project Specification</span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mt-1">{selectedProject.title}</h3>
              <p className="text-xs font-mono text-white/40 mt-1">{selectedProject.tagline}</p>
            </div>

            <div className="space-y-4 text-sm text-white/70 leading-relaxed font-sans">
              <p>{selectedProject.detailedDescription}</p>
            </div>

            {selectedProject.metrics && (
              <div className="mt-8 bg-white/[0.02] border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs text-white/50 uppercase tracking-widest font-mono">Performance Metric</span>
                <span className={`text-sm font-bold ${glowConfig[accentGlow].text} font-mono`}>{selectedProject.metrics.value} {selectedProject.metrics.label}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/70">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleSendMessage(`Tell me more about the project ${selectedProject.title}`);
                }}
                className={`text-xs ${glowConfig[accentGlow].text} hover:opacity-80 font-bold font-mono tracking-wider uppercase flex items-center gap-1`}
              >
                <MessageSquare className="w-4 h-4" /> Ask Twin For More Info
              </button>

              <div className="flex gap-4">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-white/50 hover:text-white hover:underline transition"
                >
                  GitHub Source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Immersive CTA Section: Let's create something real. */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 md:p-12 hover:border-white/20 transition-all duration-500 relative overflow-hidden group/ctacard flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">

          {/* Subtle background gradient on card hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-white/[0.03] opacity-0 group-hover/ctacard:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="flex flex-col gap-2 md:gap-3 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/15 shadow-xl shrink-0 group-hover/ctacard:scale-105 transition-transform duration-500">
                <img
                  src={anmolPhoto}
                  alt="Anmol Trivedi Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-sans uppercase">
                Let&apos;s create
              </h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-500 font-sans uppercase pl-[4.5rem] md:pl-[5rem] group-hover/ctacard:text-neutral-400 transition-colors duration-500">
              something real.
            </h3>
          </div>

          {/* Right content: Glowing cosmic ring that moves / listens on hover */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0 mx-auto md:mx-0 group/ring">
            {/* External ambient blur */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/10 to-purple-600/35 blur-xl group-hover/ctacard:scale-110 group-hover/ctacard:opacity-90 transition-all duration-500 pointer-events-none"></div>

            {/* Main animated glowing ring - spinning/vibrating/shifting on overall card hover */}
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-[spin_8s_linear_infinite] shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500 group-hover/ctacard:animate-[spin_2s_linear_infinite] group-hover/ctacard:scale-110 group-hover/ctacard:shadow-[0_0_45px_rgba(34,211,238,0.5)]">
              <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                {/* Listening/Equalizer effect inside when listening/hovered */}
                {/* <div className="flex gap-1 items-center justify-center opacity-0 group-hover/ctacard:opacity-100 transition-opacity duration-500">
                  <span className="w-1 h-3 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms] inline-block"></span>
                  <span className="w-1 h-5 bg-blue-500 rounded-full animate-[bounce_0.8s_infinite_200ms] inline-block"></span>
                  <span className="w-1 h-3 bg-purple-600 rounded-full animate-[bounce_0.8s_infinite_300ms] inline-block"></span>
                </div> */}
              </div>
            </div>

            {/* Highlight glare overlay */}
            <div className="absolute inset-0.5 rounded-full border border-white/10 pointer-events-none opacity-50 group-hover/ctacard:scale-110 transition-transform duration-500"></div>
          </div>
        </div>
      </section>

      {/* Sophisticated Professional Footer Area */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 mt-12 border-t border-white/10 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">

        <div className="flex gap-8 md:gap-16">
          <div className="font-sans">
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-2">Location Coordinates</p>
            <p className="text-xs font-extrabold text-white">NIT Rourkela, India</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-2">Primary Affiliation</p>
            <p className="text-xs font-extrabold text-white">Industrial Design &amp; CS Minor &apos;28</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-2">Active Status</p>
            <p className="text-xs font-extrabold text-white/90">Internship Openings</p>
          </div>
        </div>

        <div className="text-left sm:text-right font-sans">
          <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 mb-1">Architecture &amp; Design</p>
          <p className="text-xs font-bold text-white/60">Anmol Trivedi © 2026. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}