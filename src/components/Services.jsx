import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  { icon: '◈', color: '#c084fc', tag: 'Growth', title: 'Digital Marketing', description: 'AI-accelerated SEO, PPC, and social campaigns engineered for measurable ROI. Every strategy backed by deep data analytics.', items: ['AI-Powered SEO', 'PPC Advertising', 'Social Media Marketing', 'Email Automation'] },
  { icon: '⬡', color: '#f472b6', tag: 'Experience', title: 'Web & App Development', description: 'Engineering high-performance digital products — from sleek marketing sites to complex SaaS platforms and mobile apps.', items: ['Website Design', 'E-commerce Solutions', 'Mobile Apps', 'Custom Software'] },
  { icon: '◎', color: '#fb923c', tag: 'Identity', title: 'Brand Strategy & Design', description: 'Building iconic brand identities that communicate intelligence, build trust, and create lasting market presence.', items: ['Logo & Identity', 'Brand Guidelines', 'Visual Content', 'UI/UX Design'] },
  { icon: '⬢', color: '#38bdf8', tag: 'Infrastructure', title: 'Cloud & Tech Solutions', description: 'Scalable cloud infrastructure, CRM/ERP integrations, and enterprise-grade tech stacks powering modern businesses.', items: ['Cloud Solutions', 'CRM/ERP Integration', 'API Development', 'DevOps & Security'] },
  { icon: '◉', color: '#34d399', tag: 'Intelligence', title: 'AI & Automation', description: 'Deploying intelligent automation, machine learning pipelines, and AI-driven content systems that scale your output.', items: ['AI Content Systems', 'Marketing Automation', 'Predictive Analytics', 'Chatbot Development'] },
  { icon: '◆', color: '#a78bfa', tag: 'Performance', title: 'Content & Creative', description: 'Content that converts — from editorial storytelling to video production and performance creatives that capture attention.', items: ['Content Strategy', 'Video Production', 'Copywriting', 'Graphic Design'] },
]

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="services-header">
          <span className="section-label">What We Do</span>
          <h2 className="services-title">Full-spectrum digital<br /><span className="gradient-text">capabilities</span></h2>
          <p className="services-sub">Six core disciplines, one unified vision — building digital systems that think, grow, and outperform.</p>
        </motion.div>
        <div className="services-grid">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} inView={inView} />)}
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
            <span className="svc-dot" style={{ background: service.color }} />
            {item}
          </li>
        ))}
      </ul>
      <div className="svc-arrow" style={{ color: service.color, opacity: hovered ? 1 : 0.4, transform: hovered ? 'translateX(4px)' : 'none', transition: 'all 0.3s ease' }}>→</div>
    </motion.div>
  )
}
