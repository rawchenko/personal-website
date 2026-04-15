import { asset } from "@/lib/utils";

export const skills = [
  "Product Design",
  "UX / UI",
  "Design Systems",
  "Design Tokens",
  "Component Libraries",
  "Theming",
  "Interaction Design",
  "Prototyping",
  "Wireframing",
  "Micro-interactions",
  "HTML & CSS",
  "JavaScript",
];

export interface ToolItem {
  name: string;
  icon: string;
}

export const tools: ToolItem[] = [
  { name: "Figma", icon: asset("/images/tools/figma.png") },
  { name: "Claude", icon: asset("/images/tools/claude.png") },
  { name: "Codex", icon: asset("/images/tools/codex.png") },
  { name: "Paper", icon: asset("/images/tools/paper.png") },
  { name: "Notion", icon: asset("/images/tools/notion.png") },
  { name: "Dia", icon: asset("/images/tools/dia.png") },
];

export const companies = ["Brainrocket", "MyCrew", "Upside Analytics"];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  link?: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "Brainrocket",
    role: "Senior Product Designer",
    period: "Oct 2024 — Present",
    location: "Limassol, Cyprus",
    logo: asset("/images/companies/brainrocket.png"),
  },
  {
    company: "Brainrocket",
    role: "Product Designer",
    period: "Jul 2023 — Oct 2024",
    location: "Limassol, Cyprus",
    logo: asset("/images/companies/brainrocket.png"),
    link: "https://brainrocket.com",
  },
  {
    company: "MyCrew",
    role: "Product Designer",
    period: "Dec 2022 — Jun 2023",
    location: "Remote, Cyprus",
    logo: asset("/images/companies/mycrew.png"),
    link: "https://mycrew.net/",
  },
  {
    company: "Upside Analytics",
    role: "UX/UI Designer",
    period: "Nov 2020 — Feb 2022",
    location: "Russia",
    logo: asset("/images/companies/upside-analytics.png"),
  },
];
