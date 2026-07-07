import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  { icon: '◈', color: '#c084fc', tag: 'Growth',        title: 'Digital Marketing',     description: 'AI-accelerated SEO, PPC, and social campaigns engineered for measurable ROI. Every strategy backed by deep data analytics.', items: ['AI-Powered SEO', 'PPC Advertising', 'Social Media Marketing', 'Email Automation'] },
  { icon: '◎', color: '#fb923c', tag: 'Identity',      title: 'Brand Strategy & Design', description: 'Building iconic brand identities that communicate intelligence, build trust, and create lasting market presence.',            items: ['Logo & Identity', 'Brand Guidelines', 'Visual Content', 'UI/UX Design'] },
  { icon: '⬢', color: '#38bdf8', tag: 'Infrastructure', title: 'Cloud & Tech Solutions', description: 'Scalable cloud infrastructure, CRM/ERP integrations, and enterprise-grade tech stacks powering modern businesses.',          items: ['Cloud Solutions', 'CRM/ERP Integration', 'API Development', 'DevOps & Security'] },
  { icon: '◆', color: '#a78bfa', tag: 'Performance',   title: 'Content & Creative',    description: 'Content that converts — from editorial storytelling to video production and performance creatives that capture attention.',      items: ['Content Strategy', 'Video Production', 'Copywriting', 'Graphic Design'] },
]

const featured = [
  {
    href: '/ai-automation',
    badge: 'Intelligence',
    icon: '◉',
    accent: '#00D9FF',
    accentB: '#7B2FF7',
    title: 'AI & Automation',
    tagline: 'Machines that think. Systems that scale.',
    desc: 'Custom AI chatbots, predictive analytics, workflow automation, LLMs, computer vision — full-spectrum intelligent systems engineered for your business.',
    tags: ['Custom LLMs', 'Process Automation', 'Predictive Analytics', 'AI Apps', 'Computer Vision'],
  },
  {
    href: '/custom-development',
    badge: 'Engineering',
    icon: '</>',
    accent: '#F59E0B',
    accentB: '#FF6B35',
    title: 'Custom Development',
    tagline: 'Built pixel-perfect. Engineered to scale.',
    desc: 'Web apps, mobile platforms, SaaS products, APIs — bespoke software built exactly to spec with modern tech stacks and production-grade architecture.',
    tags: ['Web Applications', 'Mobile Apps', 'SaaS Products', 'APIs & Backend', 'Enterprise Software'],
  },
]

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="services-header">
          <span className="section-label">What We Do</span>
          <h2 className="services-title">Full-spectrum digital<br /><span className="gradient-text">capabilities</span></h2>
          <p className="services-sub">Four core disciplines plus two deep specialisations — building digital systems that think, grow, and outperform.</p>
        </motion.div>

        {/* ── Regular service cards ── */}
        <div className="services-grid services-grid-4">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} inView={inView} />)}
        </div>

        {/* ── Featured deep-dive cards ── */}
        <motion.div
          className="services-featured-header"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
        >
          <span className="services-featured-label">DEEP SPECIALISATIONS</span>
        </motion.div>
        <div className="services-featured-grid">
          {featured.map((f, i) => <FeaturedCard key={i} item={f} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className="svc-card card"
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
    >
      <div className="svc-glow" style={{ background: `radial-gradient(circle at 30% 30%, ${service.color}20, transparent 70%)`, opacity: hovered ? 1 : 0 }} />
      <div className="svc-top">
        <div className="svc-icon-wrap" style={{ color: service.color, borderColor: `${service.color}30`, background: `${service.color}10` }}>
          <span className="svc-icon">{service.icon}</span>
        </div>
        <span className="svc-tag" style={{ color: service.color, background: `${service.color}12`, borderColor: `${service.color}25` }}>{service.tag}</span>
      </div>
      <h3 className="svc-title">{service.title}</h3>
      <p className="svc-desc">{service.description}</p>
      <ul className="svc-list">
        {service.items.map((item, i) => (
          <li key={i} className="svc-item">
            <span className="svc-dot" style={{ background: service.color }} />{item}
          </li>
        ))}
      </ul>
      <div className="svc-arrow" style={{ color: service.color, opacity: hovered ? 1 : 0.4, transform: hovered ? 'translateX(4px)' : 'none', transition: 'all 0.3s ease' }}>→</div>
    </motion.div>
  )
}

function FeaturedCard({ item, index, inView }) {
  return (
    <motion.a
      href={item.href}
      className="svc-featured-card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 28 } }}
      style={{ '--fa': item.accent, '--fb': item.accentB }}
    >
      <div className="sfc-glow" />
      <div className="sfc-top">
        <span className="sfc-badge" style={{ color: item.accent, borderColor: `${item.accent}30`, background: `${item.accent}12` }}>{item.badge}</span>
        <div className="sfc-icon">{item.icon}</div>
      </div>
      <h3 className="sfc-title">{item.title}</h3>
      <p className="sfc-tagline">{item.tagline}</p>
      <p className="sfc-desc">{item.desc}</p>
      <div className="sfc-tags">
        {item.tags.map((t, i) => <span key={i} className="sfc-tag">{t}</span>)}
      </div>
      <div className="sfc-cta">
        Explore in depth
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </motion.a>
  )
}
