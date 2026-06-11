import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="navbar"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="nav-inner container-wide">
          {/* Logo — icon only */}
          <a href="#" className="nav-logo">
            <img src="/ml_logo_icon.png" alt="MediaLoop Technologies" className="logo-img-icon" />
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="nav-right">
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.svg key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </motion.svg>
                ) : (
                  <motion.svg key="moon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
            <a href="#contact" className="btn-primary nav-cta">
              Get Started
            </a>
            <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
              <span className={mobileOpen ? 'open' : ''} />
              <span className={mobileOpen ? 'open' : ''} />
              <span className={mobileOpen ? 'open' : ''} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.label} href={l.href}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        /* Push navbar below experience chrome bar */
        body[data-exp] .navbar {
          top: 44px;
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--text);
        }
        .logo-img-icon {
          height: 36px; width: auto;
          filter: drop-shadow(0 2px 8px rgba(255,45,85,0.25));
        }
        .logo-wordmark { display: flex; flex-direction: column; gap: 0px; }
        .logo-text {
          font-size: 15px; font-weight: 800; letter-spacing: -0.03em;
          white-space: nowrap; line-height: 1.1;
        }
        .logo-tech { color: var(--text-3); font-weight: 500; font-size: 13px; }
        .logo-tagline {
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--brand-grad);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-links {
          display: flex; gap: 2px; list-style: none;
        }
        .nav-link {
          font-size: 14px; font-weight: 500; color: var(--text-2);
          text-decoration: none; padding: 8px 14px; border-radius: 8px;
          transition: all 0.2s ease;
        }
        .nav-link:hover { color: var(--text); background: var(--glow-1); }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .theme-toggle {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface-2); border: 1px solid var(--border);
          cursor: pointer; color: var(--text-2);
          transition: all 0.2s ease;
        }
        .theme-toggle:hover { border-color: var(--accent-1); color: var(--accent-1); }
        .nav-cta { padding: 10px 22px !important; font-size: 14px !important; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text); border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger span.open:nth-child(2) { opacity: 0; }
        .hamburger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; top: 72px; left: 0; right: 0;
          background: var(--nav-bg); backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 20px 24px; z-index: 999;
          display: flex; flex-direction: column; gap: 4px;
        }
        .mobile-link {
          font-size: 16px; font-weight: 500; color: var(--text);
          text-decoration: none; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none !important; }
          .hamburger { display: flex; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none; }
        }
      `}</style>
    </>
  )
}
