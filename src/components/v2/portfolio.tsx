"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/animate-in";
import { Lightbox } from "@/components/lightbox";
import { asset } from "@/lib/utils";
import { CaseCard, type ShaderConfig, type CarouselConfig } from "./case-card";
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
  carousel?: CarouselConfig;
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
    carousel: {
      intervalMs: 1500,
      transitionMs: 500,
      imageStyle: {
        left: "16.8%",
        top: "11.5%",
        width: "66.4%",
        height: "auto",
      },
      slides: [
        {
          // Betoro — dark with red + green accents
          image: { src: asset("/images/projects/brainrocket-showcase-betoro.png"), alt: "Betoro sports betting", width: 3409, height: 2459 },
          shaderColors: ["#000000", "#000000", "#FF0052FC", "#009B56"],
        },
        {
          // Swiper — deep navy blue with electric blue glow
          image: { src: asset("/images/projects/brainrocket-showcase-swiper.png"), alt: "Swiper casino", width: 3409, height: 2459 },
          shaderColors: ["#030818", "#0B1A3D", "#1447E6", "#00C2FF"],
        },
        {
          // Kingmaker — rich purple with gold accents
          image: { src: asset("/images/projects/brainrocket-showcase-kingmaker.png"), alt: "Kingmaker", width: 3409, height: 2459 },
          shaderColors: ["#0E0320", "#2D0A5C", "#8B5CF6", "#D4A017"],
        },
        {
          // Slotuna — dark teal with warm amber
          image: { src: asset("/images/projects/brainrocket-showcase-slotuna.png"), alt: "Slotuna", width: 3409, height: 2459 },
          shaderColors: ["#051A1E", "#0A3040", "#0E7490", "#D4953A"],
        },
        {
          // Spinrollz — soft lavender blue with warm orange
          image: { src: asset("/images/projects/brainrocket-showcase-spinrollz.png"), alt: "Spinrollz", width: 3409, height: 2459 },
          shaderColors: ["#1A1A3E", "#2E2B6E", "#7B8CDE", "#F97316"],
        },
        {
          // Spinit — black with neon green/lime
          image: { src: asset("/images/projects/brainrocket-showcase-spinit.png"), alt: "Spinit", width: 3409, height: 2459 },
          shaderColors: ["#000000", "#0A1A0A", "#39FF14", "#00CC44"],
        },
        {
          // Wild Robin — dark brown with warm gold-green
          image: { src: asset("/images/projects/brainrocket-showcase-wildrobin.png"), alt: "Wild Robin", width: 3409, height: 2459 },
          shaderColors: ["#1A0E05", "#3D2510", "#8B6914", "#2D5A1E"],
        },
      ],
    },
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
  onImageClick: (src: string, alt: string, slug: string, rect: DOMRect) => void;
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
    rect: DOMRect;
  } | null>(null);

  let itemIndex = 0;

  return (
    <>
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
                  carousel={row.carousel}
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
                  onImageClick={(src, alt, slug, rect) => setLightbox({ src, alt, slug, rect })}
                  lightboxSlug={lightbox?.slug ?? null}
                />
              </AnimateIn>
              <AnimateIn
                delay={rightIdx * 0.04}
                className="w-full tablet:flex-1 tablet:min-w-0 aspect-square"
              >
                <HalfCell
                  cell={row.right}
                  onImageClick={(src, alt, slug, rect) => setLightbox({ src, alt, slug, rect })}
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
            slug={lightbox.slug}
            sourceRect={lightbox.rect}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
