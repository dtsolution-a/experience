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
    <div className="inner-page">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="page-eyebrow">Our Work</span>
              <h1 className="page-title">Case Studies</h1>
              <p className="page-subtitle">A selection of recent projects where we applied engineering and design to solve complex business challenges.</p>
            </motion.div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="page-section">
          <div className="container">
            <div className="grid-2">
              {projects.map((proj, i) => (
                <motion.div 
                  key={proj.id} 
                  className="simple-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="simple-card-meta">
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{proj.client}</span>
                    <span>{proj.tag}</span>
                  </div>
                  <h3 className="simple-card-title">{proj.title}</h3>
                  <p className="simple-card-desc">{proj.desc}</p>
                  <a href="#" className="simple-card-link">View Case Study →</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
