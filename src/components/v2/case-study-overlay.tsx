"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CaseStudyOverlayContent } from "./case-study-overlay-content";

interface CaseStudyOverlayProps {
  slug: string;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

const easing: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function CaseStudyOverlay({
  slug,
  onClose,
  onNavigate,
}: CaseStudyOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const originalUrl = useRef<string | null>(null);
  const initialSlug = useRef(slug);
  const hasPushedHistoryEntry = useRef(false);
  const isClosing = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;

    isClosing.current = true;

    if (hasPushedHistoryEntry.current && window.history.state?.caseStudyOverlay) {
      window.history.back();
      return;
    }

    if (originalUrl.current) {
      window.history.replaceState(null, "", originalUrl.current);
    }

    onCloseRef.current();
  }, []);

  // Scroll to top when slug changes (navigating between case studies)
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [slug]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  // Save the starting URL once so we can restore it if history isn't available.
  useEffect(() => {
    if (originalUrl.current === null) {
      originalUrl.current = window.location.pathname + window.location.search;
    }
  }, []);

  // Create a history entry when the overlay opens so Back closes it.
  useEffect(() => {
    const basePath =
      process.env.NODE_ENV === "production" ? "/personal-website" : "";
    const overlayUrl = `${basePath}/work/${initialSlug.current}`;

    window.history.pushState({ caseStudyOverlay: true }, "", overlayUrl);
    hasPushedHistoryEntry.current = true;

    return () => {
      hasPushedHistoryEntry.current = false;
    };
  }, []);

  // Keep the active overlay entry in sync when navigating between case studies.
  useEffect(() => {
    if (!hasPushedHistoryEntry.current) return;

    const basePath =
      process.env.NODE_ENV === "production" ? "/personal-website" : "";
    const overlayUrl = `${basePath}/work/${slug}`;
    window.history.replaceState({ caseStudyOverlay: true }, "", overlayUrl);
  }, [slug]);

  // Browser back button
  useEffect(() => {
    const handlePopState = () => {
      isClosing.current = false;
      onCloseRef.current();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easing }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40"
      onClick={handleClose}
    >
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.5, ease: easing }}
        className="relative bg-white w-[95vw] max-w-[1024px] max-h-[95vh] overflow-y-auto mt-[2.5vh] rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CaseStudyOverlayContent
          slug={slug}
          onClose={handleClose}
          onNavigate={onNavigate}
        />
      </motion.div>
    </motion.div>
  );
}
