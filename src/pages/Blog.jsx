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
    <div className="inner-page">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="page-eyebrow">Insights & Thoughts</span>
              <h1 className="page-title">The MediaLoop Blog</h1>
              <p className="page-subtitle">Essays on engineering, artificial intelligence, design systems, and the future of digital business.</p>
            </motion.div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="page-section">
          <div className="container">
            <div className="grid-2">
              {posts.map((post, i) => (
                <motion.div 
                  key={post.id} 
                  className="simple-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="simple-card-meta">
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="simple-card-title">{post.title}</h3>
                  <p className="simple-card-desc">{post.desc}</p>
                  <a href="#" className="simple-card-link">Read Article →</a>
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
