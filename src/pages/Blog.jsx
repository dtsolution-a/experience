import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const posts = [
  { id: 1, tag: 'AI & Data', date: 'Jul 14, 2026', title: 'The Future of Predictive Analytics in Retail', desc: 'How machine learning models are reshaping inventory management and demand forecasting for modern retail.' },
  { id: 2, tag: 'Engineering', date: 'Jun 28, 2026', title: 'Why We Bet on Framer Motion for Web Animations', desc: 'A deep dive into our animation stack and how we achieve 60fps experiences across devices.' },
  { id: 3, tag: 'Design', date: 'Jun 10, 2026', title: 'The Editorial Aesthetic in B2B SaaS', desc: 'Moving away from generic dashboard designs towards trust-building, typography-driven user interfaces.' },
  { id: 4, tag: 'Automation', date: 'May 22, 2026', title: 'Zero-Touch Workflows: A Case Study', desc: 'How we helped a logistics firm reduce manual processing time by 90% using custom API orchestration.' },
]

export default function Blog() {
  return (
    <div className="inner-page noise">
      {/* Ambient Orbs */}
      <div className="inner-bg-orb inner-orb-1"></div>
      <div className="inner-bg-orb inner-orb-2"></div>

      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="page-eyebrow">Insights & Thoughts</span>
              <h1 className="page-title">
                The MediaLoop <span className="gradient-text">Blog</span>
              </h1>
              <p className="page-subtitle">Essays on engineering, artificial intelligence, design systems, and the future of digital business.</p>
            </motion.div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="page-section">
          <div className="container">
            <div className="grid-2">
              {posts.map((post, i) => (
                <motion.a 
                  href="#"
                  key={post.id} 
                  className="elevated-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="ec-meta">
                    <span className="ec-tag">{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="ec-title">{post.title}</h3>
                  <p className="ec-desc">{post.desc}</p>
                  <span className="ec-link">
                    Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
