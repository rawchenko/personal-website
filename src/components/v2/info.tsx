"use client";

import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";
import { asset } from "@/lib/utils";
import { Nav } from "./nav";

const muted = "text-[#343434]/50";
const accent = "text-[#343434]";

const iconShadow =
  "shadow-[0_1px_2px_#0000001F,0_4px_4px_#0000001A,0_9px_5px_#0000000D,0_15px_6px_#00000005]";

export function Info() {
  return (
    <div
      className="flex flex-col gap-6 px-4 py-6"
      style={{ containerType: "inline-size" }}
    >
      <AnimateIn>
        <Nav />
      </AnimateIn>

      {/* About group: name + subtitle + bio — gap 14px */}
      <div className="flex flex-col items-start gap-3.5">
        <AnimateIn delay={0.05}>
          <h1
            className="font-semibold tracking-[-0.05em] text-[#343434]"
            style={{
              fontSize: "clamp(1.125rem, 4.5cqi, 1.375rem)",
              lineHeight: "clamp(1.375rem, 5.5cqi, 1.625rem)",
            }}
          >
            Eugene Kravchenko
          </h1>
        </AnimateIn>

        {/* Subtitle — inline flow for natural word wrapping */}
        <AnimateIn delay={0.1}>
          <p
            className="font-semibold tracking-[-0.05em]"
            style={{
              fontSize: "clamp(1rem, 4cqi, 1.25rem)",
              lineHeight: "clamp(1.375rem, 5cqi, 1.75rem)",
            }}
          >
            <span className={muted}>I&apos;m a </span>
            <span className={accent}>product designer </span>
            <span className={muted}>based in </span>
            <span className="inline-flex items-center align-middle" style={{ gap: "0.25rem" }}>
              <Image
                src={asset("/images/cyprus-flag.png")}
                alt="Cyprus flag"
                width={33}
                height={23}
                className={`shrink-0 rounded-[0.4375rem] ${iconShadow}`}
              />
              <span className={accent}>Limassol, Cyprus.</span>
            </span>
          </p>
        </AnimateIn>

        {/* Bio — inline text flow for natural wrapping */}
        <AnimateIn delay={0.15}>
          <p
            className="font-semibold tracking-[-0.05em]"
            style={{
              fontSize: "clamp(1rem, 4cqi, 1.25rem)",
              lineHeight: "clamp(1.375rem, 5.5cqi, 1.75rem)",
            }}
          >
            <span className={accent}>Building design systems</span>{" "}
            <span className={muted}>at</span>{" "}
            <span className="inline-flex items-center align-middle" style={{ gap: "0.25rem" }}>
              <Image
                src={asset("/images/companies/brainrocket.png")}
                alt="Brainrocket"
                width={24}
                height={24}
                className={`rounded-[0.4375rem] ${iconShadow}`}
              />
              <span className={accent}>Brainrocket</span>
            </span>{" "}
            <span className={muted}>and</span>{" "}
            <span className={accent}>shipping tools</span>{" "}
            <span className={muted}>like</span>{" "}
            <span className="inline-flex items-center align-middle" style={{ gap: "0.25rem" }}>
              <Image
                src={asset("/images/tools/layersweep.png")}
                alt="LayerSweep"
                width={24}
                height={24}
                className={`rounded-[0.4375rem] ${iconShadow}`}
              />
              <span className={accent}>LayerSweep.</span>
            </span>{" "}
            <span className={accent}>Obsessed</span>{" "}
            <span className={muted}>with</span>{" "}
            <span className="inline-flex items-center align-middle" style={{ gap: "0.25rem" }}>
              <Image
                src={asset("/images/tools/claude.png")}
                alt="vibe coding"
                width={24}
                height={24}
                className={`rounded-[0.4375rem] ${iconShadow}`}
              />
              <span className={accent}>vibe coding.</span>
            </span>
          </p>
        </AnimateIn>
      </div>

      {/* CTA Buttons */}
      <AnimateIn delay={0.2}>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:rawchenko@gmail.com"
            className="flex items-center justify-center gap-1.5 h-12 bg-[#343434] rounded-xl text-white text-sm font-semibold tracking-[-0.03em] shadow-[0_1px_2px_#0000001F,0_4px_4px_#0000001A,0_9px_5px_#0000000D,0_15px_6px_#00000005] active:scale-[0.98] transition-transform duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
            Send a Message
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-1.5 h-12 bg-white rounded-xl text-[#343434] text-sm font-semibold tracking-[-0.03em] shadow-[0_1px_2px_#0000001F,0_4px_4px_#0000001A,0_9px_5px_#0000000D,0_15px_6px_#00000005] active:scale-[0.98] transition-transform duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#343434"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M12 18v-6" />
              <path d="m9 15 3 3 3-3" />
            </svg>
            Open Resume
          </a>
        </div>
      </AnimateIn>
    </div>
  );
}
