import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const jobs = [
  { 
    id: 1, 
    title: 'Senior Frontend Engineer', 
    dept: 'Engineering', 
    loc: 'Surat, IN / Remote', 
    type: 'Full-time',
    desc: 'Build buttery-smooth, high-performance web applications using React, Framer Motion, and Next.js.',
    reqs: ['5+ years of React/Next.js experience', 'Deep understanding of CSS architectures and Framer Motion', 'Experience with WebGL or Three.js is a plus']
  },
  { 
    id: 2, 
    title: 'AI Solutions Architect', 
    dept: 'AI & Data', 
    loc: 'Dubai, UAE / Remote', 
    type: 'Full-time',
    desc: 'Design scalable ML pipelines and integrate LLMs to automate complex enterprise workflows.',
    reqs: ['Strong background in Python and PyTorch/TensorFlow', 'Experience deploying LLMs (OpenAI, Anthropic, LLaMA) in production', 'Cloud infrastructure (AWS/GCP)']
  },
  { 
    id: 3, 
    title: 'Product Designer (UI/UX)', 
    dept: 'Design', 
    loc: 'Remote', 
    type: 'Contract',
    desc: 'Craft pixel-perfect, editorial-style interfaces that bridge the gap between engineering and aesthetics.',
    reqs: ['Expert in Figma and prototyping tools', 'Strong portfolio demonstrating high-end B2B/SaaS design', 'Solid grasp of design systems']
  },
  { 
    id: 4, 
    title: 'Growth Marketing Manager', 
    dept: 'Marketing', 
    loc: 'Surat, IN', 
    type: 'Full-time',
    desc: 'Drive data-backed marketing campaigns and scale our brand presence globally.',
    reqs: ['Proven track record in B2B Tech marketing', 'Expertise in SEO, SEM, and performance marketing', 'Strong analytical mindset']
  },
]

const perks = [
  { icon: '💻', title: 'Top-tier Gear', desc: 'MacBook Pro, 4K monitors, and any software you need to do your best work.' },
  { icon: '🌍', title: 'Work Anywhere', desc: 'Remote-first culture with beautiful hubs in Surat and Dubai if you want an office.' },
  { icon: '🧠', title: 'Continuous Learning', desc: 'Annual budget for courses, conferences, and books. We invest in your growth.' },
  { icon: '🚀', title: 'Autonomy', desc: 'No micromanagement. We hire brilliant people and give them the freedom to execute.' },
]

export default function Careers() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="inner-page noise">
      <div className="inner-bg-orb inner-orb-1"></div>
      <div className="inner-bg-orb inner-orb-2" style={{ top: '60%', bottom: 'auto' }}></div>

      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">Join The Collective</span>
              <h1 className="page-title">
                Do the best work of<br />your <span className="gradient-text">life.</span>
              </h1>
              <p className="page-subtitle">We don't just build software. We craft digital experiences that redefine industries. Join a team of uncompromising engineers, designers, and thinkers.</p>
            </motion.div>
          </div>
        </section>

        {/* CULTURE / PERKS BENTO GRID */}
        <section className="page-section" style={{ paddingTop: '20px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
              
              <motion.div 
                className="elevated-card" 
                style={{ gridColumn: 'span 8', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>A culture of excellence.</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '500px' }}>
                  At MediaLoop, we believe that great products are built by teams who care deeply about the details. We obsess over the final 1% of polish. If you take immense pride in your craft, you'll feel right at home here.
                </p>
              </motion.div>

              <motion.div 
                className="elevated-card" 
                style={{ gridColumn: 'span 4', padding: '40px', background: 'var(--brand-grad-diag)', color: '#fff', border: 'none' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Global Impact</h3>
                <p style={{ opacity: 0.9 }}>Your code and designs will be used by thousands of users across global enterprises.</p>
              </motion.div>

              {perks.map((perk, i) => (
                <motion.div 
                  key={perk.title}
                  className="elevated-card" 
                  style={{ gridColumn: 'span 3', padding: '32px' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{perk.icon}</div>
                  <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>{perk.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6 }}>{perk.desc}</p>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        {/* OPEN ROLES ACCORDION */}
        <section className="page-section page-section-alt">
          <div className="container">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="page-eyebrow">We're Hiring</span>
              <h2 style={{ fontSize: '42px', marginBottom: '60px', fontWeight: 800, letterSpacing: '-0.02em' }}>Open Positions</h2>
            </motion.div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {jobs.map((job, i) => (
                <motion.div 
                  key={job.id} 
                  className="elevated-card"
                  style={{ padding: '32px 40px', cursor: 'pointer', display: 'block', height: 'auto' }}
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-3)', fontWeight: 600 }}>
                        <span>{job.dept}</span> • <span>{job.loc}</span> • <span>{job.type}</span>
                      </div>
                    </div>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s',
                      transform: expandedId === job.id ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === job.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '32px', marginTop: '32px', borderTop: '1px solid var(--border)' }}>
                          <p style={{ fontSize: '16px', color: 'var(--text-2)', marginBottom: '24px', lineHeight: 1.7 }}>{job.desc}</p>
                          
                          <h4 style={{ fontSize: '15px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)' }}>What we're looking for</h4>
                          <ul style={{ paddingLeft: '20px', marginBottom: '32px', color: 'var(--text-2)' }}>
                            {job.reqs.map((req, idx) => (
                              <li key={idx} style={{ marginBottom: '8px', lineHeight: 1.6 }}>{req}</li>
                            ))}
                          </ul>

                          <a 
                            href={`mailto:careers@medialooptech.com?subject=Application: ${job.title}`} 
                            style={{ 
                              display: 'inline-flex', padding: '14px 32px', background: 'var(--text)', color: 'var(--bg)', 
                              borderRadius: '100px', textDecoration: 'none', fontWeight: 600, fontSize: '15px',
                              alignItems: 'center', gap: '8px'
                            }}
                          >
                            Apply for this role <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
