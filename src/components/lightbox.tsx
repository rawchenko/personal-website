"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface LightboxProps {
  src: string;
  alt: string;
  slug: string;
  sourceRect: DOMRect;
  onClose: () => void;
}

const easing: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function Lightbox({ src, alt, sourceRect, onClose }: LightboxProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Calculate target (centered) rect based on natural image size
  const target = useMemo(() => {
    if (!naturalSize) return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = vw * 0.9;
    const maxH = vh * 0.85;
    const ratio = naturalSize.w / naturalSize.h;

    let w: number, h: number;
    if (maxW / maxH > ratio) {
      h = maxH;
      w = h * ratio;
    } else {
      w = maxW;
      h = w / ratio;
    }

    return {
      width: w,
      height: h,
      x: (vw - w) / 2,
      y: (vh - h) / 2,
      borderRadius: 12,
    };
  }, [naturalSize]);

  const initial = prefersReducedMotion
    ? undefined
    : {
        x: sourceRect.left,
        y: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: 0,
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easing }}
      className="fixed inset-0 z-50 bg-black cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        className="fixed overflow-hidden cursor-default"
        style={{ originX: 0, originY: 0 }}
        initial={initial}
        animate={
          target
            ? {
                x: target.x,
                y: target.y,
                width: target.width,
                height: target.height,
                borderRadius: target.borderRadius,
              }
            : initial
        }
        exit={
          prefersReducedMotion
            ? undefined
            : {
                x: sourceRect.left,
                y: sourceRect.top,
                width: sourceRect.width,
                height: sourceRect.height,
                borderRadius: 0,
              }
        }
        transition={{ duration: 0.5, ease: easing }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="90vw"
          className="w-full h-full object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
          }}
        />
      </motion.div>
    </motion.div>
  );
}
