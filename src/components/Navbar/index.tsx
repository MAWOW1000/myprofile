import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home',       href: '#home' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Cases',      href: '#case-studies' },
  { label: 'About',      href: '#about' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        <button
          onClick={() => handleNav('#home')}
          className="font-mono text-[#00ff7f] text-lg font-bold tracking-widest"
        >
          DEV<span className="text-[#f5f5f0]">PHAM</span>
        </button>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-[11px] font-mono text-white/50 hover:text-[#00ff7f] transition-colors duration-300 tracking-[0.25em] uppercase"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 border border-[#00ff7f] text-[#00ff7f] font-mono text-xs tracking-widest uppercase hover:bg-[#00ff7f] hover:text-[#0a0a0a] transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-3xl font-bold text-white hover:text-[#00ff7f] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
