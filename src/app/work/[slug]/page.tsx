import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data/projects";
import { getCaseStudyContent } from "@/data/case-studies";
import { getProjectPreview } from "@/data/project-previews";
import { CaseStudyBody } from "@/components/v2/case-study-body";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const preview = getProjectPreview(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    robots: preview?.access ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const content = getCaseStudyContent(slug);

  if (!project || !content) {
    notFound();
  }

  return <CaseStudyBody slug={slug} variant="page" />;
}
