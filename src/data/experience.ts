export interface Experience {
  id: number
  company: string
  role: string
  type: string
  period: string
  duration: string
  location: string
  description: string
  achievements: string[]
  tech: string[]
  color: string
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'TechVentures',
    role: 'Senior Frontend Developer',
    type: 'Full-time',
    period: '2023 — Present',
    duration: '2+ yrs',
    location: 'Remote',
    description:
      'Leading UI/UX engineering across 3 product teams, owning the component library and setting front-end architecture standards.',
    achievements: [
      'Migrated flagship product from CRA → Vite, cutting CI build time by 62%',
      'Built a shared design system (40+ components) adopted by 5 squads',
      'Introduced scroll-driven animations increasing session depth by 28%',
      'Mentored 3 junior engineers through structured code reviews',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Storybook', 'Vitest'],
    color: '#00ff7f',
  },
  {
    id: 2,
    company: 'GrowthLab',
    role: 'Fullstack Developer',
    type: 'Full-time',
    period: '2021 — 2023',
    duration: '2 yrs',
    location: 'Ho Chi Minh City',
    description:
      'Built and maintained a multi-tenant SaaS analytics platform serving 200+ businesses, owning the full stack from API to UI.',
    achievements: [
      'Engineered the multi-tenancy system supporting 200+ independent workspaces',
      'Integrated Stripe Billing Portal, increasing MRR retention by 18%',
      'Reduced API p95 latencies from 800ms → 120ms via query optimisation',
      'Delivered CI/CD pipeline with zero-downtime blue-green deployments on AWS',
    ],
    tech: ['Laravel', 'React', 'MySQL', 'Redis', 'AWS EC2', 'Docker'],
    color: '#ff6b35',
  },
  {
    id: 3,
    company: 'PixelAgency',
    role: 'Frontend Developer',
    type: 'Full-time',
    period: '2020 — 2021',
    duration: '1 yr',
    location: 'Ho Chi Minh City',
    description:
      'Delivered pixel-perfect marketing websites and e-commerce storefronts for a diverse portfolio of clients across Southeast Asia.',
    achievements: [
      'Shipped 12+ client projects on time with 100% client satisfaction rate',
      'Introduced GSAP animations that boosted client engagement scores by 35%',
      'Created reusable template system cutting project setup time by 50%',
    ],
    tech: ['HTML/CSS', 'JavaScript', 'Vue.js', 'GSAP', 'Shopify', 'WordPress'],
    color: '#a855f7',
  },
]
