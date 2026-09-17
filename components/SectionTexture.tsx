export default function SectionTexture({
  position = "20% 30%",
}: {
  position?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "var(--foreground)",
        maskImage: `radial-gradient(ellipse 80% 60% at ${position}, black 30%, transparent 75%)`,
        WebkitMaskImage: `radial-gradient(ellipse 80% 60% at ${position}, black 30%, transparent 75%)`,
      }}
    />
  );
}
