export default function Hero() {
  return (
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
  )
}
