"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canHover || reduced || !dotRef.current) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.08,
      ease: "power3.out",
    });
    const dotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.08,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[400] hidden h-[13px] w-[11px] md:block"
      style={{ imageRendering: "pixelated" }}
    >
      <svg
        viewBox="0 0 11 13"
        width="11"
        height="13"
        shapeRendering="crispEdges"
      >
        <path
          d="M0 0h1v10h1v1h1v1h1v1h1v-3h1v-1h1v-1h1v-1h1v-1h-1v-1h-1v-1H0Z"
          fill="var(--color-accent)"
        />
        <path
          d="M0 0v13h1v-2h1v-1h1v1h1v1h1v1h1v-1H4v-1H3v-1H2v-1H1V0Z"
          fill="black"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
