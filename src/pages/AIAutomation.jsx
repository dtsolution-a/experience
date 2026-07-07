import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '../components/Navbar'
import '../styles/ai-page.css'

/* ── Data ──────────────────────────────────────────────────────── */
const capabilities = [
  { icon: '🤖', color: '#00D9FF', title: 'Conversational AI',     desc: 'Intelligent chatbots, voice agents & automated support that resolve 80% of queries without a human.',    tags: ['Customer Support Bots', 'Voice Assistants', 'Sales Automation', 'WhatsApp AI'] },
  { icon: '📊', color: '#7B2FF7', title: 'Predictive Analytics',  desc: 'ML models that forecast churn, revenue & trends before they happen — then trigger automated actions.',    tags: ['Churn Prediction', 'Revenue Forecasting', 'Lead Scoring', 'Demand Planning'] },
  { icon: '✍️', color: '#00FF88', title: 'AI Content Systems',    desc: 'Automated pipelines that generate SEO content, ad copy, emails & social posts at infinite scale.',        tags: ['SEO Content AI', 'Ad Copy Generation', 'Email Automation', 'Social Media AI'] },
  { icon: '⚡', color: '#FF6B35', title: 'Process Automation',    desc: 'End-to-end workflow automation — from lead capture to invoice — with zero human touches required.',      tags: ['RPA Automation', 'Custom Workflow Bots', 'API Orchestration', 'No-Code Flows'] },
  { icon: '👁',  color: '#F59E0B', title: 'Computer Vision',       desc: 'Image & video AI — real-time object detection, OCR, quality control, and visual search.',                tags: ['Document OCR', 'Product Recognition', 'Quality Control AI', 'Video Analytics'] },
  { icon: '🧠', color: '#EC4899', title: 'Custom LLM Solutions',  desc: 'Fine-tuned language models trained on your data, running privately in your infrastructure.',               tags: ['Model Fine-Tuning', 'RAG Systems', 'Private AI', 'Embeddings & Search'] },
  { icon: '📱', color: '#34D399', title: 'AI-Powered Apps',       desc: 'Web & mobile applications with smart features — semantic search, summarisation, recommendations — built in.', tags: ['Smart Search', 'AI Recommendations', 'Auto-Summarise', 'Intelligent UX'] },
  { icon: '🔗', color: '#818CF8', title: 'AI Integration APIs',   desc: 'Connect any AI capability to your existing tech stack via robust, documented APIs in days, not months.',   tags: ['REST API Design', 'Webhook Automation', 'Data Pipelines', 'CRM/ERP AI'] },
  { icon: '🎯', color: '#F472B6', title: 'Personalisation Engines', desc: 'Dynamic content & product recommendation systems that adapt in real-time to each individual user.',         tags: ['Product Recs', 'Dynamic Pricing', 'Content Personalisation', 'User Profiling'] },
]

