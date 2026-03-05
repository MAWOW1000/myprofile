import { socialLinks } from '../constants/data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-brand">
            DUC<span>.</span>DEV
          </span>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Work</a>
            <a href="#experience">Experience</a>
          </div>
          <div className="footer-social">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Pham Doan Duc</p>
          <div className="footer-built">
            Built with React + <span>Lenis</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
