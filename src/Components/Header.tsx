import { useState } from "react";
import { useAccent } from "../theme/AccentContext";

const NAV_LINKS = [
  { href: "#hero-screen", label: "Home" },
  { href: "#bento", label: "Identity" },
  { href: "#projects", label: "Showcase" }
];

export default function Header() {
  const { tokens } = useAccent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md bg-[#050505]/60 border-b border-white/5 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <span
              className={`text-2xl font-black tracking-tighter uppercase text-white transition cursor-default ${tokens.hoverText}`}
            >
              AT
            </span>
            <span
              className={`absolute -bottom-1 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${tokens.bg}`}
            />
          </div>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] font-mono text-white/30 uppercase mt-1">
            • CORE UNIT
          </span>
        </div>

        {/* Desktop Minimal Pill Navigation */}
        <nav className="hidden md:flex bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-xl gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/40">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition duration-200">
              {link.label}
            </a>
          ))}
          <a
            href="#twin-assistant"
            className={`hover:text-white transition duration-200 flex items-center gap-1.5 hover:opacity-80 ${tokens.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${tokens.ping}`} />
            Clone Chat
          </a>
        </nav>

        {/* Desktop Direct Connect Action */}
        <div className="hidden md:block">
          <a
            href="#twin-assistant"
            className={`bg-white text-black active:scale-95 transition-all text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:text-black duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.05)] ${tokens.hoverBg}`}
          >
            Enquire
          </a>
        </div>

        {/* Mobile Menu Button Container */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="text-white focus:outline-none p-2 z-50 relative"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {/* Animated Hamburger / Close Icon */}
            <div className="w-6 h-5 flex flex-col justify-between relative overflow-hidden">
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-[4px] -translate-y-[1px]" : ""}`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "-translate-x-full opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-[4px] translate-y-[1px]" : ""}`}
              />
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      <div
        inert={!isMenuOpen}
        className={`fixed inset-0 h-screen w-screen bg-[#050505]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-sm uppercase tracking-[0.2em] font-semibold text-white/50">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-white transition duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#twin-assistant"
            onClick={() => setIsMenuOpen(false)}
            className={`hover:text-white transition duration-200 flex items-center gap-2 ${tokens.text}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${tokens.ping}`} />
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
    </header>
  );
}
