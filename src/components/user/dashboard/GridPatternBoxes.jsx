import React, { useMemo } from "react";
import { useId } from "react";

// Add this function at the top of the file
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export const GridPatternBoxes = ({
  pattern,
  size,
  seed = 123 // Add a seed prop with a default value
}) => {
  const p = useMemo(() => {
    if (pattern) return pattern;
    return Array.from({ length: 5 }, (_, i) => [
      Math.floor(seededRandom(seed + i * 2) * 4) + 7,
      Math.floor(seededRandom(seed + i * 2 + 1) * 6) + 1
    ]);
  }, [pattern, seed]);

  return (
    (<div
      className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div
        className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay stroke-black/10 fill-black/10" />
      </div>
    </div>)
  );
};

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}) {
  const patternId = useId();

  return (
    (<svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y],idx) => (
            <rect
              strokeWidth="0"
              key={idx}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height} />
          ))}
        </svg>
      )}
    </svg>)
  );
}
