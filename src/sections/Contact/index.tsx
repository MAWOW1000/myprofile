import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)

  const email   = 'devpham@example.com'
  const socials = [
    { label: 'GitHub',   href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Twitter',  href: 'https://twitter.com/' },
  ]

  const copy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 md:py-48 px-8 md:px-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff7f]/20 to-transparent" />

      {/* BG text */}
      <span
        className="absolute select-none pointer-events-none font-bold text-white/[0.025] left-0 right-0 text-center whitespace-nowrap"
        style={{ fontSize: 'clamp(80px,15vw,200px)', top: '50%', transform: 'translateY(-50%)' }}
      >
        CONTACT
      </span>

      <div className="max-w-5xl mx-auto relative">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[#00ff7f] text-xs tracking-[0.3em] uppercase block mb-6"
        >
          — Get In Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tighter mb-10"
        >
          LET'S<br />
          <span className="text-[#00ff7f]">BUILD</span><br />
          TOGETHER.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 text-base md:text-lg max-w-md leading-relaxed mb-14"
        >
          Whether it's a freelance project, a full-time opportunity, or just a chat about
          tech — I'm always open to connecting with interesting people.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
        >
          <a
            href={`mailto:${email}`}
            className="group flex items-center gap-4 px-8 py-5 bg-[#00ff7f] text-[#0a0a0a] font-mono text-sm md:text-base font-bold tracking-widest uppercase hover:bg-[#00cc66] transition-colors duration-300"
          >
            Say Hello →
          </a>

          <button
            onClick={copy}
            className="flex items-center gap-3 px-6 py-5 border border-white/20 text-white/60 font-mono text-sm tracking-widest hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all duration-300"
          >
            {copied ? '✓ Copied!' : `⎘ ${email}`}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center gap-6"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase hover:text-[#00ff7f] transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
