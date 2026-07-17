import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

export default function About() {
  return (
    <div className="inner-page noise">
      {/* Ambient Orbs */}
      <div className="inner-bg-orb inner-orb-1"></div>
      <div className="inner-bg-orb inner-orb-2" style={{ top: '30%', bottom: 'auto' }}></div>

      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">About Us</span>
              <h1 className="page-title">
                Engineering the <span className="gradient-text">future</span><br/>of digital experiences.
              </h1>
              <p className="page-subtitle">We are a collective of engineers, designers, and strategists building scalable, high-performance digital ecosystems for forward-thinking brands.</p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="page-section">
          <div className="container document-content" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div 
              className="elevated-card" style={{ padding: '60px', marginBottom: '40px' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2>Our Mission</h2>
              <p>At MediaLoop Technologies, our mission is to bridge the gap between complex engineering and beautiful design. We believe that software shouldn't just work—it should feel effortless, scale infinitely, and leave a lasting impression.</p>
              
              <h2>The MediaLoop Standard</h2>
              <p>We don't do "good enough". Every line of code, every pixel, and every animation is crafted with intent. From AI-driven automation pipelines to high-conversion web applications, our standards are uncompromising.</p>
              
              <div className="grid-2" style={{ marginTop: '40px', gap: '20px' }}>
                <div style={{ padding: '24px', background: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: 'var(--text)' }}>Performance First</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Sub-second load times and 60fps animations across all devices.</p>
                </div>
                <div style={{ padding: '24px', background: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: 'var(--text)' }}>Scalable Architecture</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Built to handle tomorrow's traffic and scale dynamically.</p>
                </div>
              </div>

              <h2>Global Reach, Local Precision</h2>
              <p>With hubs in Surat, India and Dubai, UAE, we deliver world-class engineering to global enterprises while maintaining the agility and precision of a boutique studio.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
