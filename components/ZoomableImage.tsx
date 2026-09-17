"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ZoomableImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Zoom image"
        className="group relative aspect-[21/9] w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 ring-graphite-800"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-graphite-900 text-graphite-300 hover:text-strong"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-[80vh] w-full max-w-6xl">
              <Image src={src} alt={alt} fill className="object-contain" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
