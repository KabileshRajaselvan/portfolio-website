import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import SectionTexture from "@/components/SectionTexture";
import { experience, type ExperienceEntry } from "@/lib/content";

function ExperienceRow({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  return (
    <div className="group relative py-12 sm:py-16">
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/40 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />

      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
        <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-6">
          <span className="font-mono text-base text-graphite-700 transition-colors duration-500 group-hover:text-accent/60">
            0{index + 1}
          </span>
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-graphite-900 ring-1 ring-graphite-800 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:ring-accent/40 sm:h-24 sm:w-24">
            <Image
              src={entry.logo}
              alt={`${entry.company} logo`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-4xl font-black tracking-tight text-strong transition-colors duration-300 group-hover:text-accent sm:text-6xl">
              {entry.company}
            </h3>
            <p className="shrink-0 font-mono text-sm uppercase tracking-[0.15em] text-graphite-500">
              {entry.duration}
            </p>
          </div>
          <p className="mt-2 text-base font-medium text-accent sm:text-lg">
            {entry.role}
          </p>
          <p className="mt-1 font-mono text-sm uppercase tracking-[0.15em] text-graphite-600">
            {entry.location}
          </p>

          <ul className="mt-8 space-y-4 border-l border-graphite-800 pl-6">
            {entry.bullets.map((bullet) => (
              <li
                key={bullet}
                className="text-base leading-relaxed text-graphite-300 sm:text-base"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-graphite-500">
            {entry.tech.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < entry.tech.length - 1 && (
                  <span className="ml-2 text-graphite-700">/</span>
                )}
              </span>
            ))}
          </p>

          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {entry.badge}
          </p>
        </div>
      </div>
    </div>
  );
}

const quickStats = [
  { value: "2", label: "Companies" },
  { value: "2", label: "Roles" },
  { value: "17", label: "Months Combined" },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6"
    >
      <SectionTexture position="15% 40%" />
      <Reveal>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          Career Journey
        </span>
      </Reveal>
      <SplitHeading className="mt-5 text-4xl font-black tracking-tight text-strong sm:text-5xl">
        Experience
      </SplitHeading>

      <Reveal className="mt-12 mb-4 flex flex-wrap gap-x-10 gap-y-2 border-b border-graphite-800/60 pb-8">
        {quickStats.map((stat) => (
          <p key={stat.label} className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-strong sm:text-3xl">
              {stat.value}
            </span>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-graphite-500">
              {stat.label}
            </span>
          </p>
        ))}
      </Reveal>

      <div className="relative divide-y divide-graphite-800/60">
        <span
          aria-hidden
          className="absolute left-9 top-0 bottom-0 hidden w-px bg-gradient-to-b from-graphite-800 via-graphite-800 to-transparent sm:block"
        />
        {experience.map((entry, index) => (
          <Reveal key={entry.company} delay={index * 100}>
            <ExperienceRow entry={entry} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
