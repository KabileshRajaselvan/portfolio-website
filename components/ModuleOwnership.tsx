"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { modules, type ModuleEntry } from "@/lib/modules";

function ModuleModal({
  module,
  onClose,
}: {
  module: ModuleEntry;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
    gsap.from(cardRef.current, { y: 24, scale: 0.97, duration: 0.35, ease: "power3.out" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        ref={cardRef}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-graphite-900 p-6 ring-1 ring-graphite-800 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-strong">{module.name}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-graphite-400 transition-colors hover:bg-graphite-800 hover:text-strong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {module.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-graphite-800 px-2.5 py-0.5 font-mono text-xs text-graphite-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          What
        </p>
        <p className="mt-2 text-sm leading-relaxed text-graphite-300">
          {module.what}
        </p>

        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Stack
        </p>
        <p className="mt-2 text-sm leading-relaxed text-graphite-300">
          {module.stack}
        </p>

        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Facts &amp; Details
        </p>
        <ul className="mt-2 space-y-2">
          {module.facts.map((fact) => (
            <li key={fact} className="flex gap-2 text-sm leading-relaxed text-graphite-300">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}

export default function ModuleOwnership() {
  const [query, setQuery] = useState("");
  const [activeModule, setActiveModule] = useState<ModuleEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.what.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-graphite-400">
        As Tech Lead, I held end-to-end technical ownership across every module of the
        Incubrix platform. The aggregate numbers above (8+ microservices, 50K+ daily
        requests, 99.5% uptime) were produced by these {modules.length} modules
        collectively — click any one for the architecture, stack, and specifics.
      </p>

      <div className="relative mt-6 max-w-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-500"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search modules or tech..."
          className="w-full rounded-lg border border-graphite-800 bg-graphite-950/40 py-2 pl-9 pr-3 text-sm text-graphite-200 placeholder:text-graphite-600 outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((module) => (
          <button
            key={module.slug}
            type="button"
            onClick={() => setActiveModule(module)}
            className="group flex flex-col rounded-xl border border-graphite-800 p-5 text-left transition-all duration-300 hover:border-accent/50 hover:bg-graphite-900/40"
          >
            <h3 className="text-base font-bold text-strong transition-colors duration-300 group-hover:text-accent">
              {module.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-400">
              {module.what}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {module.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-graphite-900 px-2 py-0.5 font-mono text-[10px] text-graphite-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-graphite-500">
            No modules match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>

      {activeModule && (
        <ModuleModal
          module={activeModule}
          onClose={() => setActiveModule(null)}
        />
      )}
    </div>
  );
}
