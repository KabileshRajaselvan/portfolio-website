export const hero = {
  greeting: "Hi, I'm Kabilesh",
  role: "Full-Stack AI Engineer | Production Systems Builder",
  bio: "I build production-ready full-stack systems and AI infrastructure. From shipping 8+ microservices handling 50K+ daily requests at 99.5% uptime, to deploying RAG pipelines and real-time inference systems — I turn complex problems into elegant, scalable solutions.",
  tagline: "Currently exploring AI/Software Engineering opportunities. Always building.",
  location: "Chennai, India",
};

export type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  location: string;
  logo: string;
  badge: string;
  bullets: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "IncuBrix Pte. Ltd.",
    role: "Tech Lead – AI Audio & Video Module",
    duration: "Oct 2025 – June 2026 · 8 months",
    location: "Singapore / Trichy, India",
    logo: "/images/incubrix-logo.jpg",
    badge: "Performance Exceeded Expectations",
    bullets: [
      "Architected and shipped 8+ microservices (Go/Python/Node.js) handling 50K+ daily media & ML requests with 99.5% uptime",
      "Built production-grade inference pipeline for audio/video classification; cut model latency 60% through quantization & optimization",
      "Implemented end-to-end MLOps infrastructure — automated model validation, real-time monitoring, trigger-based retraining at 98% availability",
      "Designed microservices architecture with Docker & Kubernetes; cut deployment time from 2 hours to 15 minutes via CI/CD",
      "Built CI/CD pipelines automating 15+ containerized services; reduced deployment bugs 40%",
      "Architected PostgreSQL & DynamoDB schemas; optimized 15+ slow queries, cutting latency 87% (3.2s → 0.4s)",
      "Mentored 2 junior engineers on deep learning, inference optimization, and MLOps best practices",
    ],
    tech: [
      "React.js",
      "Go",
      "Python",
      "FastAPI",
      "Node.js",
      "AWS (SageMaker, Lambda, S3, CloudFront)",
      "Docker",
      "Kubernetes (ECS/EKS)",
      "GitHub Actions",
      "PostgreSQL",
      "DynamoDB",
      "Redis",
      "PyTorch",
      "RAG Pipelines",
      "FFmpeg",
    ],
  },
  {
    company: "Tsuna",
    role: "Software & Automation Intern",
    duration: "Nov 2024 – Aug 2025 · 9 months",
    location: "Remote",
    logo: "/images/tsuna-logo.jpg",
    badge: "Strong Capabilities in Python, Automation & Business Problem-Solving",
    bullets: [
      "Engineered ML-powered user segmentation system (RFM + K-means/Random Forest) achieving 88% precision on user-intent prediction; improved campaign conversion 35%",
      "Built Python data pipelines processing 50K+ user profiles daily with feature extraction & cohort analysis",
      "Implemented Selenium-based web automation framework, cutting manual QA effort 60% with 99% test reliability",
      "Automated reporting system extracting insights from 5+ sources (Google Sheets, Workspace APIs); saved 15+ hrs/week of manual work",
      "Developed Python & Selenium automation integrated with Google APIs; automated 10+ workflows, saving 20 hours/week",
    ],
    tech: [
      "Python",
      "Selenium",
      "Pandas",
      "scikit-learn",
      "RFM Segmentation",
      "K-means",
      "Random Forest",
      "Google APIs",
      "ETL",
    ],
  },
];

