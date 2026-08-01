import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/about.css'

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
    desc: 'We craft lightning-fast, scalable web applications that convert visitors into revenue.',
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
    desc: 'From brand marks to full design systems — interfaces that feel impossibly premium.',
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
    desc: 'Data-driven SEO and content loops that compound your rankings month over month.',
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
    desc: 'Custom AI pipelines and bots that eliminate repetitive work and unlock intelligent ops.',
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
    desc: 'Senior CTO-level advisory, on demand — without the full-time salary.',
  },
]

// Custom cursor component
function CustomCursor() {
  const cursorRef = useRef(null)
  const [state, setState] = useState({ visible: false, large: false, label: '↗' })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // Expose setState to the page
  useEffect(() => {
    window.__setCursor = setState
    return () => { delete window.__setCursor }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${state.visible ? 'visible' : ''} ${state.large ? 'large' : ''}`}
    >
      <span className="cursor-label">{state.label}</span>
    </div>
  )
}

// staggered text animation
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const wordVariant = {
  hidden: { opacity: 0, y: 40, skewY: 3 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const [activeTeam, setActiveTeam] = useState(0)
  const closingRef = useRef(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-80px' })

  const handleTeamEnter = (idx) => {
    setActiveTeam(idx)
    if (window.__setCursor) {
      window.__setCursor({ visible: true, large: true, label: teams[idx].answer.replace('Meet our ', '') })
    }
  }
  const handleTeamLeave = () => {
    if (window.__setCursor) {
      window.__setCursor({ visible: false, large: false, label: '↗' })
    }
  }

  return (
    <div className="about-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      {/* ── HERO ── */}
      <section className="about-hero-v5">
        <div className="hero-v5-inner">
          <motion.div
            className="hero-v5-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-v5-tag-dot" />
            MediaLoop Technologies
          </motion.div>

          <motion.h1
            className="hero-v5-title"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {['We', 'build', 'the'].map((w, i) => (
              <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {w}
              </motion.span>
            ))}
            <motion.em variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.25em' }}>
              internet's
            </motion.em>
            {['best', 'products.'].map((w, i) => (
              <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="hero-v5-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="hero-v5-sub">
              MediaLoop is a full-spectrum digital agency — elite engineers, designers, growth strategists, and AI specialists. One team. Zero compromise.
            </p>
            <div className="hero-v5-stats">
              {[{ v: '120+', l: 'Projects' }, { v: '50+', l: 'Clients' }, { v: '5★', l: 'Rating' }].map(s => (
                <div key={s.l} className="hero-v5-stat">
                  <span className="hero-v5-stat-val gradient-text">{s.v}</span>
                  <span className="hero-v5-stat-label">{s.l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOVER TEAM SECTION ── */}
      <section className="about-hover-section">

        {/* LEFT: List */}
        <div className="hover-list-col">
          <div className="hover-section-label">Who does what</div>

          {teams.map((team, i) => (
            <div
              key={team.id}
              className="hover-team-item"
              onMouseEnter={() => handleTeamEnter(i)}
              onMouseLeave={handleTeamLeave}
            >
              <div className="hover-item-left">
                <div className="hover-item-num" style={{ color: team.accent }}>0{team.id} — {team.need}</div>
                <div className="hover-item-question">{team.question}</div>
                <div className="hover-item-answer" style={{ color: team.accent }}>↓ {team.answer}</div>
              </div>

              <div className="hover-item-right">
                <span
                  className="hover-item-tag"
                  style={{ color: team.accent, background: `${team.accent}12`, borderColor: `${team.accent}30` }}
                >
                  {team.tag}
                </span>
                <div className="hover-item-arrow">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Sticky image panel */}
        <div className="hover-image-col">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className={`hover-img-wrap ${activeTeam === i ? 'active' : ''}`}
            >
              <img src={team.image} alt={team.answer} />
              <div className="hover-img-overlay" />
              <div className="hover-img-info">
                <h3 className="hover-img-team-name">{team.answer}</h3>
                <div className="hover-img-skills">
                  {team.skills.map(s => (
                    <span key={s} className="hover-img-skill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING ── */}
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
              <a href="/work" className="btn-secondary">
                See Our Work
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
