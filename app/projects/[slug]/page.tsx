import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/transition/TransitionLink";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import ProjectCoverArt from "@/components/ProjectCoverArt";
import ZoomableImage from "@/components/ZoomableImage";
import { caseStudies } from "@/lib/caseStudies";
import { COVER_PHOTOS } from "@/lib/coverPhotos";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} | Kabilesh`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-36 sm:pt-44">
      <Reveal>
        <nav className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-graphite-500">
          <TransitionLink href="/" className="hover:text-accent">
            Home
          </TransitionLink>
          <span>/</span>
          <TransitionLink href="/projects" className="hover:text-accent">
            Projects
          </TransitionLink>
          <span>/</span>
          <span className="text-accent">{study.title}</span>
        </nav>

        <span className="mt-6 inline-block font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {study.category}
        </span>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-strong sm:text-6xl lg:text-7xl">
          {study.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-graphite-400">
          {study.tagline}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-graphite-500">
          {study.techStack.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < study.techStack.length - 1 && (
                <span className="ml-2 text-graphite-700">/</span>
              )}
            </span>
          ))}
        </p>

        <a
          href={study.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-graphite-950 shadow-lg shadow-accent/20 transition-shadow duration-300 hover:shadow-accent/40"
        >
          View Source on GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </Reveal>

      <Reveal delay={60} className="mt-12">
        {COVER_PHOTOS[study.slug] ? (
          <ZoomableImage src={COVER_PHOTOS[study.slug]} alt={study.title} />
        ) : (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl ring-1 ring-graphite-800">
            <ProjectCoverArt
              category={study.filterCategory}
              className="h-full w-full text-strong"
            />
          </div>
        )}
      </Reveal>

      {/* Overview */}
      <Reveal delay={80} className="mt-14">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Overview
        </span>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-graphite-300">
          {study.overview}
        </p>
      </Reveal>

      {/* Metrics */}
      <Reveal delay={100} className="mt-14">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Measured Results
        </span>
        <div className="mt-6 grid grid-cols-2 divide-x divide-y divide-graphite-800/60 border-x border-y border-graphite-800/60 sm:grid-cols-4 sm:divide-y-0">
          {study.metrics.map((m) => (
            <div key={m.label} className="px-5 py-6">
              <p className="text-3xl font-black text-strong sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-graphite-400">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Architecture */}
      <div className="mt-14">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Architecture
          </span>
          <h2 className="mt-3 text-2xl font-bold text-strong sm:text-3xl">
            How it&apos;s built
          </h2>
        </Reveal>
        <div className="mt-8">
          <ArchitectureFlow steps={study.architecture} />
        </div>
      </div>

      {/* Decisions */}
      <div className="mt-14">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Engineering Decisions
          </span>
          <h2 className="mt-3 text-2xl font-bold text-strong sm:text-3xl">
            What it demonstrates
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-8 divide-y divide-graphite-800/60 sm:grid-cols-2 sm:divide-y-0">
          {study.decisions.map((d, i) => (
            <Reveal key={d.title} delay={i * 80} className="pt-8 first:pt-0 sm:pt-0">
              <p className="border-l-2 border-accent/50 pl-4 text-base font-semibold text-strong">
                {d.title}
              </p>
              <p className="mt-2 pl-4 text-base leading-relaxed text-graphite-400">
                {d.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-16 flex justify-center">
        <TransitionLink
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-graphite-700 px-7 py-3 text-base font-semibold text-graphite-200 transition-all duration-300 hover:border-accent hover:text-accent"
        >
          &larr; Back to All Projects
        </TransitionLink>
      </Reveal>
    </div>
  );
}
