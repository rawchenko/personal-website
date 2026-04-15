"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Dithering, GrainGradient, MeshGradient } from "@paper-design/shaders-react";
import { getProjectBySlug } from "@/data/projects";
import { Card } from "./card";
import { CarouselShaderSync, type CarouselSlide } from "./carousel-shader-sync";

interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

export interface ShaderConfig {
  type: "dithering" | "grain-gradient" | "mesh-gradient";
  props: Record<string, unknown>;
}

export interface CarouselConfig {
  slides: CarouselSlide[];
  intervalMs?: number;
  transitionMs?: number;
  imageStyle: React.CSSProperties;
}

interface CaseCardProps {
  projectSlug: string;
  label: string;
  description: string;
  dark?: boolean;
  background?: string;
  shaderConfig?: ShaderConfig;
  images?: CaseImage[];
  carousel?: CarouselConfig;
}

function ShaderRenderer({ config, inView }: { config: ShaderConfig; inView: boolean }) {
  const speed = inView ? (config.props.speed as number) : 0;
  const props = { ...config.props, speed };

  switch (config.type) {
    case "dithering":
      return <Dithering {...props as React.ComponentProps<typeof Dithering>} />;
    case "grain-gradient":
      return <GrainGradient {...props as React.ComponentProps<typeof GrainGradient>} />;
    case "mesh-gradient":
      return <MeshGradient {...props as React.ComponentProps<typeof MeshGradient>} />;
  }
}

export function CaseCard({
  projectSlug,
  label,
  description,
  background,
  shaderConfig,
  images,
  carousel,
}: CaseCardProps) {
  const project = getProjectBySlug(projectSlug);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [dynamicColors, setDynamicColors] = useState<[string, string, string, string] | null>(null);

  const handleColorsChange = useCallback((colors: [string, string, string, string]) => {
    setDynamicColors(colors);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  if (!project) return null;

  const effectiveShaderConfig = shaderConfig
    ? dynamicColors
      ? { ...shaderConfig, props: { ...shaderConfig.props, colors: dynamicColors } }
      : shaderConfig
    : undefined;

  return (
    <Card href={`/work/${project.slug}`}>
      <div
        ref={cardRef}
        className="relative w-full aspect-[960/600] overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.08)]"
        style={{ background: background || "var(--color-card-dark)" }}
      >
        {effectiveShaderConfig && <ShaderRenderer config={effectiveShaderConfig} inView={inView} />}
        {carousel ? (
          <CarouselShaderSync
            slides={carousel.slides}
            intervalMs={carousel.intervalMs}
            transitionMs={carousel.transitionMs}
            imageStyle={carousel.imageStyle}
            inView={inView}
            onColorsChange={handleColorsChange}
          />
        ) : images ? (
          images.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="absolute z-10 group-hover:scale-[1.02] transition-transform duration-300 origin-center"
              style={img.style}
            />
          ))
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 960px) 100vw, min(calc(100vw - 448px), 992px)"
            className="object-cover z-10 group-hover:scale-[1.02] transition-transform duration-300"
          />
        )}
      </div>
      {/* Info bar */}
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-1">
          <span className="text-label font-semibold text-text-primary">
            {label}
          </span>
          <span className="text-label font-semibold text-text-primary/50">
            {description}
          </span>
        </div>
        <div className="flex items-center text-label font-semibold text-text-primary">
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
}
