export interface ArchNode {
  label: string
  children?: ArchNode[]
}

export interface CaseStudy {
  id: number
  title: string
  subtitle: string
  tag: string
  year: string
  color: string
  accentColor: string
  problem: string
  solution: string
  architecture: string[]
  metrics: { label: string; value: string }[]
  techStack: string[]
  learnings: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "HEADLESS COMMERCE",
    subtitle: "Decoupled Shopify + Next.js Architecture",
    tag: "Architecture",
    year: "2025",
    color: "#00ff7f",
    accentColor: "#001a0d",
    problem:
      "A D2C brand needed a storefront that outperformed their Shopify theme on Core Web Vitals while retaining Shopify's merchandising tools and checkout reliability.",
    solution:
      "Implemented a headless architecture using the Shopify Storefront API with Next.js 14 App Router. Static pages are pre-rendered at build time via ISR, with cart state managed client-side through a lightweight Zustand store.",
    architecture: [
      "Browser → Vercel Edge (CDN) → Next.js App Router (SSG/ISR)",
      "Next.js → Shopify Storefront API (GraphQL) for products/collections",
      "Next.js → Shopify Checkout (hosted) for payments",
      "Preview channel via Shopify Webhooks → On-demand ISR revalidation",
    ],
    metrics: [
      { label: "LCP", value: "0.8s" },
      { label: "CLS", value: "0.001" },
      { label: "Build Cache Hit", value: "94%" },
      { label: "Conversion Lift", value: "+23%" },
    ],
    techStack: ["Next.js 14", "TypeScript", "Shopify Storefront API", "Zustand", "Vercel ISR", "Tailwind"],
    learnings: [
      "ISR with on-demand revalidation is the sweet spot between SSG performance and real-time data",
      "Keeping cart state client-only eliminates the need for server sessions",
      "Shopify's hosted checkout removes PCI compliance burden entirely",
    ],
  },
  {
    id: 2,
    title: "MULTI-TENANT SaaS",
    subtitle: "Shared-Database Multi-Tenancy on AWS",
    tag: "Systems Design",
    year: "2024",
    color: "#ff6b35",
    accentColor: "#1a0800",
    problem:
      "A B2B analytics startup needed to onboard 100+ tenants with strict data isolation, custom branding per tenant, and a billing system that scaled with usage.",
    solution:
      "Used Laravel's multi-tenancy via a shared database with tenant_id scoping on all models. A subdomain router resolves tenants at the middleware layer. Stripe Billing Portal handles subscription lifecycle without custom code.",
    architecture: [
      "*.app.io subdomain → AWS ALB → Laravel on ECS Fargate",
      "Middleware: resolve tenant from subdomain → set DB scope",
      "Shared MySQL (RDS) with tenant_id row-level isolation",
      "Redis (ElastiCache) for session/cache scoped per tenant",
      "S3 bucket per tenant for file isolation",
      "Stripe Customer + Subscription linked to each tenant row",
    ],
    metrics: [
      { label: "Tenants Supported", value: "200+" },
      { label: "API p95 Latency", value: "120ms" },
      { label: "MRR Retention Lift", value: "+18%" },
      { label: "Onboarding Time", value: "<2 min" },
    ],
    techStack: ["Laravel", "MySQL (RDS)", "Redis", "AWS ECS", "Docker", "Stripe", "React"],
    learnings: [
      "Row-level tenant isolation is simpler to maintain than separate databases at this scale",
      "Stripe's Customer Portal offloads 90% of billing support tickets",
      "Subdomain routing at the middleware layer keeps tenant resolution invisible to business logic",
    ],
  },
  {
    id: 3,
    title: "REAL-TIME INFRA MONITOR",
    subtitle: "WebSocket-Driven Observability Dashboard",
    tag: "Performance",
    year: "2024",
    color: "#00d4ff",
    accentColor: "#000d12",
    problem:
      "An ops team needed a single pane of glass across 50+ AWS resources with sub-second metric refresh, alarm management, and cost rollups — without a $30k/mo observability SaaS.",
    solution:
      "Built a React dashboard backed by a Laravel API that polls CloudWatch and broadcasts updates over WebSockets (Laravel Reverb). The frontend uses optimistic UI and canvas-based charts for zero-jank rendering.",
    architecture: [
      "React SPA → Laravel API (REST + WebSocket)",
      "Laravel Reverb (WebSocket server) → React EventSource",
      "Laravel Scheduler (every 30s) → CloudWatch GetMetricData → Redis pub/sub",
      "Redis → Reverb broadcasts → connected React clients",
      "IAM Role on EC2 instance profile — no hard-coded AWS keys",
    ],
    metrics: [
      { label: "Metric Refresh", value: "< 1s" },
      { label: "Resources Monitored", value: "50+" },
      { label: "Observability Cost", value: "$0/mo" },
      { label: "Alert MTTD", value: "< 5s" },
    ],
    techStack: ["React", "Laravel", "Laravel Reverb", "AWS CloudWatch SDK", "Redis", "Canvas API"],
    learnings: [
      "Redis pub/sub as the bridge between scheduled pollers and WebSocket broadcasts avoids tight coupling",
      "Canvas charts outperform SVG at high update frequencies (> 10 updates/sec)",
      "Instance profile IAM roles are non-negotiable for any AWS-hosted workload",
    ],
  },
]
