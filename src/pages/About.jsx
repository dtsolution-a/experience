import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeamGSAP from '../components/TeamGSAP'
import '../styles/inner-pages.css'

export default function About() {
  return (
    <div className="inner-page noise">
      <div className="inner-bg-orb inner-orb-1"></div>
      
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">Who We Are</span>
              <h1 className="page-title">
                Engineering <span className="gradient-text">Excellence.</span>
              </h1>
              <p className="page-subtitle" style={{ maxWidth: '800px' }}>
                We are a collective of uncompromising engineers, visionary designers, and growth architects. We don't just build websites; we engineer digital ecosystems for brands that demand the absolute best.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GSAP INTERACTIVE MEET THE TEAM */}
        <TeamGSAP />

        {/* CORE VALUES / CLOSING FRAME */}
        <section className="page-section" style={{ padding: '120px 0', textAlign: 'center' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '24px' }}>
                Built to <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-1)' }}>scale.</span> Designed to <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>convert.</span>
              </h2>
              <p style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                Every line of code we write, every pixel we push, is obsessively crafted to drive measurable business outcomes. We are the unfair advantage for modern enterprises.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
