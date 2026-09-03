import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";
import { useAccent } from "../theme/AccentContext";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { tokens } = useAccent();

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`bg-white/[0.0125] border border-white/10 rounded-2xl p-6 text-left transition-all duration-500 cursor-pointer flex flex-col justify-between group h-[260px] relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${tokens.cardHover}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none group-hover:bg-white/[0.03] transition-colors" />

      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4
              className={`text-xl font-bold tracking-tight text-white transition-all duration-300 ${tokens.groupHoverText}`}
            >
              {project.title}
            </h4>
            <p className="text-xs text-white/50 mt-0.5">{project.tagline}</p>
          </div>

          {project.metrics && (
            <div
              className={`bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${tokens.text}`}
            >
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
          {project.tags.map((tag) => (
            <TechBadge key={tag} tag={tag} />
          ))}
        </div>

        <div
          className={`flex justify-between items-center pt-2 text-[10px] font-mono tracking-widest uppercase font-semibold group-hover:translate-x-1 duration-300 ${tokens.text}`}
        >
          <span>View Specifications</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}
