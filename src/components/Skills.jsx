import { skills } from '../constants/data'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>Tech Stack</h2>
          <p>Technologies I work with daily</p>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="skill-category"
              data-number={String(index + 1).padStart(2, '0')}
            >
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
  )
}
