"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectBySlug } from "@/data/projects";
import { CursorFollower } from "@/components/cursor-follower";
import type { ProjectCard as ProjectCardType } from "@/data/grid-items";

interface ProjectCardProps {
  item: ProjectCardType;
  onImageClick?: (src: string, alt: string) => void;
  isLightboxOpen?: boolean;
}

const layoutTransition = {
  layout: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  },
};

export function ProjectCard({ item, onImageClick, isLightboxOpen }: ProjectCardProps) {
  const project = getProjectBySlug(item.projectSlug);
  if (!project) return null;

  const isCase = project.type === "case";
  const isDark = item.variant === "dark";
  const fit = item.objectFit ?? "cover";
  const layoutId = `project-image-${project.slug}`;
  const bg = isDark ? "var(--color-card-dark)" : "#f5f5f5";

  if (isCase) {
    const className = `group relative overflow-hidden rounded-[32px] w-full h-full active:scale-[0.99] transition-transform duration-200 ${
      isDark ? "bg-[var(--color-card-dark)]" : "bg-neutral-100"
    }`;

    return (
      <CursorFollower>
        <Link href={`/work/${project.slug}`} className={`block ${className}`}>
          {fit === "contain" ? (
            <div className="absolute inset-3 lg:inset-5">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes={item.span === "full" ? "100vw" : "50vw"}
                className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes={item.span === "full" ? "100vw" : "50vw"}
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          )}
          {item.overlayLabel && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-base font-semibold text-white">
                {item.overlayLabel}
              </p>
            </div>
          )}
        </Link>
      </CursorFollower>
    );
  }

  return (
    <CursorFollower label="Quick Look" icon="expand">
      <button
        type="button"
        onClick={() => onImageClick?.(project.thumbnail, project.title)}
        className="w-full h-full text-left active:scale-[0.99] transition-transform duration-200 group"
      >
        <motion.div
          layoutId={layoutId}
          className="w-full h-full relative overflow-hidden"
          style={{ borderRadius: 32, backgroundColor: bg }}
          transition={layoutTransition}
        >
          {fit === "contain" ? (
            <div className="absolute inset-3 lg:inset-5">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes={item.span === "full" ? "100vw" : "50vw"}
                className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes={item.span === "full" ? "100vw" : "50vw"}
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          )}
          {item.overlayLabel && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-base font-semibold text-white">
                {item.overlayLabel}
              </p>
            </div>
          )}
        </motion.div>
      </button>
    </CursorFollower>
  );
}