export const skillCategories: { title: string; shortLabel: string; skills: string[] }[] = [
  {
    title: "Backend & Microservices",
    shortLabel: "Backend",
    skills: [
      "Go",
      "Python",
      "Node.js",
      "FastAPI",
      "Express.js",
      "REST APIs",
      "gRPC",
      "WebSocket",
      "Microservices Architecture",
      "System Design",
      "Load Balancing",
      "Rate Limiting",
      "Circuit Breaker Pattern",
    ],
  },
  {
    title: "Frontend & Web",
    shortLabel: "Frontend",
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Component Design",
      "State Management",
      "Responsive Design",
      "Offline-First PWA",
    ],
  },
  {
    title: "Cloud & DevOps",
    shortLabel: "DevOps",
    skills: [
      "AWS (SageMaker, Lambda, S3, EC2, CloudFront, Cognito, ALB, Bedrock)",
      "Docker",
      "Kubernetes (ECS/EKS)",
      "Terraform",
      "CI/CD (GitHub Actions)",
      "Prometheus & Grafana",
    ],
  },
  {
    title: "Databases & Data Engineering",
    shortLabel: "Databases",
    skills: [
      "PostgreSQL",
      "DynamoDB",
      "Redis",
      "SQLite",
      "NoSQL",
      "SQL Optimization",
      "PySpark",
      "Apache Airflow",
      "dbt",
      "Delta Lake",
      "ETL/ELT",
      "Kafka (KRaft)",
      "Elasticsearch",
    ],
  },
  {
    title: "AI/ML & LLM Infrastructure",
    shortLabel: "AI / ML",
    skills: [
      "PyTorch",
      "Hugging Face Transformers",
      "LoRA / QLoRA Fine-Tuning",
      "RAG (Retrieval-Augmented Generation)",
      "Semantic Embeddings",
      "Vector Databases (pgvector)",
      "LLM Integration",
      "Inference Optimization",
      "Model Quantization",
      "RAGAS Evaluation",
      "Agentic AI (ReAct-style)",
      "LLM Serving",
    ],
  },
  {
    title: "Audio/Video Processing",
    shortLabel: "Media",
    skills: [
      "FFmpeg",
      "librosa",
      "OpenCV",
      "MFCC",
      "Mel-Spectrogram",
      "HLS/DASH Streaming",
      "Codec Optimization (H.264, H.265, VP9, Opus)",
      "GPU-Accelerated Encoding (CUDA/NVENC)",
    ],
  },
  {
    title: "Data Science & Statistics",
    shortLabel: "Data Science",
    skills: [
      "EDA",
      "Statistical Analysis",
      "A/B Testing",
      "Causal Inference (PSM, IPW, DiD, CATE)",
      "RFM Segmentation",
      "K-means Clustering",
      "Random Forest",
      "Survival Analysis (Kaplan-Meier)",
    ],
  },
  {
    title: "Tools & Practices",
    shortLabel: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Linux",
      "Jupyter Notebooks",
      "pytest",
      "Agile/Scrum",
      "Web Scraping",
      "API Integration",
    ],
  },
];

export const education = {
  degree: "M.Tech (Integrated) Computer Science & Engineering",
  specialization: "Specialization: Business Analytics",
  school: "Vellore Institute of Technology (VIT), Chennai",
  graduated: "Graduated: August 2026",
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  category: "Cloud & Data Engineering" | "AI & Machine Learning" | "Excel & Data Analysis" | "Automation";
  url: string;
  image: string;
  description: string;
};

