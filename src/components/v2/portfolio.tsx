"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/animate-in";
import { Lightbox } from "@/components/lightbox";
import { CaseCard } from "./case-card";
import { ImageCard } from "./image-card";
import { ExperienceCard } from "./experience-card";
import { ApplicationsCard } from "./applications-card";

interface CaseRow {
  type: "case";
  projectSlug: string;
  label: string;
  description: string;
}

interface HalfRow {
  type: "half";
  left: { kind: "image"; projectSlug: string } | { kind: "experience" } | { kind: "applications" };
  right: { kind: "image"; projectSlug: string } | { kind: "experience" } | { kind: "applications" };
}

type PortfolioRow = CaseRow | HalfRow;

const rows: PortfolioRow[] = [
  {
    type: "case",
    projectSlug: "layersweep",
    label: "LayerSweep",
    description: "Figma Plugin",
  },
  {
    type: "case",
    projectSlug: "brainrocket-showcase",
    label: "Brainrocket",
    description: "Showcase",
  },
  {
    type: "case",
    projectSlug: "casino-brand",
    label: "Swiper",
    description: "Tiktok-style casino",
  },
  {
    type: "half",
    left: { kind: "experience" },
    right: { kind: "applications" },
  },
  {
    type: "half",
    left: { kind: "image", projectSlug: "soulmate" },
    right: { kind: "image", projectSlug: "viante" },
  },
  {
    type: "half",
    left: { kind: "image", projectSlug: "trading-app" },
    right: { kind: "image", projectSlug: "diary-app" },
  },
  {
    type: "case",
    projectSlug: "fyxation",
    label: "Fyxation",
    description: "E-commerce",
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
      <div className="flex flex-col gap-4">
        {rows.map((row, rowIdx) => {
          if (row.type === "case") {
            const idx = itemIndex++;
            return (
              <AnimateIn key={rowIdx} delay={idx * 0.04}>
                <CaseCard
                  projectSlug={row.projectSlug}
                  label={row.label}
                  description={row.description}
                  eager={idx === 0}
                />
              </AnimateIn>
            );
          }

          const leftIdx = itemIndex++;
          const rightIdx = itemIndex++;

          return (
            <div
              key={rowIdx}
              className="flex flex-col tablet:flex-row gap-4"
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
