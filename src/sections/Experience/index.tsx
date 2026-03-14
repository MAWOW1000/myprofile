import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { experiences } from '../../data/experience'
import SkillBadge from '../../components/SkillBadge'

export default function ExperienceSection() {
  const ref        = useRef<HTMLDivElement>(null)
  const inView     = useInView(ref, { once: true, margin: '-100px' })
  const [open, setOpen] = useState<number>(1) // first job open by default

  return (
    <section id="experience" ref={ref} className="relative py-32 md:py-48 px-8 md:px-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff7f]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[#00ff7f] text-xs tracking-[0.3em] uppercase block mb-6"
        >
          — Work Experience
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter mb-20"
        >
          WHERE I'VE<br />
          <span className="text-[#00ff7f]">WORKED</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-1.5 top-7 w-3 h-3 rounded-full border-2 border-[#0a0a0a] hidden md:block transition-colors duration-500"
                  style={{ background: open === exp.id ? exp.color : 'rgba(255,255,255,0.2)' }}
                />

                {/* Card */}
                <div className="md:ml-10 border border-white/8 overflow-hidden">
                  {/* Header — always visible */}
                  <button
                    className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 group"
                    onClick={() => setOpen(open === exp.id ? 0 : exp.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="font-mono text-[11px] tracking-[0.25em] uppercase"
                          style={{ color: exp.color }}
                        >
                          {exp.period}
                        </span>
                        <span className="font-mono text-white/25 text-[11px] tracking-widest">{exp.type} · {exp.location}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-white/40 text-sm mt-1">{exp.company}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-mono text-white/25 text-xs hidden md:block">{exp.duration}</span>
                      <div
                        className="w-8 h-8 border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-white/40"
                        style={{ transform: open === exp.id ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2v8M2 6h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  <AnimatePresence initial={false}>
                    {open === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 border-t border-white/5 pt-6">
                          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-2xl">
                            {exp.description}
                          </p>

                          <div className="mb-6">
                            <p className="font-mono text-white/25 text-[11px] tracking-[0.25em] uppercase mb-4">
                              Key Achievements
                            </p>
                            <ul className="space-y-3">
                              {exp.achievements.map((ach, ai) => (
                                <li key={ai} className="flex items-start gap-3">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                                  <span className="text-white/55 text-sm leading-relaxed">{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <SkillBadge key={t} label={t} color={exp.color} size="sm" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
