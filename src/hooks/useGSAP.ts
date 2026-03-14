import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function useGSAP(fn: () => void | (() => void), deps: unknown[] = []) {
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    ctx.current = gsap.context(fn)
    return () => ctx.current?.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
