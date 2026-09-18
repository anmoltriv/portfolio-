interface VisitBadgeProps {
  id: string;
}

export default function VisitBadge({ id }: VisitBadgeProps) {
  const pathId = `visit-orbit-${id}`;

  return (
    <div className="pointer-events-none absolute right-4 bottom-4 z-20 opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
      <svg viewBox="0 0 100 100" className="h-16 w-16 text-white mix-blend-difference motion-safe:animate-[spin_12s_linear_infinite]">
        <defs>
          <path
            id={pathId}
            d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
          />
        </defs>
        <text fill="currentColor" fontSize="8.5" letterSpacing="2.4" fontFamily="ui-monospace, monospace">
          <textPath href={`#${pathId}`}>VIEW PROJECT · VIEW PROJECT · </textPath>
        </text>
      </svg>
    </div>
  );
}
