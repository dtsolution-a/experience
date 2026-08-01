import { createContext, useContext, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const TransitionContext = createContext({})

export function usePageTransition() {
  return useContext(TransitionContext)
}

/* The global wipe overlay — rendered once in App */
export function TransitionOverlay() {
  return (
    <div id="page-transition-overlay" aria-hidden="true">
      <svg
        width="100%" height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        id="transition-svg"
      >
        <defs>
          <linearGradient id="wipe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#7B2FF7" />
            <stop offset="45%"  stopColor="#FF2D55" />
            <stop offset="100%" stopColor="#FF9C00" />
          </linearGradient>
          <mask id="wipe-mask">
            <rect width="100%" height="100%" fill="white" />
            <circle id="wipe-circle" cx="960" cy="540" r="0" fill="black" />
          </mask>
        </defs>
        {/* Brand gradient rect masked by the growing circle */}
        <rect width="100%" height="100%" fill="url(#wipe-grad)" mask="url(#wipe-mask)" />
      </svg>
    </div>
  )
}

/* Provider — wraps inside BrowserRouter so useNavigate works */
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const isAnimating = useRef(false)

  const navigateTo = useCallback((path, event) => {
    if (isAnimating.current) return
    if (typeof path !== 'string' || !path) return

    // Same page? Just navigate smoothly
    const currentPath = window.location.pathname
    if (path === currentPath) return

    // Click origin (for circle grow from cursor)
    const cx = event?.clientX ?? window.innerWidth / 2
    const cy = event?.clientY ?? window.innerHeight / 2

    // Convert viewport coords to SVG viewBox coords (1920x1080)
    const svgCX = (cx / window.innerWidth) * 1920
    const svgCY = (cy / window.innerHeight) * 1080

    const circle = document.getElementById('wipe-circle')
    const overlay = document.getElementById('page-transition-overlay')
    if (!circle || !overlay) { navigate(path); return }

    isAnimating.current = true
    overlay.style.pointerEvents = 'all'

    // Set circle origin to click point
    gsap.set(circle, { attr: { cx: svgCX, cy: svgCY, r: 0 } })

    // Phase 1: COVER — circle grows from click point to fill screen
    gsap.to(circle, {
      attr: { r: 2000 },
      duration: 0.65,
      ease: 'power3.in',
      onComplete: () => {
        // Navigate while screen is covered
        navigate(path)
        window.scrollTo(0, 0)

        // Phase 2: UNCOVER — circle shrinks away (from center upward, like Rise at Seven)
        gsap.set(circle, { attr: { cx: 960, cy: -200, r: 2400 } })
        gsap.to(circle, {
          attr: { r: 0 },
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.05,
          onComplete: () => {
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
