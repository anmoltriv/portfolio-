import { PROFILE_PHOTO, PROFILE_PHOTO_FALLBACK } from "../profilePhoto";

export default function CtaSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
      <div className="bg-surface border border-fg/10 rounded-2xl p-8 md:p-12 hover:border-fg/20 transition-all duration-500 relative overflow-hidden group/ctacard flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:-translate-y-1 hover:shadow-lift">

        {/* Subtle background gradient on card hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fg/[0.01] to-fg/[0.03] opacity-0 group-hover/ctacard:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex flex-col gap-2 md:gap-3 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-fg/15 shadow-xl shrink-0 group-hover/ctacard:scale-105 transition-transform duration-500">
              <img
                src={PROFILE_PHOTO}
                alt=""
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = PROFILE_PHOTO_FALLBACK;
                }}
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fg font-sans uppercase">
              Let&apos;s create
            </h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-muted font-sans uppercase pl-[4.5rem] md:pl-[5rem] group-hover/ctacard:text-fg transition-colors duration-500">
            something real.
          </h3>
        </div>

        {/* Glowing cosmic ring that speeds up on card hover */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0 mx-auto md:mx-0">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/10 to-purple-600/35 blur-xl group-hover/ctacard:scale-110 group-hover/ctacard:opacity-90 transition-all duration-500 pointer-events-none" />

          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-[spin_8s_linear_infinite] shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500 group-hover/ctacard:animate-[spin_2s_linear_infinite] group-hover/ctacard:scale-110 group-hover/ctacard:shadow-[0_0_45px_rgba(34,211,238,0.5)]">
            <div className="w-full h-full rounded-full bg-page" />
          </div>

          {/* Highlight glare overlay */}
          <div className="absolute inset-0.5 rounded-full border border-fg/10 pointer-events-none opacity-50 group-hover/ctacard:scale-110 transition-transform duration-500" />
        </div>
      </div>
    </section>
  );
}
