import type { ProjectCategory } from "@/lib/content";

const THEME: Record<
  ProjectCategory,
  { from: string; to: string; stroke: string; icon: React.ReactNode }
> = {
  "AI & ML": {
    from: "#7c3aed",
    to: "#1e1b4b",
    stroke: "#c4b5fd",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <circle cx="40" cy="40" r="5" />
        <circle cx="80" cy="24" r="4" />
        <circle cx="112" cy="48" r="5" />
        <circle cx="72" cy="72" r="4" />
        <circle cx="40" cy="88" r="4" />
        <path d="M40 40 80 24M80 24 112 48M80 24 72 72M40 40 72 72M72 72 40 88" />
      </g>
    ),
  },
  "Data Engineering": {
    from: "#92400e",
    to: "#1c0f02",
    stroke: "#fdba74",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none">
        <ellipse cx="76" cy="30" rx="34" ry="12" />
        <path d="M42 30v24c0 6.6 15.2 12 34 12s34-5.4 34-12V30" />
        <path d="M42 54v24c0 6.6 15.2 12 34 12s34-5.4 34-12V54" />
      </g>
    ),
  },
  "Distributed Systems": {
    from: "#059669",
    to: "#062018",
    stroke: "#6ee7b7",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <rect x="30" y="30" width="20" height="20" rx="3" />
        <rect x="98" y="30" width="20" height="20" rx="3" />
        <rect x="64" y="76" width="20" height="20" rx="3" />
        <path d="M50 40h48M74 76V50M40 50v20a10 10 0 0 0 10 10h10M108 50v20a10 10 0 0 1-10 10h-4" />
      </g>
    ),
  },
  "Computer Vision": {
    from: "#e11d48",
    to: "#2a0a12",
    stroke: "#fda4af",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none">
        <path d="M28 56c14-22 88-22 102 0-14 22-88 22-102 0Z" />
        <circle cx="79" cy="56" r="14" />
        <circle cx="79" cy="56" r="4" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  "Data Science": {
    from: "#d97706",
    to: "#2a1a03",
    stroke: "#fcd34d",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M32 92V40M62 92V24M92 92V56M122 92V68" />
        <path d="M28 92h98" />
      </g>
    ),
  },
  "Full-Stack": {
    from: "#be185d",
    to: "#1a0510",
    stroke: "#f9a8d4",
    icon: (
      <g stroke="currentColor" strokeWidth="1.6" fill="none">
        <rect x="28" y="26" width="94" height="64" rx="4" />
        <path d="M28 40h94" />
        <circle cx="38" cy="33" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="45" cy="33" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="52" cy="33" r="1.6" fill="currentColor" stroke="none" />
      </g>
    ),
  },
};

export default function ProjectCoverArt({
  category,
  className = "",
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const theme = THEME[category];
  const gradientId = `grad-${category.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 150 110"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="150" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.from} stopOpacity="0.55" />
          <stop offset="100%" stopColor={theme.to} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="150" height="110" fill={`url(#${gradientId})`} />
      <g transform="translate(4 3)" className="opacity-80" style={{ color: theme.stroke }}>
        {theme.icon}
      </g>
    </svg>
  );
}
