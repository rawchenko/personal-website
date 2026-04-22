import { asset } from "@/lib/utils";
import type { CarouselSlide } from "@/components/v2/carousel-shader-sync";

export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

export interface ShaderConfig {
  type: "dithering" | "grain-gradient" | "mesh-gradient" | "dot-grid";
  props: Record<string, unknown>;
}

export interface OverlayLayer {
  style: React.CSSProperties;
  className?: string;
}

export interface CarouselConfig {
  slides: CarouselSlide[];
  intervalMs?: number;
  transitionMs?: number;
  imageStyle: React.CSSProperties;
}

export interface ProjectPreviewConfig {
  dark?: boolean;
  background?: string;
  shaderConfig?: ShaderConfig;
  shaderClassName?: string;
  images?: CaseImage[];
  overlayLayers?: OverlayLayer[];
  carousel?: CarouselConfig;
  access?: {
    label: string;
    note: string;
  };
}

const shaderStyle = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  height: "100%",
};

export const projectPreviews: Record<string, ProjectPreviewConfig> = {
  layersweep: {
    background: "color(display-p3 0.293 0.618 0.957)",
    shaderConfig: {
      type: "dot-grid",
      props: {
        size: 1.3,
        gapY: 10,
        gapX: 10,
        strokeWidth: 0,
        sizeRange: 1,
        opacityRange: 1,
        shape: "circle",
        colorFill: "#FFFFFF",
        colorStroke: "#FFAA00",
        colorBack: "#00000000",
        style: { ...shaderStyle, backgroundColor: "color(display-p3 0.293 0.618 0.957)" },
      },
    },
    shaderClassName: "absolute -inset-[4%] animate-shader-drift",
    images: [],
    overlayLayers: [
      {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: "25%",
          height: "100%",
          backgroundImage: `url(${asset("/images/projects/layersweep-left-panel.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "100%",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 5,
        },
      },
      {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          width: "25.1%",
          height: "100%",
          backgroundImage: `url(${asset("/images/projects/layersweep-right-panel.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 5,
        },
      },
      {
        style: {
          position: "absolute",
          left: "50%",
          top: "90.17%",
          width: "42.3%",
          height: "7.67%",
          translate: "-50%",
          backgroundImage: `url(${asset("/images/projects/layersweep-tools-bar.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 13,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 5,
        },
      },
      {
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(100% 0 0 / 30%) 0%, oklab(100% 0 0 / 50%) 100%)",
          zIndex: 6,
        },
      },
      {
        style: {
          position: "absolute",
          left: "50%",
          top: "45.17%",
          translate: "-50% -50%",
          width: "35.3%",
          aspectRatio: "339 / 430",
          borderRadius: 10,
          backgroundImage: `url(${asset("/images/projects/layersweep-plugin-ui.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "#0000000F 0px 8px 16px -4px, #0000001A 0px 24px 48px -8px, #00000014 0px 48px 96px -16px",
          zIndex: 7,
        },
      },
    ],
  },
  "brainrocket-showcase": {
    dark: true,
    background: "black",
    access: {
      label: "NDA",
      note: "Password access",
    },
    shaderConfig: {
      type: "mesh-gradient",
      props: {
        speed: 1,
        scale: 1,
        distortion: 0,
        swirl: 0.52,
        colors: ["#000000", "#000000", "#FF0052FC", "#009B56"],
        style: shaderStyle,
      },
    },
    carousel: {
      intervalMs: 1500,
      transitionMs: 500,
      imageStyle: {
        left: "16.8%",
        top: "11.5%",
        width: "66.4%",
        height: "auto",
      },
      slides: [
        {
          image: { src: asset("/images/projects/brainrocket-showcase-betoro.png"), alt: "Betoro sports betting", width: 3409, height: 2459 },
          shaderColors: ["#000000", "#000000", "#FF0052FC", "#009B56"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-swiper.png"), alt: "Swiper casino", width: 3409, height: 2459 },
          shaderColors: ["#030818", "#0B1A3D", "#1447E6", "#00C2FF"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-kingmaker.png"), alt: "Kingmaker", width: 3409, height: 2459 },
          shaderColors: ["#0E0320", "#2D0A5C", "#8B5CF6", "#D4A017"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-slotuna.png"), alt: "Slotuna", width: 3409, height: 2459 },
          shaderColors: ["#051A1E", "#0A3040", "#0E7490", "#D4953A"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-spinrollz.png"), alt: "Spinrollz", width: 3409, height: 2459 },
          shaderColors: ["#1A1A3E", "#2E2B6E", "#7B8CDE", "#F97316"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-spinit.png"), alt: "Spinit", width: 3409, height: 2459 },
          shaderColors: ["#000000", "#0A1A0A", "#39FF14", "#00CC44"],
        },
        {
          image: { src: asset("/images/projects/brainrocket-showcase-wildrobin.png"), alt: "Wild Robin", width: 3409, height: 2459 },
          shaderColors: ["#1A0E05", "#3D2510", "#8B6914", "#2D5A1E"],
        },
      ],
    },
  },
  "casino-brand": {
    dark: true,
    background: "color(display-p3 0.057 0.066 0.132)",
    access: {
      label: "NDA",
      note: "Password access",
    },
    shaderConfig: {
      type: "grain-gradient",
      props: {
        speed: 1.64,
        scale: 1,
        rotation: 196,
        offsetX: 0,
        offsetY: 0,
        softness: 1,
        intensity: 0,
        noise: 0.09,
        shape: "wave",
        colors: ["#47F1A7", "#279769", "#0E3C8F"],
        colorBack: "#00000000",
        style: { ...shaderStyle, backgroundColor: "color(display-p3 0.057 0.066 0.132)" },
      },
    },
    images: [
      {
        src: asset("/images/projects/casino-mockup.png"),
        alt: "Swiper casino app interfaces",
        width: 3840,
        height: 2400,
        style: {
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover" as const,
        },
      },
    ],
  },
  fyxation: {
    background: "radial-gradient(ellipse 88.8% 70.9% at 50% 100%, oklab(80.9% -0.090 0.107) 0%, oklab(99.2% -0.012 0.038) 100%)",
    images: [
      {
        src: asset("/images/projects/fyxation-phones.png"),
        alt: "Fyxation e-commerce phone mockups",
        width: 1149,
        height: 744,
        style: {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "119.7%",
          height: "124%",
          objectFit: "cover" as const,
        },
      },
    ],
  },
};

export function getProjectPreview(slug: string): ProjectPreviewConfig | undefined {
  return projectPreviews[slug];
}
