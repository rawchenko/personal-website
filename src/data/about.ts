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
  { name: "Figma", icon: "/images/tools/figma.png" },
  { name: "Claude", icon: "/images/tools/claude.png" },
  { name: "Codex", icon: "/images/tools/codex.png" },
  { name: "Paper", icon: "/images/tools/paper.png" },
  { name: "Notion", icon: "/images/tools/notion.png" },
  { name: "Dia", icon: "/images/tools/dia.png" },
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
    logo: "/images/companies/brainrocket.png",
  },
  {
    company: "Brainrocket",
    role: "Product Designer",
    period: "Jul 2023 — Oct 2024",
    location: "Limassol, Cyprus",
    logo: "/images/companies/brainrocket.png",
    link: "https://brainrocket.com",
  },
  {
    company: "MyCrew",
    role: "Product Designer",
    period: "Dec 2022 — Jun 2023",
    location: "Remote, Cyprus",
    logo: "/images/companies/mycrew.png",
    link: "https://mycrew.com",
  },
  {
    company: "Upside Analytics",
    role: "UX/UI Designer",
    period: "Nov 2020 — Feb 2022",
    location: "Russia",
    logo: "/images/companies/upside-analytics.png",
  },
];
