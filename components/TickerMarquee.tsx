const KEYWORDS = [
  "Full-Stack Engineering",
  "AI/ML Infrastructure",
  "RAG Pipelines",
  "Distributed Systems",
  "Kubernetes",
  "MLOps",
  "Real-Time Inference",
  "Data Engineering",
];

export default function TickerMarquee() {
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-graphite-800/60 py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-base uppercase tracking-[0.2em] text-graphite-600">
              {word}
            </span>
            <span className="text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
