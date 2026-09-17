import {
  SiGo,
  SiPython,
  SiNodedotjs,
  SiFastapi,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiPostgresql,
  SiRedis,
  SiApachespark,
  SiApacheairflow,
  SiApachekafka,
  SiElasticsearch,
  SiPytorch,
  SiHuggingface,
  SiFfmpeg,
  SiOpencv,
  SiGit,
  SiLinux,
  SiJupyter,
  SiGrafana,
  SiPrometheus,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TOOLS: { label: string; Icon: IconType; hex: string }[] = [
  { label: "Python", Icon: SiPython, hex: "#3776AB" },
  { label: "Go", Icon: SiGo, hex: "#00ADD8" },
  { label: "Node.js", Icon: SiNodedotjs, hex: "#5FA04E" },
  { label: "FastAPI", Icon: SiFastapi, hex: "#009688" },
  { label: "React", Icon: SiReact, hex: "#61DAFB" },
  { label: "TypeScript", Icon: SiTypescript, hex: "#3178C6" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, hex: "#38BDF8" },
  { label: "Docker", Icon: SiDocker, hex: "#2496ED" },
  { label: "Kubernetes", Icon: SiKubernetes, hex: "#326CE5" },
  { label: "Terraform", Icon: SiTerraform, hex: "#844FBA" },
  { label: "GitHub Actions", Icon: SiGithubactions, hex: "#2088FF" },
  { label: "PostgreSQL", Icon: SiPostgresql, hex: "#4169E1" },
  { label: "Redis", Icon: SiRedis, hex: "#FF4438" },
  { label: "Apache Spark", Icon: SiApachespark, hex: "#E25A1C" },
  { label: "Apache Airflow", Icon: SiApacheairflow, hex: "#017CEE" },
  { label: "Apache Kafka", Icon: SiApachekafka, hex: "#231F20" },
  { label: "Elasticsearch", Icon: SiElasticsearch, hex: "#005571" },
  { label: "PyTorch", Icon: SiPytorch, hex: "#EE4C2C" },
  { label: "Hugging Face", Icon: SiHuggingface, hex: "#FFD21E" },
  { label: "FFmpeg", Icon: SiFfmpeg, hex: "#007808" },
  { label: "OpenCV", Icon: SiOpencv, hex: "#5C3EE8" },
  { label: "Git", Icon: SiGit, hex: "#F05032" },
  { label: "Linux", Icon: SiLinux, hex: "#FCC624" },
  { label: "Jupyter", Icon: SiJupyter, hex: "#F37626" },
  { label: "Grafana", Icon: SiGrafana, hex: "#F46800" },
  { label: "Prometheus", Icon: SiPrometheus, hex: "#E6522C" },
];

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-5 lg:grid-cols-6">
      {TOOLS.map(({ label, Icon, hex }) => (
        <div
          key={label}
          className="group flex flex-col items-center gap-3 text-center"
          style={{ "--brand": hex } as React.CSSProperties}
        >
          <Icon className="h-9 w-9 text-graphite-600 transition-all duration-300 [color:var(--brand)] opacity-40 group-hover:opacity-100 group-hover:scale-110" />
          <span className="text-sm font-medium text-graphite-500 transition-colors duration-300 group-hover:text-strong">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
