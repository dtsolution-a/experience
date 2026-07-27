import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Globe, Brain, ArrowRight, ChevronDown } from 'lucide-react'
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
  { icon: Laptop, title: 'Top-tier Gear', desc: 'MacBook Pro, 4K monitors, and any software you need to do your best work.' },
  { icon: Globe, title: 'Work Anywhere', desc: 'Remote-first culture with hubs in Surat and Dubai if you want an office.' },
  { icon: Brain, title: 'Continuous Learning', desc: 'Annual budget for courses, conferences, and books. We invest in you.' },
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
                <h2 style={{ fontSize: '36px', marginBottom: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>A culture of excellence.</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '600px' }}>
                  At MediaLoop, we believe that great products are built by teams who care deeply about the details. We obsess over the final 1% of polish. If you take immense pride in your craft, you'll feel right at home here.
                </p>
              </motion.div>

              <motion.div 
                className="elevated-card" 
                style={{ gridColumn: 'span 4', padding: '40px', background: 'var(--brand-grad-diag)', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <motion.div 
                  initial={{ rotate: 0 }} 
                  whileHover={{ rotate: 180, scale: 1.1 }} 
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ marginBottom: '24px', display: 'inline-block', originX: 0.5, originY: 0.5 }}
                >
                  <Globe size={48} strokeWidth={1.5} color="rgba(255,255,255,0.9)" />
                </motion.div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 800 }}>Global Impact</h3>
                <p style={{ opacity: 0.9, fontSize: '15px', lineHeight: 1.6 }}>Your code and designs will be used by thousands of users across global enterprises.</p>
              </motion.div>

              {perks.map((perk, i) => {
                const IconComponent = perk.icon;
                return (
                  <motion.div 
                    key={perk.title}
                    className="elevated-card" 
                    style={{ gridColumn: 'span 4', padding: '40px' }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                    whileHover="hover"
                  >
                    <motion.div 
                      variants={{
                        hover: { scale: 1.2, y: -5, color: 'var(--accent-1)' }
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      style={{ marginBottom: '24px', display: 'inline-block', color: 'var(--text)' }}
                    >
                      <IconComponent size={36} strokeWidth={1.5} />
                    </motion.div>
                    <h4 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 700 }}>{perk.title}</h4>
                    <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.6 }}>{perk.desc}</p>
                  </motion.div>
                )
              })}

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
                  style={{ padding: '32px 40px', cursor: 'pointer', display: 'block', height: 'auto', background: 'var(--surface-1)' }}
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <span style={{ color: 'var(--accent-1)' }}>{job.dept}</span> • <span>{job.loc}</span> • <span>{job.type}</span>
                      </div>
                    </div>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s',
                      transform: expandedId === job.id ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <ChevronDown size={20} color="var(--text-2)" />
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
                          <p style={{ fontSize: '16px', color: 'var(--text-2)', marginBottom: '32px', lineHeight: 1.7 }}>{job.desc}</p>
                          
                          <h4 style={{ fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)' }}>What we're looking for</h4>
                          <ul style={{ paddingLeft: '20px', marginBottom: '40px', color: 'var(--text-2)' }}>
                            {job.reqs.map((req, idx) => (
                              <li key={idx} style={{ marginBottom: '12px', lineHeight: 1.6 }}>{req}</li>
                            ))}
                          </ul>

                          <a 
                            href={`mailto:careers@medialooptech.com?subject=Application: ${job.title}`} 
                            style={{ 
                              display: 'inline-flex', padding: '16px 36px', background: 'var(--text)', color: 'var(--bg)', 
                              borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
                              alignItems: 'center', gap: '8px'
                            }}
                          >
                            Apply for this role <ArrowRight size={16} strokeWidth={2.5} />
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
