import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import '../styles/inner-pages.css'

export default function ContactPage() {
  return (
    <div className="inner-page noise">
      {/* Ambient Orbs */}
      <div className="inner-bg-orb inner-orb-1"></div>

      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero" style={{ paddingBottom: '20px' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">Get In Touch</span>
              <h1 className="page-title">
                Let's <span className="gradient-text">build</span> together.
              </h1>
              <p className="page-subtitle">Ready to transform your business? Reach out to our team of experts and let's discuss your next project.</p>
            </motion.div>
          </div>
        </section>

        {/* Reuse the existing Contact component */}
        <div style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}