export const certifications: Certification[] = [
  {
    name: "Complete Guide to SQL for Data Engineering",
    issuer: "LinkedIn Learning",
    date: "Sep 2026",
    category: "Cloud & Data Engineering",
    url: "https://www.linkedin.com/learning/certificates/dadb9e1769f810dd19d6ca7e152ecbda6e50aa3b6c27d1b8a2ddaa8291cd5759/",
    image: "/images/certificates/sql-data-engineering.jpg",
    description: "Advanced SQL techniques for building and optimizing data engineering pipelines.",
  },
  {
    name: "Google Cloud Professional Machine Learning Engineer Cert Prep",
    issuer: "LinkedIn Learning",
    date: "Sep 2026",
    category: "Cloud & Data Engineering",
    url: "https://www.linkedin.com/learning/certificates/4dfcfdb897a7b1e2a27cd48a5f9d46393d0a8cde932f310d02aeda24d8121318/",
    image: "/images/certificates/gcp-ml-engineer.jpg",
    description: "Preparation for Google Cloud's Professional ML Engineer exam, covering GCP-based ML systems.",
  },
  {
    name: "AWS Certified Cloud Practitioner Cert Prep",
    issuer: "LinkedIn Learning",
    date: "Sep 2026",
    category: "Cloud & Data Engineering",
    url: "https://www.linkedin.com/learning/certificates/8f7e981b65ab878cc5fbe71c41d5bb3b474522a9bc14a28f1992098bb4e44a26/",
    image: "/images/certificates/aws-cloud-practitioner.jpg",
    description: "Foundational AWS cloud computing concepts, core services, and best practices.",
  },
  {
    name: "Microsoft Azure AI Essentials Professional Certificate",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    category: "AI & Machine Learning",
    url: "https://www.linkedin.com/learning/certificates/4aa1249a2497fd091833bfd6fe1f08911f411f1040270e57b265851cf23aacc9/",
    image: "/images/certificates/azure-ai-essentials.jpg",
    description: "Applied machine learning and generative AI using Microsoft Azure AI Studio.",
  },
  {
    name: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "Feb 2025",
    category: "AI & Machine Learning",
    url: "https://www.linkedin.com/learning/certificates/300054ddf9464cd8af99619b9d7289535395289fc70810f74aea01288d966472/",
    image: "/images/certificates/what-is-generative-ai.jpg",
    description: "Core concepts distinguishing generative AI from traditional AI systems.",
  },
  {
    name: "Advanced Python Projects: Build AI Applications",
    issuer: "LinkedIn Learning",
    date: "Sep 2024",
    category: "AI & Machine Learning",
    url: "https://www.linkedin.com/learning/certificates/6d56ab6d6cca904b55867936678c71d55fe9b96c8c666e561740414135a6ef0e/",
    image: "/images/certificates/advanced-python-ai-apps.jpg",
    description: "Hands-on Python projects building real AI-powered applications.",
  },
  {
    name: "Prompting ChatGPT with Multimodal Techniques",
    issuer: "LinkedIn Learning",
    date: "Sep 2024",
    category: "AI & Machine Learning",
    url: "https://www.linkedin.com/learning/certificates/8d12cba7537bb6b101389cdbb400e3822572c4be126a18837806f322f1c413ef/",
    image: "/images/certificates/prompting-chatgpt-multimodal.jpg",
    description: "Prompt engineering techniques for multimodal ChatGPT interactions.",
  },
  {
    name: "Generative AI vs. Traditional AI",
    issuer: "LinkedIn Learning",
    date: "Sep 2024",
    category: "AI & Machine Learning",
    url: "https://www.linkedin.com/learning/certificates/9259c52c1c61c83ad34df4fa7e57dab1786e5ff75a8abaa5d606924e48636d18/",
    image: "/images/certificates/genai-vs-traditional-ai.jpg",
    description: "Comparative study of generative AI and traditional AI approaches.",
  },
  {
    name: "Excel Data Visualization: Mastering 20+ Charts and Graphs",
    issuer: "LinkedIn Learning",
    date: "Feb 2025",
    category: "Excel & Data Analysis",
    url: "https://www.linkedin.com/learning/certificates/19bd872d102f08950cb9991bcc5b8ffee16cdf4458ecffd2b40fad36cb3846b3/",
    image: "/images/certificates/excel-data-visualization.jpg",
    description: "Building 20+ chart and graph types for effective data visualization in Excel.",
  },
  {
    name: "Excel: Managing and Analyzing Data",
    issuer: "LinkedIn Learning",
    date: "Jan 2025",
    category: "Excel & Data Analysis",
    url: "https://www.linkedin.com/learning/certificates/94077144566ac3633d69c891a4efe198dd67a2ee2a1848f024f5a4ba095dd34a/",
    image: "/images/certificates/excel-managing-analyzing-data.jpg",
    description: "Core Excel techniques for managing, cleaning, and analyzing datasets.",
  },
  {
    name: "Using Python for Automation",
    issuer: "LinkedIn Learning",
    date: "Sep 2024",
    category: "Automation",
    url: "https://www.linkedin.com/learning/certificates/9dc89009500d375eb817a37643cc0bb1a9fb9c9173735c6206b45400425c2582/",
    image: "/images/certificates/python-for-automation.jpg",
    description: "Python scripting for automating repetitive workflows and tasks.",
  },
];

export const coreProficiency: { skill: string; level: number }[] = [
  { skill: "Python", level: 92 },
  { skill: "Go", level: 85 },
  { skill: "React / TypeScript", level: 82 },
  { skill: "AWS", level: 85 },
  { skill: "Docker & Kubernetes", level: 80 },
  { skill: "PostgreSQL", level: 85 },
  { skill: "PyTorch / LLM Infra", level: 80 },
  { skill: "RAG & Vector Search", level: 82 },
];

