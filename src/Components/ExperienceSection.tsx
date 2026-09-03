import { Award } from "lucide-react";
import { motion } from "motion/react";
import { experiencesData } from "../data";
import { useAccent } from "../theme/AccentContext";
import { useChat } from "../chat/ChatContext";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  const { tokens } = useAccent();
  const { send } = useChat();

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 scroll-mt-24 border-t border-white/5"
    >
      <SectionHeading
        icon={Award}
        eyebrow="Professional Journey"
        title="Leadership & Internships"
      />

      <div className="space-y-6">
        {experiencesData.map((exp) => (
          <div
            key={exp.id}
            className={`bg-white/[0.0125] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:bg-white/[0.025] ${tokens.cardHover}`}
          >
            <div
              className={`absolute top-6 right-6 text-[10px] font-mono tracking-widest uppercase font-semibold ${tokens.text}`}
            >
              {exp.period}
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${tokens.badgeBg} ${tokens.text} ${tokens.border}`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-white">{exp.role}</h4>
                <p className="text-sm font-mono text-white/50">
                  {exp.company} • <span className="text-white/30">{exp.location}</span>
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-4 ml-2 pl-4 border-l border-white/10 text-sm text-white/70 leading-relaxed list-none">
              {exp.bulletPoints.map((bullet) => (
                <li
                  key={bullet}
                  className={`relative before:content-[''] before:absolute before:left-[-20px] before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full ${tokens.beforeBg}`}
                >
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4">
              <button
                className="text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition cursor-pointer"
                onClick={() => send(`What did you do during your role as ${exp.role} at ${exp.company}?`)}
              >
                Ask Twin For Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
