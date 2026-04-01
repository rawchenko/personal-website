"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/utils";
import { experience } from "@/data/about";

export function ExperienceCard() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playPop = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(asset("/sounds/pop.wav"));
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return (
    <div
      className="flex flex-col h-full overflow-hidden bg-neutral-100"
      style={{ containerType: "inline-size", borderRadius: 0 }}
    >
      <p
        className="font-medium text-[#8A8A8A]"
        style={{
          fontSize: "4.48cqi",
          lineHeight: "5.38cqi",
          padding: "4.26cqi 0 0 6.5cqi",
        }}
      >
        Work Experience
      </p>
      <div
        className="flex flex-col flex-1 bg-white shadow-[0_2px_12px_#0000000A] overflow-hidden"
        style={{
          borderTopLeftRadius: "6.5cqi",
          borderTopRightRadius: "6.5cqi",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          padding: "0.9cqi",
          margin: "2.47cqi 4.04cqi 0",
        }}
      >
        {experience.map((exp, i) => {
          const isActive = activeIndex === i;
          const isHovered = hoveredIndex === i && !isActive;

          return (
            <motion.div
              key={i}
              onHoverStart={() => {
                setHoveredIndex(i);
                if (!prefersReducedMotion) playPop();
              }}
              onHoverEnd={() => setHoveredIndex(null)}
              onTapStart={() => setActiveIndex(i)}
              onTap={() => {
                setActiveIndex(null);
                if (exp.link) {
                  window.open(exp.link, "_blank", "noopener,noreferrer");
                }
              }}
              onTapCancel={() => setActiveIndex(null)}
              className={`flex items-center cursor-pointer transition-colors duration-150 ${
                isActive
                  ? "bg-[#E3EBFF] border-2 border-[#79A0FF]"
                  : isHovered
                    ? "bg-[#F3F3F3]"
                    : ""
              }`}
              style={{
                gap: "3.36cqi",
                borderRadius: "5.83cqi",
                padding: isActive ? "3.14cqi" : "3.59cqi",
              }}
            >
              {exp.logo && (
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={64}
                  height={64}
                  className={`shrink-0 ${
                    exp.company === "Upside Analytics"
                      ? "border border-black/[0.13]"
                      : ""
                  }`}
                  style={{
                    width: "14.3cqi",
                    height: "14.3cqi",
                    borderRadius: "4cqi",
                  }}
                />
              )}
              <div className="flex flex-col flex-1 min-w-0" style={{ gap: "0.4cqi" }}>
                <span
                  className="text-black font-medium tracking-[-0.02em]"
                  style={{ fontSize: "5.4cqi", lineHeight: "6.7cqi" }}
                >
                  {exp.company}
                </span>
                <span
                  className="text-[#8A8A8A] font-medium tracking-[-0.02em]"
                  style={{ fontSize: "4cqi", lineHeight: "5cqi" }}
                >
                  {exp.role}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isActive ? "#6EA1FF" : "#8A8A8A"}
                viewBox="0 0 256 256"
                className={`shrink-0 -rotate-90 transition-opacity duration-150 ${
                  isActive || isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{ width: "7.2cqi", height: "7.2cqi" }}
              >
                <path d="M198,88V192a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h89.52L59.76,68.24a6,6,0,0,1,8.48-8.48L186,177.52V88a6,6,0,0,1,12,0Z" />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
