# Portfolio Project Instructions

## Tech Stack

- **React 19** + **Vite 7** (no TypeScript)
- **GSAP 3.14** + **@gsap/react** for animations
- **Lenis** for smooth scroll
- **Pure CSS** with custom properties (no Tailwind)

## Architecture

```
src/
├── App.jsx          # All sections in single file (274 lines)
├── index.css        # All styling (910 lines, CSS custom properties)
├── hooks/useGSAP.js # Animation system: useGSAP() + initAnimations()
└── assets/          # shapes.png, hero-bg.png
```

## Build & Test

```bash
npm run dev    # localhost:5173
npm run build  # Production build
npm run lint   # ESLint check
```

## Animation System (CRITICAL)

All animations centralized in [src/hooks/useGSAP.js](src/hooks/useGSAP.js):

- `useGSAP()` - Hook initializing Lenis + GSAP ticker sync
- `initAnimations()` - All ScrollTrigger animations

**Lenis + GSAP sync pattern (already implemented):**

```javascript
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Standard reveal pattern (copy for new sections):**

```javascript
gsap.utils.toArray(".new-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    delay: i * 0.1,
  });
});
```

**Cleanup (prevents memory leaks):**

```javascript
return () => {
  lenis.destroy();
  ScrollTrigger.getAll().forEach((t) => t.kill());
};
```

## CSS Architecture

Design tokens in [src/index.css](src/index.css):

- `--primary: #6366F1`, `--accent-gradient`
- `--font-heading: 'Space Grotesk'`, `--font-body: 'DM Sans'`

| Section    | Grid Class             | Card Class         |
| ---------- | ---------------------- | ------------------ |
| About      | `.about-grid`          | `.about-card`      |
| Skills     | `.skills-grid`         | `.skill-category`  |
| Projects   | `.projects-grid`       | `.project-card`    |
| Experience | `.experience-timeline` | `.experience-item` |

## Conventions

**DO:**

- Add sections in `App.jsx` following existing pattern
- Add CSS in `index.css` using existing class patterns
- Animate only `opacity` and `transform` (GPU-accelerated)
- Use `stagger` for multiple elements
- Add new scroll animations to `initAnimations()`

**DON'T:**

- Don't split into component files (single-page pattern)
- Don't use CSS transitions for scroll animations
- Don't animate `width`, `height`, `margin`, `padding`
- Don't modify `main.jsx`

## Section Template

```jsx
<section id="name" className="name">
  <div className="container">
    <div className="section-title">
      <h2>Title</h2>
      <p>Subtitle</p>
    </div>
    <div className="name-grid">
      {/* Cards with className="card name-card" */}
    </div>
  </div>
</section>
```
