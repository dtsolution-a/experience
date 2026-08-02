import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, X, ArrowUpRight, Search, PenTool, Cpu, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import '../styles/services.css'

gsap.registerPlugin(ScrollTrigger)

const heroBgImages = [
  '/bg/sections/dark_bg/neural-ecosystem-dark.jpeg',
  '/bg/sections/dark_bg/neural-ecosystem-dark-alt.jpeg',
  '/bg/sections/dark_bg/abstract-liquid-dark.jpeg',
  '/bg/sections/dark_bg/gradient-ribbons-dark.jpeg',
]

// ... keeping existing data ...
const servicesData = [
  {
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns, SEO, and social strategies that dominate search algorithms and engage target audiences.',
    bg: '/bg/digital_marketing.jpeg',
    tags: ['SEO', 'PPC', 'Content Strategy', 'Social Media']
  },
  {
    title: 'Web Development',
    desc: 'Premium, high-performance web applications built on modern stacks. Fast, accessible, and designed for conversion.',
    bg: '/bg/web_dev.jpeg',
    tags: ['React / Next.js', 'Headless CMS', 'Web Animations', 'E-commerce']
  },
  {
    title: 'AI & Automation',
    desc: 'Integrating Large Language Models and RPA to automate workflows, reduce overhead, and scale operations intelligently.',
    bg: '/bg/ai_automation.jpeg',
    tags: ['LLM Integration', 'RAG Systems', 'Process Automation', 'Custom AI Agents']
  },
  {
    title: 'Custom Development',
    desc: 'Bespoke software architecture for complex business logic. Cloud-native solutions that grow with your enterprise.',
    bg: '/bg/custom_dev.jpeg',
    tags: ['Cloud Architecture', 'API Development', 'Microservices', 'Enterprise Software']
  }
]

const specialists = [
  { role: 'SEO Experts', icon: <Search size={28} />, desc: 'Masters of organic growth, outsmarting search algorithms to put your brand at the top.' },
  { role: 'UI/UX Architects', icon: <PenTool size={28} />, desc: 'Designing buttery-smooth interfaces that prioritize conversion and user delight.' },
  { role: 'AI Engineers', icon: <Cpu size={28} />, desc: 'Building smart, scalable automation to give your business a competitive edge.' },
  { role: 'Virtual CTOs', icon: <ShieldCheck size={28} />, desc: 'Providing strategic technical leadership and architectural oversight for complex builds.' }
]

const faqs = [
  { q: 'How long does a typical web project take?', a: 'Depending on complexity, a bespoke web application typically takes between 6 to 12 weeks from strategy to deployment.' },
  { q: 'Do you offer post-launch support?', a: 'Yes. We believe deployment is just the beginning. We offer scalable retainers for maintenance, SEO optimization, and feature iterations.' },
  { q: 'Can you integrate AI into our existing software?', a: 'Absolutely. We specialize in retrofitting legacy systems with modern AI capabilities, including LLMs and RAG pipelines.' },
  { q: 'What is your technology stack?', a: 'We primarily build on the JavaScript/TypeScript ecosystem using React, Next.js, Node.js, and modern cloud infrastructure (AWS/Vercel).' }
]

