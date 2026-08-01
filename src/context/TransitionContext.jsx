import { createContext, useContext, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const TransitionContext = createContext({})

export function usePageTransition() {
  return useContext(TransitionContext)
}

/* ─── OVERLAY DIV — simple gradient with clip-path circle ─── */
export function TransitionOverlay() {
  return (
    <div
      id="page-transition-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #7B2FF7 0%, #FF2D55 50%, #FF9C00 100%)',
        clipPath: 'circle(3000px at 50% 50%)', // Fully cover screen initially
        willChange: 'clip-path, transform',
      }}
    />
  )
}

/* ─── PROVIDER ─── */
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const isAnimating = useRef(false)

  // Trigger initial wipe animation on full page load / refresh
  useEffect(() => {
    const overlay = document.getElementById('page-transition-overlay')
    if (!overlay) return
    
    isAnimating.current = true
    overlay.style.pointerEvents = 'all'

    gsap.to(overlay, {
      y: '-100%',
      duration: 0.7,
      ease: 'power2.inOut',
      delay: 0.2, // Small delay so user sees it fully before it wipes out
      onComplete: () => {
        gsap.set(overlay, {
          y: 0,
          clipPath: 'circle(0px at 50% 50%)',
        })
        overlay.style.pointerEvents = 'none'
        isAnimating.current = false
      },
    })
  }, [])


  const navigateTo = useCallback((path, event) => {
    if (isAnimating.current) return
    if (!path || path === window.location.pathname) return

    // Skip hash-only links
    if (path.startsWith('#')) return

    const overlay = document.getElementById('page-transition-overlay')
    if (!overlay) { navigate(path); return }

    // Click origin in viewport px
    const cx = event?.clientX ?? window.innerWidth / 2
    const cy = event?.clientY ?? window.innerHeight / 2

    isAnimating.current = true
    overlay.style.pointerEvents = 'all'

    // ── Phase 1: COVER — circle grows from click point ──
    gsap.set(overlay, {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      y: 0,
    })

    gsap.to(overlay, {
      clipPath: `circle(3000px at ${cx}px ${cy}px)`,
      duration: 0.55,
      ease: 'power3.in',
      onComplete: () => {
        // Navigate while screen is covered
        navigate(path)
        window.scrollTo(0, 0)

        // ── Phase 2: UNCOVER — slide overlay upward off screen ──
        gsap.to(overlay, {
          y: '-100%',
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.06,
          onComplete: () => {
            // Reset for next use
            gsap.set(overlay, {
              y: 0,
              clipPath: 'circle(0px at 50% 50%)',
            })
            overlay.style.pointerEvents = 'none'
            isAnimating.current = false
          },
        })
      },
    })
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
