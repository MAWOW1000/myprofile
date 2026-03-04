---
name: frontend-motion
description: Expert in high-end UI with GSAP, Lenis, and ScrollTrigger for portfolio animations.
---

# High-End Frontend Animation Skill

## Core Principles

1. **Syncing:** Always sync GSAP with Lenis using `gsap.ticker.add`.
2. **Performance:** Use `will-change: transform` on animated elements.
3. **Cleanup:** Every GSAP/Lenis instance MUST be killed in the React `useEffect` cleanup return.
4. **Context:** Use `gsap.context()` for scoped selectors to avoid DOM conflicts.
5. **ScrollTrigger:** Register ScrollTrigger plugin with `gsap.registerPlugin(ScrollTrigger)`.

## Required Packages

```bash
npm install gsap lenis @gsap/react
```

## Lenis + GSAP Sync Pattern

```javascript
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Connect Lenis scroll to ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Sync GSAP ticker with Lenis RAF loop
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

## Animation Patterns

### Hero Entrance Animation

```javascript
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
heroTl
  .from(".hero-text h1", { y: 100, opacity: 0, duration: 1.2 })
  .from(".hero-text .subtitle", { y: 50, opacity: 0, duration: 1 }, "-=0.8")
  .from(".hero-buttons .btn", { y: 30, opacity: 0, stagger: 0.15 }, "-=0.6");
```

### Scroll-Triggered Reveal

```javascript
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: i * 0.1,
  });
});
```

### Parallax Effect

```javascript
gsap.to(".bg-image", {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: "30%",
  ease: "none",
});
```

### Navbar Hide/Show on Scroll

```javascript
let lastScrollY = 0;
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  onUpdate: (self) => {
    const scrollY = self.scroll();
    const navbar = document.querySelector(".navbar");
    if (scrollY > lastScrollY && scrollY > 100) {
      gsap.to(navbar, { y: -100, duration: 0.3 });
    } else {
      gsap.to(navbar, { y: 0, duration: 0.3 });
    }
    lastScrollY = scrollY;
  },
});
```

## Cleanup Pattern (CRITICAL)

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP code here
  }, containerRef);

  return () => {
    ctx.revert(); // Kills all GSAP instances in context
    lenis?.destroy();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);
```

## Performance Tips

- Use `opacity` and `transform` only (GPU-accelerated).
- Avoid animating `width`, `height`, `margin`, `padding`.
- Use `stagger` for multiple elements instead of delays.
- Set `toggleActions: "play none none reverse"` for scroll reveals.
- Use `scrub` for smooth scroll-linked animations.
