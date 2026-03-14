import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '3+',   label: 'Years Experience' },
  { value: '30+',  label: 'Projects Shipped' },
  { value: '10+',  label: 'Technologies' },
  { value: '100%', label: 'Passion Driven' },
]

export default function AboutSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-48 px-8 md:px-24 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff7f]/30 to-transparent" />
      <div className="absolute top-24 right-0 w-64 h-64 rounded-full bg-[#00ff7f]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[#00ff7f] text-xs tracking-[0.3em] uppercase block mb-6"
          >
            — About Me
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter mb-8"
          >
            CRAFTING<br />
            <span className="text-[#00ff7f]">BOLD</span><br />
            DIGITAL<br />
            WORK.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-md"
          >
            I'm <span className="text-white font-semibold">Dev Pham</span> — a fullstack developer passionate about
            blending performance engineering with bold, expressive design. I build things for the web
            that are both fast and beautiful.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-white/35 text-sm md:text-base leading-relaxed max-w-md mt-4"
          >
            My stack spans React, Laravel, AWS, and everything in between. I love
            open source, scroll-driven interfaces, and pushing the browser to its limits.
          </motion.p>

          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-3 mt-10 font-mono text-sm text-[#00ff7f] tracking-widest uppercase hover:gap-5 transition-all duration-300"
          >
            View Projects →
          </motion.a>
        </div>

        {/* Right: stats box */}
        <div className="relative">
          <div className="relative border border-white/10 p-1">
            <div className="bg-[#1a1a1a] p-8 md:p-12">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <span
                      className="block font-bold text-[#00ff7f] leading-none"
                      style={{ fontSize: 'clamp(40px,5vw,64px)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="font-mono text-white/40 text-xs tracking-widest uppercase mt-2 block">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="font-mono text-[#00ff7f] text-xs tracking-widest uppercase mb-3">Currently Available</p>
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-[#00ff7f] animate-pulse" />
                  <span className="text-white/60 text-sm">Open to freelance &amp; full-time roles</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-12 h-12 border-t border-r border-[#00ff7f]" />
            <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b border-l border-[#00ff7f]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
