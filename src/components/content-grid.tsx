"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { AnimateIn } from "@/components/animate-in";
import { Lightbox } from "@/components/lightbox";
import { ProjectCard } from "@/components/cards/project-card";
import { InfoCard } from "@/components/cards/info-card";
import { PlaceholderCard } from "@/components/cards/placeholder-card";
import type { GridItem } from "@/data/grid-items";

interface ContentGridProps {
  items: GridItem[];
}

type Row = GridItem[];

function groupRows(items: GridItem[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].span === "full") {
      rows.push([items[i]]);
      i++;
    } else {
      if (i + 1 < items.length && items[i + 1].span === "half") {
        rows.push([items[i], items[i + 1]]);
        i += 2;
      } else {
        rows.push([items[i]]);
        i++;
      }
    }
  }
  return rows;
}

function CardRenderer({
  item,
  onImageClick,
  openSlug,
}: {
  item: GridItem;
  onImageClick: (src: string, alt: string, slug: string) => void;
  openSlug: string | null;
}) {
  switch (item.type) {
    case "project":
      return (
        <ProjectCard
          item={item}
          onImageClick={(src, alt) =>
            onImageClick(src, alt, item.projectSlug)
          }
          isLightboxOpen={openSlug === item.projectSlug}
        />
      );
    case "info":
      return <InfoCard item={item} />;
    case "placeholder":
      return <PlaceholderCard />;
  }
}

export function ContentGrid({ items }: ContentGridProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    slug: string;
  } | null>(null);

  const rows = groupRows(items);
  let itemIndex = 0;

  return (
    <LayoutGroup>
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex gap-2 ${
              row.length === 1 && row[0].span === "full" ? "" : "flex-col sm:flex-row"
            }`}
          >
            {row.map((item) => {
              const idx = itemIndex++;
              return (
                <AnimateIn
                  key={item.id}
                  delay={idx * 0.04}
                  className={
                    item.span === "full"
                      ? "w-full aspect-[2/1]"
                      : "w-full sm:w-1/2 aspect-square"
                  }
                >
                  <CardRenderer
                    item={item}
                    openSlug={lightbox?.slug ?? null}
                    onImageClick={(src, alt, slug) =>
                      setLightbox({ src, alt, slug })
                    }
                  />
                </AnimateIn>
              );
            })}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key="lightbox"
            src={lightbox.src}
            alt={lightbox.alt}
            layoutId={`project-image-${lightbox.slug}`}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
