"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { contact } from "@/lib/content";

const STATS = [
  { value: "8+", label: "Microservices Shipped" },
  { value: "50K+", label: "Daily Requests" },
  { value: "99.5%", label: "Uptime" },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (!reduced && nameRef.current) {
        const split = SplitText.create(nameRef.current, { type: "chars" });
        tl.from(".hero-photo", { autoAlpha: 0, scale: 1.06, duration: 1 })
          .from(".hero-eyebrow", { autoAlpha: 0, y: 10, duration: 0.5 }, "-=0.6")
          .from(
            split.chars,
            { autoAlpha: 0, y: 40, stagger: 0.02, duration: 0.7 },
            "-=0.4"
          )
          .from(".hero-tagline", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.3")
          .from(
            ".hero-stat",
            { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.5 },
            "-=0.2"
          )
          .from(".hero-links", { autoAlpha: 0, y: 10, duration: 0.5 }, "-=0.3")
          .from(".hero-scroll-cue", { autoAlpha: 0, y: -8, duration: 0.5 }, "-=0.2");
      } else {
        tl.from(
          ".hero-photo, .hero-eyebrow, .hero-name, .hero-tagline, .hero-stat, .hero-links, .hero-scroll-cue",
          { autoAlpha: 0, duration: 0.4 }
        );
      }

      if (!reduced) {
        gsap.to(".hero-photo-img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-scroll-cue", {
          autoAlpha: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "15% top",
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative flex flex-col justify-between overflow-hidden px-6 pb-10 pt-28 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 20% 30%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 20% 30%, black 30%, transparent 75%)",
          }}
        />

        <p className="hero-eyebrow relative max-w-xs font-mono text-base uppercase tracking-[0.2em] text-graphite-500 sm:max-w-sm">
          Full-Stack AI Engineer
        </p>

        <h1
          ref={nameRef}
          className="hero-name relative text-[15vw] font-black leading-[0.85] tracking-tight text-strong lg:text-[7vw]"
        >
          Kabilesh
          <span className="block font-serif text-[8vw] font-normal italic text-accent lg:text-[3.4vw]">
            Rajaselvan
          </span>
        </h1>

        <p className="hero-tagline relative max-w-sm text-base leading-relaxed text-graphite-400 sm:text-lg">
          Building production systems that ship, scale, and hold up under
          real traffic.
        </p>

        <div className="relative grid grid-cols-3 gap-6 border-t border-graphite-800 pt-8 sm:max-w-md">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <p className="text-3xl font-black text-strong sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-sm uppercase tracking-[0.15em] text-graphite-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="hero-links relative mt-10 flex items-center gap-6 border-t border-graphite-800 pt-6 font-mono text-base uppercase tracking-[0.2em] text-graphite-500">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-accent"
          >
            GitHub
          </a>
          <span className="text-graphite-700">/</span>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-accent"
          >
            LinkedIn
          </a>
          <span className="text-graphite-700">/</span>
          <a
            href={contact.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-accent"
          >
            Email
          </a>
        </div>

        <div
          aria-hidden
          className="hero-scroll-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite-600">
            Scroll
          </span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>

      <div className="hero-photo relative h-[50vh] bg-background lg:h-auto">
        <div
          className="hero-photo-img absolute inset-0 scale-105"
          style={{
            maskImage:
              "radial-gradient(ellipse 72% 78% at 50% 42%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 78% at 50% 42%, black 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/profile.png"
            alt="Portrait of Kabilesh"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
      </div>
    </section>
  );
}
