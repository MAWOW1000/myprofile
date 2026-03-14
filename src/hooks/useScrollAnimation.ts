import { useEffect, useRef } from 'react'
import { gsap } from './useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollAnimationOptions {
  from?:    gsap.TweenVars
  to?:      gsap.TweenVars
  trigger?: string | Element | null
  start?:   string
  end?:     string
  scrub?:   boolean | number
  pin?:     boolean
  once?:    boolean
}

/**
 * General-purpose hook that fires a GSAP fromTo animation when a target element
 * enters the viewport (or with full ScrollTrigger scrub if configured).
 *
 * @param target  - ref pointing at the element to animate
 * @param options - animation + ScrollTrigger options
 * @param deps    - optional extra dependencies array
 */
export function useScrollAnimation<T extends Element>(
  target: React.RefObject<T | null>,
  options: ScrollAnimationOptions,
  deps: unknown[] = [],
) {
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const el = target.current
    if (!el) return

    tweenRef.current = gsap.fromTo(el, options.from ?? {}, {
      ...options.to,
      scrollTrigger: {
        trigger:  options.trigger ?? el,
        start:    options.start   ?? 'top 85%',
        end:      options.end,
        scrub:    options.scrub,
        pin:      options.pin,
        once:     options.once ?? true,
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
