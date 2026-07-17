import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Surat, IN / Remote', desc: 'Build buttery-smooth, high-performance web applications using React, Framer Motion, and Next.js.' },
  { id: 2, title: 'AI Solutions Architect', dept: 'AI & Data', loc: 'Dubai, UAE / Remote', desc: 'Design scalable ML pipelines and integrate LLMs to automate complex enterprise workflows.' },
  { id: 3, title: 'Product Designer (UI/UX)', dept: 'Design', loc: 'Remote', desc: 'Craft pixel-perfect, editorial-style interfaces that bridge the gap between engineering and aesthetics.' },
  { id: 4, title: 'Growth Marketing Manager', dept: 'Marketing', loc: 'Surat, IN', desc: 'Drive data-backed marketing campaigns and scale our brand presence globally.' },
]

export default function Careers() {
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
              <span className="page-eyebrow">Join The Collective</span>
              <h1 className="page-title">
                Build the <span className="gradient-text">future</span><br/>with us.
              </h1>
              <p className="page-subtitle">Join a high-performance team dedicated to pushing the boundaries of engineering, design, and artificial intelligence.</p>
            </motion.div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section className="page-section">
          <div className="container">
            <motion.h2 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: '32px', marginBottom: '40px', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Open Positions
            </motion.h2>
            
            <div className="grid-2">
              {jobs.map((job, i) => (
                <motion.a 
                  href={`mailto:careers@medialooptech.com?subject=Application: ${job.title}`}
                  key={job.id} 
                  className="elevated-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="ec-meta">
                    <span className="ec-tag">{job.dept}</span>
                    <span>{job.loc}</span>
                  </div>
                  <h3 className="ec-title">{job.title}</h3>
                  <p className="ec-desc">{job.desc}</p>
                  <span className="ec-link">
                    Apply Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ marginTop: '80px', textAlign: 'center', color: 'var(--text-2)' }}
            >
              <p style={{ fontSize: '18px' }}>Don't see a perfect fit? Send your resume to <br/>
                <a href="mailto:careers@medialooptech.com" style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '4px', display: 'inline-block', marginTop: '12px' }}>
                  careers@medialooptech.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
