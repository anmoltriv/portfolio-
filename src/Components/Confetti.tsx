import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useAccent } from "../theme/AccentContext";

interface Origin {
  x: number;
  y: number;
}

interface ConfettiContextValue {
  burst: (origin?: Origin) => void;
}

const ConfettiContext = createContext<ConfettiContextValue | null>(null);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
  tilt: number;
  spin: number;
}

function spawnParticles(origin: Origin, accent: string): Particle[] {
  const colors = [accent, "#ffffff", "#f5d76e", "#e5e5e5", "#fb7185", "#34d399"];
  return Array.from({ length: 64 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    return {
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 4 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: 0.01 + Math.random() * 0.012,
      tilt: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.4
    };
  });
}

function ConfettiLayer({ origin, onDone }: { origin: Origin; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tokens } = useAccent();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = spawnParticles(origin, tokens.hex);
    let frame = 0;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.life -= p.decay;
        if (p.life <= 0) continue;
        alive = true;
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.tilt += p.spin;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (alive) {
        frame = requestAnimationFrame(tick);
      } else {
        onDoneRef.current();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [origin, tokens.hex]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[120]"
      aria-hidden="true"
    />
  );
}

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const [bursts, setBursts] = useState<{ id: number; origin: Origin }[]>([]);
  const nextId = useRef(0);

  const burst = useCallback((origin?: Origin) => {
    const resolved = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const id = ++nextId.current;
    setBursts((prev) => [...prev, { id, origin: resolved }]);
  }, []);

  return (
    <ConfettiContext.Provider value={{ burst }}>
      {children}
      {bursts.map((item) => (
        <ConfettiLayer
          key={item.id}
          origin={item.origin}
          onDone={() => setBursts((prev) => prev.filter((b) => b.id !== item.id))}
        />
      ))}
    </ConfettiContext.Provider>
  );
}

export function useConfetti(): ConfettiContextValue {
  const ctx = useContext(ConfettiContext);
  if (!ctx) throw new Error("useConfetti must be used inside a ConfettiProvider");
  return ctx;
}
