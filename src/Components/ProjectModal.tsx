import { ExternalLink, Github, MessageSquare, X } from "lucide-react";
import type { Project } from "../types";
import { useAccent } from "../theme/AccentContext";
import { useChat } from "../chat/ChatContext";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { tokens } = useAccent();
  const { send } = useChat();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b0b0b] border border-white/15 max-w-2xl w-full rounded-2xl relative max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-slim">
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video overflow-hidden bg-[#0a0a0a] border-b border-white/10 rounded-t-2xl">
          <img
            src={project.image}
            alt={`${project.title} user interface`}
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${tokens.text}`}>
              Project Specification
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-white/40 mt-1">{project.tagline}</p>
          </div>

          <p className="text-sm text-white/70 leading-relaxed font-sans">
            {project.detailedDescription}
          </p>

          <ul className="mt-6 space-y-3 pl-4 border-l border-white/10 text-sm text-white/70 leading-relaxed list-none">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className={`relative before:content-[''] before:absolute before:left-[-20px] before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full ${tokens.beforeBg}`}
              >
                {highlight}
              </li>
            ))}
          </ul>

          {project.metrics && (
            <div className="mt-8 bg-white/[0.02] border border-white/10 rounded-xl p-4 flex justify-between items-center">
              <span className="text-xs text-white/50 uppercase tracking-widest font-mono">
                Performance Metric
              </span>
              <span className={`text-sm font-bold font-mono ${tokens.text}`}>
                {project.metrics.value} {project.metrics.label}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
            <button
              onClick={() => {
                onClose();
                send(`Tell me more about the project ${project.title}`);
              }}
              className={`text-xs hover:opacity-80 font-bold font-mono tracking-wider uppercase flex items-center gap-1 ${tokens.text}`}
            >
              <MessageSquare className="w-4 h-4" /> Ask Twin For More Info
            </button>

            <div className="flex flex-wrap gap-2">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Site
                </a>
              )}
              {project.repos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  {repo.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
