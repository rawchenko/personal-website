"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { AnimateIn } from "@/components/animate-in";
import { Lightbox } from "@/components/lightbox";
import { asset } from "@/lib/utils";
import { CaseCard, type ShaderConfig } from "./case-card";
import { ImageCard } from "./image-card";
import { ExperienceCard } from "./experience-card";
import { ApplicationsCard } from "./applications-card";

interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

interface CaseRow {
  type: "case";
  projectSlug: string;
  label: string;
  description: string;
  dark?: boolean;
  background?: string;
  shaderConfig?: ShaderConfig;
  images?: CaseImage[];
}

interface HalfRow {
  type: "half";
  left: { kind: "image"; projectSlug: string } | { kind: "experience" } | { kind: "applications" };
  right: { kind: "image"; projectSlug: string } | { kind: "experience" } | { kind: "applications" };
}

type PortfolioRow = CaseRow | HalfRow;

const shaderStyle = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  height: "100%",
};

const rows: PortfolioRow[] = [
  {
    type: "case",
    projectSlug: "layersweep",
    label: "LayerSweep",
    description: "Figma Plugin",
    background: "color(display-p3 0.945 0.945 0.945)",
    shaderConfig: {
      type: "dithering",
      props: {
        speed: 0.16,
        shape: "ripple",
        type: "2x2",
        size: 2.4,
        scale: 1.15,
        colorBack: "#00000000",
        colorFront: "#009CFF45",
        style: { ...shaderStyle, backgroundColor: "color(display-p3 0.945 0.945 0.945)" },
      },
    },
    images: [
      {
        src: asset("/images/projects/layersweep-scan.png"),
        alt: "LayerSweep Scan view",
        width: 366,
        height: 465,
        style: {
          left: "10.5%",
          top: "11.2%",
          width: "38.1%",
          height: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        },
      },
      {
        src: asset("/images/projects/layersweep-swap.png"),
        alt: "LayerSweep Swap view",
        width: 366,
        height: 465,
        style: {
          left: "51.4%",
          top: "11.2%",
          width: "38.1%",
          height: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        },
      },
    ],
  },
  {
    type: "half",
    left: { kind: "image", projectSlug: "soulmate" },
    right: { kind: "image", projectSlug: "viante" },
  },
  {
    type: "case",
    projectSlug: "casino-brand",
    label: "Swiper",
    description: "Tiktok-style casino",
    dark: true,
    background: "color(display-p3 0.057 0.066 0.132)",
    shaderConfig: {
      type: "grain-gradient",
      props: {
        speed: 1.64,
        scale: 1,
        rotation: 196,
        offsetX: 0,
        offsetY: 0,
        softness: 1,
        intensity: 0,
        noise: 0.09,
        shape: "wave",
        colors: ["#47F1A7", "#279769", "#0E3C8F"],
        colorBack: "#00000000",
        style: { ...shaderStyle, backgroundColor: "color(display-p3 0.057 0.066 0.132)" },
      },
    },
    images: [
      {
        src: asset("/images/projects/casino-mockup.png"),
        alt: "Swiper casino app interfaces",
        width: 3840,
        height: 2400,
        style: {
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover" as const,
        },
      },
    ],
  },
  {
    type: "half",
    left: { kind: "image", projectSlug: "trading-app" },
    right: { kind: "experience" },
  },
  {
    type: "case",
    projectSlug: "brainrocket-showcase",
    label: "Brainrocket",
    description: "Showcase",
    dark: true,
    background: "black",
    shaderConfig: {
      type: "mesh-gradient",
      props: {
        speed: 1,
        scale: 1,
        distortion: 0,
        swirl: 0.52,
        colors: ["#000000", "#000000", "#FF0052FC", "#009B56"],
        style: shaderStyle,
      },
    },
    images: [
      {
        src: asset("/images/projects/brainrocket-showcase.png"),
        alt: "Brainrocket sports betting interface",
        width: 3409,
        height: 2459,
        style: {
          left: "16.8%",
          top: "11.5%",
          width: "66.4%",
          height: "auto",
          objectPosition: "33.333%",
        },
      },
    ],
  },
  {
    type: "half",
    left: { kind: "image", projectSlug: "diary-app" },
    right: { kind: "applications" },
  },
  {
    type: "case",
    projectSlug: "fyxation",
    label: "Fyxation",
    description: "E-commerce",
    background: "radial-gradient(ellipse 88.8% 70.9% at 50% 100%, oklab(80.9% -0.090 0.107) 0%, oklab(99.2% -0.012 0.038) 100%)",
    images: [
      {
        src: asset("/images/projects/fyxation-phones.png"),
        alt: "Fyxation e-commerce phone mockups",
        width: 1149,
        height: 744,
        style: {
          left: "-9.9%",
          top: 0,
          width: "119.7%",
          height: "124%",
          objectFit: "cover" as const,
        },
      },
    ],
  },
];

function HalfCell({
  cell,
  onImageClick,
  lightboxSlug,
}: {
  cell: HalfRow["left"];
  onImageClick: (src: string, alt: string, slug: string) => void;
  lightboxSlug: string | null;
}) {
  switch (cell.kind) {
    case "image":
      return (
        <ImageCard
          projectSlug={cell.projectSlug}
          onImageClick={onImageClick}
          isLightboxOpen={lightboxSlug === cell.projectSlug}
        />
      );
    case "experience":
      return <ExperienceCard />;
    case "applications":
      return <ApplicationsCard />;
  }
}

export function Portfolio() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    slug: string;
  } | null>(null);

  let itemIndex = 0;

  return (
    <LayoutGroup>
      <div className="flex flex-col gap-6">
        {rows.map((row, rowIdx) => {
          if (row.type === "case") {
            const idx = itemIndex++;
            return (
              <AnimateIn key={rowIdx} delay={idx * 0.04}>
                <CaseCard
                  projectSlug={row.projectSlug}
                  label={row.label}
                  description={row.description}
                  dark={row.dark}
                  background={row.background}
                  shaderConfig={row.shaderConfig}
                  images={row.images}
                />
              </AnimateIn>
            );
          }

          const leftIdx = itemIndex++;
          const rightIdx = itemIndex++;

          return (
            <div
              key={rowIdx}
              className="flex flex-col tablet:flex-row gap-6"
            >
              <AnimateIn
                delay={leftIdx * 0.04}
                className="w-full tablet:flex-1 tablet:min-w-0 aspect-square"
              >
                <HalfCell
                  cell={row.left}
                  onImageClick={(src, alt, slug) => setLightbox({ src, alt, slug })}
                  lightboxSlug={lightbox?.slug ?? null}
                />
              </AnimateIn>
              <AnimateIn
                delay={rightIdx * 0.04}
                className="w-full tablet:flex-1 tablet:min-w-0 aspect-square"
              >
                <HalfCell
                  cell={row.right}
                  onImageClick={(src, alt, slug) => setLightbox({ src, alt, slug })}
                  lightboxSlug={lightbox?.slug ?? null}
                />
              </AnimateIn>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key="v2-lightbox"
            src={lightbox.src}
            alt={lightbox.alt}
            layoutId={`v2-project-image-${lightbox.slug}`}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
