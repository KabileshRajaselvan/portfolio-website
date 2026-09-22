export type ModuleEntry = {
  slug: string;
  name: string;
  what: string;
  stack: string;
  facts: string[];
  tags: string[];
};

export const modules: ModuleEntry[] = [
  {
    slug: "frontend-spa",
    name: "Frontend (React SPA)",
    what: "Single unified React SPA for every Incubrix product — one app, one login, one design system — proxying ~13 backend services (auth, CMS, TTS, video, publishing, ideation, billing, and more). Creator Hub is the homepage, seeding a Text/Audio/Video/Clips create flow.",
    stack:
      "React 19, Vite 7, react-router-dom 7; Zustand 5 (client/UI state), TanStack React Query 5 (server state), Context (auth); Tailwind CSS 3, Radix UI/shadcn, react-hook-form + Zod; native WebSocket for Ideation collaboration; Cognito (Google + OTP) auth via a fetch/axios wrapper attaching a Bearer JWT; multi-stage Docker (node:20-alpine builder to nginx:alpine server).",
    facts: [
      "Auto-save debounces at 30s",
      "Cross-tab \"edit guard\" (BroadcastChannel) ignores a sibling tab's echo within the last 4s",
      "Bounded polling for job status backs off exponentially (base × 2^attempts, capped, jittered), errors after 3 consecutive failures",
      "React Query never retries 4xx, retries a transient 5xx exactly once",
      "HTTP client retries once on a 401 (attempting token refresh) before forcing sign-out",
    ],
    tags: ["React 19", "Vite", "Zustand", "React Query", "WebSocket"],
  },
  {
    slug: "video-module",
    name: "Video Module (Speech-to-Video)",
    what: "Turns a script or audio file into a finished short \"faceless\" AI video — transcribe, find matching stock/owned clips, build a video recipe, render, poll, quality-score.",
    stack:
      "FastAPI + Pydantic validation; Celery + Redis background jobs with Celery beat for scheduled cleanup/polling; renders via Shotstack (cloud API) or in-house FFmpeg/GPU on a dedicated render worker; Whisper for transcription/captions; Pexels API for stock clips behind a circuit breaker, FAISS-based retrieval for owned clips; Cognito JWT (RS256) auth.",
    facts: [
      "worker_prefetch_multiplier=1, task_acks_late=True — a job is only marked done after it actually succeeds, one job per worker at a time",
      "Celery beat recovers stale jobs and polls render status every 300s",
      "Shotstack retry backoff 2s → 4s → 8s; Pexels circuit breaker opens after 5 consecutive failures, 60s cooldown",
      "Video quality score (PRR) on a 0–100 scale across ~10 dimensions",
      "Diagnosed and fixed a real production bug where render jobs hung at ~97% completion",
      "Supports 9:16, 1:1, and 16:9 aspect ratios",
    ],
    tags: ["FastAPI", "Celery", "Redis", "Whisper", "FAISS"],
  },
  {
    slug: "audio-module",
    name: "Audio Module (Text-to-Speech)",
    what: "\"Humanized AI Podcast Generator\" — turns a topic into an emotional podcast script (Gemini), then into realistic speech (ElevenLabs, including cloned voices), storing audio in S3 and tracking jobs in Postgres.",
    stack:
      "FastAPI + Uvicorn (fully async, asyncpg pool); blocking ElevenLabs/S3 calls offloaded via asyncio.to_thread, concurrency bounded by a thread pool plus queue-on-429 retry; Gemini script generation wrapped in tenacity retries plus a custom model-fallback layer; Cognito JWT auth; idempotency keys for job creation.",
    facts: [
      "24 default concurrent in-flight syntheses (TTS_SYNTH_THREADS)",
      "~20–30 account/premade voices plus 100+ Shared Voice Library voices, cached 30 minutes",
      "Gemini retries stop after 3 attempts (exponential wait, min 2s, max 10s); fallback also triggers on HTTP 400 InvalidArgument, not just 404",
      "Diagnosed and fixed a real production incident: the health-check endpoint's DB query was saturating the Postgres pool under load, causing ALB timeouts and ECS kills — fixed by removing the DB query from the liveness probe",
    ],
    tags: ["FastAPI", "Gemini", "ElevenLabs", "asyncio"],
  },
  {
    slug: "repurposer-gpu",
    name: "Repurposer & GPU Render Worker",
    what: "Turns one long video into many short auto-selected clips (Repurposer), then renders them into polished MP4s on GPU (Render-Worker) — also serves as the render backend for the Video module.",
    stack:
      "Python pipeline + Go public API for Repurposer; Celery + Redis job queue consumed by a long-lived GPU worker; custom FFmpeg 6.1.1 build with hand-written CUDA filters; NVENC/CUDA/NVDEC hardware encode/decode with a libx264 CPU fallback; FAISS for semantic clip search; Wav2Vec2 for forced alignment; AWS Batch + Spot GPU instances with NVIDIA MPS for GPU sharing.",
    facts: [
      "30-minute hard kill, 25-minute soft limit, worker concurrency 5",
      "Upgraded FFmpeg 4.4.2 → 6.1.1, fixing a GPU-compose crash",
      "Concurrent caption rasterization hides ~400s of CPU work — ~31% faster on long jobs",
      "Diagnosed and fixed a GPU admission-gate deadlock that used to take 2 hours to self-heal, now self-heals in ~2 minutes",
      "Root-caused a subtle bug where the NVENC GPU probe used a 64×64 test frame (below NVENC's minimum), silently forcing every job onto CPU rendering",
    ],
    tags: ["Go", "Python", "CUDA", "NVENC", "FFmpeg"],
  },
  {
    slug: "rss-feed",
    name: "RSS / Podcast Feed Module",
    what: "Builds and publishes a standard podcast RSS feed from a creator's episodes so podcast apps (Apple Podcasts, Spotify, Castbox) can list and play them.",
    stack:
      "FastAPI; PostgreSQL via asyncpg (migrated off DynamoDB); RSS 2.0 + iTunes-namespace XML generation; feed uploaded to a public S3 bucket, served via CloudFront with cache invalidation on update; JWT auth protects management endpoints, the public feed endpoint stays open.",
    facts: [
      "S3 cache-control max-age=60, must-revalidate — a ~60-second edge cache window",
      "Fronted by a real CloudFront distribution, invalidated on every feed update",
    ],
    tags: ["FastAPI", "CloudFront", "S3", "RSS"],
  },
  {
    slug: "ideation",
    name: "Ideation (Collaborative Drafting)",
    what: "Real-time collaborative drafting — like Google Docs — where AI helps shape a rough idea into a brief/draft, and teammates co-edit with live cursors, comments, suggestions, and approvals.",
    stack:
      "Go + Gin backend; gorilla/websocket for real-time collaboration via a Hub/room model, each connected client running its own ReadPump/WritePump goroutines; PostgreSQL for drafts, comments, collaborators, invites; Cognito JWT auth; Gemini for idea/brief/draft generation.",
    facts: [
      "Line locks (preventing two people editing the same line) auto-expire after 30s, with a cleanup sweep every 5s",
      "A lock covers a 3-line window around the edited line",
      "Each client's outbound message channel is buffered to 256 messages",
    ],
    tags: ["Go", "Gin", "WebSocket", "Gemini"],
  },
  {
    slug: "content-hub",
    name: "Content Hub (CMS)",
    what: "The central media library — upload video/audio/image/documents, organize into folders, track lineage, and auto-transcribe audio/video via Whisper with timestamps. Every other module pulls assets/transcripts from here.",
    stack:
      "Go backend in clean architecture (handler → usecase → domain → infrastructure); Whisper transcription runs as a separate Python FastAPI sidecar — a deliberate polyglot split; PostgreSQL for assets/transcripts/workflow sessions; S3 + CloudFront for storage/CDN.",
    facts: [
      "Single-flight transcription per instance (WHISPER_MAX_CONCURRENCY=1)",
      "Draft artifacts auto-reaped after 7 days if never saved",
      "URL-import size cap 3GB (memory-safe streaming import)",
      "Diagnosed and fixed a real fleet-wide outage caused by a missing Postgres migration that made zero assets show for every user until applied",
    ],
    tags: ["Go", "Whisper", "PostgreSQL", "S3"],
  },
  {
    slug: "heygen",
    name: "HeyGen (Digital Avatar Video)",
    what: "Turns audio/script into a talking, lip-synced avatar video by orchestrating a third-party AI video provider (HeyGen, with a sibling D-ID integration) — validates, dispatches, tracks, and polls rather than rendering itself.",
    stack:
      "Go + Gin, a thin orchestration layer over HeyGen's video-generation and status-polling APIs; PostgreSQL video_jobs table; a channel-based semaphore bounds concurrent generation requests; Redis tracks active sessions, feeding a CloudWatch signal used to pre-warm GPU capacity elsewhere.",
    facts: [
      "JWKS (JWT public key) cache TTL 1 hour",
      "Diagnosed and fixed a real incident where Redis being unset silently disabled session tracking for 5 hours straight — the fix made that failure loud instead of silent",
      "Automatically re-registers and retries on HeyGen's \"expired talking_photo\" error rather than failing the job",
    ],
    tags: ["Go", "Gin", "Redis", "CloudWatch"],
  },
  {
    slug: "publishing",
    name: "Publishing Module",
    what: "Connects Incubrix to 10 social platforms (Facebook, Instagram, X/Twitter, Bluesky, LinkedIn, YouTube, Pinterest, Threads, Reddit, Telegram, Discord) for OAuth-authenticated publishing, immediate and scheduled.",
    stack:
      "Go + Gin; goroutines/channels drive background publish jobs plus an upload semaphore; AES-256-GCM encryption at rest for OAuth tokens; S3 persists Bluesky sessions and scheduled media; OAuth 2.0 Authorization Code flow with PKCE (X/Twitter) and DPoP/ECDSA P-256 (Bluesky/AT Protocol).",
    facts: [
      "Runs as an ECS Fargate task at 0.25 vCPU / 512MB",
      "Video upload semaphore capacity: 2 concurrent uploads",
      "Token encryption: 32-byte key, AES-256-GCM, random nonce per operation",
      "X/Twitter access tokens refreshed proactively ~5 minutes before expiry",
      "In-process scheduler ticks every 30s for due jobs",
    ],
    tags: ["Go", "OAuth 2.0", "PKCE", "AES-256-GCM"],
  },
  {
    slug: "payments",
    name: "Payments Module (Stripe)",
    what: "Handles subscriptions (Starter/Creator/Pro/Business plans) via Stripe Checkout, billing management via Stripe's Customer Portal, webhook-driven plan sync, and usage/overage reporting.",
    stack:
      "FastAPI with an async lifespan hook; Stripe SDK wrapped in one dedicated service module; SQLAlchemy async ORM + Alembic migrations; webhook handling with raw-body HMAC signature verification and an event-ID dedup table for idempotency.",
    facts: [
      "Webhook handler deliberately returns HTTP 200 even on a logic error to stop Stripe's infinite retry loop — HTTP 500 reserved for genuine transient infra failures",
      "webhook_events.stripe_event_id has a unique DB index directly enforcing webhook dedup at the database level",
      "Duplicate-subscription attempts rejected with HTTP 409",
    ],
    tags: ["FastAPI", "Stripe", "SQLAlchemy", "Webhooks"],
  },
  {
    slug: "auth-onboarding",
    name: "Auth & Onboarding",
    what: "The \"front door\" of Incubrix — signs users up/in via Cognito (Google OAuth or email OTP), issues JWTs, owns the canonical users table's last_login_at, and tracks active sessions to trigger GPU pre-warming elsewhere.",
    stack:
      "Raw Go net/http + ServeMux — deliberately no framework, a different architectural choice from every other Go service here; Cognito User Pool/App Client; HMAC-SHA256 SECRET_HASH for confidential-client calls; Redis for session tracking; AWS SES for onboarding emails.",
    facts: [
      "OTP codes are 8 digits",
      "Login sessions registered with a 15-minute TTL",
      "Publishes an ActiveSessions CloudWatch metric every 60s",
      "DB pool capped at max 10 open / 5 idle connections, 5-minute max connection lifetime",
    ],
    tags: ["Go", "Cognito", "Redis", "CloudWatch"],
  },
  {
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    what: "Social-media analytics dashboards across 6 platforms (YouTube, Facebook, Instagram, Twitch, Patreon, LinkedIn) — growth, top posts, engagement, plus Gemini-generated growth recommendations.",
    stack:
      "Rebuilt into a single Go unified-backend (Gin) serving all 6 platforms from one binary, replacing separate per-platform services; a connectors.Registry acts as the single source of truth for platform config; AES-256-GCM token encryption; tiered token-bucket rate limiting; Twitch EventSub webhooks (HMAC-verified).",
    facts: [
      "Tiered rate limits: general endpoints 10 req/s (burst 30), dashboard/analytics 20 req/s (burst 40), OAuth-connect 1 req/30s (burst 2)",
      "Background sync scheduler every 6 hours; dashboard cache TTL 2 minutes (stale-while-revalidate)",
      "Gemini generates 5–7 recommendations per request, 60-second timeout",
      "Shipped a real, dated security fix closing an X-Internal-Secret bypass that was being honored even when a Bearer token was present",
    ],
    tags: ["Go", "Gin", "Prometheus", "Gemini"],
  },
  {
    slug: "unified-editor",
    name: "Unified Editor",
    what: "Backend for the timeline video/content editor — stores timelines/editor state, queues export jobs to render final MP4s, optionally pushes exports to S3 and registers them as Content Hub assets, and enforces quota before rendering.",
    stack:
      "Go + Gin; a Postgres pool for its own DB, plus a second, smaller pool that reads/writes the Content Hub's database directly — a deliberate cross-service data access pattern; S3 pre-signed URLs for downloads; async export flow (queue → 202 Accepted → background render → poll → download).",
    facts: [
      "Primary DB pool sized deliberately against a shared dev RDS instance capped at ~100 total connections, to avoid Postgres error 53300 (\"too many connections\")",
      "Quota-check fails open on error so a metering outage doesn't block users",
      "Pre-signed S3 download URLs expire after 15 minutes",
      "Export queuing returns HTTP 202 Accepted; a quota block returns HTTP 402 Payment Required",
    ],
    tags: ["Go", "Gin", "PostgreSQL", "S3"],
  },
  {
    slug: "scribe",
    name: "Scribe (Content Intelligence)",
    what: "A content intelligence/planning platform for creators — portfolio analysis (topic clustering + lifecycle labeling), content-gap detection, single-piece scoring/feedback, a 2-week content planner, and trending-topic surfacing.",
    stack:
      "Go 1.24 + Gin; Google Gemini for topic extraction/gap analysis/strategy/trend synthesis with forced JSON output; optional SerpAPI trending integration with graceful degradation to Gemini-only; a deterministic, weighted 5-signal content scoring engine, not just an LLM call.",
    facts: [
      "Concurrency limiter: buffered channel capped at 1,000 in-flight requests, returns HTTP 503 when full — real backpressure handling",
      "Content embeddings via text-embedding-004, 768-dimensional vectors",
      "5-signal scoring weights: Hook Strength 0.25, Depth 0.25, Clarity 0.20, Relevance 0.15, Repurpose Potential 0.15",
      "A failing SerpAPI engine is automatically disabled for 10 minutes before retry — self-healing against a flaky dependency",
    ],
    tags: ["Go", "Gemini", "Content Scoring"],
  },
  {
    slug: "website",
    name: "Website (Public Marketing Site)",
    what: "The public marketing site (incubrix.com) — landing page, pricing, FAQ, team, how-it-works, privacy/terms, and support/contact — deliberately separate from the logged-in product app.",
    stack:
      "React 18 + Vite SPA, Tailwind + shadcn/ui; its own small Express backend, exposed to Vercel through a serverless wrapper, handling support tickets (Postmark email), Google OAuth login (Passport), a chatbot widget, and booking; deployed on Vercel.",
    facts: [
      "Google Analytics (GA4) wired with page-view tracking deliberately deferred for manual control",
      "Security headers explicitly set (X-Frame-Options: DENY, X-Content-Type-Options: nosniff)",
      "The only module in the whole product built with a real Express.js backend",
    ],
    tags: ["React", "Vite", "Express.js", "Vercel"],
  },
];
