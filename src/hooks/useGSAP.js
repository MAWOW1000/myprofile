import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings
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

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Sync GSAP ticker with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href'))
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 2,
            easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          })
        }
      })
    })

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return lenisRef
}

export function initAnimations() {
  // Marquee entrance animation
  gsap.from(".marquee-banner", {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })

  // Hero entrance animation - bold and dramatic
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } })

  heroTl.from(".hero-text h1", {
    y: 150,
    opacity: 0,
    duration: 1.4,
    ease: "expo.out",
  })
  .from(".hero-text h1 span", {
    clipPath: "inset(0 100% 0 0)",
    duration: 1.2,
    ease: "power4.inOut",
  }, "-=1")
  .from(".hero-text .subtitle", {
    y: 40,
    opacity: 0,
    duration: 1,
  }, "-=0.6")
  .from(".hero-text .description", {
    y: 30,
    opacity: 0,
    duration: 0.9,
  }, "-=0.5")
  .from(".hero-buttons .btn", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
  }, "-=0.4")
  .from(".scroll-indicator", {
    opacity: 0,
    y: 30,
    duration: 0.8,
  }, "-=0.3")

  // About cards reveal with stagger
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '.about',
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  })

  // Skills cards reveal with scale
  gsap.utils.toArray('.skill-category').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
      delay: i * 0.05,
    })
  })

  // Project cards reveal
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: i * 0.1,
    })
  })

  // Experience items reveal with slide
  gsap.utils.toArray('.experience-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: i * 0.15,
    })
  })

  // Certification badges reveal
  gsap.from('.certification-badge', {
    scrollTrigger: {
      trigger: '.certifications',
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.08,
    ease: "back.out(2)",
  })

  // Section titles reveal
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  })

  // Footer links reveal
  gsap.from('.footer-links a', {
    scrollTrigger: {
      trigger: '.footer',
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
  })

  // Navbar hide/show on scroll
  let lastScrollY = 0
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    onUpdate: (self) => {
      const scrollY = self.scroll()
      const navbar = document.querySelector('.navbar')
      const marquee = document.querySelector('.marquee-banner')
      if (navbar && marquee) {
        if (scrollY > lastScrollY && scrollY > 150) {
          gsap.to(navbar, { y: -100, duration: 0.3, ease: "power2.out" })
          gsap.to(marquee, { y: -50, duration: 0.3, ease: "power2.out" })
        } else {
          gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" })
          gsap.to(marquee, { y: 0, duration: 0.3, ease: "power2.out" })
        }
      }
      lastScrollY = scrollY
    }
  })
}
