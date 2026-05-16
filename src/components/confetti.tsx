import { useMemo } from "react";

const COLORS = [
  "oklch(0.78 0.16 50)",
  "oklch(0.85 0.12 25)",
  "oklch(0.92 0.08 80)",
  "oklch(0.7 0.18 30)",
  "oklch(0.88 0.1 350)",
];

export function Confetti({ count = 80 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        x: (Math.random() - 0.5) * 200,
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.6,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            ["--x" as string]: `${p.x}px`,
            ["--d" as string]: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
