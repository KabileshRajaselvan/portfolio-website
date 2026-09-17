import { contact, nav, hero } from "@/lib/content";
import SectionTexture from "@/components/SectionTexture";
import MagneticButton from "@/components/MagneticButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-graphite-800/60">
      <SectionTexture position="50% 0%" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-graphite-500">
          {hero.location}
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[0.95] tracking-tight text-strong sm:text-6xl">
          Let&apos;s build something
          <span className="block font-serif italic text-accent">
            worth shipping.
          </span>
        </h2>

        <div className="mt-10">
          <MagneticButton strength={0.35}>
            <a
              href={contact.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-graphite-950 transition-transform duration-300 hover:scale-105"
            >
              {contact.email}
            </a>
          </MagneticButton>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-graphite-800/60 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-base text-graphite-500">
            © {year} {nav.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={contact.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-graphite-400 transition-colors duration-300 hover:text-accent"
            >
              Email
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-graphite-400 transition-colors duration-300 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-graphite-400 transition-colors duration-300 hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
