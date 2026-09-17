import Reveal from "@/components/Reveal";
import CertificationsShowcase from "@/components/CertificationsShowcase";
import SectionTexture from "@/components/SectionTexture";
import { education } from "@/lib/content";

export default function Education() {
  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-6xl px-6"
    >
      <SectionTexture position="10% 60%" />
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-graphite-800/60 pb-8">
          <div>
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Education
            </span>
            <p className="mt-3 text-lg font-bold text-strong">
              {education.degree}
            </p>
            <p className="mt-1 text-base text-graphite-400">
              {education.specialization}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base text-graphite-300">{education.school}</p>
            <p className="mt-1 text-base text-graphite-500">
              {education.graduated}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <CertificationsShowcase />
      </Reveal>
    </section>
  );
}
