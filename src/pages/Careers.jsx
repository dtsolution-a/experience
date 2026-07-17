import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Surat, IN / Remote' },
  { id: 2, title: 'AI Solutions Architect', dept: 'AI & Data', loc: 'Dubai, UAE / Remote' },
  { id: 3, title: 'Product Designer (UI/UX)', dept: 'Design', loc: 'Remote' },
  { id: 4, title: 'Growth Marketing Manager', dept: 'Marketing', loc: 'Surat, IN' },
]

export default function Careers() {
  return (
    <div className="inner-page">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="page-eyebrow">Careers</span>
              <h1 className="page-title">Build the future with us.</h1>
              <p className="page-subtitle">Join a high-performance team dedicated to pushing the boundaries of engineering, design, and artificial intelligence.</p>
            </motion.div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section className="page-section">
          <div className="container">
            <h2 style={{ fontSize: '24px', marginBottom: '32px' }}>Open Positions</h2>
            
            <div className="grid-2">
              {jobs.map((job, i) => (
                <motion.div 
                  key={job.id} 
                  className="simple-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="simple-card-meta">
                    <span>{job.dept}</span>
                    <span style={{ color: 'var(--text-3)' }}>{job.loc}</span>
                  </div>
                  <h3 className="simple-card-title">{job.title}</h3>
                  <a href={`mailto:careers@medialooptech.com?subject=Application: ${job.title}`} className="simple-card-link">
                    Apply Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </motion.div>
              ))}
            </div>
            
            <div style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-2)' }}>
              <p>Don't see a perfect fit? Send your resume to <a href="mailto:careers@medialooptech.com" style={{ color: 'var(--text)' }}>careers@medialooptech.com</a></p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
