"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import TransitionLink from "@/components/transition/TransitionLink";
import ProjectCoverArt from "@/components/ProjectCoverArt";
import GithubStats from "@/components/GithubStats";
import { caseStudies } from "@/lib/caseStudies";
import { moreProjects, contact } from "@/lib/content";
import { COVER_PHOTOS } from "@/lib/coverPhotos";

export default function SelectedWork() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6">
      <Reveal>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          Selected Work
        </span>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {caseStudies.map((study, index) => (
          <Reveal key={study.slug} delay={index * 60}>
            <TransitionLink
              href={`/projects/${study.slug}`}
              data-cursor-text="View"
              className="group relative block overflow-hidden rounded-2xl ring-1 ring-graphite-800 transition-all duration-500 hover:ring-accent/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-900">
                {COVER_PHOTOS[study.slug] ? (
                  <Image
                    src={COVER_PHOTOS[study.slug]}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="scale-105 object-cover grayscale-[30%] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                  />
                ) : (
                  <ProjectCoverArt
                    category={study.filterCategory}
                    className="h-full w-full scale-105 text-strong transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <span className="font-mono text-[11px] text-strong/50">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-strong transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                    {study.title}
                  </h3>
                </div>
                <span className="shrink-0 translate-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-strong/60 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {study.category}
                </span>
              </div>
            </TransitionLink>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
          More Projects
        </span>
        <p className="mt-3 max-w-xl text-graphite-400">
          Additional repositories spanning data engineering, NLP, computer
          vision, and full-stack systems.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {moreProjects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 2) * 40}>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="GitHub"
              className="group flex items-baseline justify-between gap-4 border-b border-graphite-800/60 py-3"
            >
              <span className="text-base font-medium text-graphite-300 transition-colors duration-300 group-hover:text-accent">
                {project.title}
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-graphite-600">
                {project.category}
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-col items-center gap-6">
        <GithubStats username="KabileshRajaselvan" />
        <MagneticButton strength={0.35}>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-700 px-7 py-3 text-base font-semibold text-graphite-200 transition-all duration-300 hover:border-accent hover:text-accent"
          >
            View Full GitHub Profile
          </a>
        </MagneticButton>
      </Reveal>
    </section>
  );
}
