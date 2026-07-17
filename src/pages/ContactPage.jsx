import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import '../styles/inner-pages.css'

export default function ContactPage() {
  return (
    <div className="inner-page">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero" style={{ paddingBottom: '20px' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="page-eyebrow">Get In Touch</span>
              <h1 className="page-title">Let's build together.</h1>
              <p className="page-subtitle">Ready to transform your business? Reach out to our team of experts and let's discuss your next project.</p>
            </motion.div>
          </div>
        </section>

        {/* Reuse the existing Contact component but remove its default top padding/border if needed by wrapping it */}
        <div style={{ marginTop: '-40px' }}>
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}
