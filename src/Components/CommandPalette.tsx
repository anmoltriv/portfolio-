import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  Github,
  Home,
  Linkedin,
  MessageSquare,
  Search,
  Sparkles,
  User
} from "lucide-react";
import { projectsData } from "../data";
import { SITE } from "../site";
import { springSnappy } from "../lib/motion";
import { useConfetti } from "./Confetti";

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Actions";
  icon: typeof Home;
  run: () => void;
}

function isModK(event: KeyboardEvent): boolean {
  return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
}

export default function CommandPalette() {
  const { burst } = useConfetti();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<CommandItem[]>(() => {
    const go = (hash: string) => {
      setOpen(false);
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    };

    const navigate: CommandItem[] = [
      { id: "home", label: "Home", hint: "Hero", group: "Navigate", icon: Home, run: () => go("#hero-screen") },
      { id: "about", label: "About", hint: "Identity", group: "Navigate", icon: User, run: () => go("#about") },
      { id: "work", label: "Work", hint: "Selected projects", group: "Navigate", icon: Briefcase, run: () => go("#work") },
      { id: "skills", label: "Skills", hint: "The magic behind", group: "Navigate", icon: Sparkles, run: () => go("#skills") },
      { id: "twin", label: "Clone Chat", hint: "AI twin", group: "Navigate", icon: MessageSquare, run: () => go("#twin-assistant") }
    ];

    const projects: CommandItem[] = projectsData.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      hint: project.tagline,
      group: "Projects" as const,
      icon: ArrowUpRight,
      run: () => {
        setOpen(false);
        if (project.demoLink) window.open(project.demoLink, "_blank", "noreferrer");
        else go("#work");
      }
    }));

    const actions: CommandItem[] = [
      {
        id: "copy-email",
        label: "Copy email",
        hint: SITE.email,
        group: "Actions",
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(SITE.email);
          } catch {
            /* clipboard may be blocked */
          }
          burst({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          setOpen(false);
        }
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "anmoltriv",
        group: "Actions",
        icon: Github,
        run: () => {
          window.open(SITE.socials[0].href, "_blank", "noreferrer");
          setOpen(false);
        }
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "anmol-trivedi-op",
        group: "Actions",
        icon: Linkedin,
        run: () => {
          window.open(SITE.socials[1].href, "_blank", "noreferrer");
          setOpen(false);
        }
      }
    ];

    return [...navigate, ...projects, ...actions];
  }, [burst]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("open-command-palette", openMenu);

    const onKey = (event: KeyboardEvent) => {
      if (isModK(event)) {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter" && filtered[active]) {
        event.preventDefault();
        filtered[active].run();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openMenu);
    };
  }, [open, filtered, active]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const groups = ["Navigate", "Projects", "Actions"] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close command menu"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={springSnappy}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, projects, actions…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="hidden sm:inline rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2 scrollbar-slim">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-white/40">No matches.</p>
              )}

              {groups.map((group) => {
                const groupItems = filtered.filter((item) => item.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-2">
                    <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      const index = filtered.indexOf(item);
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={item.run}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            index === active ? "bg-white/8 text-white" : "text-white/70 hover:bg-white/5"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-white/50" />
                          <span className="flex-1 text-sm">{item.label}</span>
                          <span className="truncate font-mono text-[10px] uppercase tracking-wider text-white/30">
                            {item.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
              <span>Navigate ↑↓</span>
              <span>Open ↵</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/45 hover:text-white hover:border-white/20 transition"
      aria-label="Open command menu"
    >
      <span>Search</span>
      <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-white/70">⌘K</kbd>
    </button>
  );
}
