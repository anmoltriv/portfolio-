import { MARQUEE_WORDS } from "../site";

function Track({ reverse = false }: { reverse?: boolean }) {
  const loop = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <div className={`flex w-max gap-8 py-3 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
      {loop.map((word, index) => (
        <span key={`${word}-${index}`} className="flex items-center gap-8">
          <span className="text-sm md:text-lg font-black tracking-[0.22em] text-black uppercase whitespace-nowrap">
            {word}
          </span>
          <span className="text-black/70 text-base" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="relative z-10 py-16 overflow-hidden" aria-hidden="true">
      <div
        className="marquee-band -rotate-[2.4deg] scale-110"
        style={{ background: "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #fb7185))" }}
      >
        <Track />
      </div>
      <div
        className="marquee-band mt-3 rotate-[2.4deg] scale-110 opacity-90"
        style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--accent) 70%, #fff), var(--accent))" }}
      >
        <Track reverse />
      </div>
    </section>
  );
}
