const timeline = [
  {
    date: 'Jun 2025 – Present',
    role: 'Backend Developer',
    company: 'Kozocom Vietnam',
    description:
      'Building scalable backend systems with PHP, Laravel, and modern JavaScript frameworks. Leading development of HR and recruitment management systems.',
  },
  {
    date: 'Oct 2024 – Jun 2025',
    role: 'Team Leader — GymViet',
    company: 'Duy Tan University',
    description:
      'Led development of AI-powered fitness platform. Designed microservices architecture and integrated AI-based posture evaluation features.',
  },
]

const badges = [
  '🎓 GPA 3.72 / 4.00',
  '🏆 TOEIC 755',
  '🥇 University Research Award',
]

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-title">
          <h2>Experience</h2>
          <p>Professional journey</p>
        </div>

        <div className="experience-timeline">
          {timeline.map(({ date, role, company, description }) => (
            <div key={role} className="experience-item">
              <div className="experience-date">{date}</div>
              <div className="experience-content">
                <h3>{role}</h3>
                <p className="company">{company}</p>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications">
          {badges.map((badge) => (
            <span key={badge} className="certification-badge">{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
