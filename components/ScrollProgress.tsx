"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!barRef.current) return;

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });

    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: reduced ? 0 : 0.1,
          ease: "none",
          overwrite: true,
        });
      },
    });
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[250] h-[3px] w-full bg-transparent"
    >
      <div ref={barRef} className="h-full w-full bg-accent" />
    </div>
  );
}
