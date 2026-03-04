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
    { name: 'GitHub', url: 'https://github.com/MAWOW1000', icon: '→' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/duc-pham-doan-3193a629b/', icon: '→' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/MAWOW1000/', icon: '→' },
    { name: 'Email', url: 'mailto:duc22092003@gmail.com', icon: '→' }
  ]

  const marqueeText = "BACKEND DEVELOPER • REACT ENTHUSIAST • AI EXPLORER • PROBLEM SOLVER • "

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
      {/* Marquee Banner */}
      <div className="marquee-banner">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span>DUC PHAM</span>
              </h1>
              <p className="subtitle">Backend Developer @ Kozocom Vietnam</p>
              <p className="description">
                Passionate about problem-solving and pioneering first-principle thinking. 
                Currently exploring ML, Gen AI, and LLMs with a mission to revolutionize how the world works with AI.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">
                  View Projects
                </a>
                <a href="#contact" className="btn btn-outline">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          Scroll to Explore
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-card">
              <div className="icon">🚀</div>
              <h3>Currently Building</h3>
              <p>JavaScript, TypeScript, AWS, and cloud-native solutions</p>
            </div>
            <div className="about-card">
              <div className="icon">🔬</div>
              <h3>Exploring</h3>
              <p>Machine Learning, Generative AI, and Large Language Models</p>
            </div>
            <div className="about-card">
              <div className="icon">📍</div>
              <h3>Location</h3>
              <p>Da Nang City, Vietnam</p>
            </div>
            <div className="about-card">
              <div className="icon">🗣️</div>
              <h3>Languages</h3>
              <p>Vietnamese (Native), English (TOEIC 755)</p>
            </div>
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

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-title">
            <h2>Featured Work</h2>
            <p>Selected projects I've built</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-role">{project.role}</span>
                </div>
                <p className="project-company">
                  {project.company} • {project.duration}
                </p>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
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
                <h3>Team Leader - GymViet</h3>
                <p className="company">Duy Tan University</p>
                <p>
                  Led development of AI-powered fitness platform. Designed microservices architecture
                  and integrated AI-based posture evaluation features.
                </p>
              </div>
            </div>
          </div>
          
          <div className="section-title" style={{ marginTop: '4rem' }}>
            <h3>Achievements</h3>
          </div>
          <div className="certifications">
            <span className="certification-badge">🎓 GPA 3.72/4.00</span>
            <span className="certification-badge">🏆 TOEIC 755</span>
            <span className="certification-badge">🥇 University Research Award</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-links">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {link.name} {link.icon}
              </a>
            ))}
          </div>
          <p className="footer-copyright">
            © 2026 Pham Doan Duc — Built with React + Lenis
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