export default function ServicesPage() {
  const horizontalRef = useRef(null)
  const containerRef = useRef(null)

  const [activeFaq, setActiveFaq] = useState(null)
  const [heroBg, setHeroBg] = useState('')

  useEffect(() => {
    setHeroBg(heroBgImages[Math.floor(Math.random() * heroBgImages.length)])
  }, [])

  useEffect(() => {
    // GSAP Context for proper React lifecycle & route transitions
    let ctx = gsap.context(() => {
      const container = containerRef.current
      if (window.innerWidth > 900 && container && horizontalRef.current) {
        const scrollAmount = container.scrollWidth - window.innerWidth

        gsap.to(container, {
          x: -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        // Parallax on Cards Background
        const cards = gsap.utils.toArray('.srv-card-bg')
        cards.forEach(card => {
          gsap.to(card, {
            x: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalRef.current,
              start: 'top top',
              end: `+=${scrollAmount}`,
              scrub: 1
            }
          })
        })
      }
    }, containerRef)

    // Force ScrollTrigger refresh after client-side route animation completes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <div className="services-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, background: 'var(--bg)', marginBottom: 'var(--footer-height, 400px)' }}>

        {/* HERO SECTION */}
        <section className="srv-hero">
          {heroBg && (
            <motion.img
              src={heroBg}
              alt=""
              className="srv-hero-bg"
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(40px) brightness(0.6)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(0.8)' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          )}
          <div className="srv-hero-overlay"></div>

          {/* Ambient Glowing Orbs */}
          <div className="srv-hero-orb srv-hero-orb-1"></div>
          <div className="srv-hero-orb srv-hero-orb-2"></div>

          {/* Floating Tech Badges around Hero */}
          <motion.div 
            className="srv-floating-pill pill-pos-1"
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="srv-floating-pill-icon">⚡</span>
            <span>AI & Machine Learning</span>
          </motion.div>

          <motion.div 
            className="srv-floating-pill pill-pos-2"
            animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="srv-floating-pill-icon">🌐</span>
            <span>Cloud Architecture</span>
          </motion.div>

          <motion.div 
            className="srv-floating-pill pill-pos-3"
            animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span className="srv-floating-pill-icon">✨</span>
            <span>60fps Web Craft</span>
          </motion.div>

          <motion.div 
            className="srv-floating-pill pill-pos-4"
            animate={{ y: [0, 12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            <span className="srv-floating-pill-icon">🔒</span>
            <span>Enterprise Systems</span>
          </motion.div>

          <div className="srv-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="srv-badge">
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-1)', marginRight: 8, boxShadow: '0 0 8px var(--accent-1)' }} />
                Digital Craftsmanship & Architecture
              </div>
              
              <h1 className="srv-title">
                Engineering<br />
                <span className="srv-title-gradient">Ecosystems.</span>
              </h1>
              
              <p className="srv-desc">
                We merge creative vision with deep technical architecture. Our services are engineered to scale, adapt, and dominate in the modern digital landscape.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <a href="#services-gallery" className="btn-primary nav-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Explore Specializations <ArrowUpRight size={16} />
                </a>
                <a href="/contact" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Start a Project
                </a>
              </div>
            </motion.div>
          </div>

          {/* Hero Bottom Capabilities Strip */}
          <div className="srv-hero-bottom-strip">
            <div className="srv-hero-stat-item">
              <span className="srv-hero-stat-dot" />
              <span>01. Digital Marketing</span>
            </div>
            <div className="srv-hero-stat-divider" />
            <div className="srv-hero-stat-item">
              <span className="srv-hero-stat-dot" />
              <span>02. Web Development</span>
            </div>
            <div className="srv-hero-stat-divider" />
            <div className="srv-hero-stat-item">
              <span className="srv-hero-stat-dot" />
              <span>03. AI & Automation</span>
            </div>
            <div className="srv-hero-stat-divider" />
            <div className="srv-hero-stat-item">
              <span className="srv-hero-stat-dot" />
              <span>04. Custom Dev</span>
            </div>
          </div>
        </section>

        {/* HORIZONTAL SCROLL GALLERY */}
        <section className="srv-horizontal-section" id="services-gallery" ref={horizontalRef}>
          <div className="srv-horizontal-container" ref={containerRef}>
            {servicesData.map((srv, idx) => (
              <div className="srv-card" key={idx}>
                <img src={srv.bg} alt={srv.title} className="srv-card-bg" />
                <div className="srv-card-overlay"></div>
                <div className="srv-card-content">
                  <h2 className="srv-card-title">{srv.title}</h2>
                  <p className="srv-card-desc">{srv.desc}</p>
                  <div className="srv-card-features">
                    {srv.tags.map((tag, i) => (
                      <span key={i} className="srv-feature-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPECIALISTS (WHO DOES WHAT) */}
        <section className="srv-specialists" style={{ background: 'transparent', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="srv-section-header">
              <h2 className="srv-section-title">The Masters Behind the Craft</h2>
              <p className="srv-section-sub">Meet the dedicated specialists driving your digital evolution.</p>
            </div>
            
            <div className="srv-specialist-grid">
              {specialists.map((spec, idx) => (
                <motion.div 
                  className="srv-spec-card"
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className="srv-spec-icon">{spec.icon}</div>
                  <h3 className="srv-spec-title">{spec.role}</h3>
                  <p className="srv-spec-desc">{spec.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK MATRIX */}
        <section className="srv-tech-stack" style={{ position: 'relative', overflow: 'hidden' }}>
          <SectionBackground 
            lightSrc="/bg/sections/light_bg/floating-silk-fabric-light.jpeg"
            darkSrc="/bg/sections/dark_bg/gradient-ribbons-dark.jpeg"
            opacity={0.35}
          />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="srv-tech-stack-header">
              <div className="srv-tech-stack-eyebrow">
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-3)', marginRight: 4 }} />
                Architecture & Tech Matrix
              </div>
              <h2 className="srv-tech-stack-title">Engineered with Battle-Tested Stacks.</h2>
              <p className="srv-tech-stack-sub">
                We don't experiment on client budgets. We deploy enterprise-grade, high-throughput modern technology stacks.
              </p>
            </div>

            {/* Dual Track Marquee */}
            <div className="srv-marquee-wrapper">
              <div className="srv-marquee-track srv-marquee-track-left">
                {[
                  { name: 'React 19', icon: '⚛️', tag: 'Frontend' },
                  { name: 'Next.js 15', icon: '▲', tag: 'Fullstack' },
                  { name: 'TypeScript', icon: '🔷', tag: 'Language' },
                  { name: 'OpenAI & LLMs', icon: '🤖', tag: 'AI Engine' },
                  { name: 'GSAP Motion', icon: '⚡', tag: 'Animation' },
                  { name: 'Node.js', icon: '🟢', tag: 'Backend' },
                  { name: 'React 19', icon: '⚛️', tag: 'Frontend' },
                  { name: 'Next.js 15', icon: '▲', tag: 'Fullstack' },
                  { name: 'TypeScript', icon: '🔷', tag: 'Language' },
                  { name: 'OpenAI & LLMs', icon: '🤖', tag: 'AI Engine' },
                  { name: 'GSAP Motion', icon: '⚡', tag: 'Animation' },
                  { name: 'Node.js', icon: '🟢', tag: 'Backend' },
                ].map((item, i) => (
                  <div key={i} className="srv-tech-card">
                    <span className="srv-tech-card-icon">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="srv-tech-card-badge">{item.tag}</span>
                  </div>
                ))}
              </div>

              <div className="srv-marquee-track srv-marquee-track-right">
                {[
                  { name: 'AWS Infrastructure', icon: '☁️', tag: 'Cloud' },
                  { name: 'Python & PyTorch', icon: '🐍', tag: 'ML Stack' },
                  { name: 'PostgreSQL', icon: '🐘', tag: 'Database' },
                  { name: 'Framer Motion', icon: '🎨', tag: 'Interactions' },
                  { name: 'GraphQL & REST', icon: '🕸️', tag: 'APIs' },
                  { name: 'Docker & K8s', icon: '🐳', tag: 'DevOps' },
                  { name: 'AWS Infrastructure', icon: '☁️', tag: 'Cloud' },
                  { name: 'Python & PyTorch', icon: '🐍', tag: 'ML Stack' },
                  { name: 'PostgreSQL', icon: '🐘', tag: 'Database' },
                  { name: 'Framer Motion', icon: '🎨', tag: 'Interactions' },
                  { name: 'GraphQL & REST', icon: '🕸️', tag: 'APIs' },
                  { name: 'Docker & K8s', icon: '🐳', tag: 'DevOps' },
                ].map((item, i) => (
                  <div key={i} className="srv-tech-card">
                    <span className="srv-tech-card-icon">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="srv-tech-card-badge">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Highlights Grid */}
            <div className="srv-tech-categories">
              {[
                { title: 'Frontend & Motion', icon: '⚛️', desc: 'React 19, Next.js 15, GSAP 3, Framer Motion, Tailwind CSS' },
                { title: 'AI & Data Science', icon: '🤖', desc: 'OpenAI GPT-4o, RAG Pipelines, PyTorch, LangChain, Vector DBs' },
                { title: 'Cloud & Infrastructure', icon: '☁️', desc: 'AWS, Vercel Enterprise, Docker, Kubernetes, Serverless' },
                { title: 'Backend & APIs', icon: '⚡', desc: 'Node.js, TypeScript, PostgreSQL, Redis, GraphQL APIs' },
              ].map((cat, idx) => (
                <div key={idx} className="srv-tech-cat-item">
                  <div className="srv-tech-cat-title">
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </div>
                  <div className="srv-tech-cat-tags">{cat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="srv-faq">
          <div className="container">
            <div className="srv-section-header">
              <h2 className="srv-section-title">Capabilities & FAQ</h2>
            </div>
            <div className="srv-faq-container">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`srv-faq-item ${activeFaq === idx ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="srv-faq-q">
                    <span>{faq.q}</span>
                    <div className="srv-faq-icon">
                      {activeFaq === idx ? <X size={16} /> : <Plus size={16} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="srv-faq-a"
                      >
                        <div className="srv-faq-a-inner">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="process-cta" style={{ borderTop: 'none', paddingBottom: '160px' }}>
          <div className="container">
            <h2 className="cta-heading">Ready to scale?</h2>
            <p className="cta-sub">Let's build your next digital ecosystem together.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">Start a Project <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