export const contact = {
  email: "kabirselvan@gmail.com",
  linkedin: "https://linkedin.com/in/kabilesh-rajaselvan-3344a7287",
  github: "https://github.com/KabileshRajaselvan",
  get gmailCompose() {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      this.email
    )}`;
  },
};

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 50, suffix: "K+", label: "Daily requests handled" },
  { value: 99.5, suffix: "%", label: "Uptime in production" },
  { value: 8, suffix: "+", label: "Microservices shipped" },
];

export type ProjectCategory =
  | "AI & ML"
  | "Data Engineering"
  | "Distributed Systems"
  | "Computer Vision"
  | "Data Science"
  | "Full-Stack";

export type MoreProject = {
  title: string;
  description: string;
  tags: string[];
  repo: string;
  category: ProjectCategory;
};

export const moreProjects: MoreProject[] = [
  {
    title: "RAG Knowledge Engine",
    description:
      "7-stage hybrid BM25 + pgvector retrieval pipeline with 0.775 context recall and built-in hallucination detection.",
    tags: ["FastAPI", "pgvector", "BM25", "Python"],
    repo: "https://github.com/KabileshRajaselvan/rag-knowledge-engine",
    category: "AI & ML",
  },
  {
    title: "Agentic Tool Orchestration Platform",
    description:
      "Custom ReAct-style 5-tool agent (no LangChain) with AST-sandboxed execution — zero crashes across an 18-task benchmark.",
    tags: ["Python", "FastAPI", "React"],
    repo: "https://github.com/KabileshRajaselvan/agentic-tool-orchestration-platform",
    category: "AI & ML",
  },
  {
    title: "InferOps",
    description:
      "Production ML model serving with real A/B traffic-split, KL-divergence drift detection, and automatic retraining.",
    tags: ["FastAPI", "Redis", "Kafka", "MLflow"],
    repo: "https://github.com/KabileshRajaselvan/inferops",
    category: "AI & ML",
  },
  {
    title: "Customer Segmentation, Cohort & Churn Analytics",
    description:
      "RFM segmentation across 7 segments with Random Forest churn prediction (0.85-0.90 AUC) and Kaplan-Meier survival curves.",
    tags: ["Python", "scikit-learn", "Pandas"],
    repo: "https://github.com/KabileshRajaselvan/customer-segmentation-cohort-churn-analytics-platform",
    category: "Data Science",
  },
  {
    title: "Causal Impact Analysis for Marketing Campaigns",
    description: "Causal inference methods applied to measure real marketing campaign impact.",
    tags: ["Python", "Causal Inference"],
    repo: "https://github.com/KabileshRajaselvan/causal-impact-analysis-marketing-campaigns",
    category: "Data Science",
  },
  {
    title: "Real-Time Event Streaming Pipeline",
    description: "Kafka + PySpark structured streaming pipeline with a live dashboard.",
    tags: ["Kafka", "PySpark", "Delta Lake"],
    repo: "https://github.com/KabileshRajaselvan/realtime-event-streaming-pipeline",
    category: "Data Engineering",
  },
  {
    title: "Offline-First Task Management Platform",
    description: "Offline-first task manager with ML-based task prioritization.",
    tags: ["React", "FastAPI", "ML"],
    repo: "https://github.com/KabileshRajaselvan/Offline-First-Task-Management-Platform-with-React-FastAPI-and-ML-Task-Prioritization",
    category: "Full-Stack",
  },
  {
    title: "Personalized Recommendation Platform",
    description:
      "Hybrid recommender (collaborative filtering + content-based) on MovieLens 100K with cold-start handling and diversity re-ranking.",
    tags: ["Python", "Recommenders"],
    repo: "https://github.com/KabileshRajaselvan/personalized-recommendation-platform",
    category: "AI & ML",
  },
  {
    title: "Real-Time Content Feed Platform",
    description: "Real-time content feed system with live ranking and delivery.",
    tags: ["Python", "Real-Time Systems"],
    repo: "https://github.com/KabileshRajaselvan/realtime-content-feed-platform",
    category: "Distributed Systems",
  },
  {
    title: "Airflow + dbt Batch ETL Pipeline",
    description:
      "Airflow + dbt-core batch ETL: mock API + Postgres + MinIO into bronze/silver/gold, with data-quality gating.",
    tags: ["Airflow", "dbt", "PostgreSQL"],
    repo: "https://github.com/KabileshRajaselvan/airflow-dbt-batch-etl-pipeline",
    category: "Data Engineering",
  },
  {
    title: "Distributed Task Queue System",
    description:
      "Priority scheduling, auto-retry, and real-time monitoring for a distributed task queue.",
    tags: ["Go", "Distributed Systems"],
    repo: "https://github.com/KabileshRajaselvan/Distributed-Task-Queue-System-with-Priority-Scheduling-Auto-Retry-and-Real-Time-Monitoring",
    category: "Distributed Systems",
  },
  {
    title: "A/B Testing Framework",
    description: "Statistical A/B testing framework for experiment analysis.",
    tags: ["Python", "Statistics"],
    repo: "https://github.com/KabileshRajaselvan/ab-testing-framework",
    category: "Data Science",
  },
  {
    title: "Hybrid Detection of Shilling Attacks",
    description: "NLP and Graph Neural Networks combined to detect fraudulent review activity.",
    tags: ["NLP", "Graph Neural Networks"],
    repo: "https://github.com/KabileshRajaselvan/Hybrid-Detection-of-Shilling-Attacks-Using-NLP-and-Graph-Neural-Networks",
    category: "AI & ML",
  },
  {
    title: "Mental Health Severity Prediction",
    description:
      "Compares readability and sentiment-analysis methods to predict mental health severity from Reddit data.",
    tags: ["NLP", "Sentiment Analysis"],
    repo: "https://github.com/KabileshRajaselvan/Comparing-Readability-and-Sentiment-Analysis-to-Predict-Mental-Health-Severity-on-Reddit-Data",
    category: "AI & ML",
  },
  {
    title: "Smart Personal Safety Device",
    description:
      "Real-time video analytics with multi-threaded face and object detection.",
    tags: ["OpenCV", "Computer Vision"],
    repo: "https://github.com/KabileshRajaselvan/Smart-Personal-Safety-Device-Real-Time-Video-Analytics-with-Multi-Threaded-Face-Object-Detection",
    category: "Computer Vision",
  },
  {
    title: "CNN for Image Classification",
    description: "Convolutional neural network for image categorization.",
    tags: ["PyTorch", "Computer Vision"],
    repo: "https://github.com/KabileshRajaselvan/Convolutional-Neural-Network-for-Image-Classification",
    category: "Computer Vision",
  },
  {
    title: "E-Commerce Big Data Analysis",
    description: "Applies Benford's Law to detect potential fraudulent transactional activity.",
    tags: ["Big Data", "Fraud Detection"],
    repo: "https://github.com/KabileshRajaselvan/E-Commerce-Analysis-bigdata-framworks",
    category: "Data Science",
  },
  {
    title: "IncuBrix CMS",
    description: "Podcast content management system platform built during the IncuBrix role.",
    tags: ["JavaScript", "CMS"],
    repo: "https://github.com/KabileshRajaselvan/incubrix-cms",
    category: "Full-Stack",
  },
  {
    title: "Content Performance & Bot Detection",
    description:
      "Real-time analytics framework for Reddit integrating sentiment analysis, bot detection, and engagement lifecycle.",
    tags: ["NLP", "Real-Time Analytics"],
    repo: "https://github.com/KabileshRajaselvan/Real-Time-Analysis-of-Content-Performance-Bot-Detection-and-Engagement-Lifecycle",
    category: "AI & ML",
  },
  {
    title: "Real-Time Object Detection",
    description: "Real-time object detection using Haar cascade classifiers.",
    tags: ["OpenCV", "Computer Vision"],
    repo: "https://github.com/KabileshRajaselvan/-Real-Time-Object-Detection-Using-Haar-Cascades",
    category: "Computer Vision",
  },
  {
    title: "Econometric Modeling: WTP Eco-Labels",
    description:
      "Econometric analysis of consumer survey data on environmental values, eco-label trust, and willingness to pay.",
    tags: ["Python", "Econometrics"],
    repo: "https://github.com/KabileshRajaselvan/Econometric-Modeling-with-Python-WTP-Eco-Labels-and-Personal-Values",
    category: "Data Science",
  },
  {
    title: "Consumer Behavior on Eco-Labeling",
    description:
      "Investigates how environmental values and eco-labeling trust influence sustainable purchasing decisions.",
    tags: ["Data Analysis", "Consumer Research"],
    repo: "https://github.com/KabileshRajaselvan/Consumer-Behavior-Analysis-on-Eco-Labeling-and-Personal-Values",
    category: "Data Science",
  },
  {
    title: "Spatio-Temporal Segmentation",
    description: "Spatio-temporal segmentation analysis.",
    tags: ["Computer Vision", "Segmentation"],
    repo: "https://github.com/KabileshRajaselvan/Spatio--Temporal-segmentation",
    category: "Computer Vision",
  },
  {
    title: "Orbit SaaS Kit",
    description:
      "Multi-tenant SaaS starter kit: FastAPI + React, JWT/OAuth auth, workspace tenant isolation, Stripe-shaped billing.",
    tags: ["FastAPI", "React", "Multi-Tenant"],
    repo: "https://github.com/KabileshRajaselvan/orbit-saas-kit",
    category: "Full-Stack",
  },
];

export const nav = {
  name: "Kabilesh Rajaselvan",
  links: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};
