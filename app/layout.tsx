import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import TransitionProvider from "@/components/transition/TransitionProvider";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Kabilesh Rajaselvan | Full-Stack AI Engineer",
  description:
    "Portfolio of Kabilesh Rajaselvan — Full-Stack AI Engineer building production-ready systems, RAG pipelines, and ML infrastructure.",
  keywords: [
    "Kabilesh Rajaselvan",
    "Full-Stack Engineer",
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Kabilesh Rajaselvan" }],
  openGraph: {
    title: "Kabilesh Rajaselvan | Full-Stack AI Engineer",
    description:
      "Portfolio showcasing AI/ML, full-stack development, and production systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Kabilesh Rajaselvan | Full-Stack AI Engineer",
    description:
      "Portfolio showcasing AI/ML, full-stack development, and production systems.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-graphite-950"
        >
          Skip to content
        </a>
        <div aria-hidden className="grain-overlay" />
        <TransitionProvider>
          <ScrollProgress />
          <Preloader />
          <CustomCursor />
          <SmoothScroll />
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <CommandPalette />
        </TransitionProvider>
      </body>
    </html>
  );
}
