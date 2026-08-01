import { motion } from 'framer-motion'
import TransitionLink from './TransitionLink'

const footerLinks = {
  Services: [
    { label: 'Digital Marketing', path: '/#services' },
    { label: 'Web Development', path: '/#services' },
    { label: 'AI & Automation', path: '/ai-automation' },
    { label: 'Custom Development', path: '/custom-development' },
    { label: 'Cloud Solutions', path: '/#services' }
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Work', path: '/work' },
    { label: 'Case Studies', path: '/work' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' }
  ],
  Resources: [
    { label: 'Strategy Guide', path: '#' },
    { label: 'AI Marketing Kit', path: '#' },
    { label: 'Brand Playbook', path: '#' },
    { label: 'Dev Resources', path: '#' }
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/legal#privacy' },
    { label: 'Terms of Service', path: '/legal#terms' },
    { label: 'Cookie Policy', path: '/legal#cookies' }
  ],
}

const socials = [
  {
    name: 'Facebook', href: 'https://facebook.com', color: '#1877F2',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  },
  {
    name: 'Instagram', href: 'https://instagram.com', color: '#E1306C',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  },
  {
    name: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  },
  {
    name: 'WhatsApp', href: 'https://wa.me/919408023336', color: '#22c55e',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="container">
        <div className="footer-top">
          {/* Brand col */}
          <div className="footer-brand">
            {/* Full logo — dark background so white text is visible */}
            <Link to="/" className="footer-logo-full-wrap">
              <img
                src="/ml_logo_full.png"
                alt="MediaLoop Technologies — Tech That Connect"
                className="footer-full-logo-img"
              />
            </Link>
            <p className="footer-tagline">Engineering intelligent digital ecosystems for brands that demand excellence.</p>

            {/* Contact quick-links */}
            <div className="footer-contacts">
              <a href="https://wa.me/919408023336" className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                +91 94080 23336
              </a>
              <a href="mailto:support@medialooptech.com" className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                support@medialooptech.com
              </a>
              <span className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Surat, India · Dubai, UAE
              </span>
            </div>

            {/* Social icons */}
            <div className="footer-socials">
              {socials.map((s) => (
                <motion.a
                  key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="footer-social" title={s.name}
                  whileHover={{ y: -4, backgroundColor: s.color, color: '#fff', borderColor: s.color }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-col">
              <h4 className="footer-col-title">{group}</h4>
              <ul className="footer-col-links">
                {links.map(link => (
                  <li key={link.label}>
                    {link.path.startsWith('http') || link.path.startsWith('#') ? (
                      <a href={link.path} className="footer-link">{link.label}</a>
                    ) : (
                      <TransitionLink to={link.path} className="footer-link">{link.label}</TransitionLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 MediaLoop Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="footer-made">Crafted with precision · Powered by AI</p>
        </div>
      </div>

      <style>{`
        .footer-contacts {
          display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 20px;
        }
        .footer-contact-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; color: var(--text-3); text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-contact-link:hover { color: var(--text); }
        .footer-social {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--surface-2); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-3); text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-social:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
      `}</style>
    </footer>
  )
}
