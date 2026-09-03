import { useAccent } from "../theme/AccentContext";

const ORB_GEOMETRY = [
  "top-[-10%] left-[-15%] w-[60%] h-[60%] blur-[140px]",
  "top-[35%] right-[-10%] w-[50%] h-[50%] blur-[160px]",
  "bottom-[5%] left-[10%] w-[45%] h-[45%] blur-[150px]"
];

export default function AmbientOrbs() {
  const { tokens } = useAccent();

  return (
    <>
      {ORB_GEOMETRY.map((geometry, index) => (
        <div
          key={geometry}
          className={`absolute rounded-full pointer-events-none transition-all duration-1000 ${geometry} ${tokens.orbs[index]}`}
        />
      ))}
    </>
  );
}
