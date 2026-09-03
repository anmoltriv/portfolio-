import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "../types";
import { useAccent } from "../theme/AccentContext";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { tokens } = useAccent();

  // The card body is one big click target that opens the modal, so the outbound
  // links sit above it and must not also trigger it.
  const stopBubbling = (event: MouseEvent) => event.stopPropagation();

  return (
    <article
      className={`group relative bg-white/[0.0125] border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${tokens.cardHover}`}
    >
      {/* Live screenshot */}
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a] border-b border-white/10">
        <img
          src={project.image}
          alt={`${project.title} user interface`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {project.metrics && (
          <div
            className={`absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${tokens.text}`}
          >
            {project.metrics.value} <span className="text-white/50">{project.metrics.label}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4
          className={`text-xl font-bold tracking-tight text-white transition-all duration-300 ${tokens.groupHoverText}`}
        >
          {project.title}
        </h4>
        <p className="text-xs text-white/50 mt-0.5">{project.tagline}</p>

        <p className="text-sm text-white/60 mt-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2.5 mt-5 mb-5">
          {project.tags.map((tag) => (
            <TechBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <span
            className={`flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-semibold group-hover:translate-x-1 transition-transform duration-300 ${tokens.text}`}
          >
            View Specifications
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>

          <div className="relative z-20 flex items-center gap-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                onClick={stopBubbling}
                title={`Open the live ${project.title} site`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </a>
            )}
            {project.repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                onClick={stopBubbling}
                title={`${project.title} ${repo.label} source on GitHub`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition"
              >
                <Github className="w-3.5 h-3.5" />
                {repo.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stretched trigger, kept below the outbound links in the stacking order. */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View specifications for ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />
    </article>
  );
}
