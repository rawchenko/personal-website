"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getProjectBySlug } from "@/data/projects";
import { CursorFollower } from "@/components/cursor-follower";

interface ImageCardProps {
  projectSlug: string;
  onImageClick?: (src: string, alt: string, slug: string) => void;
  isLightboxOpen?: boolean;
}

const layoutTransition = {
  layout: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  },
};

export function ImageCard({ projectSlug, onImageClick, isLightboxOpen }: ImageCardProps) {
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;

  const layoutId = `v2-project-image-${project.slug}`;

  return (
    <CursorFollower label="Quick Look" icon="expand">
      <button
        type="button"
        onClick={() => onImageClick?.(project.thumbnail, project.title, project.slug)}
        className="w-full h-full text-left active:scale-[0.99] transition-transform duration-200 group"
        style={{ containerType: "inline-size" }}
      >
        <motion.div
          layoutId={layoutId}
          className="w-full h-full relative overflow-hidden"
          style={{ borderRadius: 0, backgroundColor: "#f1f1f1" }}
          transition={layoutTransition}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, min(calc((100vw - 448px - 20px) / 2), 486px)"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </motion.div>
      </button>
    </CursorFollower>
  );
}
