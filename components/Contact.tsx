import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import SectionTexture from "@/components/SectionTexture";
import { contact, hero } from "@/lib/content";

const LINKS = [
  { label: "Email", value: contact.email, href: contact.gmailCompose },
  { label: "LinkedIn", value: "in/kabilesh-rajaselvan", href: contact.linkedin },
  { label: "GitHub", value: "KabileshRajaselvan", href: contact.github },
  { label: "Resume", value: "View / Download", href: "/resume" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 pb-28"
    >
      <SectionTexture position="80% 80%" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-accent/30 via-amber-800/15 to-transparent blur-3xl"
      />

      <Reveal className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-graphite-800 px-3 py-1 font-mono text-sm uppercase tracking-[0.2em] text-graphite-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {hero.tagline}
        </span>
      </Reveal>

      <Reveal className="relative mt-6">
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-graphite-500">
          Get In Touch
        </span>
      </Reveal>
      <SplitHeading
        as="h2"
        className="relative mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-strong sm:text-7xl lg:text-8xl"
      >
        Let&apos;s work
        <span className="block font-serif italic text-accent">
          together.
        </span>
      </SplitHeading>
      <Reveal delay={150} className="relative">
        <p className="mt-8 max-w-lg text-lg text-graphite-400">
          Open to opportunities, collaborations, and interesting
          conversations.
        </p>
      </Reveal>

      <Reveal
        delay={100}
        className="relative mt-16 grid grid-cols-1 gap-6 border-t border-graphite-800 pt-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600">
              {link.label}
            </p>
            <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-strong transition-colors duration-300 group-hover:text-accent">
              {link.value}
              <span className="text-graphite-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                &rarr;
              </span>
            </p>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
