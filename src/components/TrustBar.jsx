import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } }
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const clients = ['TechVentures', 'NovaBrands', 'Helios Corp', 'Zephyr Labs', 'Axiom Studio', 'PulseMedia', 'Vertex AI', 'CoreStack']

export default function TrustBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <section className="trust-section">
      <div className="trust-line" />
      <div className="container">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="trust-inner">
          <motion.p variants={fadeUp} className="trust-label">Trusted by growth-focused companies worldwide</motion.p>
          <motion.div variants={stagger} className="trust-logos">
            {clients.map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="trust-logo-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="trust-logo-icon">
                  <rect x="2" y="2" width="16" height="16" rx="4" fill={`url(#tg${i})`} opacity="0.8"/>
                  <defs><linearGradient id={`tg${i}`} x1="2" y1="2" x2="18" y2="18"><stop stopColor="#c084fc"/><stop offset="1" stopColor="#f472b6"/></linearGradient></defs>
                </svg>
                <span>{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="trust-line" />
    </section>
  )
}
