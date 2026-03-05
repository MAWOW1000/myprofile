import { projects } from '../constants/data'

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <h2>Featured Work</h2>
            <p>Selected projects I've built</p>
          </div>
          <span className="projects-count">{projects.length} Projects</span>
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

          <div className="project-card project-card--lifestyle">
            <div className="lifestyle-content">
              <p className="lifestyle-eyebrow">Open to opportunities</p>
              <h3 className="lifestyle-heading">Let's build something great together</h3>
              <a href="#contact" className="lifestyle-cta">Say Hello ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
