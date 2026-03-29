import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { Section } from "@/components/section";
import { AnimateIn } from "@/components/animate-in";
import { projects, getProjectBySlug } from "@/data/projects";
import { getCaseStudyContent } from "@/data/case-studies";

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
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="aspect-[16/9] bg-neutral-100 rounded-lg flex items-center justify-center">
      <span className="text-neutral-400 text-sm">{label}</span>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const content = getCaseStudyContent(slug);

  if (!project || !content) {
    notFound();
  }

  const useSections = !!content.sections;

  return (
    <PageLayout
      sidebarVariant="plain"
      sidebar={
        <>
          <AnimateIn>
            <Link
              href="/"
              className="inline-block mt-8 py-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
            >
              &larr; Back to Work
            </Link>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight mt-6 text-balance">
              {project.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-neutral-500 mt-4">{project.description}</p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="flex flex-col gap-4 mt-6 text-sm">
              <div>
                <p className="text-neutral-400">Role</p>
                <p className="text-neutral-700 mt-1">{project.role}</p>
              </div>
              <div>
                <p className="text-neutral-400">Year</p>
                <p className="text-neutral-700 mt-1">{project.year}</p>
              </div>
              <div>
                <p className="text-neutral-400">Tags</p>
                <p className="text-neutral-700 mt-1">
                  {project.tags.join(", ")}
                </p>
              </div>
            </div>
          </AnimateIn>
        </>
      }
    >
      {/* Hero image placeholder */}
      <div className="pt-8 lg:pt-12">
        <AnimateIn>
          <ImagePlaceholder label={`Hero Image — ${project.title}`} />
        </AnimateIn>
      </div>

      {useSections ? (
        /* Flexible sections layout */
        <>
          {content.sections!.map((section, idx) => (
            <div key={section.title}>
              <Section>
                <AnimateIn>
                  <h2 className="text-sm font-medium text-neutral-500 mb-6">
                    {section.title}
                  </h2>
                </AnimateIn>
                <AnimateIn delay={0.1}>
                  <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
                    {section.content}
                  </div>
                </AnimateIn>
              </Section>

              {section.imagePlaceholder && (
                <div>
                  <AnimateIn>
                    <ImagePlaceholder label={section.imagePlaceholder} />
                  </AnimateIn>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        /* Legacy Challenge / Process / Solution layout */
        <>
          {/* Challenge */}
          <Section>
            <AnimateIn>
              <h2 className="text-sm font-medium text-neutral-500 mb-6">
                The Challenge
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
                {content.challenge}
              </div>
            </AnimateIn>
          </Section>

          {/* Process image placeholder */}
          <div>
            <AnimateIn>
              <ImagePlaceholder label="Process Image" />
            </AnimateIn>
          </div>

          {/* Process */}
          <Section>
            <AnimateIn>
              <h2 className="text-sm font-medium text-neutral-500 mb-6">
                The Process
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
                {content.process}
              </div>
            </AnimateIn>
          </Section>

          {/* Solution image placeholder */}
          <div>
            <AnimateIn>
              <ImagePlaceholder label="Solution Image" />
            </AnimateIn>
          </div>

          {/* Solution */}
          <Section>
            <AnimateIn>
              <h2 className="text-sm font-medium text-neutral-500 mb-6">
                The Solution
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="prose prose-neutral max-w-2xl space-y-4 text-neutral-600 text-lg leading-relaxed">
                {content.solution}
              </div>
            </AnimateIn>
          </Section>
        </>
      )}

      {/* Next project */}
      <Section className="border-t border-neutral-100">
        <AnimateIn>
          <p className="text-sm text-neutral-400 mb-4">Next Project</p>
          {(() => {
            const currentIndex = projects.findIndex(
              (p) => p.slug === project.slug
            );
            const nextProject =
              projects[(currentIndex + 1) % projects.length];
            return (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group inline-block"
              >
                <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {nextProject.title} &rarr;
                </h3>
              </Link>
            );
          })()}
        </AnimateIn>
      </Section>
    </PageLayout>
  );
}
