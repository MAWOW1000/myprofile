import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../../data/caseStudies'
import SkillBadge from '../../components/SkillBadge'

export default function CaseStudiesSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState<number | null>(null)

  const study = active !== null ? caseStudies.find((c) => c.id === active) : null

  return (
    <>
      <section id="case-studies" ref={ref} className="relative py-32 md:py-48 px-8 md:px-24 bg-[#0d0d0d] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff7f]/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[#00ff7f] text-xs tracking-[0.3em] uppercase block mb-6"
          >
            — Architecture / Case Studies
          </motion.span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter"
            >
              HOW I<br />
              <span className="text-[#00ff7f]">THINK</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/35 text-sm max-w-xs leading-relaxed"
            >
              Deep-dives into the architecture decisions, trade-offs, and outcomes behind my key projects.
            </motion.p>
          </div>

          {/* Case study cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                whileHover={{ y: -4 }}
                className="group border border-white/8 overflow-hidden cursor-pointer hover:border-white/20 transition-colors duration-300"
                onClick={() => setActive(cs.id)}
              >
                {/* Colour strip */}
                <div className="h-1" style={{ background: cs.color }} />

                <div className="p-6 bg-[#111]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: cs.color }}>
                      {cs.tag}
                    </span>
                    <span className="font-mono text-white/25 text-[11px]">{cs.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1 leading-tight">
                    {cs.title}
                  </h3>
                  <p className="font-mono text-white/35 text-xs mb-4">{cs.subtitle}</p>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 line-clamp-3">{cs.problem}</p>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="border border-white/5 px-3 py-2">
                        <span className="font-bold text-lg" style={{ color: cs.color }}>{m.value}</span>
                        <span className="block font-mono text-white/30 text-[10px] tracking-widest uppercase mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <span
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300"
                    style={{ color: cs.color }}
                  >
                    Read Case Study →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {study && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 md:inset-12 z-50 bg-[#0f0f0f] border border-white/10 overflow-y-auto"
            >
              <button
                onClick={() => setActive(null)}
                className="sticky top-6 right-6 float-right z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white font-mono text-lg mr-6 mt-6"
              >
                ✕
              </button>

              <div className="p-8 md:p-14 clear-both">
                {/* Header */}
                <div className="mb-10">
                  <div className="h-0.5 w-16 mb-6" style={{ background: study.color }} />
                  <span className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3 block" style={{ color: study.color }}>
                    {study.tag} — {study.year}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter mb-2">
                    {study.title}
                  </h2>
                  <p className="font-mono text-white/35 text-sm">{study.subtitle}</p>
                </div>

                {/* 2-col grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-4">Problem</h4>
                    <p className="text-white/60 text-base leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-4">Solution</h4>
                    <p className="text-white/60 text-base leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Architecture flow */}
                <div className="mb-12">
                  <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-6">Architecture</h4>
                  <div className="border border-white/8 p-6 bg-[#111] space-y-3">
                    {study.architecture.map((layer, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="font-mono text-[11px] flex-shrink-0 mt-0.5" style={{ color: study.color }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-white/50 text-sm leading-relaxed">{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-12">
                  <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-6">Outcomes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="border border-white/8 px-5 py-4">
                        <span className="block text-3xl font-bold" style={{ color: study.color }}>{m.value}</span>
                        <span className="font-mono text-white/35 text-[10px] tracking-widest uppercase mt-1 block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learnings */}
                <div className="mb-12">
                  <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-6">Key Learnings</h4>
                  <ul className="space-y-4">
                    {study.learnings.map((l, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: study.color }} />
                        <span className="text-white/55 text-base leading-relaxed">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="font-mono text-white/30 text-[11px] tracking-[0.3em] uppercase mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((t) => (
                      <SkillBadge key={t} label={t} color={study.color} size="md" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
