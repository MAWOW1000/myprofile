import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection     from '../sections/Hero'
import ProjectsSection  from '../sections/Projects'
import SkillsSection    from '../sections/Skills'
import ExperienceSection   from '../sections/Experience'
import CaseStudiesSection  from '../sections/CaseStudies'
import AboutSection     from '../sections/About'
import ContactSection   from '../sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    const vh = () => window.innerHeight

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        return trackWidth - window.innerWidth
      }

      // Master Horizontal Scroll Timeline
      // We pin the wrapper IMMEDIATELY at 'top top' so the user's screen never vertically travels down.
      // Instead of relying on a delayed start (which causes vertical scroll),
      // we use timeline durations to perfectly map the scroll phases.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${getScrollAmount() + vh() * 2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Phase 1: Wait for 200vh (Hero animation duration). We just keep x at 0.
      tl.to(track, {
        x: 0,
        ease: 'none',
        duration: vh() * 2, 
      })
      // Phase 2: Horizontal Translation across the rest of the total track length
      .to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        duration: getScrollAmount(),
      })

    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="h-screen w-screen overflow-hidden bg-[#050505]">
      {/* The Master Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex h-screen w-[max-content] flex-row flex-nowrap"
      >
        <div className="w-screen h-screen flex-shrink-0">
          <HeroSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <ProjectsSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <SkillsSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <ExperienceSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <CaseStudiesSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <AboutSection />
        </div>
        <div className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <ContactSection />
        </div>
      </div>
    </div>
  )
}