const scenarios = [
  {
    id: 'copy', icon: '📢', label: 'Marketing Copy',
    response: `Analysing brand voice... ████████████ 100%\nGenerating high-conversion copy...\n\n──────────────────────────────────────\n📢  HEADLINE: "Stop Guessing. Start Growing."\n──────────────────────────────────────\n\nTired of marketing that doesn't move the needle?\n\nOur AI-powered growth system doesn't just run\ncampaigns — it learns, adapts, and compounds\nresults with every data point collected.\n\n  ▸ 3x average ROAS improvement in 90 days\n  ▸ Fully automated A/B testing at scale\n  ▸ Real-time creative optimisation, 24/7\n\nReady to engineer your growth? Let's talk.\n──────────────────────────────────────\n✓ Generated in 1.2s  |  Tokens: 847`,
  },
  {
    id: 'support', icon: '💬', label: 'Support Agent',
    response: `Training on your knowledge base...\nDeploying conversational flow... ████████ 100%\n\n──────────────────────────────────────\n🤖  AI SUPPORT AGENT — LIVE SESSION\n──────────────────────────────────────\n\nUser:  "I need to upgrade my subscription"\n\nAgent: Great! You're on the Starter plan.\n       Based on your usage patterns, Pro\n       saves you 40% annually and unlocks\n       unlimited projects + priority support.\n\n       Shall I apply your loyalty discount\n       and process the upgrade right now?\n\n  ▸ Intent: upgrade_plan  [98.7% confidence]\n  ▸ Sentiment: positive\n  ▸ Response time: 0.28 seconds\n──────────────────────────────────────\n✓ Session handled  |  CSAT Score: 9.4 / 10`,
  },
  {
    id: 'analytics', icon: '📊', label: 'Data Analysis',
    response: `Ingesting dataset... 847,293 records\nRunning predictive models... ████████ 100%\n\n──────────────────────────────────────\n📊  BUSINESS INTELLIGENCE — Q4 REPORT\n──────────────────────────────────────\n\nREVENUE FORECAST  (next 30 days)\n  Projected:  ₹48.2L   (+23% MoM)\n  Confidence: 91.4%    [HIGH]\n\nTOP OPPORTUNITY:\n  → Instagram Reels  |  ROAS: 4.7x\n  → Recommendation: Increase budget 30%\n\n⚠  CHURN RISK DETECTED\n  12 high-value accounts flagged\n  → Auto-trigger: Retention sequence\n\nGROWTH LEVER:\n  Referral programme → +₹8.4L potential\n──────────────────────────────────────\n✓ Analysis complete  |  7 ML models run`,
  },
  {
    id: 'workflow', icon: '⚡', label: 'Workflow Automation',
    response: `Mapping your existing processes...\nBuilding automation pipeline... ████████ 100%\n\n──────────────────────────────────────\n⚡  AUTOMATION PIPELINE — LIVE\n──────────────────────────────────────\n\nTRIGGER:  New lead submits website form\n  ↓\nSTEP 1 ✓  CRM — Create contact (Salesforce)\nSTEP 2 ✓  AI  — Score lead quality [87/100]\nSTEP 3 ✓  Email — Send personalised intro\nSTEP 4 ✓  Slack — Notify sales team instantly\nSTEP 5 ✓  Calendar — Book discovery call\n  ↓\nRESULT:  Lead fully handled in 28 seconds\n\n  ▸ Manual time saved: 4.2 hrs / week\n  ▸ Human touches required: 0\n  ▸ Pipeline success rate: 99.2%\n──────────────────────────────────────\n✓ Automation live  |  52 triggers / day`,
  },
]

const techItems = [
  { name: 'OpenAI GPT-4o',    cat: 'LLM',       color: '#10a37f' },
  { name: 'Anthropic Claude', cat: 'LLM',       color: '#d97706' },
  { name: 'Google Gemini',    cat: 'LLM',       color: '#4285F4' },
  { name: 'Meta LLaMA 3',     cat: 'LLM',       color: '#0866FF' },
  { name: 'HuggingFace',      cat: 'Platform',  color: '#FFD21E' },
  { name: 'LangChain',        cat: 'Framework', color: '#00D9FF' },
  { name: 'LlamaIndex',       cat: 'Framework', color: '#7B2FF7' },
  { name: 'Pinecone',         cat: 'Vector DB', color: '#00D9FF' },
  { name: 'Weaviate',         cat: 'Vector DB', color: '#00ff88' },
  { name: 'Python',           cat: 'Language',  color: '#3776AB' },
  { name: 'FastAPI',          cat: 'Backend',   color: '#009688' },
  { name: 'TensorFlow',       cat: 'ML',        color: '#FF6F00' },
  { name: 'PyTorch',          cat: 'ML',        color: '#EE4C2C' },
  { name: 'n8n',              cat: 'Automation', color: '#EA4B71' },
  { name: 'Make.com',         cat: 'Automation', color: '#6D00CC' },
  { name: 'Supabase',         cat: 'Backend',   color: '#3ECF8E' },
]

