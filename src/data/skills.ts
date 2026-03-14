export interface SkillItem {
  name: string
  level: number
}

export interface SkillGroup {
  category: string
  skills: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion / GSAP', level: 80 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Laravel / PHP', level: 90 },
      { name: 'Node.js', level: 75 },
      { name: 'PostgreSQL / MySQL', level: 85 },
      { name: 'REST / GraphQL APIs', level: 85 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', level: 75 },
      { name: 'Docker / CI-CD', level: 70 },
      { name: 'Linux / Nginx', level: 80 },
      { name: 'Git / GitHub Actions', level: 90 },
    ],
  },
]

export const tools: string[] = [
  'Figma', 'VS Code', 'Postman', 'Insomnia',
  'GitHub', 'Linear', 'Notion', 'Vercel',
  'Shopify', 'Stripe', 'Three.js', 'Vite',
]
