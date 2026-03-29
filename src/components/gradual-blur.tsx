"use client";

import { useMemo } from "react";

interface GradualBlurProps {
  position?: "top" | "bottom";
  strength?: number;
  height?: string;
  divCount?: number;
}

export function GradualBlur({
  position = "bottom",
  strength = 8,
  height = "6rem",
  divCount = 5,
}: GradualBlurProps) {
  const direction = position === "top" ? "to top" : "to bottom";

  const blurDivs = useMemo(() => {
    const increment = 100 / divCount;

    return Array.from({ length: divCount }, (_, i) => {
      const index = i + 1;
      const blurValue = (index / divCount) * strength;

      const p1 = Math.round((increment * index - increment) * 10) / 10;
      const p2 = Math.round(increment * index * 10) / 10;
      const p3 = Math.round((increment * index + increment) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      gradient += `, transparent ${Math.min(p3 + increment, 100)}%`;

      return (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(1)}px)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(1)}px)`,
          }}
        />
      );
    });
  }, [divCount, strength, direction]);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        [position]: 0,
        height,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {blurDivs}
    </div>
  );
}
