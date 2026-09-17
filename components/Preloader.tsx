"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) {
        gsap.set(rootRef.current, { autoAlpha: 0, display: "none" });
        return;
      }

      const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(nameRef.current, { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to(paths[0], { strokeDashoffset: 0, duration: 0.35 })
        .to(
          paths.slice(1),
          { strokeDashoffset: 0, duration: 0.35, stagger: 0.1 },
          "-=0.08"
        )
        .to(nameRef.current, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.15")
        .to(barRef.current, { scaleX: 1, duration: 0.3 }, "-=0.1")
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.55,
          ease: "power3.inOut",
          delay: 0.1,
        })
        .set(rootRef.current, { display: "none" });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-graphite-950"
    >
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient
            id="k-mark-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
          >
            <stop offset="0%" stopColor="#ff7a3d" />
            <stop offset="100%" stopColor="#ffb347" />
          </linearGradient>
        </defs>
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          d="M22 6 L22 94"
          stroke="url(#k-mark-grad)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          d="M22 50 L79 6"
          stroke="url(#k-mark-grad)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          ref={(el) => {
            pathRefs.current[2] = el;
          }}
          d="M22 50 L79 94"
          stroke="url(#k-mark-grad)"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
      <p
        ref={nameRef}
        className="text-base font-medium uppercase tracking-[0.3em] text-graphite-400"
      >
        Kabilesh
      </p>
      <div className="h-px w-40 overflow-hidden bg-graphite-800">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-amber-700 to-accent"
        />
      </div>
    </div>
  );
}
