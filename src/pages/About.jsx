import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Target, Rocket, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
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

const bgImages = [
  '/bg/1909457_9170.jpg',
  '/bg/25537441_1dg3_egm8_211202.jpg',
  '/bg/27287259_z69i_kxes_211202.jpg',
  '/bg/840867_1242.jpg',
  '/bg/beautiful-tree-countryside.jpg',
  '/bg/closeup-shot-colorful-autumn-leaves-garden.jpg',
  '/bg/dry-tree-with-orange-clouds-background.jpg'
]

/* ─── HERO ─── */
function AboutHero() {
  const [maskDone, setMaskDone] = useState(false)
  const contentRef = useRef(null)
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)])
  }, [])

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
        {bgImage && <img src={bgImage} alt="MediaLoop Background" />}
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
                <div className="team-img-wipe" style={{ background: team.accent }} />
                
                {/* BOTTOM INFO (Default) */}
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

                {/* CENTER INFO (Hover) */}
                <div className="team-img-info-center">
                  <h3 className="team-img-name-large">{team.answer}</h3>
                  <div className="team-img-skills center">
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

import ScrollText from '../components/ScrollText'

/* ─── OUR STORY ─── */
function OurStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section" style={{ position: 'relative' }}>
      <div className="container about-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Our Story</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '16px 0 20px' }}>
            Built to engineer<br />
            <span className="gradient-text">growth</span>, not just campaigns.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.75 }}>
            MediaLoop Technologies started in 2020 with a simple frustration: agencies sold
            creativity, developers sold code, and nobody owned the outcome. We built a single
            team that does both — strategists, engineers, designers, and AI specialists working
            from one roadmap instead of five disconnected vendors.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '40px 36px' }}
        >
          <div style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--text)', fontWeight: 600, marginBottom: 24 }}>
            "We don't hand off a deliverable and disappear. We stay in the room until the
            number moves."
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>The MediaLoop Team</span>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Founders &amp; Leads</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── MILESTONES ─── */
function Milestones() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const milestones = [
    { v: '2020', l: 'Founded' },
    { v: '200+', l: 'Projects Shipped' },
    { v: '50+', l: 'Global Clients' },
    { v: '2', l: 'Continents Served' },
  ]

  return (
    <section ref={ref} className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div
          className="about-milestones-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {milestones.map((m, i) => (
            <motion.div
              key={m.l}
              className="card"
              style={{ padding: '32px 24px', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            >
              <div className="gradient-text" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
                {m.v}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {m.l}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-milestones-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── OUR VALUES ─── */
function OurValues() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const values = [
    { icon: <Target size={22} />, color: '#c084fc', title: 'Outcome Obsessed', desc: 'Every engagement is measured against real business metrics — not vanity deliverables.' },
    { icon: <Rocket size={22} />, color: '#f472b6', title: 'Ship Fast, Iterate Faster', desc: 'We favor working software and live campaigns over long decks and endless revisions.' },
    { icon: <HeartHandshake size={22} />, color: '#fb923c', title: 'Radically Transparent', desc: 'You see the roadmap, the numbers, and the tradeoffs — no black-box reporting.' },
    { icon: <ShieldCheck size={22} />, color: '#38bdf8', title: 'Senior on Every Team', desc: 'No junior hand-offs. Every project is led by someone who has shipped it before.' },
  ]

  return (
    <section ref={ref} className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <span className="section-label">What We Stand For</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.15, margin: '16px 0 0' }}>
            The principles behind<br />every engagement
          </h2>
        </div>

        <motion.div
          className="about-values-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="card"
              style={{ padding: '28px 24px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, marginBottom: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: v.color, background: `${v.color}15`, border: `1px solid ${v.color}30`
              }}>
                {v.icon}
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em', color: 'var(--text)' }}>{v.title}</h4>
              <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── GLOBAL PRESENCE ─── */
function GlobalPresence() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const offices = [
    { city: 'Surat, Gujarat', country: 'India', tag: 'Headquarters', color: '#c084fc' },
    { city: 'Dubai', country: 'United Arab Emirates', tag: 'Regional Office', color: '#38bdf8' },
  ]

  return (
    <section ref={ref} className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
          <span className="section-label">Where We Work</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.15, margin: '16px 0 0' }}>
            Global delivery,<br />local presence
          </h2>
        </div>

        <motion.div
          className="about-offices-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 800, margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {offices.map((o, i) => (
            <motion.div
              key={o.city}
              className="card"
              style={{ padding: '28px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: o.color, background: `${o.color}15`, border: `1px solid ${o.color}30`
              }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: o.color, marginBottom: 6 }}>{o.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{o.city}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{o.country}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-offices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default function About() {
  const closingRef = useRef(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-80px' })

  const scrollWords = [
    { text: 'Ready', outline: false },
    { text: 'to', outline: true },
    { text: 'Build?', outline: false },
    { text: 'Let\'s', outline: true },
    { text: 'Talk.', outline: false },
  ]

  return (
    <div className="about-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />
      
      <main style={{ position: 'relative', zIndex: 10, background: 'var(--bg)', marginBottom: 'var(--footer-height, 400px)' }}>
        <AboutHero />
        <OurStory />
        <Milestones />
        <TeamPanel />
        <OurValues />
        <GlobalPresence />

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

        <ScrollText words={scrollWords} />
      </main>

      <Footer />
    </div>
  )
}
