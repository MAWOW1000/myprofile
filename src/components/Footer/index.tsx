const footerLinks = [
  { label: 'GitHub',   href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Twitter',  href: 'https://twitter.com/' },
]

const navLinks = [
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'About',      href: '#about' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a] px-8 md:px-24 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand */}
        <div>
          <span className="font-mono text-[#00ff7f] text-xl font-bold tracking-widest">
            DEV<span className="text-white">PHAM</span>
          </span>
          <p className="font-mono text-white/25 text-xs tracking-widest mt-2">
            FULLSTACK DEVELOPER · HO CHI MINH CITY
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }) }}
              className="font-mono text-xs text-white/30 hover:text-[#00ff7f] tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-6">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/30 hover:text-[#00ff7f] tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-mono text-white/15 text-[10px] tracking-widest">© 2026 DEVPHAM. ALL RIGHTS RESERVED.</span>
        <span className="font-mono text-white/15 text-[10px] tracking-widest">BUILT WITH REACT · VITE · TAILWIND · GSAP</span>
      </div>
    </footer>
  )
}
