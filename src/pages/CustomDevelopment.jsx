import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '../components/Navbar'
import '../styles/cd-page.css'

/* ── CountUp ───────────────────────────────────────────────────── */
function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    setCount(0)
    const duration = 1600
    const start = Date.now()
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return <>{count}{suffix}</>
}

/* ── Data ──────────────────────────────────────────────────────── */
const tabs = [
  {
    id: 'web', icon: '🌐', label: 'Web Applications',
    headline: 'Powerful web apps that scale',
    desc: 'From MVPs to enterprise platforms — we build fast, beautiful, and resilient web applications that handle millions of users without breaking a sweat.',
    items: ['Interactive dashboards & admin portals', 'Multi-tenant SaaS platforms', 'Real-time collaborative tools', 'Progressive Web Apps (PWA)', 'High-traffic marketing sites', 'Complex data visualisation UIs'],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    color: '#00D9FF',
  },
  {
    id: 'mobile', icon: '📱', label: 'Mobile Apps',
    headline: 'Native & cross-platform mobile',
    desc: 'iOS and Android applications built with Flutter or React Native — native performance, single codebase, shipped fast to both app stores.',
    items: ['Consumer-facing mobile apps', 'B2B mobile enterprise tools', 'Offline-first architecture', 'Push notifications & deep links', 'In-app payments (Razorpay, Stripe)', 'App Store optimisation & submission'],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Supabase'],
    color: '#F59E0B',
  },
  {
    id: 'saas', icon: '☁️', label: 'SaaS Products',
    headline: 'Complete SaaS from zero to launch',
    desc: 'Full-stack SaaS infrastructure — multi-tenancy, subscription billing, usage analytics, admin panel, and onboarding flows — production-ready from day one.',
    items: ['Multi-tenant architecture', 'Stripe / Razorpay billing integration', 'Role-based access control (RBAC)', 'Usage analytics & dashboards', 'Team & workspace management', 'API-first design for integrations'],
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Resend', 'Docker'],
    color: '#7B2FF7',
  },
  {
    id: 'api', icon: '🔗', label: 'APIs & Backend',
    headline: 'High-performance APIs that power everything',
    desc: 'RESTful and GraphQL APIs, microservices, real-time WebSocket systems — the invisible backbone that makes your product work reliably at any scale.',
    items: ['REST & GraphQL API design', 'Real-time systems (WebSockets)', 'Microservices architecture', 'Authentication (OAuth, JWT, SSO)', 'Rate limiting & caching layers', 'Full API documentation & SDKs'],
    stack: ['Node.js', 'FastAPI', 'Go', 'GraphQL', 'Redis', 'PostgreSQL'],
    color: '#FF6B35',
  },
  {
    id: 'ecom', icon: '🛒', label: 'E-commerce',
    headline: 'Custom stores built to convert',
    desc: 'Bespoke e-commerce experiences — not template-based. Custom storefronts, inventory systems, multi-vendor marketplaces, and seamless checkout flows.',
    items: ['Custom Shopify / headless storefronts', 'Multi-vendor marketplace platforms', 'Inventory & order management', 'Subscription & recurring billing', 'Loyalty & referral programmes', 'Analytics & conversion optimisation'],
    stack: ['Next.js', 'Shopify', 'Stripe', 'Algolia', 'PostgreSQL', 'AWS'],
    color: '#34D399',
  },
  {
    id: 'enterprise', icon: '🏢', label: 'Enterprise Software',
    headline: 'Mission-critical enterprise systems',
    desc: 'Complex, secure, integration-heavy software for large organisations — ERP modules, workflow engines, internal tools, and legacy system modernisation.',
    items: ['CRM & ERP custom modules', 'Workflow automation engines', 'LDAP / SSO / Active Directory', 'Legacy system modernisation', 'Data migration & ETL pipelines', 'SOC2 / ISO 27001 compliance-ready'],
    stack: ['Java', 'Node.js', 'PostgreSQL', 'Docker', 'K8s', 'AWS'],
    color: '#EC4899',
  },
]

const allTech = [
  // Frontend
  { name: 'React',       cat: 'Frontend', color: '#61DAFB' }, { name: 'Next.js',  cat: 'Frontend', color: '#fff' },
  { name: 'TypeScript',  cat: 'Frontend', color: '#3178C6' }, { name: 'Vue',      cat: 'Frontend', color: '#42B883' },
  { name: 'TailwindCSS', cat: 'Frontend', color: '#38BDF8' }, { name: 'Svelte',   cat: 'Frontend', color: '#FF3E00' },
  // Backend
  { name: 'Node.js',  cat: 'Backend', color: '#339933' }, { name: 'Python',  cat: 'Backend', color: '#3776AB' },
  { name: 'Go',       cat: 'Backend', color: '#00ADD8' }, { name: 'FastAPI', cat: 'Backend', color: '#009688' },
  { name: 'Django',   cat: 'Backend', color: '#092E20' }, { name: 'Express', cat: 'Backend', color: '#fff' },
  // Mobile
  { name: 'Flutter',       cat: 'Mobile', color: '#54C5F8' }, { name: 'React Native', cat: 'Mobile', color: '#61DAFB' },
  { name: 'Swift',         cat: 'Mobile', color: '#F05138' }, { name: 'Kotlin',       cat: 'Mobile', color: '#7F52FF' },
  // Database
  { name: 'PostgreSQL', cat: 'Database', color: '#336791' }, { name: 'MongoDB',   cat: 'Database', color: '#4DB33D' },
  { name: 'Redis',      cat: 'Database', color: '#DC382D' }, { name: 'Supabase',  cat: 'Database', color: '#3ECF8E' },
  // Cloud
  { name: 'AWS',    cat: 'Cloud', color: '#FF9900' }, { name: 'GCP',    cat: 'Cloud', color: '#4285F4' },
  { name: 'Docker', cat: 'Cloud', color: '#2496ED' }, { name: 'Vercel', cat: 'Cloud', color: '#fff' },
]

