"use client";

import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/data/projects";
import { getCaseStudyContent } from "@/data/case-studies";
import { BrainrocketHero } from "./brainrocket-hero";

interface CaseStudyOverlayContentProps {
  slug: string;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="aspect-[16/9] bg-neutral-100 rounded-lg flex items-center justify-center">
      <span className="text-neutral-400 text-sm">{label}</span>
    </div>
  );
}

function VideoPlayer({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full rounded-lg"
    />
  );
}

export function CaseStudyOverlayContent({
  slug,
  onClose,
  onNavigate,
}: CaseStudyOverlayContentProps) {
  const project = getProjectBySlug(slug);
  const content = getCaseStudyContent(slug);

  if (!project || !content) return null;

  const useSections = !!content.sections;

  // Find next case study project
  const caseProjects = projects.filter((p) => p.type === "case");
  const currentIndex = caseProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = caseProjects[(currentIndex + 1) % caseProjects.length];

  return (
    <div className="px-8 pt-4 pb-12">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 mb-6"
        aria-label="Close case study"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-neutral-600"
        >
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </button>

      {/* Title */}
      <h1 className="text-[28px] font-semibold tracking-tight leading-tight text-balance">
        {project.title}
      </h1>

      {/* Description */}
      <p className="text-neutral-500 mt-3 text-base leading-relaxed max-w-2xl">
        {project.description}
      </p>

      {/* Metadata row */}
      <div className="flex gap-8 mt-4 text-sm">
        <div>
          <p className="text-neutral-400">Role</p>
          <p className="text-neutral-700 mt-0.5">{project.role}</p>
        </div>
        <div>
          <p className="text-neutral-400">Year</p>
          <p className="text-neutral-700 mt-0.5">{project.year}</p>
        </div>
        <div>
          <p className="text-neutral-400">Tags</p>
          <p className="text-neutral-700 mt-0.5">{project.tags.join(", ")}</p>
        </div>
      </div>

      {/* Hero image */}
      <div className="mt-8">
        {slug === "brainrocket-showcase" ? (
          <BrainrocketHero />
        ) : (
          <ImagePlaceholder label={`Hero Image — ${project.title}`} />
        )}
      </div>

      {/* Content sections */}
      {useSections ? (
        <>
          {content.sections!.map((section) => (
            <div key={section.title}>
              <div className="py-16">
                <h2 className="text-sm font-medium text-neutral-500 mb-6">
                  {section.title}
                </h2>
                <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
                  {section.content}
                </div>
              </div>
              {section.videoUrl ? (
                <VideoPlayer src={section.videoUrl} />
              ) : section.imagePlaceholder ? (
                <ImagePlaceholder label={section.imagePlaceholder} />
              ) : null}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="py-16">
            <h2 className="text-sm font-medium text-neutral-500 mb-6">
              The Challenge
            </h2>
            <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
              {content.challenge}
            </div>
          </div>
          <ImagePlaceholder label="Process Image" />
          <div className="py-16">
            <h2 className="text-sm font-medium text-neutral-500 mb-6">
              The Process
            </h2>
            <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
              {content.process}
            </div>
          </div>
          <ImagePlaceholder label="Solution Image" />
          <div className="py-16">
            <h2 className="text-sm font-medium text-neutral-500 mb-6">
              The Solution
            </h2>
            <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
              {content.solution}
            </div>
          </div>
        </>
      )}

      {/* Next project */}
      <div className="py-16 border-t border-neutral-100">
        <p className="text-sm text-neutral-400 mb-4">Next Project</p>
        <button
          onClick={() => onNavigate(nextProject.slug)}
          className="group inline-block text-left"
        >
          <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
            {nextProject.title} &rarr;
          </h3>
        </button>
      </div>
    </div>
  );
}
