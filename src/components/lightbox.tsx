"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "@phosphor-icons/react";

interface LightboxProps {
  src: string;
  alt: string;
  layoutId: string;
  onClose: () => void;
}

const easing: [number, number, number, number] = [0.32, 0.72, 0, 1];
const overlayTransition = { duration: 0.35, ease: easing };
const layoutTransition = { layout: { duration: 0.5, ease: easing } };

export function Lightbox({ src, alt, layoutId, onClose }: LightboxProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
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

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={overlayTransition}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ ...overlayTransition, delay: 0.1 }}
        className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <X size={20} weight="bold" className="text-white" />
      </motion.button>

      <motion.div
        layoutId={prefersReducedMotion ? undefined : layoutId}
        transition={layoutTransition}
        className="relative w-[90vw] h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: 12, backgroundColor: "transparent" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
