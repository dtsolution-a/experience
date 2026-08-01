import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform, animate } from 'framer-motion'

import DotGrid from './DotGrid'

const GRADIENT_TEXT = 'grow, and outperform.'

const bgImages = [
  '/bg/1909457_9170.jpg',
  '/bg/25537441_1dg3_egm8_211202.jpg',
  '/bg/27287259_z69i_kxes_211202.jpg',
  '/bg/840867_1242.jpg',
  '/bg/beautiful-tree-countryside.jpg',
  '/bg/closeup-shot-colorful-autumn-leaves-garden.jpg',
  '/bg/dry-tree-with-orange-clouds-background.jpg'
]


const stats = [
  { num: '200+', label: 'Projects Delivered' },
  { num: '98%',  label: 'Client Satisfaction' },
  { num: '50+',  label: 'Global Clients' },
  { num: '5+',   label: 'Years of Excellence' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
}
const lineIn = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
}

export default function Hero() {
  const sectionRef = useRef(null)

  // Track mouse for parallax
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)])
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const onMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    // Normalize -1 to +1 from center
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    setParallax({ x, y })
  }, [])

  const onMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 })
  }, [])

  // Parallax offsets per line — deeper = more movement
  const l1 = { x: parallax.x * 7,  y: parallax.y * 3  }
  const l2 = { x: parallax.x * 13, y: parallax.y * 6  }
  const l3 = { x: parallax.x * 20, y: parallax.y * 9  }
  const ey = { x: parallax.x * 4,  y: parallax.y * 2  }

  return (
    <section
      ref={sectionRef}
      className="aurora-hero"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Image */}
      <div className="home-hero-bg">
        {bgImage && <img src={bgImage} alt="" />}
        <div className="home-hero-overlay" />
      </div>

      {/* Interactive dot grid */}
      <DotGrid sectionRef={sectionRef} />

      {/* Aurora atmosphere */}
      <div className="aurora-orb aurora-orb-a" />
      <div className="aurora-orb aurora-orb-b" />
      <div className="aurora-orb aurora-orb-c" />
      <div className="aurora-grain" />

      {/* Main content */}
      <motion.div className="aurora-content" style={{ opacity, y: yContent }}>

        {/* Eyebrow */}
        <motion.div
          className="aurora-eyebrow"
          style={{ x: ey.x, y: ey.y }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="aurora-eyebrow-dot" />
          MediaLoop Technologies · Est. 2020
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="aurora-heading"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Line 1 — shallow parallax */}
          <motion.span
            className="aurora-line"
            style={{
              fontWeight: 300,
              display: 'block',
              x: l1.x,
              y: l1.y,
              transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
            }}
            variants={lineIn}
          >
            We engineer digital
          </motion.span>

          {/* Line 2 — mid parallax */}
          <motion.span
            className="aurora-line"
            style={{
              fontWeight: 300,
              display: 'block',
              x: l2.x,
              y: l2.y,
              transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
            }}
            variants={lineIn}
          >
            systems that think,
          </motion.span>

          {/* Line 3 — deepest parallax + CSS character wave */}
          <motion.span
            className="aurora-line aurora-line-grad"
            style={{
              display: 'block',
              x: l3.x,
              y: l3.y,
              transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
            }}
            variants={lineIn}
          >
            {GRADIENT_TEXT.split('').map((ch, i) => (
              <span
                key={i}
                className="wave-char-grad"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  whiteSpace: 'pre',
                }}
              >
                {ch}
              </span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Separator */}
        <motion.div
          className="aurora-sep"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Sub */}
        <motion.p
          className="aurora-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          AI intelligence · Creative strategy · Digital ecosystems that move markets
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="aurora-ctas"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
        >
          <a href="#contact" className="aurora-cta-primary">
            Start a project
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <span className="aurora-cta-divider">or</span>
          <a href="#services" className="aurora-cta-ghost">Explore services</a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="aurora-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.55 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="aurora-stat">
              <span className="aurora-stat-num">{s.num}</span>
              <span className="aurora-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
