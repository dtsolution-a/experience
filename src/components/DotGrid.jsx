import { useEffect, useRef } from 'react'

// ── Config ──
const DOT_GAP     = 26      // grid spacing
const DOT_MIN     = 1.0     // resting radius
const DOT_MAX     = 5.5     // full-hover radius
const INFLUENCE   = 160     // mouse reach (px)
const REST_ALPHA  = 0.09    // barely-there at rest
const LERP_SPEED  = 0.10    // 0.06 = slow/silky, 0.15 = snappier

// ── Brand gradient stops: orange → pink → purple ──
const STOPS = [
  [255, 156,  0],   // #FF9C00
  [255,  45, 85],   // #FF2D55
  [123,  47, 247],  // #7B2FF7
]

function lerpRGB(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

function brandColor(t) {
  // map t 0..1 across three stops
  const segments = STOPS.length - 1
  const scaled   = Math.max(0, Math.min(1, t)) * segments
  const i        = Math.min(Math.floor(scaled), segments - 1)
  const f        = scaled - i
  return lerpRGB(STOPS[i], STOPS[i + 1], f)
}

function smoothstep(x) {
  x = Math.max(0, Math.min(1, x))
  return x * x * (3 - 2 * x)
}

export default function DotGrid({ sectionRef }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -99999, y: -99999 })
  const rafRef    = useRef(null)
  const dotsRef   = useRef([])

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    const section = sectionRef?.current ?? canvas.parentElement

    let W = 0, H = 0, dpr = 1

    // ── Build dot grid ──
    function build() {
      dpr = window.devicePixelRatio || 1
      W   = section.offsetWidth
      H   = section.offsetHeight

      // Physical canvas = logical × dpr  →  crisp on retina
      canvas.width        = W * dpr
      canvas.height       = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.scale(dpr, dpr)

      const dots = []
      for (let x = DOT_GAP / 2; x < W; x += DOT_GAP) {
        for (let y = DOT_GAP / 2; y < H; y += DOT_GAP) {
          const color = brandColor(x / W)
          dots.push({
            x, y, color,
            r: DOT_MIN,   // current (lerped) radius
            a: REST_ALPHA, // current (lerped) alpha
          })
        }
      }
      dotsRef.current = dots
    }

    // ── Animation loop ──
    function draw() {
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const dots = dotsRef.current

      for (const d of dots) {
        const dist    = Math.hypot(d.x - mx, d.y - my)
        const prox    = smoothstep(1 - dist / INFLUENCE)

        // Targets for this frame
        const targetR = DOT_MIN + (DOT_MAX - DOT_MIN) * prox
        const targetA = REST_ALPHA + (1 - REST_ALPHA) * prox

        // Lerp toward target — this IS the smoothness
        d.r += (targetR - d.r) * LERP_SPEED
        d.a += (targetA - d.a) * LERP_SPEED

        const [cr, cg, cb] = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${d.a.toFixed(3)})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // ── Mouse tracking (relative to canvas, not viewport) ──
    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    function onLeave() {
      mouseRef.current = { x: -99999, y: -99999 }
    }

    build()
    draw()

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', () => {
      cancelAnimationFrame(rafRef.current)
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset scale before rebuild
      build()
      draw()
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        // ── Fade dots OUT in the center text zone, keep them at edges ──
        // The ellipse punches a transparent hole where text lives
        WebkitMaskImage: `radial-gradient(
          ellipse 52% 52% at 50% 46%,
          transparent 28%,
          rgba(0,0,0,0.15) 45%,
          black 72%
        )`,
        maskImage: `radial-gradient(
          ellipse 52% 52% at 50% 46%,
          transparent 28%,
          rgba(0,0,0,0.15) 45%,
          black 72%
        )`,
      }}
    />
  )
}
