"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/utils";
import { tools } from "@/data/about";

export function ApplicationsCard() {
  const prefersReducedMotion = useReducedMotion();
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
      className="w-full h-full overflow-hidden rounded-3xl border border-border-card bg-surface-subtle shadow-card"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="w-full h-full"
        style={{ padding: "6.28cqi" }}
      >
        <div
          className="flex flex-col w-full h-full"
          style={{ gap: "4.48cqi" }}
        >
          {/* Header */}
          <div className="flex flex-col shrink-0" style={{ gap: "3.59cqi" }}>
            <div className="flex items-center" style={{ gap: "3.59cqi" }}>
              <svg
                viewBox="0 0 38 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50 shrink-0"
                style={{ width: "8.52cqi", height: "7.62cqi" }}
              >
                <path
                  d="M21.81 0.012C22.195 -0.028 22.583 0.032 22.937 0.187C23.478 0.422 23.997 0.945 24.198 1.503C24.55 2.478 23.725 3.619 23.325 4.447C22.877 5.373 22.339 6.21 21.846 7.091C20.688 9.206 19.498 11.303 18.275 13.381C16.808 15.834 15.175 18.346 13.998 20.95C14.981 20.92 16.076 20.927 17.058 20.915C18.082 20.904 19.786 20.836 20.735 21.08C21.246 21.212 21.717 21.468 22.105 21.825C22.808 22.471 23.658 24.302 22.914 25.196C22.437 25.77 20.807 25.627 20.027 25.623L17.161 25.616L10.146 25.569C8.813 25.57 7.479 25.606 6.145 25.621C4.828 25.617 1.985 25.855 1.002 25.219C-0.517 24.235 -0.251 21.917 1.409 21.169C2.146 20.837 2.811 21.003 3.502 20.935C4.881 20.798 7.179 21.162 8.457 20.891L8.476 20.887C8.693 20.578 8.974 19.974 9.172 19.621C9.402 19.162 9.759 18.706 9.976 18.247C11.421 15.192 13.481 12.493 15.068 9.514C15.44 8.816 15.938 8.186 16.212 7.434C16.025 7.215 15.717 6.675 15.561 6.412C14.917 5.336 14.333 4.225 13.811 3.085C13.57 2.552 13.434 2.172 13.668 1.589C13.888 1.039 14.345 0.44 14.895 0.204C15.371 -0 16.25 0.012 16.716 0.215C17.635 0.616 18.503 2.316 18.864 3.186C19.003 2.923 19.142 2.645 19.28 2.382C20.032 0.951 19.994 0.162 21.81 0.012Z"
                  fill="var(--color-icon-muted)"
                />
                <path
                  d="M22.509 9.728C22.896 9.84 24.394 12.558 24.637 13.002L25.88 15.245C26.704 16.75 27.64 18.219 28.437 19.741C28.694 20.233 28.955 20.786 29.439 21.085C29.861 21.057 30.283 21.031 30.706 21.009C32.317 20.938 33.937 20.905 35.551 21.015C36.785 21.078 37.732 22.01 37.782 23.258C37.879 25.685 35.624 25.649 33.88 25.646C33.213 25.639 32.546 25.644 31.88 25.662C32.589 26.832 33.472 28.042 34.077 29.219C34.362 29.77 34.78 30.742 34.62 31.352C34.436 31.942 33.979 32.649 33.431 32.969C32.139 33.748 30.947 32.96 30.195 31.85C29.4 30.675 28.743 29.323 28.031 28.09L24.606 22.202C23.704 20.615 22.834 18.888 21.847 17.354C20.72 15.602 20.915 13.667 21.342 11.715C21.511 10.943 21.803 10.159 22.509 9.728Z"
                  fill="var(--color-icon-muted)"
                />
                <path
                  d="M5.327 26.825C6.843 27.138 8.067 27.759 9.482 28.107C9.213 28.626 9.046 29.226 8.774 29.738C8.178 30.859 7.717 32.01 6.648 32.75C6.523 32.823 6.398 32.894 6.271 32.963C5.751 33.242 5.153 33.279 4.591 33.104C4.005 32.92 3.518 32.509 3.238 31.962C2.552 30.626 3.793 29.016 4.482 27.927C4.658 27.651 5.046 26.967 5.327 26.825Z"
                  fill="var(--color-icon-muted)"
                />
              </svg>
              <span
                className="text-text-muted font-medium tracking-snug"
                style={{ fontSize: "5.83cqi", lineHeight: "7.17cqi" }}
              >
                Applications
              </span>
            </div>
            <div
              className="w-full bg-border-subtle"
              style={{ height: "0.45cqi" }}
            />
          </div>
          {/* Icons grid */}
          <div
            className="grid grid-cols-3 flex-1"
            style={{ gap: "6.28cqi" }}
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.15, y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onHoverStart={prefersReducedMotion ? undefined : playPop}
                className="flex flex-col items-center cursor-pointer"
                style={{ gap: "2.47cqi" }}
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={110}
                  height={110}
                  className="shadow-md transition-shadow duration-200 hover:shadow-lg"
                  style={{
                    width: "24.66cqi",
                    height: "24.66cqi",
                    borderRadius: "6.50cqi",
                  }}
                />
                <span
                  className="text-text-heading"
                  style={{ fontSize: "4.04cqi", lineHeight: "4.93cqi" }}
                >
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
