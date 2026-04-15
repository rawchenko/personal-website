"use client";
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import {
  getCaseStudyContent,
  type CaseStudyBlock,
  type CaseStudyMediaFrame,
  type CaseStudySection,
} from "@/data/case-studies";
import { ZigzagDivider } from "./zigzag-divider";
import { Button } from "./button";
import { Heading } from "./heading";

interface CaseStudyBodyProps {
  slug: string;
  variant: "page" | "overlay";
  onClose?: () => void;
  onNavigate?: (slug: string) => void;
}

const richTextClass =
  "text-body text-text-primary [&_p]:m-0 [&_p]:text-body [&_p]:text-text-primary [&_strong]:font-semibold [&_.font-semibold]:font-semibold [&_code]:rounded [&_code]:bg-code-bg [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm";

function BackArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.65 6.76a1 1 0 0 0-1.3-1.52l-7 6a1 1 0 0 0 0 1.52l7 6a1 1 0 0 0 1.3-1.52L5.704 13H21a1 1 0 1 0 0-2H5.703l4.948-4.24Z"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function BackButton({
  variant,
  onClose,
}: {
  variant: "page" | "overlay";
  onClose?: () => void;
}) {
  const className =
    "inline-flex h-10 items-center gap-2 rounded-full bg-button-back pl-4 pr-5 text-base text-text-heading shadow-[0_0_0_2px_rgba(255,255,255,0.1)] backdrop-blur-[4px] transition-colors duration-200 hover:bg-button-back-hover";

  if (variant === "overlay") {
    return (
      <button onClick={onClose} className={className} aria-label="Go back">
        <BackArrowIcon />
        <span>Back</span>
      </button>
    );
  }

  return (
    <Link href="/" className={className}>
      <BackArrowIcon />
      <span>Back</span>
    </Link>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-[223px] w-full items-center justify-center rounded-3xl border border-border-card bg-surface-inset px-6 text-center text-sm text-neutral-400 shadow-card tablet:h-[600px]">
      <span>{label}</span>
    </div>
  );
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showCenterFeedback, setShowCenterFeedback] = useState(false);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashCenterFeedback = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    setShowCenterFeedback(true);
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowCenterFeedback(false);
      feedbackTimeoutRef.current = null;
    }, 700);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }

    flashCenterFeedback();
  };

  const updateTimeline = (nextTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleTimelineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTimeline(Number(event.currentTarget.value));
  };

  const handleTimelineInput = (event: React.FormEvent<HTMLInputElement>) => {
    updateTimeline(Number(event.currentTarget.value));
  };

  const timelineMax = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const progressPercent =
    timelineMax > 0 ? `${(Math.min(currentTime, timelineMax) / timelineMax) * 100}%` : "0%";

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-border-card bg-surface-inset shadow-card">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration;
          setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
        }}
        onDurationChange={(event) => {
          const nextDuration = event.currentTarget.duration;
          setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        className="block w-full bg-surface-inset"
        onClick={togglePlayback}
      />
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          showCenterFeedback ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(18,18,18,0.5)] text-white backdrop-blur-md">
          {isPlaying ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="2.5" width="4" height="13" rx="1.2" fill="currentColor" />
              <rect x="11" y="2.5" width="4" height="13" rx="1.2" fill="currentColor" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 3.018C4 2.023 5.077 1.404 5.935 1.904L14.734 7.024C15.59 7.523 15.59 8.758 14.734 9.256L5.935 14.377C5.077 14.876 4 14.257 4 13.262V3.018Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
        <div className="flex items-center gap-3 rounded-2xl bg-[rgba(22,22,22,0.52)] px-3 py-2 backdrop-blur-md">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              togglePlayback();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(0,0,0,0.34)] text-white transition-colors duration-200 hover:bg-[rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="1.5" width="3.25" height="11" rx="1" fill="currentColor" />
                <rect x="8.75" y="1.5" width="3.25" height="11" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 2.347C3 1.573 3.838 1.092 4.505 1.48L11.349 5.463C12.014 5.85 12.014 6.81 11.349 7.197L4.505 11.18C3.838 11.568 3 11.087 3 10.313V2.347Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={timelineMax}
            step={0.01}
            value={Math.min(currentTime, timelineMax)}
            onClick={(event) => event.stopPropagation()}
            onInput={(event) => {
              event.stopPropagation();
              handleTimelineInput(event);
            }}
            onChange={(event) => {
              event.stopPropagation();
              handleTimelineChange(event);
            }}
            style={
              {
                "--timeline-progress": progressPercent,
                background: `linear-gradient(to right, #ffffff 0%, #ffffff ${progressPercent}, rgba(255,255,255,0.3) ${progressPercent}, rgba(255,255,255,0.3) 100%)`,
              } as React.CSSProperties
            }
            className="video-timeline h-9 w-full cursor-pointer appearance-none rounded-full bg-transparent"
            aria-label="Seek video timeline"
          />
        </div>
      </div>
    </div>
  );
}

function FullImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="block w-full rounded-3xl border border-border-card shadow-card"
    />
  );
}

function CanvasImage({
  src,
  alt,
  desktopFrame,
  mobileFrame,
}: {
  src: string;
  alt: string;
  desktopFrame: CaseStudyMediaFrame;
  mobileFrame: CaseStudyMediaFrame;
}) {
  return (
    <div className="relative h-[224px] w-full shrink-0 bg-surface-inset tablet:h-[600px]">
      <img
        src={src}
        alt={alt}
        className="absolute rounded border border-border-image object-cover tablet:hidden"
        style={{
          width: `${mobileFrame.width}px`,
          height: `${mobileFrame.height}px`,
          left: `${mobileFrame.left}px`,
          top: `${mobileFrame.top}px`,
        }}
      />
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute hidden rounded border border-border-image object-cover tablet:block"
        style={{
          width: `${desktopFrame.width}px`,
          height: `${desktopFrame.height}px`,
          left: `${desktopFrame.left}px`,
          top: `${desktopFrame.top}px`,
        }}
      />
    </div>
  );
}