const techCats = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'Cloud']

const phases = [
  { n: '01', title: 'Discovery',    time: 'Week 1–2',  icon: '🔍', desc: 'Deep-dive into your goals, users, and constraints. We map the full scope, define success metrics, and lock in the tech stack before a single line of code is written.', bullets: ['Requirements workshops', 'Competitive analysis', 'User journey mapping', 'Tech stack selection', 'Project roadmap & milestones'] },
  { n: '02', title: 'Architecture', time: 'Week 2–3',  icon: '🏗',  desc: 'System design, database schema, API contracts, and infrastructure blueprints. We over-engineer the foundation so the product never has to be rebuilt.', bullets: ['System architecture diagram', 'Database schema design', 'API contract documentation', 'Security model definition', 'Infrastructure provisioning'] },
  { n: '03', title: 'Development',  time: 'Week 4–10', icon: '⚡', desc: 'Two-week sprint cycles with demos after every sprint. Code reviews, automated testing, and continuous integration from day one.', bullets: ['Agile sprint cycles', 'Code review on every PR', 'CI/CD pipeline from sprint 1', 'Weekly progress demos', 'Slack-based async comms'] },
  { n: '04', title: 'QA & Testing', time: 'Week 10–12', icon: '🧪', desc: 'Automated test suites, manual QA, performance benchmarks, security audits, and cross-device testing before a single user touches it.', bullets: ['Automated test coverage >80%', 'Manual QA checklists', 'Performance load testing', 'Security penetration testing', 'Cross-browser & device testing'] },
  { n: '05', title: 'Launch & Scale', time: 'Week 12+', icon: '🚀', desc: 'Zero-downtime deployment, monitoring setup, documentation handoff, and ongoing support. Your product grows — we grow with it.', bullets: ['Zero-downtime deployment', 'Monitoring & alerting setup', 'Full documentation handoff', '30-day post-launch support', 'Performance optimisation SLA'] },
]

const metrics = [
  { val: '99.9%', target: 99.9, suffix: '%', lbl: 'Uptime SLA guarantee' },
  { val: '<2s',   target: 2,    suffix: 's',  lbl: 'Target page load time' },
  { val: '80%+',  target: 80,   suffix: '%+', lbl: 'Automated test coverage' },
  { val: '2wks',  target: 2,    suffix: 'wks', lbl: 'Average sprint cycle' },
]

/* ── Floating Code BG ─────────────────────────────────────────── */
const codeSnippets = [
  `const ai = new OpenAI()\nawait ai.chat()`,
  `SELECT users\nFROM db\nWHERE active = true`,
  `docker build -t app .\ndocker push registry`,
  `@app.route('/api')\ndef predict(): ...`,
  `useEffect(() => {\n  fetchData()\n}, [])`,
  `type User = {\n  id: string\n  role: Role\n}`,
]

