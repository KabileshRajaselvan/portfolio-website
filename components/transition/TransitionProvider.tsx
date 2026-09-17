"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

type TransitionContextValue = {
  cover: () => Promise<void>;
  reveal: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return ctx;
}

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.set(panelRef.current, { scaleY: 0, transformOrigin: "bottom" });
  }, []);

  const cover = () =>
    new Promise<void>((resolve) => {
      gsap.to(panelRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => resolve(),
      });
    });

  const reveal = () => {
    gsap.set(panelRef.current, { transformOrigin: "top" });
    gsap.to(panelRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.6,
      delay: 0.05,
      ease: "power3.inOut",
      overwrite: true,
    });
  };

  // Fires on every pathname change, regardless of which URL segment
  // changed — unlike template.tsx, which only remounts when the FIRST
  // segment changes (so /projects -> /projects/[slug] would never
  // retrigger a reveal if we relied on that instead).
  useEffect(() => {
    reveal();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ cover, reveal }}>
      <div
        ref={panelRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] origin-bottom scale-y-0 bg-graphite-950"
      />
      {children}
    </TransitionContext.Provider>
  );
}
