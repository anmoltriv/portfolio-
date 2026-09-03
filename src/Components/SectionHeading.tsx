import type { LucideIcon } from "lucide-react";
import { useAccent } from "../theme/AccentContext";

interface SectionHeadingProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ icon: Icon, eyebrow, title }: SectionHeadingProps) {
  const { tokens } = useAccent();

  return (
    <div className="flex items-center gap-3 mb-10">
      <div className={`p-2.5 rounded-xl border ${tokens.badgeBg} ${tokens.text} ${tokens.border}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block">
          {eyebrow}
        </span>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
      </div>
    </div>
  );
}
