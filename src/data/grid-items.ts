import type { ExperienceItem, ToolItem } from "./about";
import { tools, skills, experience } from "./about";

type CardSpan = "full" | "half";

interface CardBase {
  id: string;
  span: CardSpan;
}

export interface ProjectCard extends CardBase {
  type: "project";
  projectSlug: string;
  variant: "dark" | "light";
  overlayLabel?: string;
  objectFit?: "cover" | "contain";
}

export interface InfoCard extends CardBase {
  type: "info";
  variant: "companies" | "tools" | "skills" | "experience";
  title: string;
  items?: string[];
  toolItems?: ToolItem[];
  experienceItems?: ExperienceItem[];
}

export interface PlaceholderCard extends CardBase {
  type: "placeholder";
}

export type GridItem = ProjectCard | InfoCard | PlaceholderCard;

export const gridItems: GridItem[] = [
  // Row 1: LayerSweep
  {
    id: "layersweep",
    type: "project",
    span: "full",
    projectSlug: "layersweep",
    variant: "dark",
  },
  // Row 2: Soulmate + Viante
  {
    id: "soulmate",
    type: "project",
    span: "half",
    projectSlug: "soulmate",
    variant: "dark",
  },
  {
    id: "viante",
    type: "project",
    span: "half",
    projectSlug: "viante",
    variant: "dark",
  },
  // Row 3: Swiper
  {
    id: "casino-brand",
    type: "project",
    span: "full",
    projectSlug: "casino-brand",
    variant: "dark",
  },
  // Row 4: Work Experience + Fyxation
  {
    id: "experience",
    type: "info",
    span: "half",
    variant: "experience",
    title: "Work Experience",
    experienceItems: experience,
  },
  {
    id: "fyxation-behance",
    type: "project",
    span: "half",
    projectSlug: "fyxation",
    variant: "dark",
    overlayLabel: "Behance Case",
  },
  // Row 5: Brainrocket Showcase
  {
    id: "brainrocket-showcase",
    type: "project",
    span: "full",
    projectSlug: "brainrocket-showcase",
    variant: "dark",
  },
  // Row 6: Applications + Diary App
  {
    id: "tools",
    type: "info",
    span: "half",
    variant: "tools",
    title: "Applications",
    toolItems: tools,
  },
  {
    id: "diary-app",
    type: "project",
    span: "half",
    projectSlug: "diary-app",
    variant: "dark",
  },
  // Row 7: Trading App
  {
    id: "trading-app",
    type: "project",
    span: "full",
    projectSlug: "trading-app",
    variant: "dark",
  },
  // Row 8: PickTheBank + Skills
  {
    id: "pickthebank",
    type: "project",
    span: "half",
    projectSlug: "pickthebank",
    variant: "light",
    objectFit: "contain",
  },
  {
    id: "skills",
    type: "info",
    span: "half",
    variant: "skills",
    title: "Skills",
    items: skills,
  },
];
