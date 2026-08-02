import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Clock, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import SectionBackground from '../components/SectionBackground'
import '../styles/blog.css'

// ─── DATA ───
const categories = ['All', 'AI & Data', 'Engineering', 'Design', 'Automation', 'Business']

const featuredPost = {
  tag: 'AI & Data',
  date: 'Aug 1, 2026',
  readTime: '8 min read',
  title: 'How Large Language Models Are Rewriting the Rules of Digital Marketing',
  desc: 'A deep dive into prompt engineering, semantic search, and AI-native content workflows that are changing how agencies operate at scale.',
  bg: '/bg/ai_automation.jpeg',
  author: 'Riya Mehta',
  authorInitials: 'RM',
}

const posts = [
  {
    id: 1,
    tag: 'AI & Data',
    tagClass: 'ai',
    date: 'Jul 28, 2026',
    readTime: '6 min',
    title: 'The Future of Predictive Analytics in Retail',
    desc: 'How machine learning models are reshaping inventory management and demand forecasting for modern retail brands.',
    bg: '/bg/1909457_9170.jpg',
    author: 'Arjun Shah',
    authorInitials: 'AS',
    row: 1, size: 'large'
  },
  {
    id: 2,
    tag: 'Engineering',
    tagClass: 'eng',
    date: 'Jul 14, 2026',
    readTime: '5 min',
    title: 'Why We Bet on Framer Motion for Web Animations',
    desc: 'A deep dive into our animation stack and how we achieve 60fps experiences across all devices.',
    bg: '/bg/25537441_1dg3_egm8_211202.jpg',
    author: 'Dhruv Patel',
    authorInitials: 'DP',
    row: 1, size: 'normal'
  },
  {
    id: 3,
    tag: 'Design',
    tagClass: 'design',
    date: 'Jun 30, 2026',
    readTime: '4 min',
    title: 'Editorial Aesthetic in B2B SaaS',
    desc: 'Moving away from generic dashboards towards trust-building, typography-driven interfaces.',
    bg: '/bg/27287259_z69i_kxes_211202.jpg',
    author: 'Meera Iyer',
    authorInitials: 'MI',
    row: 2, size: 'normal'
  },
  {
    id: 4,
    tag: 'Automation',
    tagClass: 'auto',
    date: 'Jun 10, 2026',
    readTime: '7 min',
    title: 'Zero-Touch Workflows: A Logistics Case Study',
    desc: 'How we helped a logistics firm reduce manual processing time by 90% using custom API orchestration and RPA.',
    bg: '/bg/840867_1242.jpg',
    author: 'Karan Desai',
    authorInitials: 'KD',
    row: 2, size: 'large'
  },
  {
    id: 5,
    tag: 'Engineering',
    tagClass: 'eng',
    date: 'May 28, 2026',
    readTime: '5 min',
    title: 'GSAP vs Framer Motion: When to Use Which',
    desc: 'A practical comparison of two animation powerhouses and the decision framework we use on every project.',
    bg: '/bg/beautiful-tree-countryside.jpg',
    author: 'Arjun Shah',
    authorInitials: 'AS',
    row: 2, size: 'normal'
  },
  {
    id: 6,
    tag: 'Business',
    tagClass: 'biz',
    date: 'May 12, 2026',
    readTime: '6 min',
    title: 'From Agency to Product: The Transition Playbook',
    desc: 'Lessons from our journey building internal SaaS products alongside client work — what worked and what didn\'t.',
    bg: '/bg/closeup-shot-colorful-autumn-leaves-garden.jpg',
    author: 'Riya Mehta',
    authorInitials: 'RM',
    row: 3, size: 'normal'
  },
  {
    id: 7,
    tag: 'AI & Data',
    tagClass: 'ai',
    date: 'Apr 22, 2026',
    readTime: '9 min',
    title: 'RAG Systems in Production: Real Lessons',
    desc: 'What Retrieval-Augmented Generation looks like when it leaves the notebook and hits real-world data pipelines.',
    bg: '/bg/dry-tree-with-orange-clouds-background.jpg',
    author: 'Dhruv Patel',
    authorInitials: 'DP',
    row: 3, size: 'normal'
  },
]

const trendingPosts = [
  {
    num: '01',
    tag: 'AI & Data',
    title: "The Prompt Engineer's Guide to Brand Voice",
    date: 'Jul 5, 2026',
    readTime: '4 min',
  },
  {
    num: '02',
    tag: 'Design',
    title: '10 Typography Rules That Make Great SaaS UIs',
    date: 'Jun 18, 2026',
    readTime: '5 min',
  },
  {
    num: '03',
    tag: 'Engineering',
    title: 'Monorepos with Turborepo: Is it Worth It?',
    date: 'May 30, 2026',
    readTime: '6 min',
  },
]

