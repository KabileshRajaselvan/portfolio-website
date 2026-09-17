import type { ProjectCategory } from "@/lib/content";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  filterCategory: ProjectCategory;
  overview: string;
  architecture: { step: string; title: string; body: string }[];
  techStack: string[];
  metrics: { value: string; label: string }[];
  decisions: { title: string; body: string }[];
  repo: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "domain-tuned-support-llm",
    title: "Domain-Tuned Support LLM",
    tagline:
      "QLoRA fine-tuning of Qwen2.5-1.5B for customer support, measured honestly against the untuned baseline.",
    category: "AI/ML Infrastructure",
    filterCategory: "AI & ML",
    overview:
      "A real 4-bit QLoRA fine-tune of Qwen2.5-1.5B-Instruct on customer-support data. Rather than reporting aspirational numbers, every metric here comes from actual .generate() calls on 60 held-out test examples, compared directly against the untuned base model — no GPT-4 baseline calls, no mocked numbers.",
    architecture: [
      {
        step: "01",
        title: "Data Layer",
        body: "Bitext customer-support dataset (~2.6k examples), split 80/10/10 and formatted via Qwen2.5 chat templates into JSONL.",
      },
      {
        step: "02",
        title: "Training",
        body: "QLoRA with 4-bit NF4 quantization (bitsandbytes) plus a LoRA adapter (r=16, α=32) trained via trl.SFTTrainer.",
      },
      {
        step: "03",
        title: "Serving",
        body: "FastAPI backend with PostgreSQL-backed inference caching — cache key is a SHA256 hash of prompt + parameters.",
      },
      {
        step: "04",
        title: "Frontend",
        body: "React interface displaying prompts, responses, and live evaluation metrics.",
      },
      {
        step: "05",
        title: "Monitoring",
        body: "Per-step training metrics (loss, learning rate, validation accuracy) persisted to Postgres during fine-tuning.",
      },
    ],
    techStack: [
      "Qwen2.5-1.5B-Instruct",
      "bitsandbytes",
      "peft (LoRA)",
      "trl.SFTTrainer",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Docker",
      "GitHub Actions",
    ],
    metrics: [
      { value: "+60%", label: "F1 vs. untuned baseline (0.441 vs 0.275)" },
      { value: "+74%", label: "ROUGE-L vs. untuned baseline (0.333 vs 0.191)" },
      { value: "18.46M", label: "Trainable params (1.18% of 1.56B total)" },
      { value: "77.9 min", label: "Training wall-clock on RTX 4050 (6GB VRAM)" },
    ],
    decisions: [
      {
        title: "Model swap: Mistral-7B → Qwen2.5-1.5B",
        body: "Mistral-7B doesn't fit in 6GB VRAM alongside training overhead. Qwen2.5-1.5B is a strong small instruct model that trains comfortably in 4-bit.",
      },
      {
        title: "4-bit over 8-bit quantization",
        body: "4-bit NF4 roughly halves the base model's memory footprint vs. 8-bit, at a small, well-documented quality cost.",
      },
      {
        title: "No GPT-4 baseline",
        body: "Avoided paid API calls for a portfolio project — the real, measurable, zero-cost comparison is the untuned base model.",
      },
      {
        title: "Docker GPU gap",
        body: "Windows Docker Desktop doesn't reliably expose the GPU to Linux containers for CUDA workloads, so containers default to a mock mode; real training runs on host.",
      },
    ],
    repo: "https://github.com/KabileshRajaselvan/domain-tuned-support-llm-lora-quantization-platform",
  },
  {
    slug: "medallion-data-lake-platform",
    title: "Medallion Data Lake Platform",
    tagline:
      "Production-grade Bronze/Silver/Gold architecture on PySpark and Delta Lake, with real governance and per-column data quality.",
    category: "Data Engineering",
    filterCategory: "Data Engineering",
    overview:
      "A production-grade medallion architecture — not a simplified toy version. Includes real data governance, cataloging, lineage tracking, and self-service SQL, with a quarantine-based data-quality framework that isolates bad rows instead of failing entire batches.",
    architecture: [
      {
        step: "01",
        title: "Bronze Layer",
        body: "Append-only ingestion from three independent sources (clickstream JSON, Postgres OLTP, CSV landing files) into Delta tables on MinIO.",
      },
      {
        step: "02",
        title: "Silver Layer",
        body: "Deduplication, type casting, and per-column data-quality rules — required-rule failures quarantine only that row, optional rules just log.",
      },
      {
        step: "03",
        title: "Gold Layer",
        body: "Pre-joined business marts: daily events (DAU), funnel conversions (view→cart→purchase), and revenue rollups.",
      },
      {
        step: "04",
        title: "Governance Service",
        body: "FastAPI + PostgreSQL catalog storing metadata, lineage, RBAC grants, and pipeline run history — all parameterized queries.",
      },
      {
        step: "05",
        title: "Self-Service API",
        body: "Read-only SQL over Gold tables via DuckDB's delta-scan on MinIO, RBAC-enforced.",
      },
    ],
    techStack: [
      "Apache Spark (PySpark)",
      "Delta Lake",
      "MinIO",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "DuckDB",
      "React",
      "Docker Compose",
    ],
    metrics: [
      { value: "23", label: "Unit tests passing" },
      { value: "8", label: "Integration tests against real Postgres" },
      { value: "3-tier", label: "RBAC: viewer / analyst / admin" },
      { value: "0", label: "SQL injections that got through (verified via attack payloads)" },
    ],
    decisions: [
      {
        title: "Postgres catalog over Hive Metastore",
        body: "A plain Postgres schema gives identical metadata/lineage/RBAC capabilities with far less operational overhead than a Hive Metastore.",
      },
      {
        title: "DuckDB over Trino",
        body: "A full Trino cluster is disproportionate for single-node, demo-scale Gold tables. DuckDB reads Delta tables directly from MinIO without a second distributed engine.",
      },
      {
        title: "Quarantine-based data quality",
        body: "Replaced an all-or-nothing null-check approach with per-column rules — a required-rule failure quarantines only that row to a rejects table.",
      },
      {
        title: "Fixed real bugs along the way",
        body: "Caught and fixed an invalid schema='inferred' API call, an undefined DataQualityError, and an f-string SQL injection vulnerability — verified fixed via a real '); DROP TABLE attack payload in tests.",
      },
    ],
    repo: "https://github.com/KabileshRajaselvan/medallion-data-lake-platform",
  },
  {
    slug: "distributed-event-streaming-broker",
    title: "Distributed Event Streaming Broker",
    tagline:
      "A Kafka-style broker built from scratch in Go — real segment-log persistence, not an in-memory toy.",
    category: "Distributed Systems",
    filterCategory: "Distributed Systems",
    overview:
      "A production-inspired event streaming system in Go replicating Kafka's core architecture: topics, partitions, and consumer groups with durable message persistence, real-time WebSocket tailing, and full observability.",
    architecture: [
      {
        step: "01",
        title: "Ingestion",
        body: "Producers write to the broker (Go + chi router), which appends messages to on-disk, length-prefixed segment log files.",
      },
      {
        step: "02",
        title: "Metadata",
        body: "PostgreSQL tracks partition indexing, consumer offsets, and dead-letter-queue records — mirroring Kafka's own coordination-layer approach.",
      },
      {
        step: "03",
        title: "Consumption",
        body: "Pull-based consumer groups with durable offset tracking; messages survive broker restarts, verified via integration tests.",
      },
      {
        step: "04",
        title: "Live Monitoring",
        body: "WebSocket live-tail streams events in real time to a React dashboard.",
      },
      {
        step: "05",
        title: "Observability",
        body: "Prometheus metrics and Grafana dashboards, with per-group/partition consumer lag calculation.",
      },
    ],
    techStack: [
      "Go",
      "chi router",
      "pgx",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Recharts",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { value: "579/sec", label: "Measured throughput, 16 concurrent clients" },
      { value: "0%", label: "Failure rate (10,000/10,000 messages delivered)" },
      { value: "24.6ms", label: "Publish latency, p50" },
      { value: "65.7ms", label: "Publish latency, p99" },
    ],
    decisions: [
      {
        title: "Single-broker architecture",
        body: "Intentionally omits Raft/replication — multi-broker clustering is explicitly out of scope for this build.",
      },
      {
        title: "Real persistent storage",
        body: "Replaced an in-memory slice with actual segment files plus Postgres indexing, so no data is lost on restart.",
      },
      {
        title: "Per-partition mutex serialization",
        body: "Ensures correctness (one writer per partition) at the cost of a documented throughput ceiling.",
      },
      {
        title: "Measured claims over assertions",
        body: "Load-test results are reported as measured on a single dev machine competing for CPU/IO with other Docker stacks — substantially below a naive multi-broker projection, and documented as such.",
      },
    ],
    repo: "https://github.com/KabileshRajaselvan/distributed-event-streaming-broker",
  },
  {
    slug: "url-shortener-redis-analytics",
    title: "High-Performance URL Shortener",
    tagline:
      "A Bitly-style redirect service in Go targeting sub-50ms latency with Redis caching, Bloom filters, and Snowflake IDs.",
    category: "Backend Systems",
    filterCategory: "Distributed Systems",
    overview:
      "A production-grade URL shortening service in Go with a Redis-cached hot path, distributed Snowflake ID generation, and a real-time analytics dashboard — built to mimic Bitly's architecture at a fraction of the operational complexity.",
    architecture: [
      {
        step: "01",
        title: "Write Path",
        body: "URL validation → Bloom filter collision check → Snowflake ID generation → Postgres insert → Redis cache populate.",
      },
      {
        step: "02",
        title: "Redirect Path",
        body: "Redis cache lookup first, Postgres fallback on miss — the performance-critical hot path targeting sub-50ms responses.",
      },
      {
        step: "03",
        title: "Click Tracking",
        body: "Click events are buffered asynchronously (non-blocking) and flushed in batches by a background worker.",
      },
      {
        step: "04",
        title: "Analytics",
        body: "A worker rolls up click events into daily stats; live breakdowns by country, device, referrer, and browser.",
      },
      {
        step: "05",
        title: "Auth & Observability",
        body: "SHA-256 hashed API keys with per-key rate limiting; Prometheus metrics scraped by Grafana.",
      },
    ],
    techStack: [
      "Go",
      "chi router",
      "PostgreSQL (time-partitioned)",
      "Redis 7",
      "React",
      "TypeScript",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { value: "<50ms", label: "Target P99 redirect latency" },
      { value: "<200ms", label: "Target P99 create-URL latency" },
      { value: ">99%", label: "Target cache hit rate" },
    ],
    decisions: [
      {
        title: "Bloom filter on plain Redis",
        body: "The spec called for the RedisBloom module, but the actual deployment used stock redis:7-alpine — so this builds a real Bloom filter using Redis bitmaps with Kirsch–Mitzenmacher double hashing instead.",
      },
      {
        title: "No Kafka/Spark pipeline",
        body: "Skipped a heavyweight three-service analytics stack in favor of an in-process buffered channel with configurable batch flushing.",
      },
      {
        title: "Offline-first GeoIP",
        body: "Embeds the DB-IP IP-to-Country Lite dataset directly in the binary, eliminating external API dependencies.",
      },
      {
        title: "Hardened Base62 decoder",
        body: "The reference decoder silently corrupted invalid characters; this version validates all input and returns real errors.",
      },
    ],
    repo: "https://github.com/KabileshRajaselvan/High-Performance-URL-Shortener-with-Redis-Caching-and-Analytics-Dashboard",
  },
  {
    slug: "timeseries-forecasting-anomaly-detection",
    title: "Time Series Forecasting & Anomaly Detection",
    tagline:
      "LSTM+ARIMA ensemble forecasting with multi-method anomaly detection, evaluated honestly against 119 ground-truth labels.",
    category: "ML / Forecasting",
    filterCategory: "AI & ML",
    overview:
      "Forecasts operational metrics (CPU, memory, latency, error rate, throughput, disk I/O) using an LSTM+ARIMA ensemble, while detecting anomalies through z-score, Isolation Forest, and LSTM reconstruction-error methods — with results evaluated against real labeled ground truth, not assumed.",
    architecture: [
      {
        step: "01",
        title: "Data Layer",
        body: "~90 days of synthetic hourly data across 6 metrics, with labeled ground-truth anomalies injected for evaluation.",
      },
      {
        step: "02",
        title: "Model Registry",
        body: "Pre-trained LSTM weights and ARIMA parameters per metric, trained offline to keep inference sub-second.",
      },
      {
        step: "03",
        title: "Forecasting",
        body: "LSTM+ARIMA ensemble with inverse-validation weighting and bootstrap confidence intervals from held-out residuals.",
      },
      {
        step: "04",
        title: "Anomaly Detection",
        body: "z-score, Isolation Forest, and LSTM reconstruction error combined, with STL decomposition removing seasonal noise first.",
      },
      {
        step: "05",
        title: "Serving",
        body: "FastAPI backend, React + Recharts dashboard, Prometheus/Grafana observability.",
      },
    ],
    techStack: [
      "FastAPI",
      "SQLAlchemy 2.0",
      "PyTorch",
      "statsmodels (SARIMAX/STL)",
      "scikit-learn",
      "PostgreSQL",
      "React",
      "Recharts",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { value: "0.869", label: "Recall across 119 ground-truth anomalies" },
      { value: "0.459", label: "Overall F1 score" },
      { value: "33%→87%", label: "Recall improvement after STL residual processing" },
      { value: "2,160", label: "Hourly points evaluated per metric, x6 metrics" },
    ],
    decisions: [
      {
        title: "Python over Go",
        body: "LSTM/ARIMA/scikit-learn belong in Python's ML ecosystem — rebuilt from the original Go-oriented spec for honest stack-to-technique alignment.",
      },
      {
        title: "statsmodels SARIMAX over Prophet",
        body: "Prophet's pystan/cmdstanpy toolchain is fragile on Windows; SARIMAX with AIC grid search gives an equivalent classical baseline without the install risk.",
      },
      {
        title: "Offline pre-trained registry",
        body: "Training per request would violate the sub-second latency requirement, so models train offline and only weights load at inference time.",
      },
      {
        title: "Honest about the shortfall",
        body: "Results underperform a 92% precision / 88% recall target. Documented cause: without ground-truth labels in production, smaller anomalies (3-10x noise) blend into normal variance — a fundamental limit of unsupervised detection, not a bug.",
      },
    ],
    repo: "https://github.com/KabileshRajaselvan/timeseries-forecasting-anomaly-detection-platform",
  },
];
