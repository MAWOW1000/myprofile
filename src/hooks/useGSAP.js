import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Wheel-aware anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = anchor.getAttribute('href').slice(1)
        const targetSection = document.getElementById(targetId)
        if (!targetSection) return

        const parentSlide = targetSection.closest('.page-slide')
        if (!parentSlide) return

        const slideIdx = parseInt(parentSlide.dataset.slide || '0')
        const N = document.querySelectorAll('.page-slide').length
        const driver = document.querySelector('.scroll-driver')
        if (!driver) return

        const maxScroll = driver.scrollHeight - window.innerHeight
        const targetScroll = (slideIdx / (N - 1)) * maxScroll

        lenis.scrollTo(targetScroll, {
          duration: 1.6,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        })
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return lenisRef
}

export function initAnimations() {
  // ── Marquee entrance ───────────────────────────────────────────
  gsap.from('.marquee-banner', { y: -40, opacity: 0, duration: 0.6, ease: 'power3.out' })

  // ── Hero entrance ──────────────────────────────────────────────
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  heroTl
    .from('.hero-collection-label', { opacity: 0, y: 20, duration: 0.8 })
    .from('.hero-text h1 .line-inner', { y: '110%', duration: 1.2, stagger: 0.12, ease: 'expo.out' }, '-=0.4')
    .from('.hero-meta', { opacity: 0, y: 30, duration: 0.9 }, '-=0.5')
    .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, '-=0.5')

  // ── Page 3-D Drum Wheel ────────────────────────────────────────
  // .scroll-driver provides window scroll height (6 × 100vh).
  // GSAP maps scroll progress → rotateX of .page-wheel.
  // Each .page-slide is pre-positioned on the cylinder.
  const slideEls  = document.querySelectorAll('.page-slide')
  const dotEls    = document.querySelectorAll('.page-dot')
  const N          = slideEls.length    // 6
  const ANGLE_STEP = 360 / N            // 60°
  const RADIUS     = 1100               // cylinder translateZ in px

  slideEls.forEach((slide, i) => {
    gsap.set(slide, { rotateX: i * ANGLE_STEP, translateZ: RADIUS })
  })

  gsap.set('.page-wheel', { rotateX: 0 })

  if (dotEls[0]) dotEls[0].classList.add('is-active')

  let prevIdx = 0

  ScrollTrigger.create({
    trigger: '.scroll-driver',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.2,
    onUpdate: (self) => {
      const rotX = -(self.progress * (N - 1) * ANGLE_STEP)
      gsap.set('.page-wheel', { rotateX: rotX })

      const activeIdx = Math.min(N - 1, Math.round(Math.abs(rotX) / ANGLE_STEP))
      dotEls.forEach((d, i) => d.classList.toggle('is-active', i === activeIdx))

      if (activeIdx !== prevIdx && slideEls[activeIdx]) {
        const targets = slideEls[activeIdx].querySelectorAll(
          '.section-title, .about-card, .skill-category, .project-card,' +
          ' .experience-item, .certification-badge,' +
          ' .contact h2, .contact-subtitle, .contact-form, .contact-social'
        )
        if (targets.length) {
          gsap.fromTo(targets,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
          )
        }
        prevIdx = activeIdx
      }
    },
  })

  // ── Navbar hide/show ───────────────────────────────────────────
  let lastScrollY = 0
  ScrollTrigger.create({
    trigger: '.scroll-driver',
    start: 'top top',
    onUpdate: (self) => {
      const scrollY = self.scroll()
      const navbar  = document.querySelector('.navbar')
      const marquee = document.querySelector('.marquee-banner')
      if (navbar && marquee) {
        if (scrollY > lastScrollY && scrollY > 150) {
          gsap.to(navbar,  { y: -100, duration: 0.3, ease: 'power2.out' })
          gsap.to(marquee, { y: -50,  duration: 0.3, ease: 'power2.out' })
        } else {
          gsap.to(navbar,  { y: 0, duration: 0.3, ease: 'power2.out' })
          gsap.to(marquee, { y: 0, duration: 0.3, ease: 'power2.out' })
        }
      }
      lastScrollY = scrollY
    },
  })

  // ── 3D Card Tilt ───────────────────────────────────────────────
  gsap.utils.toArray('.skill-category, .about-card, .project-card').forEach((card) => {
    gsap.set(card, { transformPerspective: 800 })
    const rotYTo = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power2.out' })
    const rotXTo = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power2.out' })
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect()
      rotYTo(((e.clientX - left) / width  - 0.5) * 20)
      rotXTo(-((e.clientY - top)  / height - 0.5) * 14)
    })
    card.addEventListener('mouseleave', () => { rotYTo(0); rotXTo(0) })
  })

  // ── Hero 3D Mouse Parallax ─────────────────────────────────────
  const heroEl = document.querySelector('.hero')
  if (heroEl) {
    const layers = [
      { selector: '.hero-text h1',          xMag: 0.04, yMag: 0.02, rx: true  },
      { selector: '.hero-collection-label', xMag: 0.06, yMag: 0.03, rx: false },
      { selector: '.hero-meta',             xMag: 0.03, yMag: 0.015, rx: false },
    ]
    heroEl.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroEl.getBoundingClientRect()
      const x = (e.clientX - left) / width  - 0.5
      const y = (e.clientY - top)  / height - 0.5
      layers.forEach(({ selector, xMag, yMag, rx }) => {
        const el = document.querySelector(selector)
        if (!el) return
        gsap.to(el, {
          x: x * width * xMag, y: y * height * yMag,
          rotateY: rx ? x * 10 : 0, rotateX: rx ? -y * 6 : 0,
          transformPerspective: 1000, duration: 1.2,
          ease: 'power2.out', overwrite: 'auto',
        })
      })
    })
    heroEl.addEventListener('mouseleave', () => {
      layers.forEach(({ selector }) => {
        const el = document.querySelector(selector)
        if (!el) return
        gsap.to(el, {
          x: 0, y: 0, rotateY: 0, rotateX: 0,
          duration: 1.4, ease: 'power3.out', overwrite: 'auto',
        })
      })
    })
  }
}
