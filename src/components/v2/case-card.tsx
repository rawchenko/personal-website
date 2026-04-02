"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Dithering, GrainGradient, MeshGradient } from "@paper-design/shaders-react";
import { getProjectBySlug } from "@/data/projects";
import { CursorFollower } from "@/components/cursor-follower";

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

interface CaseCardProps {
  projectSlug: string;
  label: string;
  description: string;
  dark?: boolean;
  background?: string;
  shaderConfig?: ShaderConfig;
  images?: CaseImage[];
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

export function CaseCard({ projectSlug, label, description, dark, background, shaderConfig, images }: CaseCardProps) {
  const project = getProjectBySlug(projectSlug);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  const textColor = dark ? "text-white" : "text-[#343434]";
  const mutedColor = dark ? "text-white/50" : "text-[#343434]/50";
  const strokeColor = dark ? "#FFFFFF" : "#343434";

  return (
    <CursorFollower>
      <Link
        href={`/work/${project.slug}`}
        className="group block active:scale-[0.99] transition-transform duration-200"
      >
        <div
          ref={cardRef}
          className="relative w-full aspect-[960/600] overflow-hidden"
          style={{ background: background || "var(--color-card-dark)" }}
        >
          {shaderConfig && <ShaderRenderer config={shaderConfig} inView={inView} />}
          {images ? (
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
            <span className="text-sm font-semibold tracking-[-0.03em] text-[#343434]">
              {label}
            </span>
            <span className="text-sm font-semibold tracking-[-0.03em] text-[#343434]/50">
              {description}
            </span>
          </div>
          <div className="flex items-center text-sm font-semibold tracking-[-0.03em] text-[#343434]">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#343434"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </CursorFollower>
  );
}
