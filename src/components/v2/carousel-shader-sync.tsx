"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface CarouselSlide {
  image: { src: string; alt: string; width: number; height: number };
  shaderColors: [string, string, string, string];
}

interface CarouselShaderSyncProps {
  slides: CarouselSlide[];
  intervalMs?: number;
  transitionMs?: number;
  imageStyle: React.CSSProperties;
  inView: boolean;
  onColorsChange: (colors: [string, string, string, string]) => void;
}

// --- Color interpolation utilities ---

function parseHex(hex: string): [number, number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) : 255;
  return [r, g, b, a];
}

function toHex(r: number, g: number, b: number, a: number): string {
  return (
    "#" +
    [r, g, b, a]
      .map((v) =>
        Math.round(Math.min(255, Math.max(0, v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1, a1] = parseHex(a);
  const [r2, g2, b2, a2] = parseHex(b);
  return toHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
    a1 + (a2 - a1) * t
  );
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

// --- Component ---

const SLIDE_EASE = [0.32, 0.72, 0, 1] as const;

export function CarouselShaderSync({
  slides,
  intervalMs = 4000,
  transitionMs = 800,
  imageStyle,
  inView,
  onColorsChange,
}: CarouselShaderSyncProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const prevSlideRef = useRef(0);
  const totalSlides = slides.length;

  // Interpolation state
  const interpRef = useRef<{
    startTime: number;
    from: [string, string, string, string];
    to: [string, string, string, string];
  } | null>(null);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [inView, intervalMs]);

  // Trigger color interpolation on slide change
  useEffect(() => {
    if (isSnapping) return;
    const fromIdx = prevSlideRef.current % totalSlides;
    const toIdx = currentSlide >= totalSlides ? 0 : currentSlide % totalSlides;
    interpRef.current = {
      startTime: performance.now(),
      from: slides[fromIdx].shaderColors,
      to: slides[toIdx].shaderColors,
    };
    prevSlideRef.current = currentSlide;
  }, [currentSlide, totalSlides, slides, isSnapping]);

  // rAF color interpolation loop
  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    const tick = () => {
      const interp = interpRef.current;
      if (interp) {
        const elapsed = performance.now() - interp.startTime;
        const t = Math.min(elapsed / transitionMs, 1);
        const eased = easeOutCubic(t);
        const colors = interp.from.map((from, i) =>
          lerpColor(from, interp.to[i], eased)
        ) as [string, string, string, string];
        onColorsChange(colors);
        if (t >= 1) interpRef.current = null;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, transitionMs, onColorsChange]);

  // Snap back to 0 after reaching clone slide
  const handleAnimationComplete = useCallback(() => {
    if (currentSlide >= totalSlides) {
      setIsSnapping(true);
      setCurrentSlide(0);
      // Reset snapping flag after React commits the instant update
      requestAnimationFrame(() => {
        setIsSnapping(false);
      });
    }
  }, [currentSlide, totalSlides]);

  const slideCount = totalSlides + 1; // +1 for clone

  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <motion.div
        animate={{ y: `${-currentSlide * (100 / slideCount)}%` }}
        transition={
          isSnapping
            ? { duration: 0 }
            : { duration: transitionMs / 1000, ease: [...SLIDE_EASE] }
        }
        onAnimationComplete={handleAnimationComplete}
        style={{ height: `${slideCount * 100}%` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative w-full"
            style={{ height: `${100 / slideCount}%` }}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              width={slide.image.width}
              height={slide.image.height}
              className="absolute"
              style={imageStyle}
              loading={i === 0 ? "eager" : "lazy"}
              priority={i === 0}
            />
          </div>
        ))}
        {/* Clone of first slide for seamless loop */}
        <div
          className="relative w-full"
          style={{ height: `${100 / slideCount}%` }}
        >
          <Image
            src={slides[0].image.src}
            alt={slides[0].image.alt}
            width={slides[0].image.width}
            height={slides[0].image.height}
            className="absolute"
            style={imageStyle}
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}
