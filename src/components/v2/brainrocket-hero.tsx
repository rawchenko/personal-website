"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { asset } from "@/lib/utils";
import { CarouselShaderSync, type CarouselSlide } from "./carousel-shader-sync";

const shaderStyle = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  height: "100%",
};

const slides: CarouselSlide[] = [
  {
    image: { src: asset("/images/projects/brainrocket-showcase-betoro.png"), alt: "Betoro sports betting", width: 3409, height: 2459 },
    shaderColors: ["#000000", "#000000", "#FF0052FC", "#009B56"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-swiper.png"), alt: "Swiper casino", width: 3409, height: 2459 },
    shaderColors: ["#030818", "#0B1A3D", "#1447E6", "#00C2FF"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-kingmaker.png"), alt: "Kingmaker", width: 3409, height: 2459 },
    shaderColors: ["#0E0320", "#2D0A5C", "#8B5CF6", "#D4A017"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-slotuna.png"), alt: "Slotuna", width: 3409, height: 2459 },
    shaderColors: ["#051A1E", "#0A3040", "#0E7490", "#D4953A"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-spinrollz.png"), alt: "Spinrollz", width: 3409, height: 2459 },
    shaderColors: ["#1A1A3E", "#2E2B6E", "#7B8CDE", "#F97316"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-spinit.png"), alt: "Spinit", width: 3409, height: 2459 },
    shaderColors: ["#000000", "#0A1A0A", "#39FF14", "#00CC44"],
  },
  {
    image: { src: asset("/images/projects/brainrocket-showcase-wildrobin.png"), alt: "Wild Robin", width: 3409, height: 2459 },
    shaderColors: ["#1A0E05", "#3D2510", "#8B6914", "#2D5A1E"],
  },
];

const imageStyle: React.CSSProperties = {
  left: "16.8%",
  top: "11.5%",
  width: "66.4%",
  height: "auto",
};

const initialColors = slides[0].shaderColors;

export function BrainrocketHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [colors, setColors] = useState<[string, string, string, string]>(initialColors);

  const handleColorsChange = useCallback((c: [string, string, string, string]) => {
    setColors(c);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[960/600] overflow-hidden rounded-lg"
      style={{ background: "black" }}
    >
      <MeshGradient
        speed={inView ? 1 : 0}
        scale={1}
        distortion={0}
        swirl={0.52}
        colors={colors}
        style={shaderStyle}
      />
      <CarouselShaderSync
        slides={slides}
        intervalMs={1500}
        transitionMs={500}
        imageStyle={imageStyle}
        inView={inView}
        onColorsChange={handleColorsChange}
      />
    </div>
  );
}