function renderMedia({
  videoUrl,
  imageUrl,
  imageAlt,
  imagePlaceholder,
  mediaLayout,
  desktopFrame,
  mobileFrame,
}: {
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
  mediaLayout?: "full" | "canvas";
  desktopFrame?: CaseStudyMediaFrame;
  mobileFrame?: CaseStudyMediaFrame;
}) {
  if (videoUrl) return <VideoPlayer src={videoUrl} />;

  if (imageUrl) {
    if (mediaLayout === "canvas" && desktopFrame && mobileFrame) {
      return (
        <CanvasImage
          src={imageUrl}
          alt={imageAlt ?? "Case study image"}
          desktopFrame={desktopFrame}
          mobileFrame={mobileFrame}
        />
      );
    }

    return <FullImage src={imageUrl} alt={imageAlt ?? "Case study image"} />;
  }

  if (imagePlaceholder) {
    return <ImagePlaceholder label={imagePlaceholder} />;
  }

  return null;
}

function BlockMedia({ block }: { block: CaseStudyBlock }) {
  return renderMedia(block);
}

function SectionMedia({ section }: { section: CaseStudySection }) {
  return renderMedia(section);
}

function SectionContent({ section }: { section: CaseStudySection }) {
  if (section.layout === "two-column") {
    return (
      <div className="flex flex-col gap-5 tablet:flex-row">
        <div className={`flex flex-1 flex-col gap-5 ${richTextClass}`}>
          {section.content}
        </div>
        {section.rightColumn ? (
          <div className={`flex flex-1 flex-col gap-3 ${richTextClass}`}>
            {section.rightColumn}
          </div>
        ) : null}
      </div>
    );
  }

  if (section.layout === "blocks-with-media") {
    return (
      <div className="flex flex-col gap-5">
        {section.title ? <Heading level={2}>{section.title}</Heading> : null}
        {section.blocks?.map((block) => {
          const hasMedia = block.videoUrl || block.imageUrl || block.imagePlaceholder;
          const blockGap =
            section.blockMediaGap === "large" && hasMedia ? "gap-6" : "gap-3";

          return (
            <div key={block.subHeader} className={`flex flex-col ${blockGap} ${hasMedia ? "pb-6" : ""}`}>
              <div className="flex max-w-[600px] flex-col gap-3">
                <Heading level={3}>{block.subHeader}</Heading>
                <div className={`flex flex-col gap-3 ${richTextClass}`}>
                  {block.content}
                </div>
              </div>
              <BlockMedia block={block} />
            </div>
          );
        })}
      </div>
    );
  }

  if (section.layout === "narrow") {
    return (
      <div className="flex max-w-[600px] flex-col gap-5">
        {section.title ? <Heading level={2}>{section.title}</Heading> : null}
        <div className={`flex flex-col gap-5 ${richTextClass}`}>{section.content}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {section.title ? <Heading level={2}>{section.title}</Heading> : null}
      <div className={`flex max-w-[600px] flex-col gap-3 ${richTextClass}`}>
        {section.content}
      </div>
      <SectionMedia section={section} />
    </div>
  );
}

export function CaseStudyBody({
  slug,
  variant,
  onClose,
}: CaseStudyBodyProps) {
  const project = getProjectBySlug(slug);
  const content = getCaseStudyContent(slug);

  if (!project || !content) return null;

  const sections = content.sections ?? [];
  // TODO: Remove draft check once casino-brand content is complete
  const isDraft = content.status === "draft";
  const visibleSections = isDraft ? sections.slice(0, 1) : sections;

  return (
    <div className="min-h-screen bg-surface-page">
      <div className="mx-auto flex w-full flex-col items-start tablet:max-w-[992px]">
        <div className="w-full px-5 py-4 tablet:px-8 tablet:py-6">
          <BackButton variant={variant} onClose={onClose} />
        </div>

        <main className="flex w-full flex-col gap-6 rounded-[48px] bg-surface-primary px-5 py-6 tablet:p-8">
          <section className="flex flex-col gap-3">
            <h1 className="text-heading-1 font-semibold text-text-primary">
              {project.title}
            </h1>
            <p className="text-body text-text-primary">
              {project.description}
            </p>
            {content.ctaUrl && content.ctaLabel ? (
              <Button
                href={content.ctaUrl}
                external
                variant="primary"
                label={content.ctaLabel}
                icon={<ExternalLinkIcon />}
                className="w-full tablet:w-fit px-6"
              />
            ) : null}
          </section>

          {visibleSections.map((section, index) => (
            <div key={section.title || `section-${index}`} className="flex flex-col gap-6">
              <ZigzagDivider />
              <SectionContent section={section} />
            </div>
          ))}

          {isDraft ? (
            <div className="flex flex-col gap-6">
              <ZigzagDivider />
              <p className="py-8 text-center text-body text-text-primary/50">
                This case study is being prepared.
              </p>
            </div>
          ) : null}
        </main>

        <footer className="flex w-full flex-col gap-2 px-5 py-4 text-sm leading-[22px] text-text-primary/70 tablet:px-8 tablet:flex-row">
          <p className="tablet:flex-1">&copy; 2026 - Eugene Kravchenko</p>
          <p className="tablet:flex-1 tablet:text-right">
            vibecoded and vibedesigned
          </p>
        </footer>
      </div>
    </div>
  );
}
