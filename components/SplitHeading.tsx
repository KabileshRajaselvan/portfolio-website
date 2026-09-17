"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export default function SplitHeading({
  children,
  as = "h2",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) return;

      const split = SplitText.create(ref.current, { type: "words" });
      gsap.from(split.words, {
        autoAlpha: 0,
        y: 32,
        rotateZ: 2,
        stagger: 0.035,
        duration: 0.7,
        delay: delay / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
