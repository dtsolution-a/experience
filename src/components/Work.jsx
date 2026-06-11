import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    id: 1, num: '01',
    category: 'Web Development',
    title: 'Apex Commerce Platform',
    description: 'A high-performance e-commerce ecosystem handling 50k+ daily transactions with AI-powered product recommendations and real-time inventory sync.',
    tags: ['React', 'Node.js', 'AI', 'Stripe'],
    color: '#c084fc',
    accent: 'linear-gradient(135deg, rgba(192,132,252,0.15) 0%, rgba(244,114,182,0.08) 100%)',
    metric: '340%', metricLabel: 'Revenue Lift',
    year: '2024',
  },
  {
    id: 2, num: '02',
    category: 'Digital Marketing',
    title: 'Nova Brand Growth Sprint',
    description: 'Multi-channel campaign architecture that scaled a D2C brand from $0 to $2M ARR in 14 months through precision targeting and full-funnel automation.',
    tags: ['SEO', 'PPC', 'Social', 'Analytics'],
    color: '#f472b6',
    accent: 'linear-gradient(135deg, rgba(244,114,182,0.15) 0%, rgba(251,146,60,0.08) 100%)',
    metric: '12×', metricLabel: 'ROAS Achieved',
    year: '2024',
  },
  {
    id: 3, num: '03',
    category: 'Brand Identity',
    title: 'Helix FinTech Rebrand',
    description: 'Complete brand transformation for a Series-B fintech — identity system, design language, motion guidelines, and full digital presence overhaul.',
    tags: ['Branding', 'UI/UX', 'Motion'],
    color: '#fb923c',
    accent: 'linear-gradient(135deg, rgba(251,146,60,0.15) 0%, rgba(251,191,36,0.08) 100%)',
    metric: '280%', metricLabel: 'Engagement Up',
    year: '2023',
  },
  {
    id: 4, num: '04',
    category: 'AI & Automation',
    title: 'Pulse AI Content Engine',
    description: 'An intelligent content pipeline producing 500+ SEO-optimized articles per month, driving 4× organic traffic growth through AI-first editorial workflows.',
    tags: ['AI', 'SEO', 'Automation', 'CMS'],
    color: '#38bdf8',
    accent: 'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(99,102,241,0.08) 100%)',
    metric: '4×', metricLabel: 'Organic Traffic',
    year: '2024',
  },
  {
    id: 5, num: '05',
    category: 'Cloud Solutions',
    title: 'CoreStack Infrastructure',
    description: 'Migrated a legacy monolith to cloud-native microservices architecture — achieving 60% cost reduction and 99.99% uptime with zero-downtime deployment.',
    tags: ['AWS', 'DevOps', 'Security'],
    color: '#34d399',
    accent: 'linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(56,189,248,0.08) 100%)',
    metric: '60%', metricLabel: 'Cost Savings',
    year: '2023',
  },
  {
    id: 6, num: '06',
    category: 'Mobile App',
    title: 'Lyra Wellness App',
    description: 'A React Native wellness platform featuring AI coaching, personalized routines, and social accountability — hitting 100k downloads in its first quarter.',
    tags: ['React Native', 'AI', 'UX'],
    color: '#a78bfa',
    accent: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(244,114,182,0.08) 100%)',
    metric: '100k', metricLabel: 'Downloads Q1',
    year: '2024',
  },
]

