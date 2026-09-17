"use client";

import { useState } from "react";
import { skillCategories } from "@/lib/content";

export default function SkillsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-graphite-800/60 border-t border-graphite-800/60">
      {skillCategories.map((category, index) => {
        const open = openIndex === index;
        return (
          <div key={category.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between py-6 text-left"
              aria-expanded={open}
            >
              <span className="text-lg font-semibold text-strong transition-colors duration-300 sm:text-xl">
                {category.title}
              </span>
              <span
                className={`font-mono text-lg text-accent transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="max-w-3xl pb-6 text-base leading-relaxed text-graphite-400">
                  {category.skills.map((skill, i) => (
                    <span key={skill}>
                      <span className="transition-colors duration-300 hover:text-strong">
                        {skill}
                      </span>
                      {i < category.skills.length - 1 && (
                        <span className="text-graphite-700"> &middot; </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
