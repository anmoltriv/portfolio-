import { Code } from "lucide-react";
import { motion } from "motion/react";
import { projectsData } from "../data";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

interface ProjectsSectionProps {
  onSelect: (project: Project) => void;
}

export default function ProjectsSection({ onSelect }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 scroll-mt-24 border-t border-white/5"
    >
      <SectionHeading icon={Code} eyebrow="Curated Work" title="Selected Projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={onSelect} />
        ))}
      </div>
    </motion.section>
  );
}
