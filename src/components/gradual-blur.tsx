"use client";

interface GradualBlurProps {
  position?: "top" | "bottom";
  height?: string;
}

export function GradualBlur({
  position = "bottom",
  height = "6rem",
}: GradualBlurProps) {
  const direction = position === "top" ? "to top" : "to bottom";

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
        background: `linear-gradient(${direction}, transparent, white)`,
      }}
    />
  );
}
