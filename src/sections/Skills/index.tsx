import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups, tools } from '../../data/skills'
import SkillBadge from '../../components/SkillBadge'

export default function SkillsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 md:py-48 px-8 md:px-24 bg-[#0d0d0d] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff7f]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[#00ff7f] text-xs tracking-[0.3em] uppercase block mb-6"
        >
          — Technical Skills
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter mb-20"
        >
          WHAT I<br />
          <span className="text-[#00ff7f]">WORK</span> WITH
        </motion.h2>

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.15 }}
            >
              <h3 className="font-mono text-[#00ff7f] text-xs tracking-[0.25em] uppercase mb-8 pb-4 border-b border-white/10">
                {group.category}
              </h3>
              <div className="space-y-6">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm">{skill.name}</span>
                      <span className="font-mono text-[#00ff7f] text-xs">{skill.level}%</span>
                    </div>
                    <div className="w-full h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: gi * 0.15 + si * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 h-full bg-[#00ff7f]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-mono text-white/30 text-xs tracking-[0.3em] uppercase mb-6">Tools &amp; Platforms</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
              >
                <SkillBadge label={tool} size="md" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
