import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <AnimateIn>
        <div className="flex items-center gap-3">
          <Image
            src="/images/headshot.png"
            alt="Eugene Kravchenko"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold leading-6 text-neutral-900">
              Eugene Kravchenko
            </h1>
            <p className="text-base text-neutral-500 mt-1">
              Senior Product Designer
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <p className="text-base leading-6 tracking-[-0.03em] text-neutral-500">
          I&apos;m a product designer based in Limassol, Cyprus with over 5
          years of professional experience. I design and craft digital
          experiences that are intuitive, meaningful, and a delight to use.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.15}>
        <p className="text-base leading-6 tracking-[-0.03em] text-neutral-500">
          I am currently working at Brainrocket and building LayerSweep — a
          Figma plugin that helps designers swap specific styles across a Figma
          file.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <a
          href="mailto:rawchenko@gmail.com"
          className="flex items-center justify-center w-full h-10 rounded-[10px] text-[13px] font-semibold tracking-[-0.01em] text-white bg-gradient-to-b from-neutral-700 to-neutral-900 border-b-2 border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.18),0_0_0_2px_#E2E2E0] active:scale-[0.98] transition-transform duration-150"
        >
          Contact
        </a>
      </AnimateIn>
    </div>
  );
}