const stats = [
  { value: '10x',  label: 'Output — zero added headcount' },
  { value: '90%',  label: 'Reduction in manual processing' },
  { value: '3x',   label: 'Average ROI on AI projects' },
  { value: '48h',  label: 'Idea to first AI prototype' },
]

/* ── Neural Network Canvas ─────────────────────────────────────── */
function NeuralCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, nodes = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 70)
      nodes = Array.from({ length: n }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.35,
        vy:    (Math.random() - 0.5) * 0.35,
        r:     Math.random() * 1.8 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        blue:  Math.random() > 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.018
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 180) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,217,255,${(1 - d / 180) * 0.2})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      nodes.forEach(n => {
        const p = Math.sin(n.pulse) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + p * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = n.blue ? '#00D9FF' : '#7B2FF7'
        ctx.globalAlpha = 0.4 + p * 0.6
        ctx.fill()
        ctx.globalAlpha = 1
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="ai-canvas" />
}

/* ── Page Component ────────────────────────────────────────────── */
export default function AIAutomation() {
  const [activeCap,      setActiveCap]      = useState(null)
  const [activeScenario, setActiveScenario] = useState(null)
  const [displayText,    setDisplayText]    = useState('')
  const [isTyping,       setIsTyping]        = useState(false)
  const [loadPct,        setLoadPct]         = useState(0)
  const typingRef = useRef(null)
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  function runScenario(s) {
    if (isTyping) return
    clearInterval(typingRef.current)
    setActiveScenario(s.id)
    setDisplayText('')
    setLoadPct(0)
    setIsTyping(true)
    let pct = 0
    const loader = setInterval(() => {
      pct += Math.random() * 18
      if (pct >= 100) {
        clearInterval(loader)
        setLoadPct(100)
        let i = 0
        typingRef.current = setInterval(() => {
          i++
          setDisplayText(s.response.slice(0, i))
          if (i >= s.response.length) { clearInterval(typingRef.current); setIsTyping(false) }
        }, 11)
      } else setLoadPct(pct)
    }, 55)
  }
  useEffect(() => () => clearInterval(typingRef.current), [])

  return (
    <div className="ai-page">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="ai-hero">
        <NeuralCanvas />
        <div className="ai-hero-content">
          <motion.div className="ai-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="ai-eyebrow-dot" /> AI & AUTOMATION
          </motion.div>
          <motion.h1 className="ai-hero-h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}>
            Intelligence,<br /><span className="ai-grad">Engineered.</span>
          </motion.h1>
          <motion.p className="ai-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            We build AI systems that don't just automate tasks — they think, learn, and grow with your business. From custom LLMs to full-stack automation pipelines.
          </motion.p>
          <motion.div className="ai-hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}>
            <a href="/#contact" className="ai-btn-primary">Start an AI Project →</a>
            <a href="/" className="ai-btn-ghost">← Back to Home</a>
          </motion.div>
        </div>
        <div className="ai-scroll-hint"><div className="ai-scroll-line" /><span>scroll</span></div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section className="ai-sec">
        <div className="ai-con">
          <div className="ai-sec-hd">
            <span className="ai-lbl">CAPABILITIES</span>
            <h2 className="ai-sec-title">What we build <span className="ai-grad">with AI</span></h2>
            <p className="ai-sec-sub">Nine core disciplines. Every solution custom-engineered for your stack. Click any card to explore.</p>
          </div>
          <div className="ai-caps-grid">
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                className={`ai-cap-card${activeCap === i ? ' active' : ''}`}
                style={{ '--cc': c.color }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.055, duration: 0.6 }}
                onClick={() => setActiveCap(activeCap === i ? null : i)}
              >
                <div className="ai-cap-glow" />
                <div className="ai-cap-top">
                  <span className="ai-cap-ico">{c.icon}</span>
                  <span className="ai-cap-chevron">{activeCap === i ? '−' : '+'}</span>
                </div>
                <h3 className="ai-cap-title">{c.title}</h3>
                <p className="ai-cap-desc">{c.desc}</p>
                <AnimatePresence>
                  {activeCap === i && (
                    <motion.div className="ai-cap-tags" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      {c.tags.map((t, j) => <span key={j} className="ai-cap-tag">{t}</span>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PLAYGROUND ────────────────────────────────────── */}
      <section className="ai-sec ai-playground-sec">
        <div className="ai-con">
          <div className="ai-sec-hd">
            <span className="ai-lbl">LIVE DEMO</span>
            <h2 className="ai-sec-title">The <span className="ai-grad">AI Playground</span></h2>
            <p className="ai-sec-sub">Pick a use case and watch AI work in real-time — live output, character by character.</p>
          </div>
          <div className="ai-playground">
            {/* Left — scenario buttons */}
            <div className="ai-scenarios">
              {scenarios.map(s => (
                <button
                  key={s.id}
                  className={`ai-sc-btn${activeScenario === s.id ? ' active' : ''}${isTyping && activeScenario !== s.id ? ' disabled' : ''}`}
                  onClick={() => runScenario(s)}
                >
                  <span className="ai-sc-ico">{s.icon}</span>
                  <span className="ai-sc-lbl">{s.label}</span>
                  {activeScenario === s.id && !isTyping && <span className="ai-sc-done">✓</span>}
                </button>
              ))}
              <p className="ai-sc-hint">← Select a use case to run</p>
            </div>
            {/* Right — terminal */}
            <div className="ai-terminal">
              <div className="ai-term-bar">
                <div className="ai-term-dots"><span /><span /><span /></div>
                <span className="ai-term-title">{activeScenario ? `ai-engine — ${scenarios.find(s => s.id === activeScenario)?.label}` : 'ai-engine — ready'}</span>
                <span className={`ai-term-status ${isTyping ? 'live' : activeScenario ? 'done' : 'idle'}`}>
                  {isTyping ? '● LIVE' : activeScenario ? '✓ DONE' : '○ IDLE'}
                </span>
              </div>
              {loadPct > 0 && loadPct < 100 && (
                <div className="ai-term-prog"><div className="ai-term-prog-fill" style={{ width: `${loadPct}%` }} /></div>
              )}
              <div className="ai-term-body">
                {!displayText ? (
                  <span className="ai-term-placeholder">
                    <span className="ai-cursor">▋</span> Select a use case on the left to run a live AI simulation…
                  </span>
                ) : (
                  <pre className="ai-term-out">{displayText}{isTyping && <span className="ai-cursor">▋</span>}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH ECOSYSTEM ───────────────────────────────────── */}
      <section className="ai-sec">
        <div className="ai-con">
          <div className="ai-sec-hd">
            <span className="ai-lbl">TECH STACK</span>
            <h2 className="ai-sec-title">Our AI <span className="ai-grad">ecosystem</span></h2>
            <p className="ai-sec-sub">The best models and frameworks, combined into one cohesive intelligence layer.</p>
          </div>
          <div className="ai-tech-grid">
            {techItems.map((t, i) => (
              <motion.div key={i} className="ai-tech-pill" style={{ '--tc': t.color }}
                initial={{ opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.06 }}
              >
                <span className="ai-tech-dot" />
                <span className="ai-tech-name">{t.name}</span>
                <span className="ai-tech-cat">{t.cat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="ai-sec ai-stats-sec" ref={statsRef}>
        <div className="ai-con">
          <div className="ai-stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} className="ai-stat"
                initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <div className="ai-stat-val">{s.value}</div>
                <div className="ai-stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="ai-cta-sec">
        <div className="ai-con">
          <motion.div className="ai-cta-inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="ai-lbl">GET STARTED</span>
            <h2 className="ai-cta-title">Ready to deploy <span className="ai-grad">intelligent systems</span>?</h2>
            <p className="ai-cta-sub">From proof-of-concept to production-ready AI in weeks, not months.</p>
            <div className="ai-cta-btns">
              <a href="/#contact" className="ai-btn-primary">Start Your AI Project</a>
              <a href="/" className="ai-btn-ghost">← Back to Home</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
