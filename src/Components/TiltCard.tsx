import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { springSoft } from "../lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = "", maxTilt = 7 }: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--spot-x", `${px * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${py * 100}%`);
    setTilt({
      rotateX: (0.5 - py) * maxTilt * 2,
      rotateY: (px - 0.5) * maxTilt * 2,
      y: -4
    });
  };

  const onLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--spot-x", "50%");
    event.currentTarget.style.setProperty("--spot-y", "50%");
    setTilt({ rotateX: 0, rotateY: 0, y: 0 });
  };

  return (
    <motion.div
      className={`spot-card relative ${className}`}
      style={{ transformPerspective: 900 }}
      animate={reduced ? undefined : tilt}
      transition={springSoft}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
