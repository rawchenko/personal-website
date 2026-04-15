"use client";

import { AnimateIn } from "@/components/animate-in";
import { Nav } from "./nav";
import { Button } from "./button";
import { AccentLink } from "./link";

const muted = "text-text-primary/50";
const accent = "text-text-primary";

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
        <div className="text-display font-semibold">
          <span className={`${muted} block mb-2`}>Eugene Kravchenko</span>
          <span className={accent}>Product designer based in Limassol, Cyprus.</span>
          <br />
          <span className={accent}>Focused on design systems at </span>
          <AccentLink href="https://brainrocket.com/" hoverColor="green">Brainrocket.</AccentLink>
          <br />
          <span className={accent}>Shipped a Figma plugin </span>
          <AccentLink href="https://www.figma.com/community/plugin/1602717091443258096/layersweep-bulk-style-swap-for-figma" hoverColor="blue">LayerSweep.</AccentLink>
          <br />
          <span className={accent}>Obsessed with vibe coding.</span>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="flex flex-col tablet:flex-row gap-2">
          <Button
            href="mailto:rawchenko@gmail.com"
            variant="primary"
            label="Send a Message"
            className="tablet:flex-1"
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
          <Button
            href="https://docs.google.com/document/d/1e028y3jY3wAc1LWdrv24PRmaAWk9fMY9rqv_BH9KHM4/edit?usp=sharing"
            external
            variant="secondary"
            label="Open Resume"
            className="tablet:flex-1"
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
