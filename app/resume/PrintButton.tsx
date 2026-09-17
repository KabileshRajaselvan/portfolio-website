"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-graphite-950 transition-transform duration-300 hover:scale-105"
    >
      Save as PDF
    </button>
  );
}
