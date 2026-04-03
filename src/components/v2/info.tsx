"use client";

import { ReactNode } from "react";
import { AnimateIn } from "@/components/animate-in";
import { Nav } from "./nav";

const muted = "text-[#343434]/50";
const accent = "text-[#343434]";
const textClasses = "font-semibold tracking-[-0.06em]";

const iconShadow =
  "shadow-[0_1px_2px_#0000001F,0_4px_4px_#0000001A,0_9px_5px_#0000000D,0_15px_6px_#00000005]";

const textStyle = {
  fontSize: "28px",
  lineHeight: "34px",
};

const linkClasses =
  "decoration-wavy underline decoration-[#343434]/20 underline-offset-[3px] decoration-1 transition-colors";

function CTAButton({
  href,
  icon,
  label,
  variant,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  variant: "primary" | "secondary";
}) {
  const base =
    "flex items-center justify-center gap-1.5 h-12 tablet:flex-1 rounded-xl text-sm font-semibold tracking-[-0.03em] transition-all duration-150 active:scale-[0.97]";
  const variants = {
    primary: `${base} bg-[#343434] text-white hover:bg-[#1a1a1a] active:bg-[#111111]`,
    secondary: `${base} bg-black/[0.04] text-[#343434] hover:bg-black/[0.08] active:bg-black/[0.12]`,
  };

  return (
    <a href={href} className={variants[variant]}>
      {icon}
      {label}
    </a>
  );
}

export function Info() {
  return (
    <div
      className="flex flex-col gap-6 px-4 py-6"
      style={{ containerType: "inline-size" }}
    >
      <AnimateIn>
        <Nav />
      </AnimateIn>

      <AnimateIn delay={0.05}>
        <div className={textClasses} style={textStyle}>
          <span className={`${muted} block mb-2`}>Eugene Kravchenko</span>
          <span className={accent}>Product designer based in Limassol, Cyprus.</span>
          <br />
          <span className={accent}>Focused on design systems at </span>
          <a href="https://brainrocket.com/" target="_blank" rel="noopener noreferrer" className={`${accent} ${linkClasses} hover:text-green-500 hover:decoration-green-500/40`}>Brainrocket.</a>
          <br />
          <span className={accent}>Shipped a Figma plugin </span>
          <a href="https://www.figma.com/community/plugin/1602717091443258096/layersweep-bulk-style-swap-for-figma" target="_blank" rel="noopener noreferrer" className={`${accent} ${linkClasses} hover:text-blue-500 hover:decoration-blue-500/40`}>LayerSweep.</a>
          <br />
          <span className={accent}>Obsessed with vibe coding.</span>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="flex flex-col tablet:flex-row gap-2">
          <CTAButton
            href="mailto:rawchenko@gmail.com"
            variant="primary"
            label="Send a Message"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            }
          />
          <CTAButton
            href="#"
            variant="secondary"
            label="Open Resume"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            }
          />
        </div>
      </AnimateIn>
    </div>
  );
}
