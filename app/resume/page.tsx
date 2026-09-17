import type { Metadata } from "next";
import {
  hero,
  experience,
  skillCategories,
  education,
  certifications,
  contact,
} from "@/lib/content";
import { caseStudies } from "@/lib/caseStudies";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume | Kabilesh Rajaselvan",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 print:pt-6">
      <div className="mb-8 flex justify-end print:hidden">
        <PrintButton />
      </div>

      <header className="border-b border-graphite-800 pb-6 print:border-black">
        <h1 className="text-4xl font-black tracking-tight text-strong print:text-black">
          Kabilesh Rajaselvan
        </h1>
        <p className="mt-2 text-lg text-graphite-400 print:text-black">
          {hero.role}
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-graphite-500 print:text-black">
          <span>{contact.email}</span>
          <span>{contact.github.replace("https://", "")}</span>
          <span>{contact.linkedin.replace("https://", "")}</span>
          <span>{hero.location}</span>
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Summary
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-graphite-300 print:text-black">
          {hero.bio}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((entry) => (
            <div key={entry.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-strong print:text-black">
                  {entry.role} &middot; {entry.company}
                </h3>
                <span className="font-mono text-xs text-graphite-500 print:text-black">
                  {entry.duration}
                </span>
              </div>
              <p className="text-xs text-graphite-500 print:text-black">
                {entry.location}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-graphite-300 print:text-black"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Selected Projects
        </h2>
        <div className="mt-4 space-y-4">
          {caseStudies.map((cs) => (
            <div key={cs.slug}>
              <h3 className="text-base font-bold text-strong print:text-black">
                {cs.title}
              </h3>
              <p className="text-sm text-graphite-300 print:text-black">
                {cs.tagline}
              </p>
              <p className="mt-1 font-mono text-xs text-graphite-500 print:text-black">
                {cs.techStack.join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Skills
        </h2>
        <div className="mt-4 space-y-2">
          {skillCategories.map((cat) => (
            <p key={cat.title} className="text-sm print:text-black">
              <span className="font-semibold text-strong print:text-black">
                {cat.title}:
              </span>{" "}
              <span className="text-graphite-300 print:text-black">
                {cat.skills.join(", ")}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Education
        </h2>
        <p className="mt-3 text-sm text-strong print:text-black">
          {education.degree}
        </p>
        <p className="text-sm text-graphite-400 print:text-black">
          {education.specialization}
        </p>
        <p className="text-sm text-graphite-400 print:text-black">
          {education.school} &middot; {education.graduated}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
          Certifications
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="text-sm text-graphite-300 print:text-black"
            >
              {cert.name} — {cert.issuer} ({cert.date})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
