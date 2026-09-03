import { MessageSquare, X } from "lucide-react";
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
      <div className="bg-[#0b0b0b] border border-white/15 max-w-2xl w-full rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 text-white/40 hover:text-white transition p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${tokens.text}`}>
            Project Specification
          </span>
          <h3 className="text-3xl font-extrabold tracking-tight text-white mt-1">{project.title}</h3>
          <p className="text-xs font-mono text-white/40 mt-1">{project.tagline}</p>
        </div>

        <div className="space-y-4 text-sm text-white/70 leading-relaxed font-sans">
          <p>{project.detailedDescription}</p>
        </div>

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

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <button
            onClick={() => {
              onClose();
              send(`Tell me more about the project ${project.title}`);
            }}
            className={`text-xs hover:opacity-80 font-bold font-mono tracking-wider uppercase flex items-center gap-1 ${tokens.text}`}
          >
            <MessageSquare className="w-4 h-4" /> Ask Twin For More Info
          </button>

          <div className="flex gap-4">
            <a
              href={project.githubLink}
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
  );
}
