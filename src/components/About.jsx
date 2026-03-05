const cards = [
  { icon: '⚡', title: 'Currently Building', text: 'JavaScript, TypeScript, AWS & cloud-native solutions' },
  { icon: '🧠', title: 'Exploring', text: 'Machine Learning, Generative AI & LLMs' },
  { icon: '📍', title: 'Location', text: 'Da Nang City, Vietnam' },
  { icon: '🗣️', title: 'Languages', text: 'Vietnamese (Native) · English TOEIC 755' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-grid">
        {cards.map(({ icon, title, text }) => (
          <div key={title} className="about-card">
            <span className="icon">{icon}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
