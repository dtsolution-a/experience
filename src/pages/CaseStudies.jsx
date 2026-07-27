import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const featuredProject = {
  id: 0,
  client: 'Apex Fintech',
  tag: 'Fintech & Web App',
  title: 'Redefining High-Frequency Trading UI',
  desc: 'We completely overhauled the user interface and underlying React architecture for Apex Fintech. By implementing a custom WebGL charting engine and optimizing React rendering cycles, we reduced TTI by 60% and increased user retention by 40%.',
  metrics: [
    { label: 'Increase in Retention', value: '+40%' },
    { label: 'Speed Improvement', value: '2.5x' },
    { label: 'Daily Active Users', value: '1.2M' }
  ],
  image: '/images/cs-fintech.jpg'
}

const projects = [
  { id: 1, client: 'Lumina Health', tag: 'AI/ML', title: 'Predictive patient triage', desc: 'Developed an AI model that predicts patient admission rates with 94% accuracy, optimising hospital staffing.', metric: '94% Accuracy', image: '/images/cs-ai.jpg' },
  { id: 2, client: 'Orbit Logistics', tag: 'Automation', title: 'Zero-touch supply chain', desc: 'Automated 100% of invoice processing and dispatch routing using custom RPA and OCR pipelines.', metric: '100% Automated', image: '/images/cs-automation.jpg' },
  { id: 3, client: 'Nexus Retail', tag: 'E-commerce', title: 'Headless commerce migration', desc: 'Rebuilt a monolithic storefront into a blazing fast Next.js headless architecture.', metric: 'Sub-second Load', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
  { id: 4, client: 'Zenith Energy', tag: 'IoT Dashboard', title: 'Real-time grid monitoring', desc: 'A real-time data visualization dashboard tracking energy consumption across 10,000+ IoT nodes globally.', metric: '10k+ Nodes', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
]

const approachSteps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We dive deep into your business logic, market position, and technical constraints to map out a foolproof architecture.' },
  { num: '02', title: 'Design & Prototyping', desc: 'Our design team crafts editorial, premium interfaces in Figma, validating user flows before a single line of code is written.' },
  { num: '03', title: 'Engineering & QA', desc: 'We build using modern stacks (Next.js, Node, PyTorch) with uncompromising standards for performance and security.' },
  { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and iterative scaling to ensure the platform grows with your business.' },
]

export default function CaseStudies() {
  return (
    <div className="inner-page-dark noise">
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
              style={{ padding: 0, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, overflow: 'hidden', minHeight: '500px' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {/* Visual Side */}
              <div style={{ position: 'relative', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div className="feature-image-wrap">
                  <img src={featuredProject.image} alt={featuredProject.title} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, var(--card-bg))' }}></div>
                </div>
              </div>

              {/* Content Side */}
              <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <div className="ec-meta" style={{ marginBottom: '24px' }}>
                  <span className="ec-tag" style={{ background: 'var(--brand-grad-diag)', color: '#fff', border: 'none' }}>Featured Project</span>
                  <span style={{ color: 'var(--text-3)' }}>{featuredProject.tag}</span>
                </div>
                <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.1 }}>{featuredProject.title}</h2>
                <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '40px' }}>{featuredProject.desc}</p>
                
                <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
                  {featuredProject.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{m.value}</div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 700 }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <a href="#" className="ec-link" style={{ marginTop: 0 }}>
                  Read Full Case Study <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring' }}><ArrowRight size={16} strokeWidth={2.5} /></motion.div>
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
                  style={{ padding: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="ec-visual">
                    <img src={proj.image} alt={proj.title} />
                  </div>
                  
                  <div className="ec-content">
                    <div className="ec-meta">
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '13px' }}>{proj.client}</span>
                      <span className="ec-tag">{proj.tag}</span>
                    </div>
                    <h3 className="ec-title" style={{ fontSize: '24px' }}>{proj.title}</h3>
                    <p className="ec-desc">{proj.desc}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 700, marginBottom: '4px' }}>Key Metric</span>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent-1)' }}>{proj.metric}</span>
                      </div>
                      <span className="ec-link" style={{ marginTop: 0 }}>
                        View Project <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring' }}><ArrowRight size={16} strokeWidth={2.5} /></motion.div>
                      </span>
                    </div>
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
                  style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border)' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--border)', lineHeight: 0.8, WebkitTextStroke: '1px var(--text-3)', color: 'transparent' }}>{step.num}</div>
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
