"use client";

import Image from "next/image";
import { getProjectBySlug } from "@/data/projects";
import { Card } from "./card";

interface ImageCardProps {
  projectSlug: string;
  onImageClick?: (src: string, alt: string, slug: string, rect: DOMRect) => void;
  isLightboxOpen?: boolean;
}

export function ImageCard({ projectSlug, onImageClick }: ImageCardProps) {
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;

  return (
    <Card
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onImageClick?.(project.thumbnail, project.title, project.slug, rect);
      }}
      cursorLabel="Quick Look"
      cursorIcon="expand"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="w-full h-full relative overflow-hidden rounded-3xl border border-border-card shadow-card"
        style={{ backgroundColor: "var(--color-surface-subtle)" }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, min(calc((100vw - 448px - 20px) / 2), 486px)"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
    </Card>
  );
}
