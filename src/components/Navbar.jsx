export default function Navbar() {
  return (
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
  )
}
