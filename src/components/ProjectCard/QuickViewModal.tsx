import { motion } from 'framer-motion'
import { Suspense } from 'react'
import ThreeDViewer from '../ThreeDViewer'
import type { Project } from '../../data/projects'

interface QuickViewModalProps {
  project: Project
  onClose: () => void
}

export default function QuickViewModal({ project, onClose }: QuickViewModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-4 md:inset-12 lg:inset-20 z-50 bg-[#0f0f0f] border border-white/10 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors font-mono text-lg"
        >
          ✕
        </button>

        {/* Left: 3D viewer */}
        <div className="w-full md:w-1/2 h-64 md:h-full" style={{ background: project.accentColor || '#111' }}>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-mono text-white/20 text-xs">LOADING 3D...</span>
              </div>
            }
          >
            <ThreeDViewer color={project.color} className="w-full h-full" />
          </Suspense>
        </div>

        {/* Right: details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <span className="font-mono text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: project.color }}>
            {project.tag} — {project.year}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-none tracking-tighter mb-6">
            {project.title}
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8">{project.longDescription}</p>

          <div className="mb-8">
            <p className="font-mono text-white/30 text-xs tracking-[0.25em] uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 border font-mono text-xs tracking-widest"
                  style={{ borderColor: `${project.color}40`, color: project.color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 font-mono text-sm tracking-widest uppercase font-bold text-[#0a0a0a]"
                style={{ background: project.color }}
              >
                Live Demo →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white hover:border-white/50 transition-colors duration-300"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
