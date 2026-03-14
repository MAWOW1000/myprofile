import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX    = useMotionValue(-100)
  const dotY    = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY, dotX, dotY])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <div className="w-8 h-8 rounded-full border border-[#00ff7f]/50" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY }}
      >
        <div className="w-2 h-2 rounded-full bg-[#00ff7f]" />
      </motion.div>
    </>
  )
}
