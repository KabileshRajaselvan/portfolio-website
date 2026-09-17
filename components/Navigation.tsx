"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import ThemeToggle from "@/components/ThemeToggle";

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToId(href);
    }
  };

  // Unscrolled: header floats over the Hero photo (a real photograph, not
  // theme-aware), so it always needs literal light text regardless of
  // site theme. Scrolled: header has a solid themed background, so text
  // must follow the theme tokens instead or it goes invisible in light mode.
  const linkClass = (href: string) => {
    const isActive = activeHref === href;
    const base = "font-mono text-base uppercase tracking-[0.15em] transition-colors duration-300 hover:text-accent";
    if (isActive) return `${base} text-accent`;
    return scrolled
      ? `${base} text-foreground`
      : `${base} text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]`;
  };

  const logoClass = scrolled
    ? "text-xl font-bold tracking-tight text-strong"
    : "text-xl font-bold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-graphite-800"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={(e) => handleAnchorClick(e, "#top")}
          aria-label={nav.name}
          className={logoClass}
        >
          KR
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={linkClass(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-strong transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-strong transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-strong transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-graphite-800 bg-background/95 px-6 py-4 backdrop-blur-md">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block py-2 font-mono text-base uppercase tracking-[0.15em] text-graphite-400 transition-colors duration-300 hover:text-strong"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
