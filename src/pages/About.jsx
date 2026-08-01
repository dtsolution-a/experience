import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

const teams = [
  {
    id: 1,
    need: 'You need...',
    question: 'a Website?',
    answer: 'Meet our Developers',
    tag: 'Full-Stack Engineering',
    desc: 'React, Next.js, Node.js — we craft lightning-fast, scalable web applications that convert visitors into revenue.',
    image: '/team-devs.jpg',
    accent: '#3B82F6',
  },
  {
    id: 2,
    need: 'Need',
    question: 'Branding?',
    answer: 'Meet our Designers',
    tag: 'UI/UX & Visual Identity',
    desc: 'From logo marks to full design systems, we craft identities that resonate and interfaces that feel premium.',
    image: '/team-design.jpg',
    accent: '#EC4899',
  },
  {
    id: 3,
    need: 'Need',
    question: 'Growth?',
    answer: 'Meet our SEO Experts',
    tag: 'Organic Search & Analytics',
    desc: 'Technical SEO, content strategy, and data-driven growth loops that compound your revenue over time.',
    image: '/team-seo.jpg',
    accent: '#10B981',
  },
  {
    id: 4,
    need: 'Need',
    question: 'Automation?',
    answer: 'Meet our AI Specialists',
    tag: 'Machine Learning & RPA',
    desc: 'LLMs, custom AI pipelines, and RPA bots that eliminate repetitive work and unlock intelligent decision-making.',
    image: '/team-ai.jpg',
    accent: '#8B5CF6',
  },
  {
    id: 5,
    need: 'Need',
    question: 'Business Tech?',
    answer: 'Meet our Virtual CTO',
    tag: 'Technology Strategy',
    desc: 'Architecture review, tech stack selection, and ongoing strategic guidance — senior CTO expertise, on demand.',
    image: '/team-cto.jpg',
    accent: '#F59E0B',
  },
]

// A single panel component for each team
function TeamPanel({ team, progress }) {
  const parallaxY = useTransform(progress, [0, 1], [30, -30])

  return (
    <div className="panel-split">
      {/* LEFT: Question side */}
      <div className="panel-left">
        <span className="panel-step-num">0{team.id}</span>
        <span className="panel-need-label">{team.need}</span>
        <h2 className="panel-question">
          <em>{team.question}</em>
        </h2>
        <div className="panel-arrow-indicator">
          <div className="panel-arrow-dot" style={{ background: team.accent, boxShadow: `0 0 0 0 ${team.accent}` }}></div>
          <div className="panel-arrow-line"></div>
          <span style={{ fontSize: '12px', letterSpacing: '0.12em', fontWeight: 700 }}>SCROLL DOWN</span>
        </div>
      </div>

      {/* RIGHT: Answer / Image side */}
      <div className="panel-right">
        <div className="panel-image-bg">
          <motion.img
            src={team.image}
            alt={team.answer}
            style={{ y: parallaxY }}
          />
        </div>
        <div className="panel-image-overlay" style={{
          background: `linear-gradient(to top, rgba(7,7,15,0.95) 0%, rgba(7,7,15,0.3) 55%, transparent 100%)`
        }}></div>
        <div className="panel-answer-content">
          <span className="panel-answer-tag" style={{ color: team.accent, background: `${team.accent}18`, borderColor: `${team.accent}30` }}>
            {team.tag}
          </span>
          <h3 className="panel-answer">↓ {team.answer}</h3>
          <p className="panel-answer-desc">{team.desc}</p>
        </div>
        {/* Colored accent glow at top matching team color */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(to right, transparent, ${team.accent}, transparent)`,
          zIndex: 4, opacity: 0.8
        }}></div>
      </div>
    </div>
  )
}

export default function About() {
  const scrollyRef = useRef(null)
  const scrollyPin = useRef(null)
  const [activePanel, setActivePanel] = useState(0)

  const { scrollYProgress } = useScroll({ target: scrollyRef, offset: ['start start', 'end end'] })

  useGSAP(() => {
    const panels = gsap.utils.toArray('.ab-panel')
    const totalPanels = panels.length

    // Set all panels hidden initially (except first)
    gsap.set(panels, { opacity: 0, y: 60, scale: 0.97, filter: 'blur(12px)' })
    gsap.set(panels[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollyRef.current,
        start: 'top top',
        end: `+=${totalPanels * 120}%`,
        pin: scrollyPin.current,
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * totalPanels), totalPanels - 1)
          setActivePanel(idx)
        }
      }
    })

    panels.forEach((panel, i) => {
      if (i === 0) return

      const prev = panels[i - 1]

      // Outgoing: blur + fade + scale up
      tl.to(prev, {
        opacity: 0,
        y: -80,
        scale: 1.04,
        filter: 'blur(16px)',
        duration: 1,
        ease: 'power2.in'
      })

      // Incoming: reveal from below, sharp
      tl.to(panel, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }, '<0.3')

      // Gap between transitions
      tl.to({}, { duration: 1.2 })
    })

    // Cleanup
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, { scope: scrollyRef })

  const closingRef = useRef(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-100px' })

  return (
    <div className="about-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-orb about-hero-orb-1"></div>
        <div className="about-hero-orb about-hero-orb-2"></div>

        <div className="about-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-eyebrow">Who We Are</span>
          </motion.div>

          <motion.h1
            className="about-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            We build the{' '}
            <span className="gradient-text">internet's</span>
            <br />best products.
          </motion.h1>

          <motion.p
            className="about-hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MediaLoop is a full-spectrum digital agency. We unite elite engineers, designers, growth hackers, and AI specialists under one roof — so your vision gets built exactly the way you imagined it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="about-scroll-hint"
          >
            <div className="about-scroll-line"></div>
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLLYTELLING ── */}
      <div
        ref={scrollyRef}
        className="scrolly-section"
        style={{ height: `${(teams.length + 1) * 120}vh` }}
      >
        <div ref={scrollyPin} className="scrolly-pin">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="scrolly-panel ab-panel"
              style={{ pointerEvents: activePanel === i ? 'all' : 'none' }}
            >
              <TeamPanel team={team} progress={scrollYProgress} />
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="scrolly-progress-bar">
          {teams.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${activePanel === i ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      {/* ── CLOSING ── */}
      <section className="about-closing" ref={closingRef}>
        <div className="about-closing-orb"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={closingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="about-closing-title">
            One team.<br />
            <span className="gradient-text">Infinite capability.</span>
          </h2>
          <p className="about-closing-sub">
            Whether you need one specialist or an entire cross-functional squad, MediaLoop assembles the right experts for the right challenge — every time.
          </p>
          <div className="about-cta-row">
            <a href="/contact" className="btn-primary">
              Start a Project
            </a>
            <a href="/work" className="btn-secondary">
              See Our Work
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
