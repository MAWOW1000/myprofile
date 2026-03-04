import { useEffect } from 'react'
import './App.css'
import { useGSAP, initAnimations } from './hooks/useGSAP'

function App() {
  const skills = {
    Frontend: ['React', 'Next.js', 'Vue'],
    Backend: ['Node.js', 'Express', 'Laravel', 'PHP', 'NestJS'],
    Database: ['MongoDB', 'MySQL', 'PostgreSQL'],
    Cloud: ['AWS', 'FastAPI'],
    Tools: ['Git', 'Docker']
  }

  const projects = [
    {
      title: 'Entry System',
      company: 'Kozocom',
      duration: 'Jun 2025 – Present',
      role: 'Employee',
      tech: ['PHP', 'Laravel', 'ReactJS', 'VueJS'],
      description: 'Developed Japanese-style candidate registration system with RESTful APIs, status management, and data change history tracking.'
    },
    {
      title: 'HR Portal System',
      company: 'Kozocom',
      duration: 'Jun 2025 – Present',
      role: 'Employee',
      tech: ['PHP', 'Laravel', 'ReactJS'],
      description: 'Built HRM system with role-based access control (Admin/HR/Manager), approval workflows, and personnel change history.'
    },
    {
      title: 'GymViet',
      company: 'Duy Tan University',
      duration: 'Oct 2024 – Jun 2025',
      role: 'Team Leader',
      tech: ['ExpressJS', 'ReactJS', 'MongoDB', 'FastAPI'],
      description: 'AI-powered fitness platform with workout planning, nutrition recommendations, and posture evaluation using AI.'
    },
    {
      title: 'Kiwimedias',
      company: 'Vinabook Edu',
      duration: 'Nov 2024 – Feb 2025',
      role: 'Employee',
      tech: ['NestJS', 'ReactJS'],
      description: 'Language learning platform with vocabulary training and skill development using multimedia content.'
    }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/MAWOW1000' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/duc-pham-doan-3193a629b/' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/MAWOW1000/' },
    { name: 'Email', url: 'mailto:duc22092003@gmail.com' }
  ]

  const marqueeText = "🔥 Enjoy free shipping with every hire. 🔥"
  const merchantsItems = [
    { type: 'label', text: 'For Devs' },
    { type: 'avatar', letter: 'D', variant: 'a' },
    { type: 'label', text: 'By Devs' },
    { type: 'avatar', letter: 'B', variant: 'b' },
    { type: 'label', text: 'For Devs' },
    { type: 'avatar', letter: 'C', variant: 'c' },
    { type: 'label', text: 'By Devs' },
    { type: 'avatar', letter: 'A', variant: 'd' },
    { type: 'label', text: 'For Devs' },
    { type: 'avatar', letter: 'E', variant: 'e' },
    { type: 'label', text: 'By Devs' },
    { type: 'avatar', letter: 'D', variant: 'a' },
    { type: 'label', text: 'For Devs' },
    { type: 'avatar', letter: 'B', variant: 'b' },
    { type: 'label', text: 'By Devs' },
    { type: 'avatar', letter: 'C', variant: 'c' },
    { type: 'label', text: 'For Devs' },
    { type: 'avatar', letter: 'A', variant: 'd' },
    { type: 'label', text: 'By Devs' },
    { type: 'avatar', letter: 'E', variant: 'e' },
  ]

  // Initialize Lenis smooth scroll
  useGSAP()

  // Initialize GSAP animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      initAnimations()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Announcement Banner */}
      <div className="marquee-banner">
        <div className="marquee-content">
          {[...Array(12)].map((_, i) => (
            <span key={i}>{marqueeText}</span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-logo">
            DUC<span>.</span>DEV
          </a>
          <ul className="navbar-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Work</a></li>
            <li><a href="#experience">Experience</a></li>
          </ul>
          <div className="navbar-cta">
            <a href="#contact" className="navbar-cart">
              Hire Me ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero / Collection Header */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-collection-label">Portfolio — 2026 Collection</p>
              <h1>
                <span className="line"><span className="line-inner">DUC</span></span>
                <span className="line"><span className="line-inner">PHAM</span></span>
              </h1>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-left">
                <p className="subtitle">Backend Developer @ Kozocom Vietnam</p>
                <p className="count">4 Projects · 2 Roles</p>
              </div>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">View Work</a>
                <a href="#contact" className="btn btn-outline">Get in Touch</a>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">Scroll</div>
      </section>

      {/* Divider strip: "FOR DEVS / BY DEVS" */}
      <div className="merchants-strip">
        <div className="merchants-track">
          {[...merchantsItems, ...merchantsItems].map((item, i) => (
            <div key={i} className="merchants-item">
              {item.type === 'label' ? (
                <span className="merchants-label">{item.text}</span>
              ) : (
                <div className={`merchants-avatar merchants-avatar--${item.variant}`}>
                  <div className="merchants-avatar-inner">{item.letter}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-grid">
          <div className="about-card">
            <span className="icon">⚡</span>
            <h3>Currently Building</h3>
            <p>JavaScript, TypeScript, AWS & cloud-native solutions</p>
          </div>
          <div className="about-card">
            <span className="icon">🧠</span>
            <h3>Exploring</h3>
            <p>Machine Learning, Generative AI & LLMs</p>
          </div>
          <div className="about-card">
            <span className="icon">📍</span>
            <h3>Location</h3>
            <p>Da Nang City, Vietnam</p>
          </div>
          <div className="about-card">
            <span className="icon">🗣️</span>
            <h3>Languages</h3>
            <p>Vietnamese (Native) · English TOEIC 755</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-title">
            <h2>Tech Stack</h2>
            <p>Technologies I work with daily</p>
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={category} className="skill-category" data-number={String(index + 1).padStart(2, '0')}>
                <h3>{category}</h3>
                <div className="skill-list">
                  {items.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects / Collection Grid */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="projects-header">
            <div>
              <h2>Featured Work</h2>
              <p>Selected projects I've built</p>
            </div>
            <span className="projects-count">{projects.length} Projects</span>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={project.title} className="project-card">
              <div className={`project-image project-image--${idx % 4}`}>
                <div className="project-image-inner" />
                <span className="project-image-label">{project.role}</span>
              </div>
              <div className="project-body">
                <div className="project-header">
                  <h3>{project.title}</h3>
                </div>
                <p className="project-company">{project.company} · {project.duration}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Lifestyle / editorial card */}
          <div className="project-card project-card--lifestyle">
            <div className="lifestyle-content">
              <p className="lifestyle-eyebrow">Open to opportunities</p>
              <h3 className="lifestyle-heading">Let's build something great together</h3>
              <a href="#contact" className="lifestyle-cta">
                Say Hello ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <div className="section-title">
            <h2>Experience</h2>
            <p>Professional journey</p>
          </div>
          <div className="experience-timeline">
            <div className="experience-item">
              <div className="experience-date">Jun 2025 – Present</div>
              <div className="experience-content">
                <h3>Backend Developer</h3>
                <p className="company">Kozocom Vietnam</p>
                <p>
                  Building scalable backend systems with PHP, Laravel, and modern JavaScript frameworks.
                  Leading development of HR and recruitment management systems.
                </p>
              </div>
            </div>
            <div className="experience-item">
              <div className="experience-date">Oct 2024 – Jun 2025</div>
              <div className="experience-content">
                <h3>Team Leader — GymViet</h3>
                <p className="company">Duy Tan University</p>
                <p>
                  Led development of AI-powered fitness platform. Designed microservices architecture
                  and integrated AI-based posture evaluation features.
                </p>
              </div>
            </div>
          </div>

          <div className="certifications">
            <span className="certification-badge">🎓 GPA 3.72 / 4.00</span>
            <span className="certification-badge">🏆 TOEIC 755</span>
            <span className="certification-badge">🥇 University Research Award</span>
          </div>
        </div>
      </section>

      {/* Contact / Want More */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Want More?</h2>
          <p className="contact-subtitle">Join my network and let's connect</p>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Sign Up</button>
          </form>
          <div className="contact-social">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-brand">DUC<span>.</span>DEV</span>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Work</a>
              <a href="#experience">Experience</a>
            </div>
            <div className="footer-social">
              {socialLinks.map(link => (
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
    </>
  )
}

export default App
