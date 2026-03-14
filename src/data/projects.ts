export interface Project {
  id: number
  title: string
  tag: string
  description: string
  longDescription: string
  tech: string[]
  color: string
  accentColor: string
  year: string
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'HEADLESS E-COMMERCE',
    tag: 'Fullstack',
    description: 'A Shopify headless storefront built with Next.js, delivering a blazing-fast shopping experience.',
    longDescription:
      'Built on Next.js 14 with the Shopify Storefront API. Features include real-time inventory, cart management with optimistic UI, and a checkout flow powered by Shopify Payments. Deployed on Vercel with edge caching for sub-100ms response times.',
    tech: ['Next.js', 'TypeScript', 'Shopify API', 'Tailwind', 'Vercel'],
    color: '#00ff7f',
    accentColor: '#001a0d',
    year: '2025',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'AWS INFRA DASHBOARD',
    tag: 'DevOps',
    description: 'A real-time cloud infrastructure monitoring dashboard built on top of AWS CloudWatch.',
    longDescription:
      'Aggregates metrics from EC2, Lambda, RDS, and S3 into a single React dashboard. Uses WebSockets for live updates, with alarm management and cost analytics. Backend is a Laravel API running on ECS Fargate.',
    tech: ['React', 'Laravel', 'AWS SDK', 'WebSockets', 'Tailwind'],
    color: '#ff6b35',
    accentColor: '#1a0800',
    year: '2024',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'LARAVEL SaaS BOILERPLATE',
    tag: 'Open Source',
    description: 'Production-ready SaaS starter kit: multi-tenancy, Stripe billing, RBAC, and API authentication.',
    longDescription:
      'A complete SaaS foundation including team-based multi-tenancy, Stripe Checkout & Billing Portal, role-based access control, REST + API token auth, and a React admin panel. Fully documented and battle-tested.',
    tech: ['Laravel', 'React', 'Stripe', 'MySQL', 'Docker'],
    color: '#a855f7',
    accentColor: '#0d0010',
    year: '2024',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: '3D PORTFOLIO ENGINE',
    tag: 'Creative Dev',
    description: 'A scroll-driven 3D portfolio experience built with Three.js and GSAP ScrollTrigger.',
    longDescription:
      'Custom WebGL renderer with scroll-jacked camera movements, particle systems, and dynamic lighting. Built entirely from scratch without a UI library, hitting 60fps on mid-range hardware.',
    tech: ['Three.js', 'GSAP', 'WebGL', 'TypeScript', 'Vite'],
    color: '#00d4ff',
    accentColor: '#000d12',
    year: '2025',
    link: '#',
    github: '#',
  },
]
