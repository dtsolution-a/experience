import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
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
    prefix: 'You need...',
    question: 'a Website?',
    answer: 'Meet our Developers',
    tag: 'Full-Stack Engineering',
    desc: 'React, Next.js, Node — we craft blazing-fast apps that turn browsers into buyers.',
    skills: ['React / Next.js', 'Node.js', 'TypeScript', 'REST / GraphQL', 'AWS / GCP'],
    stats: [{ v: '60+', l: 'Projects' }, { v: '4.9★', l: 'Rating' }, { v: '<1s', l: 'Load Time' }],
    image: '/panel-devs.jpg',
    accent: '#7B2FF7',
    bgGrad: 'radial-gradient(ellipse at top right, rgba(123,47,247,0.12), transparent 60%)',
  },
  {
    id: 2,
    prefix: 'Need',
    question: 'Branding?',
    answer: 'Meet our Designers',
    tag: 'UI/UX & Visual Identity',
    desc: 'We build identities that resonate and interfaces that feel impossibly premium.',
    skills: ['Brand Identity', 'Figma', 'Motion Design', 'Design Systems', 'User Research'],
    stats: [{ v: '120+', l: 'Brands Built' }, { v: '3x', l: 'Engagement' }, { v: '100%', l: 'Figma Native' }],
    image: '/panel-design.jpg',
    accent: '#FF2D55',
    bgGrad: 'radial-gradient(ellipse at top right, rgba(255,45,85,0.12), transparent 60%)',
  },
  {
    id: 3,
    prefix: 'Need',
    question: 'Growth?',
    answer: 'Meet our SEO Experts',
    tag: 'Organic Search & Analytics',
    desc: 'Technical SEO and content loops that compound your rankings month over month.',
    skills: ['Technical SEO', 'Content Strategy', 'Core Web Vitals', 'GA4 & GSC', 'Link Building'],
    stats: [{ v: '5x', l: 'Avg. Traffic' }, { v: '8mo', l: 'Avg. to #1' }, { v: '200+', l: 'Keywords Ranked' }],
    image: '/panel-seo.jpg',
    accent: '#FF9C00',
    bgGrad: 'radial-gradient(ellipse at top right, rgba(255,156,0,0.12), transparent 60%)',
  },
  {
    id: 4,
    prefix: 'Need',
    question: 'Automation?',
    answer: 'Meet our AI Specialists',
    tag: 'Machine Learning & RPA',
    desc: 'LLMs, custom AI pipelines, and bots that eliminate repetitive work at scale.',
    skills: ['LLM Fine-tuning', 'LangChain / RAG', 'Python / PyTorch', 'RPA & OCR', 'OpenAI / Gemini'],
    stats: [{ v: '94%', l: 'Accuracy' }, { v: '10x', l: 'Faster Ops' }, { v: '100%', l: 'Automated' }],
    image: '/panel-ai.jpg',
    accent: '#7B2FF7',
    bgGrad: 'radial-gradient(ellipse at top right, rgba(123,47,247,0.15), transparent 60%)',
  },
  {
    id: 5,
    prefix: 'Need',
    question: 'Business Tech?',
    answer: 'Meet our Virtual CTO',
    tag: 'Technology Strategy',
    desc: 'Senior CTO-level architecture, roadmapping, and advisory — on demand, not full-time salary.',
    skills: ['Tech Roadmapping', 'Stack Selection', 'Security Audits', 'Team Structuring', 'Due Diligence'],
    stats: [{ v: '50+', l: 'Startups Advised' }, { v: '$2M+', l: 'Cost Saved' }, { v: '15yr', l: 'Avg. Experience' }],
    image: '/panel-cto.jpg',
    accent: '#FF9C00',
    bgGrad: 'radial-gradient(ellipse at top right, rgba(255,156,0,0.12), transparent 60%)',
  },
]

