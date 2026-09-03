import { useState } from "react";
import type { Project } from "./types";
import { AccentProvider } from "./theme/AccentContext";
import { ChatProvider } from "./chat/ChatContext";
import { useScrollToTopOnLoad } from "./hooks/useScrollToTopOnLoad";
import AmbientOrbs from "./Components/AmbientOrbs";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import BentoSection from "./Components/BentoSection";
import ProjectsSection from "./Components/ProjectsSection";
import SkillsSection from "./Components/SkillSection";
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
      className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-400"
    >
      <AmbientOrbs />
      <Header />
      <Hero />
      <BentoSection />
      <ProjectsSection onSelect={setSelectedProject} />
      <SkillsSection />
      <ExperienceSection />
      <ChatSection />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <CtaSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AccentProvider>
      <ChatProvider>
        <Portfolio />
      </ChatProvider>
    </AccentProvider>
  );
}
