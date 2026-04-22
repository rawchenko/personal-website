"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKey } from "@phosphor-icons/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Dithering, GrainGradient, MeshGradient, DotGrid } from "@paper-design/shaders-react";
import { getProjectBySlug } from "@/data/projects";
import {
  getProjectPreview,
  type ShaderConfig,
  type OverlayLayer,
  type CarouselConfig,
  type CaseImage,
} from "@/data/project-previews";
import { Card } from "./card";
import { CarouselShaderSync } from "./carousel-shader-sync";
import {
  hasProjectAccess,
  ProjectAccessDialog,
} from "./project-access-dialog";

export type { ShaderConfig, OverlayLayer, CarouselConfig, CaseImage };

interface CaseCardProps {
  projectSlug: string;
  label: string;
  description: string;
  eager?: boolean;
}

interface ProjectPreviewProps {
  projectSlug: string;
  eager?: boolean;
  showAccessOverlay?: boolean;
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
    case "dot-grid":
      return <DotGrid {...props as React.ComponentProps<typeof DotGrid>} />;
  }
}

export function ProjectPreview({
  projectSlug,
  eager,
  showAccessOverlay = true,
}: ProjectPreviewProps) {
  const project = getProjectBySlug(projectSlug);
  const preview = getProjectPreview(projectSlug);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(!!eager);
  const [dynamicColors, setDynamicColors] = useState<[string, string, string, string] | null>(null);

  const handleColorsChange = useCallback((colors: [string, string, string, string]) => {
    setDynamicColors(colors);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const rafId = requestAnimationFrame(() => {
        setInView(true);
        setHasBeenInView(true);
      });
      return () => cancelAnimationFrame(rafId);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!project) return null;

  const background = preview?.background;
  const shaderConfig = preview?.shaderConfig;
  const shaderClassName = preview?.shaderClassName;
  const images = preview?.images;
  const overlayLayers = preview?.overlayLayers;
  const carousel = preview?.carousel;
  const access = showAccessOverlay ? preview?.access : undefined;

  const effectiveShaderConfig = shaderConfig
    ? dynamicColors
      ? { ...shaderConfig, props: { ...shaderConfig.props, colors: dynamicColors } }
      : shaderConfig
    : undefined;

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-[960/600] overflow-hidden rounded-lg border border-border-card bg-[#fbfbfa] shadow-card dark:bg-card-dark"
      style={access ? undefined : { background: background || "var(--color-card-dark)" }}
    >
      {access && (
        <div className="absolute inset-0 bg-[#fbfbfa] dark:bg-black" />
      )}
      <div
        className={
          access
            ? "absolute inset-0 scale-[1.04] blur-2xl opacity-42 brightness-[1.22] contrast-70 saturate-[0.58] dark:opacity-60 dark:brightness-100 dark:contrast-100 dark:saturate-[0.45]"
            : "absolute inset-0"
        }
      >
        {effectiveShaderConfig && hasBeenInView && (
          <div className={shaderClassName || "absolute inset-0"}>
            <ShaderRenderer config={effectiveShaderConfig} inView={inView} />
          </div>
        )}
        {overlayLayers?.map((layer, i) => (
          <div
            key={i}
            className={layer.className}
            style={layer.style}
          />
        ))}
        {carousel ? (
          <CarouselShaderSync
            slides={carousel.slides}
            intervalMs={carousel.intervalMs}
            transitionMs={carousel.transitionMs}
            imageStyle={carousel.imageStyle}
            inView={inView}
            onColorsChange={handleColorsChange}
          />
        ) : images && images.length > 0 ? (
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
        ) : !preview ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 960px) 100vw, min(calc(100vw - 448px), 992px)"
            className="object-cover z-10 group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : null}
      </div>
      {access && (
        <div className="absolute inset-0 z-20 bg-white/[0.14] backdrop-blur-md dark:bg-black/45 dark:backdrop-blur-md">
          <div className="absolute left-4 top-4 rounded-full border border-black/[0.05] bg-white/[0.34] px-3 py-1 text-[11px] font-semibold leading-none text-neutral-700 backdrop-blur-lg dark:border-white/[0.14] dark:bg-white/[0.08] dark:text-white/90 tablet:left-6 tablet:top-6">
            {access.label}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-lg border border-black/[0.05] bg-white/[0.36] px-4 py-3 text-sm font-medium text-neutral-700 backdrop-blur-lg dark:border-white/[0.12] dark:bg-black/[0.28] dark:text-white/[0.88]">
              <LockKey size={18} weight="bold" aria-hidden />
              <span>{access.note}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function CaseCard({
  projectSlug,
  label,
  description,
  eager,
}: CaseCardProps) {
  const router = useRouter();
  const project = getProjectBySlug(projectSlug);
  const preview = getProjectPreview(projectSlug);
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);

  if (!project) return null;

  const href = `/work/${project.slug}`;
  const access = preview?.access;

  const cardContent = (
    <>
      <ProjectPreview projectSlug={projectSlug} eager={eager} />
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
    </>
  );

  if (access) {
    return (
      <>
        <Card
          onClick={() => {
            if (hasProjectAccess(project.slug)) {
              router.push(href);
              return;
            }

            setIsAccessDialogOpen(true);
          }}
        >
          {cardContent}
        </Card>
        <ProjectAccessDialog
          open={isAccessDialogOpen}
          projectTitle={project.title}
          slug={project.slug}
          onClose={() => setIsAccessDialogOpen(false)}
          onUnlock={() => {
            setIsAccessDialogOpen(false);
            router.push(href);
          }}
        />
      </>
    );
  }

  return (
    <Card href={href}>
      {cardContent}
    </Card>
  );
}
