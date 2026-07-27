import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const featuredProject = {
  id: 0,
  client: 'Apex Fintech',
  tag: 'Fintech & Web App',
  title: 'Redefining High-Frequency Trading UI',
  desc: 'We completely overhauled the user interface and underlying React architecture for Apex Fintech. By implementing a custom WebGL charting engine and optimizing React rendering cycles, we reduced TTI (Time to Interactive) by 60% and increased user retention by 40%.',
  metrics: [
    { label: 'Increase in Retention', value: '+40%' },
    { label: 'Render Speed Improvement', value: '2.5x' },
    { label: 'Daily Active Users', value: '1.2M' }
  ]
}

const projects = [
  { id: 1, client: 'Lumina Health', tag: 'AI/ML', title: 'Predictive patient triage', desc: 'Developed an AI model that predicts patient admission rates with 94% accuracy, optimising hospital staffing.', metric: '94% Accuracy' },
  { id: 2, client: 'Orbit Logistics', tag: 'Automation', title: 'Zero-touch supply chain', desc: 'Automated 100% of invoice processing and dispatch routing using custom RPA and OCR pipelines.', metric: '100% Automated' },
  { id: 3, client: 'Nexus Retail', tag: 'E-commerce', title: 'Headless commerce migration', desc: 'Rebuilt a monolithic storefront into a blazing fast Next.js headless architecture.', metric: 'Sub-second Load' },
  { id: 4, client: 'Zenith Energy', tag: 'IoT Dashboard', title: 'Real-time grid monitoring', desc: 'A real-time data visualization dashboard tracking energy consumption across 10,000+ IoT nodes globally.', metric: '10k+ Nodes' },
]

const approachSteps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We dive deep into your business logic, market position, and technical constraints to map out a foolproof architecture.' },
  { num: '02', title: 'Design & Prototyping', desc: 'Our design team crafts editorial, premium interfaces in Figma, validating user flows before a single line of code is written.' },
  { num: '03', title: 'Engineering & QA', desc: 'We build using modern stacks (Next.js, Node, PyTorch) with uncompromising standards for performance and security.' },
  { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and iterative scaling to ensure the platform grows with your business.' },
]

export default function CaseStudies() {
  return (
    <div className="inner-page noise">
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
                Work that drives <span className="gradient-text">results.</span>
              </h1>
              <p className="page-subtitle">A selection of recent projects where we applied uncompromising engineering and design to solve complex business challenges.</p>
            </motion.div>
          </div>
        </section>

        {/* FEATURED PROJECT */}
        <section className="page-section" style={{ paddingTop: '20px' }}>
          <div className="container">
            <motion.div 
              className="elevated-card"
              style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, overflow: 'hidden' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {/* Visual Side */}
              <div style={{ position: 'relative', background: 'var(--surface-1)', borderRight: '1px solid var(--border)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--brand-grad-diag)', opacity: 0.1 }}></div>
                <div style={{ width: '300px', height: '300px', background: 'var(--glow-2)', borderRadius: '50%', filter: 'blur(50px)', position: 'absolute' }}></div>
                <h3 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--text)', opacity: 0.1, zIndex: 1, textTransform: 'uppercase', letterSpacing: '-0.04em' }}>Apex Fintech</h3>
              </div>

              {/* Content Side */}
              <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="ec-meta" style={{ marginBottom: '24px' }}>
                  <span className="ec-tag" style={{ background: 'var(--text)', color: 'var(--bg)', border: 'none' }}>Featured Project</span>
                  <span style={{ color: 'var(--text-3)' }}>{featuredProject.tag}</span>
                </div>
                <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.1 }}>{featuredProject.title}</h2>
                <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '40px' }}>{featuredProject.desc}</p>
                
                <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
                  {featuredProject.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent-2)', marginBottom: '4px' }}>{m.value}</div>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 700 }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <a href="#" className="ec-link" style={{ marginTop: 0 }}>
                  Read Full Case Study <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="page-section" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div className="grid-2">
              {projects.map((proj, i) => (
                <motion.a 
                  href="#"
                  key={proj.id} 
                  className="elevated-card"
                  style={{ padding: '40px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="ec-meta">
                    <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{proj.client}</span>
                    <span className="ec-tag">{proj.tag}</span>
                  </div>
                  <h3 className="ec-title" style={{ fontSize: '26px' }}>{proj.title}</h3>
                  <p className="ec-desc">{proj.desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 700, marginBottom: '4px' }}>Key Metric</span>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent-1)' }}>{proj.metric}</span>
                    </div>
                    <span className="ec-link" style={{ marginTop: 0 }}>
                      View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section className="page-section page-section-alt">
          <div className="container">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span className="page-eyebrow">How We Work</span>
              <h2 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.02em' }}>The MediaLoop Process</h2>
            </motion.div>

            <div className="grid-2">
              {approachSteps.map((step, i) => (
                <motion.div 
                  key={step.num}
                  style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--border)', lineHeight: 0.8 }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
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
