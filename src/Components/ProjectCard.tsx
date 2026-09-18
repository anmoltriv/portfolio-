import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "../types";
import { useAccent } from "../theme/AccentContext";
import TechBadge from "./TechBadge";
import TiltCard from "./TiltCard";
import VisitBadge from "./VisitBadge";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  flipped?: boolean;
}

export default function ProjectCard({ project, onSelect, flipped = false }: ProjectCardProps) {
  const { tokens } = useAccent();

  const stopBubbling = (event: MouseEvent) => event.stopPropagation();

  return (
    <TiltCard
      className={`group rounded-[1.6rem] p-[1.5px] bg-gradient-to-br ${project.wash} shadow-[0_20px_60px_rgba(0,0,0,0.35)]`}
      maxTilt={6}
    >
      <article className="relative overflow-hidden rounded-[1.5rem] bg-[#080808] border border-white/10 flex flex-col md:flex-row min-h-[320px]">
        <div className={`relative md:w-[52%] overflow-hidden bg-[#0a0a0a] ${flipped ? "md:order-2" : ""}`}>
          <img
            src={project.image}
            alt={`${project.title} user interface`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top min-h-[220px] transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          {project.metrics && (
            <div className={`absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${tokens.text}`}>
              {project.metrics.value} <span className="text-white/50">{project.metrics.label}</span>
            </div>
          )}
          <VisitBadge id={project.id} />
        </div>

        <div className={`p-6 md:p-8 flex flex-col flex-1 ${flipped ? "md:order-1" : ""}`}>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/35 mb-2">
            {project.tagline}
          </p>
          <h4 className={`text-2xl font-bold tracking-tight text-white transition-colors duration-300 ${tokens.groupHoverText}`}>
            {project.title}
          </h4>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            {project.description}
          </p>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] transition-[grid-template-rows] duration-500 mt-3">
            <ul className="min-h-0 overflow-hidden space-y-2 pt-1 pb-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-xs text-white/55 leading-relaxed pl-3 border-l border-white/15"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 mb-5">
            {project.tags.map((tag) => (
              <TechBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <span className={`flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-semibold group-hover:translate-x-1 transition-transform duration-300 ${tokens.text}`}>
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

        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`View specifications for ${project.title}`}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      </article>
    </TiltCard>
  );
}
