"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AnimateIn } from "@/components/animate-in";
import { Lightbox } from "@/components/lightbox";
import type { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
}

const easing: [number, number, number, number] = [0.32, 0.72, 0, 1];
const layoutTransition = { duration: 0.5, ease: easing };

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    slug: string;
  } | null>(null);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-2 gap-2 w-full pt-8 lg:pt-12">
        {projects.map((project, idx) => {
          const isCase = project.type === "case";
          const layoutId = `project-grid-image-${project.slug}`;
          const isOpen = lightbox?.slug === project.slug;

          if (isCase) {
            return (
              <AnimateIn
                key={project.slug}
                delay={idx * 0.05}
                className="col-span-2"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block group relative overflow-hidden active:scale-[0.98] transition-transform duration-200"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={828}
                      height={466}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-100 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-sm text-white">{project.title}</p>
                  </div>
                </Link>
              </AnimateIn>
            );
          }

          return (
            <AnimateIn
              key={project.slug}
              delay={idx * 0.05}
              className="col-span-1"
            >
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: project.thumbnail,
                    alt: project.title,
                    slug: project.slug,
                  })
                }
                className="block w-full group active:scale-[0.98] transition-transform duration-200 text-left"
              >
                <motion.div
                  layoutId={layoutId}
                  className="aspect-square relative overflow-hidden"
                  style={{ borderRadius: 16 }}
                  transition={{ layout: layoutTransition }}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={414}
                    height={518}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-100 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-sm text-white">{project.title}</p>
                  </div>
                </motion.div>
              </button>
            </AnimateIn>
          );
        })}
      </div>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key="lightbox"
            src={lightbox.src}
            alt={lightbox.alt}
            layoutId={`project-grid-image-${lightbox.slug}`}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
