import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Tag, Share2, ExternalLink, BookOpen, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import SectionBackground from '../components/SectionBackground'
import '../styles/blog.css'
import '../styles/blogpost.css'

// â”€â”€â”€ ALL POSTS DATA â”€â”€â”€
export const allPosts = [
  {
    id: 1, tag: 'AI & Data', tagClass: 'ai', date: 'Jul 28, 2026', readTime: '6 min',
    title: 'The Future of Predictive Analytics in Retail',
    desc: 'How machine learning models are reshaping inventory management and demand forecasting for modern retail brands.',
    bg: '/bg/1909457_9170.jpg', author: 'Arjun Shah', authorInitials: 'AS', authorRole: 'Lead Data Scientist',
    row: 1, size: 'large',
    content: [
      { type: 'lead', text: `Retail is being transformed by predictive intelligence. The brands that survive the next decade won't just react to demand â€” they'll anticipate it. Here's how modern ML pipelines are quietly reshaping everything from store shelves to last-mile delivery.` },
      { type: 'h2', text: `The Problem with Traditional Forecasting` },
      { type: 'p', text: `For decades, retailers relied on simple heuristic rules: reorder when stock dips below X units, assume seasonality follows last year's pattern, and trust the buyer's gut. This approach worked well enough when supply chains were predictable. But the pandemic exposed its fatal flaw â€” it assumes the future looks like the past.` },
      { type: 'p', text: `Modern demand signals are far more complex. Consumer behavior is influenced by social media trends, micro-influencers, weather patterns, local events, and real-time competitive pricing. No spreadsheet formula can capture all of this.` },
      { type: 'h2', text: `Enter Machine Learning Demand Forecasting` },
      { type: 'p', text: `ML-based forecasting models, particularly gradient boosting variants like XGBoost and LightGBM, excel at capturing non-linear relationships across hundreds of features simultaneously. When trained on rich historical data, they routinely outperform ARIMA-based statistical models by 20â€“40% in mean absolute error.` },
      { type: 'callout', text: `ðŸ“Š In a deployment we ran for a multi-city apparel brand, our LightGBM model reduced inventory overstock by 34% in the first quarter â€” translating to â‚¹1.2 crore in recovered working capital.` },
      { type: 'h2', text: `The Architecture: What Makes It Work` },
      { type: 'p', text: `A production retail forecasting system is not just a model â€” it's a pipeline. The key components we've found essential: a feature store that unifies online and offline signals, a model retraining scheduler, an uncertainty quantification layer, and a feedback loop that captures actual vs. predicted variance.` },
      { type: 'p', text: `One often-overlooked component is the human-in-the-loop interface. The best systems don't replace buyers â€” they augment them with actionable, explainable recommendations. When a buyer understands why the model suggests ordering 3,000 units instead of 1,500, adoption increases dramatically.` },
      { type: 'h2', text: `What's Coming Next: Foundation Models for Retail` },
      { type: 'p', text: `Companies like Amazon and Walmart are experimenting with large-scale time-series foundation models â€” analogous to GPT but trained on billions of sales time series. For brands not at hyperscale, the practical play is to fine-tune open-source time-series models like Chronos or TimesFM on your proprietary data.` },
    ]
  },
  {
    id: 2, tag: 'Engineering', tagClass: 'eng', date: 'Jul 14, 2026', readTime: '5 min',
    title: 'Why We Bet on Framer Motion for Web Animations',
    desc: 'A deep dive into our animation stack and how we achieve 60fps experiences across all devices.',
    bg: '/bg/25537441_1dg3_egm8_211202.jpg', author: 'Dhruv Patel', authorInitials: 'DP', authorRole: 'Frontend Engineer',
    row: 1, size: 'normal',
    content: [
      { type: 'lead', text: `We've tested every major animation library on the market. After hundreds of client projects and production deployments, here's why Framer Motion became our default and why we still reach for GSAP when it matters.` },
      { type: 'h2', text: `The React Animation Landscape in 2026` },
      { type: 'p', text: `The React ecosystem has matured dramatically. Three years ago, animating anything complex meant either writing imperative GSAP code that fought React's declarative model, or accepting the performance limitations of CSS-only approaches. Today, the gap has narrowed â€” but it hasn't closed.` },
      { type: 'h2', text: `Why Framer Motion Wins for 90% of Cases` },
      { type: 'p', text: `Framer Motion's declarative API fits React's mental model perfectly. You describe what you want, not how to achieve it. The motion component wraps any HTML element and exposes initial, animate, exit, and whileHover props that compose elegantly with existing JSX.` },
      { type: 'callout', text: `âš¡ Framer Motion uses the Web Animations API under the hood where possible, offloading transforms and opacity changes to the GPU compositor thread â€” keeping your JavaScript thread free for logic.` },
      { type: 'h2', text: `When We Still Reach for GSAP` },
      { type: 'p', text: `GSAP remains unmatched for timeline-based, sequence-heavy animations â€” think scroll-driven storytelling, pinned sections, and complex SVG morphs. ScrollTrigger is simply the best scroll animation primitive available. We use GSAP + Framer Motion together on most large projects.` },
    ]
  },
  {
    id: 3, tag: 'Design', tagClass: 'design', date: 'Jun 30, 2026', readTime: '4 min',
    title: 'Editorial Aesthetic in B2B SaaS',
    desc: 'Moving away from generic dashboards towards trust-building, typography-driven interfaces.',
    bg: '/bg/27287259_z69i_kxes_211202.jpg', author: 'Meera Iyer', authorInitials: 'MI', authorRole: 'Head of Design',
    row: 2, size: 'normal',
    content: [
      { type: 'lead', text: `B2B SaaS has a design problem. Most products look identical â€” a navigation sidebar, a data table, a few modals, and a KPI dashboard. This sameness isn't just boring. It's a missed opportunity to build brand trust at every interaction.` },
      { type: 'h2', text: `The Tyranny of the Dashboard` },
      { type: 'p', text: `The conventional wisdom in enterprise software has been: "Don't be clever, be clear." Prioritise information density, use familiar patterns, and never surprise the user. This philosophy produced an entire generation of indistinguishable products â€” competent, but unmemorable.` },
      { type: 'p', text: `Premium editorial publications take the opposite approach. They understand that the medium is the message. How you present information signals your values, expertise, and attention to detail just as much as the content itself.` },
      { type: 'h2', text: `Principles of Editorial Design for SaaS` },
      { type: 'p', text: `The shift starts with typography. Moving from system fonts to a carefully chosen type pairing immediately elevates perceived quality. We've found that a strong serif or high-optically-adjusted grotesque for headings, paired with a humanist sans for body text, creates the sense of authority that builds trust with enterprise buyers.` },
      { type: 'callout', text: `âœï¸ In our redesign of a legal-tech dashboard, we replaced the generic sans-serif stack with Bricolage Grotesque + Nunito. The client reported a 22% increase in demo-to-close conversion rate within 60 days.` },
    ]
  },
  {
    id: 4, tag: 'Automation', tagClass: 'auto', date: 'Jun 10, 2026', readTime: '7 min',
    title: 'Zero-Touch Workflows: A Logistics Case Study',
    desc: 'How we helped a logistics firm reduce manual processing time by 90% using custom API orchestration and RPA.',
    bg: '/bg/840867_1242.jpg', author: 'Karan Desai', authorInitials: 'KD', authorRole: 'Automation Architect',
    row: 2, size: 'large',
    content: [
      { type: 'lead', text: `Six months ago, a mid-size logistics company came to us with a familiar problem: their operations team was drowning in manual data entry. We built a zero-touch workflow system. Here's exactly how we did it.` },
      { type: 'h2', text: `Mapping the Problem: The Manual Work Audit` },
      { type: 'p', text: `Before writing a single line of code, we spent a week shadowing operations staff. We timed every manual task, documented every system touchpoint, and identified the highest-volume, most-repetitive workflows. The audit revealed that 73% of manual time was consumed by just 5 process types.` },
      { type: 'h2', text: `The Architecture: APIs First, RPA as Last Resort` },
      { type: 'p', text: `Our philosophy is: use native APIs where they exist, and only reach for RPA when a system has no API and the process is business-critical. In this project, 4 of 5 workflows were automatable via APIs â€” the TMS had a REST API, the accounting software had webhooks, and carrier portals offered EDI integration.` },
      { type: 'callout', text: `ðŸš€ The result: 90% reduction in manual processing time. The operations team went from spending 4 hours per person per day on data entry to less than 25 minutes â€” 3.5 hours redirected to higher-value work.` },
      { type: 'h2', text: `Key Lessons for Automation Projects` },
      { type: 'p', text: `The biggest lesson: automation projects fail not because of technical complexity, but because of change management. The operations team was initially skeptical â€” worried about job security and loss of control. We addressed this by involving them in the design process and building transparent exception dashboards.` },
    ]
  },
  {
    id: 5, tag: 'Engineering', tagClass: 'eng', date: 'May 28, 2026', readTime: '5 min',
    title: 'GSAP vs Framer Motion: When to Use Which',
    desc: 'A practical comparison of two animation powerhouses and the decision framework we use on every project.',
    bg: '/bg/beautiful-tree-countryside.jpg', author: 'Arjun Shah', authorInitials: 'AS', authorRole: 'Lead Frontend Engineer',
    row: 2, size: 'normal',
    content: [
      { type: 'lead', text: `Both GSAP and Framer Motion are exceptional animation tools. Choosing between them â€” or knowing when to use both â€” is one of the most common questions our team gets. Here's our decision framework, refined across 60+ production projects.` },
      { type: 'h2', text: `The Core Difference` },
      { type: 'p', text: `GSAP is imperative. You control the exact timing, easing, and sequence of every animation through JavaScript. Framer Motion is declarative â€” you describe the desired state and let the library figure out how to get there. Neither is universally better. The right choice depends on what you're animating and who's writing the code.` },
      { type: 'h2', text: `Our Decision Framework` },
      { type: 'p', text: `Use GSAP when: you need scroll-driven animations, you're animating SVG paths or morphs, you need precise timeline sequencing, or you're working outside of React. Use Framer Motion when: you're building React component transitions, you need shared layout animations, or your team prefers a declarative mental model.` },
      { type: 'callout', text: `ðŸ’¡ Our actual stack: GSAP for scroll orchestration and page-level storytelling. Framer Motion for component lifecycle animations, route transitions, and micro-interactions. Both, working together, in the same codebase.` },
    ]
  },
  {
    id: 6, tag: 'Business', tagClass: 'biz', date: 'May 12, 2026', readTime: '6 min',
    title: 'From Agency to Product: The Transition Playbook',
    desc: `Lessons from our journey building internal SaaS products alongside client work â€” what worked and what didn't.`,
    bg: '/bg/closeup-shot-colorful-autumn-leaves-garden.jpg', author: 'Riya Mehta', authorInitials: 'RM', authorRole: 'Co-Founder & CEO',
    row: 3, size: 'normal',
    content: [
      { type: 'lead', text: `Every agency eventually asks the same question: should we build a product? The promise is compelling â€” recurring revenue, scalable value. The reality is considerably messier. Here's what we learned from our first two attempts.` },
      { type: 'h2', text: `Why Agencies Try (and Usually Fail)` },
      { type: 'p', text: `The agency-to-product transition has a notoriously low success rate. The skills that make a great client services team â€” adaptability, rapid context-switching â€” are actually counterproductive for focused product development.` },
      { type: 'h2', text: `What Actually Worked` },
      { type: 'p', text: `Our second attempt started differently: we identified a workflow pain we'd observed across at least 15 client projects, validated it with 20 discovery calls before writing a line of code, and built a waitlist of 400 before launch.` },
      { type: 'callout', text: `ðŸ“Œ The one rule that changed everything: treat the product as a separate business unit with its own P&L, its own dedicated team, and its own OKRs. The moment it becomes "the engineering team's side project," it's already dead.` },
    ]
  },
  {
    id: 7, tag: 'AI & Data', tagClass: 'ai', date: 'Apr 22, 2026', readTime: '9 min',
    title: 'RAG Systems in Production: Real Lessons',
    desc: `What Retrieval-Augmented Generation looks like when it leaves the notebook and hits real-world data pipelines.`,
    bg: '/bg/dry-tree-with-orange-clouds-background.jpg', author: 'Dhruv Patel', authorInitials: 'DP', authorRole: 'AI Systems Engineer',
    row: 3, size: 'normal',
    content: [
      { type: 'lead', text: `RAG (Retrieval-Augmented Generation) is one of the most powerful techniques in the modern AI practitioner's toolkit. The gap between a RAG demo that impresses in a notebook and a production RAG system that reliably serves real users is enormous. Here's what we've learned building several of them.` },
      { type: 'h2', text: `What RAG Actually Is (And Isn't)` },
      { type: 'p', text: `At its core, RAG is simple: instead of relying purely on the knowledge baked into an LLM's weights, you retrieve relevant information from an external knowledge base at query time and inject it into the context window. This solves the hallucination problem for factual queries.` },
      { type: 'h2', text: `The Hard Part: Retrieval Quality` },
      { type: 'p', text: `The most common failure mode in RAG systems isn't the generation step â€” it's the retrieval step. Naive implementations use simple semantic similarity and assume it's sufficient. In production, you need hybrid retrieval: semantic search combined with BM25 keyword matching, metadata filtering, and re-ranking using a cross-encoder model.` },
      { type: 'callout', text: `ðŸ” Moving from pure vector retrieval to a hybrid retrieval + re-ranking pipeline increased answer accuracy from 61% to 84% on our evaluation dataset â€” a 23-point improvement with no changes to the generation model.` },
      { type: 'h2', text: `Chunking Strategy Matters More Than You Think` },
      { type: 'p', text: `How you break documents into chunks profoundly affects retrieval quality. Fixed-size character chunking performs poorly. Better approaches include semantic chunking, hierarchical chunking, and proposition-based chunking â€” decomposing documents into atomic factual claims.` },
    ]
  },
]

