import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import ToolsGrid from "@/components/ToolsGrid";
import SkillsAccordion from "@/components/SkillsAccordion";
import SectionTexture from "@/components/SectionTexture";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-6"
    >
      <SectionTexture position="85% 10%" />
      <Reveal>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          Tech Stack
        </span>
      </Reveal>
      <SplitHeading className="mt-5 text-4xl font-black tracking-tight text-strong sm:text-5xl">
        Skills &amp; Proficiency
      </SplitHeading>
      <Reveal delay={150}>
        <p className="mt-4 max-w-xl text-graphite-400">
          A production-grade toolkit spanning backend, cloud, data, and AI/ML
          infrastructure.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-16">
        <ToolsGrid />
      </Reveal>

      <Reveal delay={80} className="mt-20">
        <SkillsAccordion />
      </Reveal>
    </section>
  );
}