/* ── Page ──────────────────────────────────────────────────────── */
export default function CustomDevelopment() {
  const [activeTab,   setActiveTab]   = useState('web')
  const [techFilter,  setTechFilter]  = useState('All')
  const [activePhase, setActivePhase] = useState(null)
  const [metricsRef,  metricsInView]  = useInView({ triggerOnce: true, threshold: 0.3 })

  const tab      = tabs.find(t => t.id === activeTab)
  const filtered = techFilter === 'All' ? allTech : allTech.filter(t => t.cat === techFilter)

  return (
    <div className="cd-page">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="cd-hero">
        {/* Floating code snippets */}
        <div className="cd-code-bg" aria-hidden>
          {codeSnippets.map((s, i) => (
            <pre key={i} className={`cd-code-float cd-cf-${i}`}>{s}</pre>
          ))}
        </div>
        <div className="cd-hero-content">
          <motion.div className="cd-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="cd-eyebrow-dot" /> CUSTOM DEVELOPMENT
          </motion.div>
          <motion.h1 className="cd-hero-h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}>
            Built Different.<br /><span className="cd-grad">Built to Last.</span>
          </motion.h1>
          <motion.p className="cd-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            Bespoke software engineered exactly to your spec — web apps, mobile platforms, SaaS products, and enterprise systems that outlast trends and scale without limits.
          </motion.p>
          <motion.div className="cd-hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}>
            <a href="/#contact" className="cd-btn-primary">Start a Project →</a>
            <a href="/" className="cd-btn-ghost">← Back to Home</a>
          </motion.div>
        </div>
        <div className="cd-scroll-hint"><div className="cd-scroll-line" /><span>scroll</span></div>
      </section>

      {/* ── WHAT WE BUILD — TABS ─────────────────────────────── */}
      <section className="cd-sec">
        <div className="cd-con">
          <div className="cd-sec-hd">
            <span className="cd-lbl">WHAT WE BUILD</span>
            <h2 className="cd-sec-title">Six categories,<br /><span className="cd-grad">infinite possibilities</span></h2>
            <p className="cd-sec-sub">Select a category to explore what we build in that space.</p>
          </div>
          {/* Tab selector */}
          <div className="cd-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`cd-tab${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)} style={{ '--tc': t.color }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="cd-tab-panel"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }} style={{ '--tc': tab.color }}
            >
              <div className="cd-tp-left">
                <div className="cd-tp-icon">{tab.icon}</div>
                <h3 className="cd-tp-headline">{tab.headline}</h3>
                <p className="cd-tp-desc">{tab.desc}</p>
                <div className="cd-tp-stack">
                  {tab.stack.map((s, i) => <span key={i} className="cd-stack-tag">{s}</span>)}
                </div>
              </div>
              <div className="cd-tp-right">
                {tab.items.map((item, i) => (
                  <motion.div key={i} className="cd-tp-item"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <span className="cd-tp-dot" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────── */}
      <section className="cd-sec cd-tech-sec">
        <div className="cd-con">
          <div className="cd-sec-hd">
            <span className="cd-lbl">TECH STACK</span>
            <h2 className="cd-sec-title">Technologies we <span className="cd-grad">master</span></h2>
            <p className="cd-sec-sub">Filter by category. Every tech chosen for a reason.</p>
          </div>
          <div className="cd-tech-filters">
            {techCats.map(c => (
              <button key={c} className={`cd-filter-btn${techFilter === c ? ' active' : ''}`} onClick={() => setTechFilter(c)}>{c}</button>
            ))}
          </div>
          <motion.div className="cd-tech-grid" layout>
            <AnimatePresence>
              {filtered.map((t, i) => (
                <motion.div key={t.name} className="cd-tech-card" style={{ '--tc': t.color }}
                  layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{ y: -6, scale: 1.08, rotateY: 6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                >
                  <span className="cd-tech-dot" />
                  <span className="cd-tech-name">{t.name}</span>
                  <span className="cd-tech-cat">{t.cat}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── BUILD PROCESS ────────────────────────────────────── */}
      <section className="cd-sec">
        <div className="cd-con">
          <div className="cd-sec-hd">
            <span className="cd-lbl">HOW WE BUILD</span>
            <h2 className="cd-sec-title">The <span className="cd-grad">build process</span></h2>
            <p className="cd-sec-sub">Five phases. No surprises. Click each to explore what happens.</p>
          </div>
          <div className="cd-timeline">
            {phases.map((p, i) => (
              <motion.div key={i} className={`cd-phase${activePhase === i ? ' open' : ''}`}
                data-n={p.n}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setActivePhase(activePhase === i ? null : i)}
              >
                <div className="cd-phase-header">
                  <div className="cd-phase-left">
                    <span className="cd-phase-n">{p.n}</span>
                    <span className="cd-phase-ico">{p.icon}</span>
                    <div>
                      <div className="cd-phase-title">{p.title}</div>
                      <div className="cd-phase-time">{p.time}</div>
                    </div>
                  </div>
                  <span className="cd-phase-toggle">{activePhase === i ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {activePhase === i && (
                    <motion.div className="cd-phase-body"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}
                    >
                      <p className="cd-phase-desc">{p.desc}</p>
                      <ul className="cd-phase-bullets">
                        {p.bullets.map((b, j) => <li key={j}><span className="cd-phase-dot" />{b}</li>)}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────── */}
      <section className="cd-sec cd-metrics-sec" ref={metricsRef}>
        <div className="cd-con">
          <div className="cd-metrics-grid">
            {metrics.map((m, i) => (
              <motion.div key={i} className="cd-metric"
                initial={{ opacity: 0, y: 30 }} animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.8 }}
              >
                <div className="cd-metric-val">
                  <CountUp target={m.target} suffix={m.suffix} inView={metricsInView} />
                </div>
                <div className="cd-metric-lbl">{m.lbl}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cd-cta-sec">
        <div className="cd-con">
          <motion.div className="cd-cta-inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="cd-lbl">LET'S BUILD</span>
            <h2 className="cd-cta-title">Have an idea? We'll <span className="cd-grad">engineer it.</span></h2>
            <p className="cd-cta-sub">From concept to production-ready software. On time, on spec, every time.</p>
            <div className="cd-cta-btns">
              <a href="/#contact" className="cd-btn-primary">Start a Project</a>
              <a href="/" className="cd-btn-ghost">← Back to Home</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