// â”€â”€â”€ CONTENT RENDERER â”€â”€â”€
function ArticleContent({ blocks }) {
  return (
    <div className="bp-article-body">
      {blocks.map((block, i) => {
        if (block.type === 'lead') return <p key={i} className="bp-lead">{block.text}</p>
        if (block.type === 'h2') return <h2 key={i} className="bp-h2">{block.text}</h2>
        if (block.type === 'h3') return <h3 key={i} className="bp-h3">{block.text}</h3>
        if (block.type === 'p') return <p key={i} className="bp-p">{block.text}</p>
        if (block.type === 'callout') return <div key={i} className="bp-callout">{block.text}</div>
        return null
      })}
    </div>
  )
}

export default function BlogPost() {
  const { id } = useParams()
  const post = allPosts.find(p => p.id === parseInt(id))
  const related = allPosts.filter(p => p.id !== parseInt(id)).slice(0, 3)

  if (!post) {
    return (
      <div className="blog-page">
        <Navbar />
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <h1 style={{ fontFamily: 'Bricolage Grotesque', fontSize: 48, color: 'var(--text)' }}>Article Not Found</h1>
          <Link to="/blog" className="bp-back-btn">â† Back to Blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="blog-page bp-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="bp-progress-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      />

      <main>
        {/* â”€â”€â”€ HERO â”€â”€â”€ */}
        <section className="bp-hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground
            lightSrc="/bg/sections/light_bg/floating-glass-panels-light.jpeg"
            darkSrc="/bg/sections/dark_bg/neural-ecosystem-dark.jpeg"
            opacity={0.4}
          />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              className="bp-hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/blog" className="bp-back-btn">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

              <div className="bp-meta-row">
                <span className={`bp-tag ${post.tagClass}`}>{post.tag}</span>
                <span className="bp-meta-item"><Calendar size={13} />{post.date}</span>
                <span className="bp-meta-item"><Clock size={13} />{post.readTime} read</span>
              </div>

              <h1 className="bp-title">{post.title}</h1>
              <p className="bp-subtitle">{post.desc}</p>

              <div className="bp-author-row">
                <div className="bp-author">
                  <div className="bp-author-avatar">{post.authorInitials}</div>
                  <div>
                    <div className="bp-author-name">{post.author}</div>
                    <div className="bp-author-role">{post.authorRole}</div>
                  </div>
                </div>
                <div className="bp-share">
                  <span className="bp-share-label">Share</span>
                  <button className="bp-share-btn"><ExternalLink size={16} /></button>
                  <button className="bp-share-btn"><Share2 size={16} /></button>
                  <button className="bp-share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}><Share2 size={16} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* â”€â”€â”€ COVER IMAGE â”€â”€â”€ */}
        <div className="bp-cover-wrap">
          <div className="container">
            <motion.div
              className="bp-cover"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            >
              <img src={post.bg} alt={post.title} className="bp-cover-img" />
              <div className="bp-cover-overlay" />
            </motion.div>
          </div>
        </div>

        {/* â”€â”€â”€ ARTICLE BODY â”€â”€â”€ */}
        <div className="bp-body-wrap">
          <div className="container">
            <div className="bp-layout">
              <motion.article
                className="bp-main"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <ArticleContent blocks={post.content} />

                <div className="bp-article-footer">
                  <div className="bp-article-tags">
                    <Tag size={14} />
                    <span className={`bp-tag ${post.tagClass}`}>{post.tag}</span>
                  </div>
                  <div className="bp-share">
                    <span className="bp-share-label">Share article</span>
                    <button className="bp-share-btn"><ExternalLink size={16} /></button>
                    <button className="bp-share-btn"><Share2 size={16} /></button>
                    <button className="bp-share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}><Share2 size={16} /></button>
                  </div>
                </div>
              </motion.article>

              <aside className="bp-sidebar">
                <div className="bp-sidebar-sticky">
                  <div className="bp-author-box">
                    <div className="bp-author-box-avatar">{post.authorInitials}</div>
                    <div className="bp-author-box-name">{post.author}</div>
                    <div className="bp-author-box-role">{post.authorRole}</div>
                    <p className="bp-author-box-bio">
                      Part of the MediaLoop core team, specializing in data-driven digital products and scalable system architecture.
                    </p>
                  </div>

                  <div className="bp-toc">
                    <div className="bp-toc-label"><BookOpen size={14} />In this article</div>
                    {post.content.filter(b => b.type === 'h2').map((h, i) => (
                      <div key={i} className="bp-toc-item">
                        <span className="bp-toc-num">0{i + 1}</span>
                        <span className="bp-toc-text">{h.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* â”€â”€â”€ RELATED ARTICLES â”€â”€â”€ */}
        <section className="bp-related" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground
            lightSrc="/bg/sections/light_bg/abstract-liquid-light.jpeg"
            darkSrc="/bg/sections/dark_bg/gradient-ribbons-dark.jpeg"
            opacity={0.35}
          />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="bp-related-header">
              <h2 className="bp-related-title">More from the Blog</h2>
              <Link to="/blog" className="blog-view-all">View All <ArrowRight size={14} /></Link>
            </div>
            <div className="bp-related-grid">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link to={`/blog/${rp.id}`} className="blog-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="blog-card-img-wrap">
                      <img src={rp.bg} alt={rp.title} className="blog-card-img" />
                      <div className="blog-card-img-overlay" />
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-card-top">
                        <span className={`blog-card-tag ${rp.tagClass}`}>{rp.tag}</span>
                        <span className="blog-card-date">{rp.date}</span>
                      </div>
                      <h3 className="blog-card-title">{rp.title}</h3>
                      <p className="blog-card-desc">{rp.desc}</p>
                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <div className="blog-card-avatar-placeholder">{rp.authorInitials}</div>
                          <span className="blog-card-author-name">{rp.author}</span>
                        </div>
                        <div className="blog-card-read-time"><Clock size={12} />{rp.readTime}</div>
                      </div>
                    </div>
                  </Link>
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

