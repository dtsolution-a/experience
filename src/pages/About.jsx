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
    desc: 'React, Next.js, Node — blazing-fast apps that turn browsers into buyers.',
    skills: ['React / Next.js', 'Node.js', 'TypeScript', 'REST / GraphQL', 'AWS / GCP'],
    stats: [{ v: '60+', l: 'Projects' }, { v: '4.9★', l: 'Rating' }, { v: '<1s', l: 'Load Time' }],
    image: '/panel-devs.jpg',
    accent: '#7B2FF7',
  },
  {
    id: 2,
    prefix: 'Need',
    question: 'Branding?',
    answer: 'Meet our Designers',
    tag: 'UI/UX & Visual Identity',
    desc: 'From logo marks to full design systems — interfaces that feel premium.',
    skills: ['Brand Identity', 'Figma', 'Motion Design', 'Design Systems', 'User Research'],
    stats: [{ v: '120+', l: 'Brands Built' }, { v: '3x', l: 'Engagement' }, { v: '100%', l: 'Figma Native' }],
    image: '/panel-design.jpg',
    accent: '#FF2D55',
  },
  {
    id: 3,
    prefix: 'Need',
    question: 'Growth?',
    answer: 'Meet our SEO Experts',
    tag: 'Organic Search & Analytics',
    desc: 'Technical SEO and content loops that compound your rankings month over month.',
    skills: ['Technical SEO', 'Content Strategy', 'Core Web Vitals', 'GA4 & GSC', 'Link Building'],
    stats: [{ v: '5x', l: 'Avg. Traffic' }, { v: '8mo', l: 'Avg. to #1' }, { v: '200+', l: 'Keywords' }],
    image: '/panel-seo.jpg',
    accent: '#FF9C00',
  },
  {
    id: 4,
    prefix: 'Need',
    question: 'Automation?',
    answer: 'Meet our AI Specialists',
    tag: 'Machine Learning & RPA',
    desc: 'LLMs, custom AI pipelines, and bots that eliminate repetitive work at scale.',
    skills: ['LLM Fine-tuning', 'LangChain / RAG', 'PyTorch', 'RPA & OCR', 'OpenAI / Gemini'],
    stats: [{ v: '94%', l: 'Accuracy' }, { v: '10x', l: 'Faster Ops' }, { v: '100%', l: 'Automated' }],
    image: '/panel-ai.jpg',
    accent: '#7B2FF7',
  },
  {
    id: 5,
    prefix: 'Need',
    question: 'Business Tech?',
    answer: 'Meet our Virtual CTO',
    tag: 'Technology Strategy',
    desc: 'Senior CTO-level architecture and roadmapping — on demand, not full-time salary.',
    skills: ['Tech Roadmapping', 'Stack Selection', 'Security Audits', 'Team Structuring', 'Due Diligence'],
    stats: [{ v: '50+', l: 'Startups' }, { v: '$2M+', l: 'Cost Saved' }, { v: '15yr', l: 'Experience' }],
    image: '/panel-cto.jpg',
    accent: '#FF9C00',
  },
]

export default function About() {
  const scrollyRef = useRef(null)
  const scrollyPin = useRef(null)
  const [activePanel, setActivePanel] = useState(0)

  useGSAP(() => {
    const panels = gsap.utils.toArray('.ab-panel')
    const total = panels.length

    // Hide all panels except first
    gsap.set(panels, { autoAlpha: 0, yPercent: 5, scale: 0.98, filter: 'blur(16px)' })
    gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, scale: 1, filter: 'blur(0px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollyRef.current,
        start: 'top top',
        end: `+=${total * 120}%`,
        pin: scrollyPin.current,
        scrub: 1.2,
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

      tl.to(prev, { autoAlpha: 0, yPercent: -5, scale: 1.02, filter: 'blur(20px)', duration: 0.7, ease: 'power2.in' })
      tl.to(panel, { autoAlpha: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '<0.2')
      tl.to({}, { duration: 1.4 })
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
            <span className="about-eyebrow-dot" />
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
            MediaLoop is a full-spectrum digital agency — elite engineers, designers, growth strategists, and AI specialists under one roof.
          </motion.p>

          <motion.div
            className="about-scroll-hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
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
        style={{ height: `${(teams.length + 1) * 120}vh` }}
      >
        <div ref={scrollyPin} className="scrolly-pin">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="scrolly-panel ab-panel"
              style={{ pointerEvents: activePanel === i ? 'all' : 'none' }}
            >
              {/* ══ LEFT: Question ══ */}
              <div className="panel-left">
                <span className="panel-ghost-num">0{team.id}</span>

                <div className="panel-left-inner">
                  <div className="panel-need-prefix">{team.prefix}</div>

                  <h2 className="panel-question">
                    <span className="panel-question-accent">{team.question}</span>
                  </h2>

                  <div className="panel-skills">
                    {team.skills.map(s => (
                      <span key={s} className="panel-skill-tag">{s}</span>
                    ))}
                  </div>

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

              {/* ══ RIGHT: Illustration + Answer ══ */}
              <div className="panel-right" style={{ background: `${team.accent}08` }}>
                {/* Illustration fills most of right panel */}
                <div className="panel-img-fill">
                  <img src={team.image} alt={team.answer} />
                </div>

                {/* Gradient so answer block is readable */}
                <div
                  className="panel-img-grad"
                  style={{ background: `linear-gradient(to top, ${team.accent}22 0%, transparent 60%)` }}
                />

                {/* Answer block pinned at bottom */}
                <div className="panel-answer-block">
                  <div
                    className="panel-arrow-icon"
                    style={{ background: team.accent, boxShadow: `0 8px 24px ${team.accent}50` }}
                  >
                    ↓
                  </div>
                  <div className="panel-answer-text">
                    <span
                      className="panel-answer-tag"
                      style={{ color: team.accent }}
                    >
                      {team.tag}
                    </span>
                    <div className="panel-answer-title">{team.answer}</div>
                    <p className="panel-answer-desc">{team.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress pill */}
        <div className="scrolly-progress-bar">
          {teams.map((t, i) => (
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
            Whether you need one specialist or an entire cross-functional squad, MediaLoop assembles the right experts for every challenge.
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
