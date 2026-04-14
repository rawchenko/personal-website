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

interface CaseStudyBodyProps {
  slug: string;
  variant: "page" | "overlay";
  onClose?: () => void;
  onNavigate?: (slug: string) => void;
}

const richTextClass =
  "text-base leading-6 tracking-[-0.03em] text-[#343434] [&_p]:m-0 [&_p]:text-base [&_p]:leading-6 [&_p]:tracking-[-0.03em] [&_p]:text-[#343434] [&_strong]:font-semibold [&_.font-semibold]:font-semibold [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm";

function BackArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#000000"
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
    "inline-flex h-10 items-center gap-2 rounded-full bg-[#E8E8E8] pl-4 pr-5 text-base text-black shadow-[0_0_0_2px_rgba(255,255,255,0.1)] backdrop-blur-[4px] transition-colors duration-200 hover:bg-[#dddddd]";

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

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-[#343434]">
      {children}
    </h2>
  );
}

function BlockHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-semibold leading-6 tracking-[-0.03em] text-[#343434]">
      {children}
    </h3>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-[223px] w-full items-center justify-center border border-[#EEEEEE] bg-[#FBFBFB] px-6 text-center text-sm text-neutral-400 tablet:h-[600px]">
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
    <div className="group relative w-full overflow-hidden bg-[#FBFBFB]">
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
        className="block w-full bg-[#FBFBFB]"
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
      className="block h-[223px] w-full object-cover tablet:h-[600px]"
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
    <div className="relative h-[224px] w-full shrink-0 bg-[#FBFBFB] tablet:h-[600px]">
      <img
        src={src}
        alt={alt}
        className="absolute rounded-[4px] border border-[#E6E6E6] object-cover tablet:hidden"
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
        className="absolute hidden rounded-[4px] border border-[#E6E6E6] object-cover tablet:block"
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
        {section.title ? <SectionHeading>{section.title}</SectionHeading> : null}
        {section.blocks?.map((block) => {
          const hasMedia = block.videoUrl || block.imagePlaceholder;
          const blockGap =
            section.blockMediaGap === "large" && hasMedia ? "gap-6" : "gap-3";

          return (
            <div key={block.subHeader} className={`flex flex-col ${blockGap}`}>
              <div className="flex max-w-[600px] flex-col gap-3">
                <BlockHeading>{block.subHeader}</BlockHeading>
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
        {section.title ? <SectionHeading>{section.title}</SectionHeading> : null}
        <div className={`flex flex-col gap-5 ${richTextClass}`}>{section.content}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {section.title ? <SectionHeading>{section.title}</SectionHeading> : null}
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

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto flex w-full flex-col items-start tablet:max-w-[992px]">
        <div className="w-full px-2 py-2 tablet:px-0 tablet:py-6">
          <BackButton variant={variant} onClose={onClose} />
        </div>

        <main className="flex w-full flex-col gap-6 bg-white px-4 pb-7 pt-4">
          <section className="flex flex-col gap-3">
            <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.02em] text-[#343434]">
              {project.title}
            </h1>
            <p className="text-base leading-6 tracking-[-0.03em] text-[#343434]">
              {project.description}
            </p>
            {content.ctaUrl && content.ctaLabel ? (
              <a
                href={content.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#343434] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#454545] tablet:w-fit"
              >
                <ExternalLinkIcon />
                <span>{content.ctaLabel}</span>
              </a>
            ) : null}
          </section>

          {sections.map((section, index) => (
            <div key={section.title || `section-${index}`} className="flex flex-col gap-6">
              <ZigzagDivider />
              <SectionContent section={section} />
            </div>
          ))}
        </main>

        <footer className="flex w-full flex-col gap-2 px-4 py-4 text-sm leading-[22px] text-[rgba(52,52,52,0.7)] tablet:flex-row tablet:px-0">
          <p className="tablet:flex-1">© 2026 - Eugene Kravchenko</p>
          <p className="tablet:flex-1 tablet:text-right">
            vibecoded and vibedesigned
          </p>
        </footer>
      </div>
    </div>
  );
}
