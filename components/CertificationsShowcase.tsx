"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { certifications, type Certification } from "@/lib/content";

const categories = [
  "All",
  ...Array.from(new Set(certifications.map((c) => c.category))),
];
const platformCount = new Set(certifications.map((c) => c.issuer)).size;

function credentialIdFor(cert: Certification) {
  return cert.url.match(/certificates\/([a-f0-9]+)\//)?.[1];
}

function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const credentialId = credentialIdFor(cert);

  useGSAP(() => {
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.from(cardRef.current, {
      y: 24,
      scale: 0.97,
      duration: 0.35,
      ease: "power3.out",
    });
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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        ref={cardRef}
        className="grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-y-auto rounded-2xl bg-graphite-900 ring-1 ring-graphite-800 sm:grid-cols-[1.3fr_1fr]"
      >
        <div className="relative aspect-[4/3] bg-white sm:aspect-auto sm:min-h-[520px]">
          <Image
            src={cert.image}
            alt={cert.name}
            fill
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-contain p-4"
          />
        </div>

        <div className="relative flex flex-col p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-graphite-400 transition-colors hover:bg-graphite-800 hover:text-strong"
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

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {cert.issuer} &middot; {cert.date}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight text-strong">
            {cert.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-graphite-400">
            {cert.description}
          </p>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-500">
            Category
          </p>
          <p className="mt-1 text-base text-graphite-300">{cert.category}</p>

          {credentialId && (
            <>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-500">
                Credential ID
              </p>
              <p className="mt-1 break-all font-mono text-sm text-graphite-300">
                {credentialId}
              </p>
            </>
          )}

          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-graphite-950 transition-transform duration-300 hover:scale-105"
          >
            Verify Credential
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
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function CertificationsShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certifications.filter((cert) => {
      const matchesCategory = category === "All" || cert.category === category;
      const matchesQuery =
        q === "" ||
        cert.name.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <span className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        Certifications
      </span>

      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
        {[
          { value: certifications.length, label: "Certifications" },
          { value: categories.length - 1, label: "Categories" },
          { value: platformCount, label: "Platform" },
        ].map((stat) => (
          <p key={stat.label} className="flex items-baseline gap-2">
            <span className="text-xl font-black text-strong">
              {stat.value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-500">
              {stat.label}
            </span>
          </p>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
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
            placeholder="Search certifications..."
            className="w-full rounded-lg border border-graphite-800 bg-graphite-950/40 py-2 pl-9 pr-3 text-base text-graphite-200 placeholder:text-graphite-600 outline-none transition-colors focus:border-accent/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                category === c
                  ? "bg-accent text-graphite-950"
                  : "border border-graphite-700 text-graphite-400 hover:border-accent/50 hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {filtered.map((cert) => {
          const credentialId = credentialIdFor(cert);
          return (
            <article key={cert.name} className="group">
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-graphite-900 text-left ring-1 ring-graphite-800 transition-all duration-300 group-hover:ring-accent/50"
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-graphite-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="m12 15 8.5-8.5a2.12 2.12 0 0 0-3-3L9 12" />
                    <path d="M12 15 8 19l-3-3 4-4" />
                    <path d="m2 22 5-5" />
                  </svg>
                  Verified
                </span>
                {credentialId && (
                  <span className="absolute bottom-3 right-3 rounded bg-graphite-950/80 px-2 py-0.5 font-mono text-[10px] text-graphite-400 backdrop-blur-sm">
                    NO. {credentialId.slice(0, 8).toUpperCase()}
                  </span>
                )}
              </button>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {cert.category} &middot; {cert.date}
              </p>
              <h3 className="mt-1.5 text-lg font-bold leading-snug text-strong">
                {cert.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-graphite-400">
                {cert.description}
              </p>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-300 hover:text-amber-200"
              >
                View Certificate Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </button>
            </article>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-6 text-center text-base text-graphite-500">
            No certifications match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>

      {activeCert && (
        <CertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}
