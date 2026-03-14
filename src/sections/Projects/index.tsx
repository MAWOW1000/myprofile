import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { gsap } from '../../hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/projects'
import Carousel3D from './Carousel3D'
import QuickViewModal from '../../components/ProjectCard/QuickViewModal'
import type { Project } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quickView, setQuickView] = useState<Project | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Progress bar animation
      gsap.fromTo(
        progressBarRef.current,
        { width: '0%' },
        {
          width: '100%',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        }
      )

      // Snap points for each project
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: 1 / projects.length,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const index = Math.round(self.progress * (projects.length - 1))
          setCurrentIndex(index)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const currentProject = projects[currentIndex]

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative h-[600vh] bg-black"
      >
        {/* Fixed viewport container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="fixed top-0 left-0 h-1 bg-[#6FC992] shadow-[0_0_20px_rgba(111,201,146,0.6)] z-50"
            style={{ width: '0%' }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] z-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Three.js 3D Carousel */}
          <div className="absolute inset-0 z-0">
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Environment preset="studio" />
                <Carousel3D projects={projects} currentIndex={currentIndex} />
              </Suspense>
            </Canvas>
          </div>

          {/* UI Overlay */}
          <div className="relative z-20 h-full flex flex-col">
            {/* Top section */}
            <div className="flex justify-between items-start p-8 md:p-12">
              <div>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-2" style={{ color: '#6FC992' }}>
                  PROJECTS
                </h2>
                <p className="text-lg md:text-xl text-white/60">
                  {currentIndex + 1} / {projects.length}
                </p>
              </div>
            </div>

            {/* Center info panel */}
            <div className="flex-1 flex items-end pb-20 px-8 md:px-12">
              <div className="max-w-2xl">
                <div className="mb-4">
                  <span
                    className="inline-block px-4 py-1 text-sm font-semibold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: currentProject.color,
                      color: currentProject.accentColor,
                    }}
                  >
                    {currentProject.tag}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {currentProject.title}
                </h3>

                <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
                  {currentProject.longDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm border border-white/20 text-white/70 hover:border-[#6FC992] hover:text-[#6FC992] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setQuickView(currentProject)}
                    className="px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(111,201,146,0.5)]"
                    style={{ backgroundColor: '#6FC992' }}
                  >
                    VIEW DETAILS
                  </button>
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 border-2 font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
                      style={{ borderColor: '#6FC992' }}
                    >
                      VIEW CODE
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="w-12 h-12 border-2 border-white/30 flex items-center justify-center text-white hover:border-[#6FC992] hover:text-[#6FC992] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                ↑
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(projects.length - 1, prev + 1))}
                disabled={currentIndex === projects.length - 1}
                className="w-12 h-12 border-2 border-white/30 flex items-center justify-center text-white hover:border-[#6FC992] hover:text-[#6FC992] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                ↓
              </button>
            </div>
          </div>

          {/* Animated marquee footer */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <div
              className="flex whitespace-nowrap py-4 bg-[#6FC992]"
              style={{ animation: 'marquee 40s linear infinite' }}
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center mx-8">
                  <span className="text-2xl md:text-3xl font-bold text-black uppercase">
                    Full-Stack Projects
                  </span>
                  <span className="mx-8 text-black">★</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {quickView && <QuickViewModal project={quickView} onClose={() => setQuickView(null)} />}
    </>
  )
}
