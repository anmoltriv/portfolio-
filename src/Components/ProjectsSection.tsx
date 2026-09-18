import { Code } from "lucide-react";
import { motion } from "motion/react";
import { projectsData } from "../data";
import type { Project } from "../types";
import { springSoft, viewportOnce } from "../lib/motion";
import { useAccent } from "../theme/AccentContext";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

interface ProjectsSectionProps {
  onSelect: (project: Project) => void;
}

export default function ProjectsSection({ onSelect }: ProjectsSectionProps) {
  const { tokens } = useAccent();

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={springSoft}
      className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 scroll-mt-24"
    >
      <div className="mb-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35 mb-2">
          Crafting modern experiences
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
          Venture{" "}
          <span className={`italic font-serif normal-case tracking-normal ${tokens.text}`}>
            Showcase
          </span>
        </h2>
      </div>
      <SectionHeading icon={Code} eyebrow="Curated Work" title="Selected Projects" />

      <div className="flex flex-col gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelect}
            flipped={index % 2 === 1}
          />
        ))}
      </div>
    </motion.section>
  );
}
