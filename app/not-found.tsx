import TransitionLink from "@/components/transition/TransitionLink";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-5xl font-black tracking-tight text-strong sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-graphite-400">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <TransitionLink
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-graphite-950 transition-transform duration-300 hover:scale-105"
      >
        Back to Home
      </TransitionLink>
    </div>
  );
}
