import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ── Real SVG Social Icons ── */
const SocialIcons = {
  Facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  WhatsApp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
}

const contactDetails = [
  { icon: SocialIcons.WhatsApp, label: 'WhatsApp', value: '+91 94080 23336', href: 'https://wa.me/919408023336', color: '#22c55e' },
  { icon: '📧', label: 'Email', value: 'support@medialooptech.com', href: 'mailto:support@medialooptech.com', color: '#c084fc' },
  { icon: '📍', label: 'Location', value: 'Surat, Gujarat, India', href: '#', color: '#f472b6' },
  { icon: '📍', label: 'Global Office', value: 'Dubai, UAE', href: '#', color: '#fb923c' },
]

const socials = [
  { name: 'Facebook', icon: SocialIcons.Facebook, href: 'https://facebook.com', color: '#1877F2' },
  { name: 'Instagram', icon: SocialIcons.Instagram, href: 'https://instagram.com', color: '#E1306C' },
  { name: 'LinkedIn', icon: SocialIcons.LinkedIn, href: 'https://linkedin.com', color: '#0A66C2' },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" className="section contact-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="contact-grid" ref={ref}>

          {/* ── Left: Info Panel ── */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="contact-title">
              Let's build something<br />
              <span className="gradient-text">exceptional together</span>
            </h2>
            <p className="contact-desc">
              Whether you need a new digital strategy, a complete rebrand, or a
              high-performance product — we're ready to architect your next chapter.
            </p>

            {/* Contact details */}
            <div className="contact-details">
              {contactDetails.map((d, i) => (
                <motion.a
                  key={i} href={d.href}
                  className="contact-detail-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="detail-icon-wrap" style={{ background: `${d.color}15`, border: `1px solid ${d.color}30`, color: d.color }}>
                    {typeof d.icon === 'string' ? d.icon : d.icon}
                  </div>
                  <div>
                    <div className="detail-label">{d.label}</div>
                    <div className="detail-value">{d.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links with real icons */}
            <div className="contact-socials-label">Follow Us</div>
            <div className="contact-socials">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-icon-btn"
                  title={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.1, backgroundColor: s.color, color: '#fff', borderColor: s.color }}
                >
                  {s.icon}
                  <span>{s.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {sent ? (
              <motion.div className="card form-success"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div className="success-icon">✦</div>
                <h3>Message received!</h3>
                <p>We'll be in touch within 24 hours. Looking forward to it.</p>
                <button className="btn-primary" onClick={() => setSent(false)} style={{ marginTop: 16 }}>Send another</button>
              </motion.div>
            ) : (
              <form className="card contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Start a conversation</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-control" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Brand</label>
                  <input className="form-control" placeholder="Company / Brand" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Interest</label>
                  <select className="form-control" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    <option>Digital Marketing</option>
                    <option>Web & App Development</option>
                    <option>Brand Identity & Design</option>
                    <option>AI & Automation</option>
                    <option>Cloud Solutions</option>
                    <option>Full Digital Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tell us about your project</label>
                  <textarea className="form-control form-textarea" placeholder="What are you building? What outcomes matter most?" rows={4}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="form-note">No commitment. We'll respond within 24 hours.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-detail-link {
          display: flex; gap: 16px; align-items: center;
          text-decoration: none; color: var(--text);
          transition: transform 0.2s ease;
        }
        .detail-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .contact-socials-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-3); margin-bottom: 12px;
        }
        .social-icon-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--surface); color: var(--text-2);
          font-size: 13px; font-weight: 600; text-decoration: none;
          transition: all 0.25s ease; cursor: pointer;
        }
        .social-icon-btn:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
      `}</style>
    </section>
  )
}
