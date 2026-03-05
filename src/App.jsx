import { useEffect } from 'react'
import './App.css'
import { useGSAP, initAnimations } from './hooks/useGSAP'

import AnnouncementBanner from './components/AnnouncementBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MerchantsStrip from './components/MerchantsStrip'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Labels for the side-nav dots (one per slide)
const SLIDE_LABELS = ['Home', 'About', 'Skills', 'Work', 'Experience', 'Contact']

function App() {
  useGSAP()

  useEffect(() => {
    const timer = setTimeout(() => {
      initAnimations()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Fixed chrome — always above the wheel */}
      <AnnouncementBanner />
      <Navbar />

      {/* Creates scroll height so the window can scroll (drives the wheel) */}
      <div className="scroll-driver" aria-hidden="true" />

      {/* Fixed 3-D drum stage */}
      <div className="page-wheel-stage">
        <div className="page-wheel">

          <div className="page-slide" data-slide="0">
            <Hero />
          </div>

          <div className="page-slide" data-slide="1">
            <MerchantsStrip />
            <About />
          </div>

          <div className="page-slide" data-slide="2">
            <Skills />
          </div>

          <div className="page-slide" data-slide="3">
            <Projects />
          </div>

          <div className="page-slide" data-slide="4">
            <Experience />
          </div>

          <div className="page-slide" data-slide="5">
            <Contact />
            <Footer />
          </div>

        </div>

        {/* Side-nav dots */}
        <nav className="page-dots" aria-label="Page navigation">
          {SLIDE_LABELS.map((label, i) => (
            <button
              key={i}
              className="page-dot"
              data-dot={i}
              aria-label={label}
              title={label}
            />
          ))}
        </nav>
      </div>
    </>
  )
}

export default App