const topics = [
  { name: 'AI & Data', icon: '🤖', count: 14, cls: 'ai' },
  { name: 'Design', icon: '🎨', count: 9, cls: 'design' },
  { name: 'Engineering', icon: '⚙️', count: 18, cls: 'eng' },
  { name: 'Automation', icon: '⚡', count: 7, cls: 'auto' },
]

// ─── ARTICLE CARD COMPONENT ───
function BlogCard({ post, className = '' }) {
  return (
    <motion.a
      href="#"
      className={`blog-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={`blog-card-img-wrap ${post.size === 'large' ? 'tall' : ''}`}>
        <img src={post.bg} alt={post.title} className="blog-card-img" />
        <div className="blog-card-img-overlay" />
      </div>
      <div className="blog-card-body">
        <div className="blog-card-top">
          <span className={`blog-card-tag ${post.tagClass}`}>{post.tag}</span>
          <span className="blog-card-date">{post.date}</span>
        </div>
        <h3 className={`blog-card-title ${post.size === 'large' ? 'large' : ''}`}>{post.title}</h3>
        <p className="blog-card-desc">{post.desc}</p>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="blog-card-avatar-placeholder">{post.authorInitials}</div>
            <span className="blog-card-author-name">{post.author}</span>
          </div>
          <div className="blog-card-read-time">
            <Clock size={12} />
            {post.readTime}
          </div>
        </div>
      </div>
    </motion.a>
  )
}

// ─── MAIN BLOG PAGE ───
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.tag === activeCategory)

  const row1 = filteredPosts.filter(p => p.row === 1)
  const row2 = filteredPosts.filter(p => p.row === 2)
  const row3 = filteredPosts.filter(p => p.row === 3)

  const tickerItems = ['AI & Data', 'Engineering', 'Design', 'Automation', 'Strategy', 'Web Dev', 'Case Studies', 'Product']

  return (
    <div className="blog-page">
      <CustomCursor />
      <Navbar />

      <main>
        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
        <section className="blog-hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground
            lightSrc="/bg/sections/light_bg/floating-glass-panels-light.jpeg"
            darkSrc="/bg/sections/dark_bg/neural-ecosystem-dark.jpeg"
            opacity={0.5}
          />

          <div className="blog-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="blog-eyebrow">
                <span className="blog-eyebrow-dot" />
                Insights & Perspectives
              </div>
              <h1 className="blog-hero-title">
                The MediaLoop<br />
                <span className="gradient-text">Blog.</span>
              </h1>
              <p className="blog-hero-sub">
                Essays on engineering, artificial intelligence, design systems, and the future of digital business — written by the people building it.
              </p>
              <div className="blog-hero-meta">
                <span>24 Articles</span>
                <div className="blog-hero-meta-divider" />
                <span>4 Categories</span>
                <div className="blog-hero-meta-divider" />
                <span>Weekly Updates</span>
              </div>
            </motion.div>
          </div>

          <div className="blog-hero-scroll-indicator">
            <div className="blog-hero-scroll-line" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TICKER
        ═══════════════════════════════════════════ */}
        <div className="blog-ticker">
          <div className="blog-ticker-track">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="blog-ticker-item">
                <span className="blog-ticker-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            FEATURED POST
        ═══════════════════════════════════════════ */}
        <section className="blog-featured">
          <div className="container">
            <motion.a
              href="#"
              className="blog-featured-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="blog-featured-label">Featured Story</div>
              <img src={featuredPost.bg} alt={featuredPost.title} className="blog-featured-bg" />
              <div className="blog-featured-gradient" />
              <div className="blog-featured-content">
                <div className="blog-featured-tag">
                  <TrendingUp size={12} />
                  {featuredPost.tag}
                </div>
                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <div className="blog-featured-meta">
                  <span>{featuredPost.author}</span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className="blog-featured-read">
                <ArrowRight size={22} />
              </div>
            </motion.a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CATEGORY FILTERS
        ═══════════════════════════════════════════ */}
        <section className="blog-filters">
          <div className="container">
            <div className="blog-filter-inner">
              <span className="blog-filter-label">Filter by</span>
              <div className="blog-filter-pills">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`blog-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="blog-count">{filteredPosts.length} articles</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ARTICLES GRID — Masonry-style rows
        ═══════════════════════════════════════════ */}
        <section className="blog-grid-section">
          <div className="container">
            <div className="blog-section-title-row">
              <h2 className="blog-section-heading">
                All Articles <span>{filteredPosts.length} published</span>
              </h2>
              <a href="#" className="blog-view-all">
                See All <ArrowRight size={14} />
              </a>
            </div>

            {row1.length > 0 && (
              <div className="blog-grid-row-1">
                {row1.map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            )}

            {row2.length > 0 && (
              <div className="blog-grid-row-2">
                {row2.map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            )}

            {row3.length > 0 && (
              <div className="blog-grid-row-3">
                {row3.map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            )}

            {filteredPosts.length === 0 && (
              <motion.div
                style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <BookOpen size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                <p>No articles in this category yet. Check back soon!</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            EDITORIAL QUOTE STRIP
        ═══════════════════════════════════════════ */}
        <section className="blog-quote-strip" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground
            lightSrc="/bg/sections/light_bg/floating-silk-fabric-light.jpeg"
            darkSrc="/bg/sections/dark_bg/gradient-ribbons-dark.jpeg"
            opacity={0.45}
          />
          <div className="blog-quote-content" style={{ position: 'relative', zIndex: 2 }}>
            <motion.p
              className="blog-quote-text"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "The companies that will dominate the next decade are not those with the most data — but those who can turn insight into action, faster than anyone else."
            </motion.p>
            <div className="blog-quote-author">
              <div className="blog-quote-author-line" />
              <span>The MediaLoop Editorial Team</span>
              <div className="blog-quote-author-line" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TRENDING POSTS — Horizontal strip
        ═══════════════════════════════════════════ */}
        <section className="blog-trending">
          <div className="container">
            <div className="blog-section-title-row">
              <h2 className="blog-section-heading">
                Trending This Week
              </h2>
            </div>
            <div className="blog-trending-grid">
              {trendingPosts.map((t, i) => (
                <>
                  <motion.a
                    key={t.num}
                    href="#"
                    className="blog-trending-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="blog-trending-num">{t.num}</div>
                    <div className="blog-trending-tag">{t.tag}</div>
                    <div className="blog-trending-title">{t.title}</div>
                    <div className="blog-trending-meta">{t.date} · {t.readTime} read</div>
                  </motion.a>
                  {i < trendingPosts.length - 1 && <div className="blog-trending-divider" />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            EXPLORE BY TOPIC
        ═══════════════════════════════════════════ */}
        <section className="blog-topics" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground
            lightSrc="/bg/sections/light_bg/abstract-liquid-light.jpeg"
            darkSrc="/bg/sections/dark_bg/abstract-liquid-dark.jpeg"
            opacity={0.4}
          />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="blog-section-title-row">
              <h2 className="blog-section-heading">Explore by Topic</h2>
              <a href="#" className="blog-view-all">
                Browse All <ArrowRight size={14} />
              </a>
            </div>
            <div className="blog-topics-grid">
              {topics.map((topic, i) => (
                <motion.a
                  key={topic.name}
                  href="#"
                  className={`blog-topic-card ${topic.cls}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="blog-topic-icon">{topic.icon}</span>
                  <div className="blog-topic-name">{topic.name}</div>
                  <div className="blog-topic-count">{topic.count} articles</div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            NEWSLETTER SECTION
        ═══════════════════════════════════════════ */}
        <section className="blog-newsletter">
          <div className="container">
            <motion.div
              className="blog-newsletter-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="blog-newsletter-eyebrow">Stay in the Loop</div>
                <h2 className="blog-newsletter-title">
                  Get our freshest insights<br />
                  <span className="gradient-text">every week.</span>
                </h2>
                <p className="blog-newsletter-desc">
                  Join 2,400+ founders, engineers, and marketers who get our curated newsletter on AI, design, and digital growth.
                </p>
              </div>
              <div>
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Bricolage Grotesque' }}>You're in!</p>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', fontFamily: 'Nunito', marginTop: 8 }}>Check your inbox for a welcome email.</p>
                  </motion.div>
                ) : (
                  <form
                    className="blog-newsletter-form"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (email) setSubscribed(true)
                    }}
                  >
                    <div className="blog-newsletter-input-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="blog-newsletter-input"
                        required
                      />
                      <button type="submit" className="blog-newsletter-btn">
                        Subscribe
                      </button>
                    </div>
                    <p className="blog-newsletter-privacy">
                      No spam, ever. We publish once a week. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
