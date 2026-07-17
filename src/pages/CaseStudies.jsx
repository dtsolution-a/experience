import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const projects = [
  { id: 1, client: 'Apex Fintech', tag: 'Web App', title: 'Trading platform UI overhaul', desc: 'Redesigned the entire user interface for a high-frequency trading platform, resulting in a 40% increase in user retention.' },
  { id: 2, client: 'Lumina Health', tag: 'AI/ML', title: 'Predictive patient triage', desc: 'Developed an AI model that predicts patient admission rates with 94% accuracy, optimising hospital staffing.' },
  { id: 3, client: 'Orbit Logistics', tag: 'Automation', title: 'Zero-touch supply chain', desc: 'Automated 100% of invoice processing and dispatch routing using custom RPA and OCR pipelines.' },
  { id: 4, client: 'Nexus Retail', tag: 'E-commerce', title: 'Headless commerce migration', desc: 'Rebuilt a monolithic storefront into a blazing fast Next.js headless architecture.' },
]

export default function CaseStudies() {
  return (
    <div className="inner-page noise">
      {/* Ambient Orbs */}
      <div className="inner-bg-orb inner-orb-1"></div>
      <div className="inner-bg-orb inner-orb-2"></div>

      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">Our Work</span>
              <h1 className="page-title">
                <span className="gradient-text">Case</span> Studies
              </h1>
              <p className="page-subtitle">A selection of recent projects where we applied engineering and design to solve complex business challenges.</p>
            </motion.div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="page-section">
          <div className="container">
            <div className="grid-2">
              {projects.map((proj, i) => (
                <motion.a 
                  href="#"
                  key={proj.id} 
                  className="elevated-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="ec-meta">
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{proj.client}</span>
                    <span className="ec-tag">{proj.tag}</span>
                  </div>
                  <h3 className="ec-title" style={{ fontSize: '28px' }}>{proj.title}</h3>
                  <p className="ec-desc">{proj.desc}</p>
                  <span className="ec-link">
                    View Case Study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
