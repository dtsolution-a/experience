import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
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
    skills: ['React / Next.js', 'Node.js', 'TypeScript', 'AWS'],
    image: '/ws-devs.jpg',
    accent: '#7B2FF7',
  },
  {
    id: 2,
    need: 'Need',
    question: 'Branding?',
    answer: 'Meet our Designers',
    tag: 'UI/UX & Identity',
    skills: ['Figma', 'Brand Identity', 'Motion Design', 'Design Systems'],
    image: '/ws-design.jpg',
    accent: '#FF2D55',
  },
  {
    id: 3,
    need: 'Need',
    question: 'Growth?',
    answer: 'Meet our SEO Experts',
    tag: 'Organic Search',
    skills: ['Technical SEO', 'Content Strategy', 'Core Web Vitals', 'GA4'],
    image: '/ws-seo.jpg',
    accent: '#FF9C00',
  },
  {
    id: 4,
    need: 'Need',
    question: 'Automation?',
    answer: 'Meet our AI Specialists',
    tag: 'Machine Learning',
    skills: ['LLM / RAG', 'Python', 'RPA & OCR', 'OpenAI / Gemini'],
    image: '/ws-ai.jpg',
    accent: '#7B2FF7',
  },
  {
    id: 5,
    need: 'Need',
    question: 'Business Tech?',
    answer: 'Meet our Virtual CTO',
    tag: 'Tech Strategy',
    skills: ['Architecture Review', 'Stack Selection', 'Security Audits', 'Team Structuring'],
    image: '/ws-cto.jpg',
    accent: '#FF9C00',
  },
]

const specialties = ['Web Development', 'UI/UX Design', 'SEO & Growth', 'AI Automation', 'Virtual CTO']

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const cursorRef = useRef(null)
  const [state, setState] = useState({ large: false, label: '' })

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useEffect(() => {
    window.__setCursor = setState
    return () => { delete window.__setCursor }
  }, [])

  return (
    <div ref={cursorRef} className={`custom-cursor ${state.large ? 'large' : ''}`}>
      {state.large && <span className="cursor-label">{state.label}</span>}
    </div>
  )
}

/* ─── SVG MASK REVEAL ─── */
function MaskReveal({ onDone }) {
  const ellipseRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const el = ellipseRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    gsap.fromTo(
      el,
      { attr: { rx: 0, ry: 0 } },
      {
        attr: { rx: 2800, ry: 2200 },
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.15,
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => onDone?.(),
          })
        },
      }
    )
  }, [onDone])

  return (
    <div ref={overlayRef} className="hero-mask-overlay" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" className="hero-mask-svg">
        <defs>
          <mask id="reveal-mask">
            <rect width="100%" height="100%" fill="white" />
            <ellipse ref={ellipseRef} cx="960" cy="1300" rx="0" ry="0" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#0A0A12" mask="url(#reveal-mask)" />
      </svg>
    </div>
  )
}

