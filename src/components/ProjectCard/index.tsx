import { motion } from 'framer-motion'
import { Suspense } from 'react'
import ThreeDViewer from '../ThreeDViewer'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  isActive: boolean
  onClick: () => void
}

export default function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="w-full h-full border overflow-hidden bg-[#111] flex flex-col"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        cursor: isActive ? 'pointer' : 'default',
      }}
      animate={{
        opacity:     isActive ? 1    : 0.18,
        scale:       isActive ? 1    : 0.88,
        borderColor: isActive ? `${project.color}55` : 'rgba(255,255,255,0.06)',
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={isActive ? { scale: 1.025 } : {}}
      onClick={() => isActive && onClick()}
    >
      {/* 3D preview pane */}
      <div className="relative flex-shrink-0" style={{ height: '180px', background: project.accentColor || '#111' }}>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-white/20 text-xs tracking-widest">LOADING 3D…</span>
            </div>
          }
        >
          <ThreeDViewer color={project.color} />
        </Suspense>

        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/55 backdrop-blur-sm transition-opacity duration-300">
            <span
              className="px-4 py-2 border font-mono text-xs tracking-widest uppercase"
              style={{ borderColor: project.color, color: project.color }}
            >
              Quick View →
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: project.color }}>
            {project.tag}
          </span>
          <span className="font-mono text-white/30 text-[11px]">{project.year}</span>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-white/40 text-[12px] leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-white/5 text-white/35 font-mono text-[10px]">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 bg-white/5 text-white/25 font-mono text-[10px]">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