export default function About() {
  const scrollyRef = useRef(null)
  const scrollyPin = useRef(null)
  const [activePanel, setActivePanel] = useState(0)

  useGSAP(() => {
    const panels = gsap.utils.toArray('.ab-panel')
    const total = panels.length

    // Initial states — hide all except first
    gsap.set(panels, { opacity: 0, yPercent: 8, scale: 0.98, filter: 'blur(14px)' })
    gsap.set(panels[0], { opacity: 1, yPercent: 0, scale: 1, filter: 'blur(0px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollyRef.current,
        start: 'top top',
        end: `+=${total * 130}%`,
        pin: scrollyPin.current,
        scrub: 1.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * total), total - 1)
          setActivePanel(idx)
        },
      },
    })

    panels.forEach((panel, i) => {
      if (i === 0) return
      const prev = panels[i - 1]

      // Outgoing panel
      tl.to(prev, { opacity: 0, yPercent: -6, scale: 1.02, filter: 'blur(18px)', duration: 0.8, ease: 'power2.in' })
      // Incoming panel
      tl.to(panel, { opacity: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }, '<0.25')
      // Hold
      tl.to({}, { duration: 1.6 })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, { scope: scrollyRef })

  const closingRef = useRef(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-100px' })

  return (
    <div className="about-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-orb about-hero-orb-1" />
        <div className="about-hero-orb about-hero-orb-2" />
        <div className="about-hero-inner">
          <motion.span
            className="about-eyebrow"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Who We Are
          </motion.span>

          <motion.h1
            className="about-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            We build the{' '}
            <span className="gradient-text">internet's</span>
            <br />best products.
          </motion.h1>

          <motion.p
            className="about-hero-sub"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            MediaLoop is a full-spectrum digital agency. We unite elite engineers, designers, growth strategists, and AI specialists — so your vision gets built exactly how you imagined it.
          </motion.p>

          <motion.div
            className="about-scroll-hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="about-scroll-line" />
            <span>Scroll to find your team</span>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLLYTELLING ── */}
      <div
        ref={scrollyRef}
        className="scrolly-section"
        style={{ height: `${(teams.length + 1) * 130}vh` }}
      >
        <div ref={scrollyPin} className="scrolly-pin">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="scrolly-panel ab-panel"
              style={{ pointerEvents: activePanel === i ? 'all' : 'none' }}
            >
              {/* ── LEFT ── */}
              <div className="panel-left">
                <span className="panel-ghost-num">0{team.id}</span>

                {/* Top */}
                <div className="panel-left-top">
                  <div className="panel-need-prefix">{team.prefix}</div>
                  <h2 className="panel-question">
                    <span className="panel-question-accent">{team.question}</span>
                  </h2>

                  <div className="panel-skills">
                    {team.skills.map(s => (
                      <span key={s} className="panel-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Stats */}
                <div className="panel-left-bottom">
                  <div className="panel-stats">
                    {team.stats.map(stat => (
                      <div key={stat.l} className="panel-stat">
                        <div className="panel-stat-value" style={{ color: team.accent }}>{stat.v}</div>
                        <div className="panel-stat-label">{stat.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="panel-right">
                {/* Tinted gradient bg */}
                <div className="panel-right-bg" style={{ background: team.bgGrad }} />

                {/* Illustration area */}
                <div className="panel-illus-area">
                  <motion.img
                    src={team.image}
                    alt={team.answer}
                    whileHover={{ scale: 1.04, y: -8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                </div>

                {/* Answer block */}
                <div className="panel-answer-block">
                  <span
                    className="panel-answer-tag"
                    style={{
                      color: team.accent,
                      background: `${team.accent}18`,
                      border: `1px solid ${team.accent}35`,
                    }}
                  >
                    {team.tag}
                  </span>

                  <div className="panel-arrow-row">
                    <div
                      className="panel-arrow-icon"
                      style={{ background: team.accent }}
                    >
                      ↓
                    </div>
                    <h3 className="panel-answer-title">{team.answer}</h3>
                  </div>
                  <p className="panel-answer-desc">{team.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress pill */}
        <div className="scrolly-progress-bar">
          {teams.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${activePanel === i ? 'active' : ''}`}
              style={activePanel === i ? { background: teams[i].accent } : {}}
            />
          ))}
        </div>
      </div>

      {/* ── CLOSING ── */}
      <section className="about-closing" ref={closingRef}>
        <div className="about-closing-orb" />
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
            <a href="/contact" className="btn-primary">Start a Project</a>
            <a href="/work" className="btn-secondary">See Our Work</a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
