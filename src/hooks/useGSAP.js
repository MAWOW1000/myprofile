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
    y: -40,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  })

  // Hero: staggered line reveals (Shopify Supply style clip-path)
  const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } })

  heroTl
    .from(".hero-collection-label", {
      opacity: 0,
      y: 20,
      duration: 0.8,
    })
    .from(".hero-text h1 .line-inner", {
      y: "110%",
      duration: 1.2,
      stagger: 0.12,
      ease: "expo.out",
    }, "-=0.4")
    .from(".hero-meta", {
      opacity: 0,
      y: 30,
      duration: 0.9,
    }, "-=0.5")
    .from(".scroll-indicator", {
      opacity: 0,
      duration: 0.8,
    }, "-=0.5")

  // About cards — fade up stagger
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '.about',
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  })

  // Skills section title
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    })
  })

  // Skills cards
  gsap.utils.toArray('.skill-category').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: i * 0.05,
    })
  })

  // Projects header
  gsap.from('.projects-header', {
    scrollTrigger: {
      trigger: '.projects-header',
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })

  // Project cards — staggered fade up
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: (i % 3) * 0.08,
    })
  })

  // Experience items — slide from left
  gsap.utils.toArray('.experience-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      x: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: i * 0.12,
    })
  })

  // Certification badges
  gsap.from('.certification-badge', {
    scrollTrigger: {
      trigger: '.certifications',
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.07,
    ease: "back.out(2)",
  })

  // Contact section fade up
  gsap.from('.contact h2, .contact-subtitle, .contact-form, .contact-social', {
    scrollTrigger: {
      trigger: '.contact',
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
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
