"use client";

import { type ReactNode, useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, MagnifyingGlassPlus } from "@phosphor-icons/react";

interface CursorFollowerProps {
  children: ReactNode;
  label?: string;
  icon?: "arrow" | "expand";
}

const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };

const icons = {
  arrow: <ArrowUpRight size={18} weight="bold" />,
  expand: <MagnifyingGlassPlus size={18} weight="bold" />,
};

export function CursorFollower({
  children,
  label = "View Case",
  icon = "arrow",
}: CursorFollowerProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsDesktop(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Force cursor:none on all descendants when hovering
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isHovering) return;

    const styleId = "cursor-follower-style";
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent =
      ".cursor-follower-active, .cursor-follower-active * { cursor: none !important; }";
    el.classList.add("cursor-follower-active");

    return () => {
      el.classList.remove("cursor-follower-active");
    };
  }, [isHovering]);

  const enabled = isDesktop && !prefersReducedMotion;

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-[32px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      {children}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
              zIndex: 50,
              backdropFilter:
                "blur(16px) brightness(0.6) saturate(1.4)",
              WebkitBackdropFilter:
                "blur(16px) brightness(0.6) saturate(1.4)",
            }}
            className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-base font-medium text-white shadow-lg ring-1 ring-white/15"
          >
            {label}
            <motion.span
              initial={{ x: -4, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              {icons[icon]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
