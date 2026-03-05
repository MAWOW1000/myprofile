import { socialLinks } from '../constants/data'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Want More?</h2>
        <p className="contact-subtitle">Join my network and let's connect</p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button type="submit">Sign Up</button>
        </form>
        <div className="contact-social">
          {socialLinks.map((link) => (
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
  )
}
