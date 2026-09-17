"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { contact, nav } from "@/lib/content";

type Command = {
  label: string;
  hint: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.from(cardRef.current, {
        y: -12,
        scale: 0.97,
        duration: 0.25,
        ease: "power3.out",
      });
    },
    { dependencies: [open] }
  );

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const commands: Command[] = [
    ...nav.links.map((link) => ({
      label: `Go to ${link.label}`,
      hint: "Section",
      run: () => scrollTo(link.href),
    })),
    {
      label: "Copy email address",
      hint: contact.email,
      run: () => {
        navigator.clipboard.writeText(contact.email).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
    },
    {
      label: "Open GitHub profile",
      hint: "New tab",
      run: () => window.open(contact.github, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Open LinkedIn profile",
      hint: "New tab",
      run: () => window.open(contact.linkedin, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Toggle light / dark theme",
      hint: "Theme",
      run: () => {
        const html = document.documentElement;
        const next =
          html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
      },
    },
  ];

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[400] flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && setOpen(false)}
    >
      <div
        ref={cardRef}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-graphite-900 ring-1 ring-graphite-800"
      >
        <div className="flex items-center gap-2 border-b border-graphite-800 px-4 py-3">
          <span className="font-mono text-sm text-graphite-600">$</span>
          <span className="font-mono text-sm text-graphite-400">
            {copied ? "Copied to clipboard" : "Jump to a section or run a command"}
          </span>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {commands.map((cmd) => (
            <li key={cmd.label}>
              <button
                type="button"
                onClick={cmd.run}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-graphite-200 transition-colors duration-150 hover:bg-graphite-800 hover:text-accent"
              >
                <span>{cmd.label}</span>
                <span className="font-mono text-xs text-graphite-600">
                  {cmd.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-graphite-800 px-4 py-2 font-mono text-xs text-graphite-600">
          Esc to close
        </div>
      </div>
    </div>,
    document.body
  );
}