export default function Work() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="work" className="section" style={{ position: 'relative' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: 72 }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Featured Work</span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Results that speak<br />
            <span className="gradient-text">for themselves</span>
          </h2>
        </motion.div>

        {/* Main layout: list + preview */}
        <motion.div
          className="work-showcase"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* LEFT — Project list */}
          <div className="work-list">
            {projects.map((p, i) => (
              <WorkListItem
                key={p.id}
                project={p}
                isActive={active === i}
                onHover={() => setActive(i)}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* RIGHT — Live preview panel */}
          <div className="work-preview-wrap">
            <div className="work-preview-sticky">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="work-preview-panel"
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Visual gradient area */}
                  <div className="preview-visual" style={{ background: projects[active].accent }}>
                    {/* Floating orb */}
                    <motion.div
                      className="preview-orb"
                      style={{ background: projects[active].color }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Large number */}
                    <span className="preview-num" style={{ color: `${projects[active].color}25` }}>
                      {projects[active].num}
                    </span>
                    {/* Metric badge */}
                    <div className="preview-metric-badge" style={{ borderColor: `${projects[active].color}40`, color: projects[active].color, background: `${projects[active].color}12` }}>
                      <span className="preview-metric-num">{projects[active].metric}</span>
                      <span className="preview-metric-label">{projects[active].metricLabel}</span>
                    </div>
                    {/* Year */}
                    <span className="preview-year">{projects[active].year}</span>
                  </div>

                  {/* Content */}
                  <div className="preview-content">
                    <span className="preview-category" style={{ color: projects[active].color }}>
                      {projects[active].category}
                    </span>
                    <h3 className="preview-title">{projects[active].title}</h3>
                    <p className="preview-desc">{projects[active].description}</p>
                    <div className="preview-tags">
                      {projects[active].tags.map((t, i) => (
                        <span key={i} className="preview-tag" style={{ borderColor: `${projects[active].color}30`, color: projects[active].color, background: `${projects[active].color}08` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .work-showcase {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 48px;
          align-items: start;
        }

        /* ---- List ---- */
        .work-list {
          display: flex; flex-direction: column;
        }

        /* ---- Preview sticky ---- */
        .work-preview-wrap { position: relative; }
        .work-preview-sticky {
          position: sticky; top: 100px;
        }
        .work-preview-panel {
          border-radius: 24px;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .preview-visual {
          position: relative; height: 260px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .preview-orb {
          width: 240px; height: 240px; border-radius: 50%;
          filter: blur(70px); position: absolute;
        }
        .preview-num {
          position: absolute; bottom: -10px; right: 16px;
          font-size: 120px; font-weight: 900;
          letter-spacing: -0.06em; line-height: 1;
          pointer-events: none; user-select: none;
        }
        .preview-metric-badge {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          padding: 16px 28px; border-radius: 20px; border: 1px solid;
          backdrop-filter: blur(12px);
        }
        .preview-metric-num {
          font-size: 42px; font-weight: 900; letter-spacing: -0.04em; line-height: 1;
        }
        .preview-metric-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; opacity: 0.7; margin-top: 4px;
        }
        .preview-year {
          position: absolute; top: 16px; left: 20px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }
        .preview-content { padding: 24px 28px 28px; }
        .preview-category {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; display: block; margin-bottom: 8px;
        }
        .preview-title {
          font-size: 22px; font-weight: 800; letter-spacing: -0.03em;
          line-height: 1.2; margin-bottom: 12px; color: var(--text);
        }
        .preview-desc {
          font-size: 13px; color: var(--text-2); line-height: 1.65; margin-bottom: 20px;
        }
        .preview-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .preview-tag {
          font-size: 11px; font-weight: 600; padding: 4px 12px;
          border-radius: 100px; border: 1px solid;
        }

        @media (max-width: 900px) {
          .work-showcase { grid-template-columns: 1fr; }
          .work-preview-wrap { display: none; }
        }
      `}</style>
    </section>
  )
}

function WorkListItem({ project, isActive, onHover, index, inView }) {
  return (
    <motion.div
      className="work-list-item"
      onMouseEnter={onHover}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      style={{ borderColor: isActive ? `${project.color}40` : 'var(--border)', background: isActive ? `${project.color}06` : 'transparent' }}
    >
      {/* Number */}
      <span className="wli-num" style={{ color: isActive ? project.color : 'var(--text-3)' }}>
        {project.num}
      </span>

      {/* Main content */}
      <div className="wli-body">
        <div className="wli-top">
          <span className="wli-category" style={{ color: isActive ? project.color : 'var(--text-3)' }}>
            {project.category}
          </span>
          <span className="wli-year">{project.year}</span>
        </div>
        <h3 className="wli-title" style={{ color: isActive ? 'var(--text)' : 'var(--text-2)' }}>
          {project.title}
        </h3>
        {/* Expandable tags on active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="wli-tags"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {project.tags.map((t, i) => (
                <span key={i} className="wli-tag" style={{ color: project.color, background: `${project.color}10`, borderColor: `${project.color}25` }}>{t}</span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Metric */}
      <div className="wli-metric" style={{ opacity: isActive ? 1 : 0 }}>
        <span className="wli-metric-num" style={{ color: project.color }}>{project.metric}</span>
        <span className="wli-metric-label">{project.metricLabel}</span>
      </div>

      {/* Active indicator line */}
      <motion.div
        className="wli-line"
        style={{ background: project.color }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <style>{`
        .work-list-item {
          position: relative;
          display: flex; align-items: center; gap: 24px;
          padding: 24px 28px;
          border: 1px solid var(--border);
          border-radius: 16px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          overflow: hidden;
        }
        .work-list-item:hover { transform: translateX(4px); }

        .wli-num {
          font-size: 13px; font-weight: 800; letter-spacing: 0.05em;
          min-width: 28px; transition: color 0.3s ease;
          font-variant-numeric: tabular-nums;
        }
        .wli-body { flex: 1; min-width: 0; }
        .wli-top {
          display: flex; align-items: center; gap: 12px; margin-bottom: 4px;
        }
        .wli-category {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; transition: color 0.3s ease;
        }
        .wli-year { font-size: 11px; color: var(--text-3); font-weight: 500; }
        .wli-title {
          font-size: 18px; font-weight: 700; letter-spacing: -0.02em;
          line-height: 1.25; transition: color 0.3s ease;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .wli-tags {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;
          overflow: hidden;
        }
        .wli-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.05em;
          padding: 3px 10px; border-radius: 100px; border: 1px solid;
        }
        .wli-metric {
          display: flex; flex-direction: column; align-items: flex-end;
          flex-shrink: 0; transition: opacity 0.3s ease;
        }
        .wli-metric-num {
          font-size: 22px; font-weight: 900; letter-spacing: -0.04em; line-height: 1;
        }
        .wli-metric-label {
          font-size: 10px; color: var(--text-3); font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase; margin-top: 2px;
        }
        .wli-line {
          position: absolute; left: 0; top: 10%; bottom: 10%;
          width: 3px; border-radius: 0 2px 2px 0;
          transform-origin: top;
        }
      `}</style>
    </motion.div>
  )
}
