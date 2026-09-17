"use client";

import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ArchitectureFlow({
  steps,
}: {
  steps: { step: string; title: string; body: string }[];
}) {
  const accentText = "text-accent";
  const accentBorder = "border-accent/30";
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          duration: reduced ? 0 : undefined,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: reduced ? false : 0.5,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden
        className="absolute left-4 top-4 bottom-4 hidden w-px bg-accent/10 sm:block"
      />
      <div
        ref={lineRef}
        aria-hidden
        className="absolute left-4 top-4 bottom-4 hidden w-px bg-accent/60 sm:block"
      />
      <div className="space-y-8">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 80}>
            <div className="relative flex gap-5 sm:pl-0">
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${accentBorder} bg-graphite-950 text-sm font-bold ${accentText}`}
              >
                {s.step}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-base font-semibold text-strong">
                  {s.title}
                </p>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-graphite-400">
                  {s.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
