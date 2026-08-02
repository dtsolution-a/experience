import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionBackground from './SectionBackground'

const stats = [
  { num: '200+', label: 'Projects Delivered', desc: 'Across 15+ industries globally' },
  { num: '98%', label: 'Client Retention', desc: 'Brands that come back and grow with us' },
  { num: '50+', label: 'Global Clients', desc: 'From startups to enterprises' },
  { num: '5x', label: 'Average ROI', desc: 'Return on digital marketing spend' },
]

const reasons = [
  { icon: '⚡', color: '#c084fc', title: 'AI-First Approach', description: 'Every strategy is enhanced by AI — smarter targeting, faster creative, better results.' },
  { icon: '◎', color: '#f472b6', title: 'Full-Funnel Thinking', description: 'From first impression to loyal customer — we design for the complete journey.' },
  { icon: '⬡', color: '#fb923c', title: 'Data-Driven Decisions', description: 'Real-time analytics and performance intelligence guide every creative and media move.' },
  { icon: '◈', color: '#38bdf8', title: 'Dedicated Growth Teams', description: "Your account doesn't get handed off. Senior strategists lead every engagement." },
]

export default function WhyUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="whyus-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <SectionBackground 
        lightSrc="/bg/sections/light_bg/Floating_silk_fabric_flowing_space_202608020545.jpeg"
        darkSrc="/bg/sections/dark_bg/Floating_silk_fabric_flowing_space_202608020542.jpeg"
        blur="12px"
        opacity={0.7}
      />

      <div className="container">
        {/* Stats Grid — 4 columns */}
        <motion.div
          ref={statsRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 96 }}
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="card"
              style={{ padding: '28px 24px', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            >
              <div className="gradient-text" style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
                {s.num}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Us Content */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 80, skewY: 5 }}
            animate={inView ? { opacity: 1, y: 0, skewY: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-label">Why MediaLoop</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '16px 0 20px' }}>
              The partners that<br />
              think in <span className="gradient-text">outcomes</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 36 }}>
              We don't just execute campaigns. We architect growth ecosystems —
              blending intelligent strategy, AI tooling, and creative excellence
              into a single unified force for your brand.
            </p>
            <a href="#contact" className="btn-primary">
              Book a Strategy Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Right — Reason cards */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                className="card"
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 24px' }}
                whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
              >
                <div style={{
                  fontSize: 20, width: 44, height: 44, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}30`, flexShrink: 0
                }}>
                  {r.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.01em', color: 'var(--text)' }}>{r.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{r.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 900px) {
          #about .whyus-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          #about .stats-four-col { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
