import { asset } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  thumbnail: string;
  type: "case" | "image";
}

export const projects: Project[] = [
{
    slug: "soulmate",
    title: "Soulmate — Relationship App",
    description:
      "Designed a relationship wellness app with daily activities, quizzes, and a calming mobile-first experience.",
    tags: ["Product Design", "Mobile", "UX"],
    year: "2024",
    role: "Senior Product Designer",
    thumbnail: asset("/images/projects/soulmate.png"),
    type: "image",
  },
  {
    slug: "viante",
    title: "Soulmate — UI Design",
    description:
      "Designed the marketing site and product pages for an AI-powered identity verification platform.",
    tags: ["Product Design", "Web", "AI"],
    year: "2024",
    role: "Senior Product Designer",
    thumbnail: asset("/images/projects/viante.png"),
    type: "image",
  },
  {
    slug: "diary-app",
    title: "Diary App",
    description:
      "Designed a personal diary and journaling app with daily prompts, weekly recaps, and a calming mobile-first experience.",
    tags: ["Product Design", "Mobile", "UX"],
    year: "2024",
    role: "Senior Product Designer",
    thumbnail: asset("/images/projects/diary-app.png"),
    type: "image",
  },
  {
    slug: "fyxation",
    title: "Fyxation — E-commerce Redesign",
    description:
      "Redesigned an e-commerce experience for a bicycle brand with product pages, cart flow, and mobile-first approach.",
    tags: ["E-commerce", "Redesign", "Mobile"],
    year: "2022",
    role: "Product Designer",
    thumbnail: asset("/images/projects/fyxation-phones.png"),
    type: "image",
  },
  {
    slug: "pickthebank",
    title: "PickTheBank — Bank Comparison",
    description:
      "Designed a bank deposit comparison platform with detailed product pages and data-driven UI.",
    tags: ["Product Design", "Fintech", "Web"],
    year: "2023",
    role: "Product Designer",
    thumbnail: asset("/images/projects/pickthebank.png"),
    type: "image",
  },
  {
    slug: "trading-app",
    title: "Crypto Trading App",
    description:
      "Designed a token swap interface for a crypto trading platform with dark theme and real-time data.",
    tags: ["Product Design", "Crypto", "Mobile"],
    year: "2023",
    role: "Product Designer",
    thumbnail: asset("/images/projects/trading-app.png"),
    type: "image",
  },
  {
    slug: "crypto-widgets",
    title: "Crypto Widgets",
    description:
      "Designed iOS widgets for tracking cryptocurrency prices with real-time charts and portfolio data.",
    tags: ["Product Design", "iOS", "Crypto"],
    year: "2023",
    role: "Product Designer",
    thumbnail: asset("/images/projects/crypto-widgets.png"),
    type: "image",
  },
  {
    slug: "layersweep",
    title: "LayerSweep",
    description:
      "A Figma plugin for bulk style replacement during design system migrations.",
    tags: ["Design Engineering", "Figma API", "Tooling"],
    year: "2024",
    role: "Design Engineer",
    thumbnail: asset("/images/projects/layersweep-scan.png"),
    type: "case",
  },
  {
    slug: "casino-brand",
    title: "Swiper — Casino with Shorts Feed",
    description:
      "Designed a TikTok-style casino product with an infinite shorts feed, sportsbook, and full brand identity across web and mobile.",
    tags: ["Product Design", "iGaming", "Mobile"],
    year: "2023",
    role: "Senior Product Designer",
    thumbnail: asset("/images/projects/project-3.png"),
    type: "case",
  },
  {
    slug: "brainrocket-showcase",
    title: "Brainrocket — iGaming Brand Showcase",
    description:
      "A selection of projects from my time at Brainrocket — an iGaming company running 10+ casino and sportsbook brands on a shared platform.",
    tags: ["Product Design", "iGaming", "Branding"],
    year: "2022–2025",
    role: "Product Designer → Senior Product Designer",
    thumbnail: asset("/images/projects/brainrocket-showcase.png"),
    type: "case",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
