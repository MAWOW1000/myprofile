import { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { gsap } from '../../hooks/useGSAP'
import PhotoVortex from './PhotoVortex'

const HERO_IMAGES = [
  '/images/8DA724FA-5F79-401B-B462-F7FE48991517.jpg',
  '/images/DCF5B2B9-3BAC-482E-BD07-E580861E0E55.jpg',
  '/images/IMG_0217.JPG',
  '/images/IMG_0221.JPG',
  '/images/IMG_0223.JPG',
  '/images/IMG_1404.JPG',
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([nameRef.current, titleRef.current, badgeRef.current], {
        opacity: 0,
        y: 50,
      })

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-screen overflow-hidden bg-black"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Three.js Photo Vortex Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <Environment preset="night" />
            <PhotoVortex images={HERO_IMAGES} />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        {/* Name with green glow */}
        <div ref={nameRef} className="mb-4">
          <h1
            className="text-[clamp(4rem,18vw,14rem)] font-bold leading-none tracking-tighter text-center"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
              WebkitTextStroke: '2px #6FC992',
              color: 'transparent',
              textShadow: '0 0 40px rgba(111, 201, 146, 0.5), 0 0 80px rgba(111, 201, 146, 0.2)',
            }}
          >
            DEV PHAM
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={titleRef} className="mb-8">
          <p
            className="text-2xl md:text-3xl font-light tracking-wide text-center"
            style={{
              color: '#C1FBD4',
              textShadow: '0 0 20px rgba(193, 251, 212, 0.3)',
            }}
          >
            Full-Stack Engineer
          </p>
        </div>

        {/* Circular badge */}
        <div
          ref={badgeRef}
          className="group relative animate-[float_6s_ease-in-out_infinite]"
        >
          <div
            className="w-32 h-32 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110"
            style={{
              borderColor: '#6FC992',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              boxShadow: '0 0 30px rgba(111, 201, 146, 0.4), inset 0 0 20px rgba(111, 201, 146, 0.1)',
            }}
          >
            <div className="text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Scroll</div>
              <div className="text-lg font-semibold" style={{ color: '#6FC992' }}>
                ↓
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Down</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