/* ─── HERO ─── */
function AboutHero() {
  const [maskDone, setMaskDone] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (maskDone && contentRef.current) {
      const els = contentRef.current.querySelectorAll('.reveal-item')
      gsap.fromTo(els,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power2.out' }
      )
    }
  }, [maskDone])

  return (
    <section className="about-full-hero">
      <div className="hero-bg-img">
        <img src="/about-hero-bg.jpg" alt="MediaLoop" />
        <div className="hero-bg-grad" />
      </div>
      {!maskDone && <MaskReveal onDone={() => setMaskDone(true)} />}

      <div ref={contentRef} className={`hero-full-content ${maskDone ? 'content-visible' : ''}`}>
        <div className="hero-full-top reveal-item">
          <span className="hero-award-badge">
            <span className="hero-award-dot" />
            Full-Spectrum Digital Agency
          </span>
        </div>
        <div className="hero-full-center">
          <h1 className="hero-full-title reveal-item">
            We Build the<br />
            Internet's Best<br />
            <em>Products.</em>
          </h1>
          <div className="hero-specialties reveal-item">
            {specialties.map((s, i) => (
              <span key={s} className="hero-specialty-chip">
                {i > 0 && <span className="hero-specialty-dot">·</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-full-bottom reveal-item">
          <p className="hero-bottom-left">
            End-to-end digital solutions<br />
            <span>Mumbai, India · Global Delivery</span>
          </p>
          <div className="hero-bottom-stats">
            {[{ v: '120+', l: 'Projects' }, { v: '50+', l: 'Clients' }, { v: '5★', l: 'Rating' }].map(s => (
              <div key={s.l} className="hero-bottom-stat">
                <span className="hero-bottom-stat-val">{s.v}</span>
                <span className="hero-bottom-stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arch cutout at bottom — Rise at Seven style */}
      <div className="hero-arch-bottom" aria-hidden="true" />
    </section>
  )
}

/* ─── SCROLL-PINNED TEAM PANEL ─── */
function TeamPanel() {
  const [activeTeam, setActiveTeam] = useState(0)
  const activeRef = useRef(0)
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const pin = pinRef.current
    if (!wrapper || !pin) return

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${teams.length * 250}vh`, /* Increased from 100vh to 250vh per item for slower progression */
      pin: pin,
      pinSpacing: true,
      scrub: false,
      onUpdate: (self) => {
        const newIdx = Math.min(
          Math.floor(self.progress * teams.length),
          teams.length - 1
        )
        if (newIdx !== activeRef.current) {
          activeRef.current = newIdx
          setActiveTeam(newIdx)
        }
      },
    })

    return () => trigger.kill()
  }, [])

  const handleEnter = (idx) => {
    if (window.__setCursor) {
      window.__setCursor({ large: true, label: teams[idx].answer.replace('Meet our ', '') })
    }
  }
  const handleLeave = () => {
    if (window.__setCursor) window.__setCursor({ large: false, label: '' })
  }

  return (
    /* Outer scroll-height container */
    <div ref={wrapperRef} className="team-scroll-wrapper">
      {/* The dark rounded card that pins */}
      <div ref={pinRef} className="team-panel-card">
        <div className="team-panel-inner">

          {/* LEFT: List */}
          <div className="team-list-col">
            <div className="team-list-label">Who does what</div>

            {teams.map((team, i) => (
              <div
                key={team.id}
                className={`team-list-item ${activeTeam === i ? 'active' : ''}`}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <div className="tli-left">
                  <div className="tli-num" style={{ color: activeTeam === i ? team.accent : 'rgba(255,255,255,0.3)' }}>
                    0{team.id} — {team.need}
                  </div>
                  <div className="tli-question">{team.question}</div>
                  <div className="tli-answer" style={{ color: activeTeam === i ? team.accent : 'rgba(255,255,255,0.35)' }}>
                    ↓ {team.answer}
                  </div>
                </div>
                <div className="tli-right">
                  <span
                    className="tli-tag"
                    style={activeTeam === i
                      ? { color: team.accent, background: `${team.accent}18`, borderColor: `${team.accent}40`, opacity: 1 }
                      : {}}
                  >
                    {team.tag}
                  </span>
                  <div className={`tli-arrow ${activeTeam === i ? 'active' : ''}`}
                    style={activeTeam === i ? { background: team.accent, borderColor: team.accent } : {}}>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Image panel */}
          <div className="team-image-col">
            {teams.map((team, i) => (
              <div key={team.id} className={`team-img-slide ${activeTeam === i ? 'active' : ''}`}>
                <img src={team.image} alt={team.answer} />
                <div className="team-img-overlay" />
                <div className="team-img-info">
                  <div className="team-img-tag" style={{ background: team.accent }}>
                    {team.tag}
                  </div>
                  <h3 className="team-img-name">{team.answer}</h3>
                  <div className="team-img-skills">
                    {team.skills.map(s => (
                      <span key={s} className="team-img-skill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Progress dots */}
            <div className="team-img-progress">
              {teams.map((_, i) => (
                <div key={i} className={`progress-pip ${activeTeam === i ? 'active' : ''}`}
                  style={activeTeam === i ? { background: teams[i].accent, width: 24 } : {}}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── SCROLL TEXT ─── */
function ScrollTextSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const tween = gsap.fromTo(text,
      { x: '12vw' },
      {
        x: '-55vw',
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
    <section ref={sectionRef} className="scroll-text-section">
      <div ref={textRef} className="scroll-text-inner">
        <span className="scroll-text-word">Ready</span>
        <span className="scroll-text-word outline">to</span>
        <span className="scroll-text-word">Build?</span>
        <span className="scroll-text-word outline">Let's</span>
        <span className="scroll-text-word">Talk.</span>
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function About() {
  const closingRef = useRef(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-80px' })

  return (
    <div className="about-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />
      <AboutHero />
      <TeamPanel />

      {/* Closing */}
      <div className="about-closing-v5" ref={closingRef}>
        <motion.div
          className="closing-v5-row"
          initial={{ opacity: 0, y: 30 }}
          animate={closingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="closing-v5-title">
            One team.<br />
            <span className="gradient-text">Infinite</span><br />
            capability.
          </h2>
          <div className="closing-v5-right">
            <p className="closing-v5-sub">
              Whether you need one specialist or an entire cross-functional squad, MediaLoop assembles the right experts for every challenge — every time.
            </p>
            <div className="closing-v5-cta">
              <a href="/contact" className="btn-primary">
                Start a Project <ArrowUpRight size={16} />
              </a>
              <a href="/work" className="btn-secondary">See Our Work</a>
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollTextSection />
      <Footer />
    </div>
  )
}
