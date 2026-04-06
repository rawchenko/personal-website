import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/v2/page-layout";
import { Section } from "@/components/section";
import { AnimateIn } from "@/components/animate-in";
import { projects, getProjectBySlug } from "@/data/projects";
import { getCaseStudyContent } from "@/data/case-studies";
import { BrainrocketHero } from "@/components/v2/brainrocket-hero";

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

function VideoPlayer({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full rounded-lg"
    />
  );
}

function CaseStudySidebar({ project }: { project: ReturnType<typeof getProjectBySlug> & {} }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 py-2.5 px-2 max-w-[1024px] mx-auto bg-white">
        <AnimateIn>
          <Link
            href="/"
            className="inline-flex items-center h-11 w-fit rounded-full px-[7px] bg-white hover:bg-neutral-100 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] shrink-0 text-[#000000B8]">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
            <span className="text-[15px] leading-[150%] text-[#000000B8] shrink-0 mx-1">
              Home
            </span>
          </Link>
        </AnimateIn>
      </div>
      <div className="px-5 pt-10 pb-8 desktop:px-8">
      <AnimateIn delay={0.2}>
        <h1 className="text-2xl font-semibold tracking-tight leading-tight mt-6 text-balance">
          {project.title}
        </h1>
      </AnimateIn>
      <AnimateIn delay={0.3}>
        <p className="text-neutral-500 mt-4">{project.description}</p>
      </AnimateIn>
      <AnimateIn delay={0.4}>
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
      </div>
    </>
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
      info={<CaseStudySidebar project={project} />}
      portfolio={
        <div>
          {/* Hero image */}
          <div className="pt-4">
            <AnimateIn>
              {slug === "brainrocket-showcase" ? (
                <BrainrocketHero />
              ) : (
                <ImagePlaceholder label={`Hero Image — ${project.title}`} />
              )}
            </AnimateIn>
          </div>

          {useSections ? (
            <>
              {content.sections!.map((section) => (
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

                  {section.videoUrl ? (
                    <div>
                      <AnimateIn>
                        <VideoPlayer src={section.videoUrl} />
                      </AnimateIn>
                    </div>
                  ) : section.imagePlaceholder ? (
                    <div>
                      <AnimateIn>
                        <ImagePlaceholder label={section.imagePlaceholder} />
                      </AnimateIn>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : (
            <>
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

              <div>
                <AnimateIn>
                  <ImagePlaceholder label="Process Image" />
                </AnimateIn>
              </div>

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

              <div>
                <AnimateIn>
                  <ImagePlaceholder label="Solution Image" />
                </AnimateIn>
              </div>

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
                const caseProjects = projects.filter((p) => p.type === "case");
                const currentIndex = caseProjects.findIndex(
                  (p) => p.slug === project.slug
                );
                const nextProject =
                  caseProjects[(currentIndex + 1) % caseProjects.length];
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
        </div>
      }
    />
  );
}
