import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CTABanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div ref={ref} className="cta-card"
          initial={{ opacity: 0, y: 50, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
          <div className="cta-grid" />
          <motion.div className="cta-inner" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <span className="cta-label">Ready to begin?</span>
            <h2 className="cta-heading">Your next breakthrough<br /><span className="gradient-text">starts with one conversation.</span></h2>
            <p className="cta-sub">Join 50+ brands that chose MediaLoop to engineer their digital advantage. No commitments — just clarity.</p>
            <div className="cta-actions">
              <a href="#contact" className="btn-primary cta-btn-main">
                Book a Free Strategy Call
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#work" className="btn-secondary">View Our Work</a>
            </div>
            <p className="cta-fine">Free consultation · No obligation · Response within 24h</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
