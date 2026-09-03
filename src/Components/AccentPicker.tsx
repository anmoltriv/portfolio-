import { motion } from "motion/react";
import { ACCENT_PICKER } from "../theme/accent";
import { useAccent } from "../theme/AccentContext";

export default function AccentPicker() {
  const { accent, setAccent, tokens } = useAccent();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 1 }}
      className="mt-8 flex items-center gap-3"
    >
      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
        Glow Mode:
      </span>
      {ACCENT_PICKER.map((option) => (
        <button
          key={option.name}
          onClick={() => setAccent(option.name)}
          className={`w-3 h-3 rounded-full transition-all ${option.swatch} ${
            accent === option.name
              ? `ring-4 scale-125 ${tokens.pickerRing}`
              : "opacity-40 hover:opacity-100"
          }`}
          title={option.label}
          aria-label={`Set glow mode to ${option.label}`}
          aria-pressed={accent === option.name}
        />
      ))}
    </motion.div>
  );
}
