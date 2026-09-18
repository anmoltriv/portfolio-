import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Project } from "./types";
import { AccentProvider } from "./theme/AccentContext";
import { ChatProvider } from "./chat/ChatContext";
import { useScrollToTopOnLoad } from "./hooks/useScrollToTopOnLoad";
import AmbientOrbs from "./Components/AmbientOrbs";
import GrainOverlay from "./Components/GrainOverlay";
import CommandPalette from "./Components/CommandPalette";
import { ConfettiProvider } from "./Components/Confetti";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import BentoSection from "./Components/BentoSection";
import ProjectsSection from "./Components/ProjectsSection";
import SkillsSection from "./Components/SkillSection";
import MarqueeSection from "./Components/MarqueeSection";
import ExperienceSection from "./Components/ExperienceSection";
import ChatSection from "./Components/ChatSection";
import ProjectModal from "./Components/ProjectModal";
import CtaSection from "./Components/CtaSection";
import Footer from "./Components/Footer";

function Portfolio() {
  useScrollToTopOnLoad();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div
      id="immersive-portfolio-root"
      className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between overflow-x-hidden relative"
    >
      <AmbientOrbs />
      <GrainOverlay />
      <CommandPalette />
      <Header />
      <Hero />
      <BentoSection />
      <ProjectsSection onSelect={setSelectedProject} />
      <SkillsSection />
      <MarqueeSection />
      <ExperienceSection />
      <ChatSection />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <CtaSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AccentProvider>
      <ChatProvider>
        <ConfettiProvider>
          <Portfolio />
        </ConfettiProvider>
      </ChatProvider>
    </AccentProvider>
  );
}
