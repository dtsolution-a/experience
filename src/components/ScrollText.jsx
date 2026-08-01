import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollText({ words, className = "" }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const tween = gsap.fromTo(text,
      { x: '100vw' },
      {
        x: '-100vw',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section ref={sectionRef} className={`scroll-text-section ${className}`}>
      <div ref={textRef} className="scroll-text-inner">
        {words.map((w, i) => (
          <span key={i} className={`scroll-text-word ${w.outline ? 'outline' : ''}`}>
            {w.text}
          </span>
        ))}
      </div>
    </section>
  )
}
