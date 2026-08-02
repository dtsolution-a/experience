import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, X, ArrowUpRight, Search, PenTool, Cpu, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import SectionBackground from '../components/SectionBackground'
import '../styles/services.css'

gsap.registerPlugin(ScrollTrigger)
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

  useEffect(() => {
    // GSAP Horizontal Scroll
    const container = containerRef.current
    if (window.innerWidth > 900 && container) {
      const scrollAmount = container.scrollWidth - window.innerWidth

      const tween = gsap.to(container, {
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

      // Optional Parallax on Cards Background
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

      return () => {
        tween.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }
  }, [])

  return (
    <div className="services-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, background: 'var(--bg)', marginBottom: 'var(--footer-height, 400px)' }}>
        
        {/* HERO SECTION */}
        <section className="srv-hero" style={{ background: 'transparent' }}>
          <SectionBackground 
            lightSrc="/bg/sections/light bg/Floating_glass_panels_crystal_st._202608020543.jpeg"
            darkSrc="/bg/sections/dark bg/Gradient_ribbons_twisting_throug._2K_202608020544.jpeg"
            blur="24px" // Less blur for hero so it's more visible
            opacity={0.8}
            scaleBase={1.05}
            scaleMax={1.15}
          />
          <div className="srv-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--bg) 100%)' }}></div>
          
          <div className="srv-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="srv-badge">Digital Craftsmanship</div>
              <h1 className="srv-title" style={{ color: 'var(--text)' }}>Engineering<br/>Ecosystems.</h1>
              <p className="srv-desc" style={{ color: 'var(--text-2)' }}>
                We merge creative vision with deep technical architecture. Our services are designed to scale, adapt, and dominate in the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* HORIZONTAL SCROLL GALLERY */}
        <section className="srv-horizontal-section" ref={horizontalRef}>
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
        <section className="srv-specialists" style={{ background: 'transparent' }}>
          <SectionBackground 
            lightSrc="/bg/sections/light bg/Abstract_liquid_sculpture_with_c._202608020542.jpeg"
            darkSrc="/bg/sections/dark bg/Abstract_liquid_sculpture_with_c._202608020543.jpeg"
            blur="80px"
            opacity={0.3}
          />
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

        {/* TECH STACK MARQUEE */}
        <section className="srv-tech-stack">
          <div className="srv-tech-marquee">
            <div className="srv-tech-item">REACT / NEXT.JS</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">GSAP / FRAMER</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">OPENAI / LLMS</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">NODE / AWS</div>
            <div className="srv-tech-item">·</div>
            {/* Duplicate for infinite effect */}
            <div className="srv-tech-item">REACT / NEXT.JS</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">GSAP / FRAMER</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">OPENAI / LLMS</div>
            <div className="srv-tech-item">·</div>
            <div className="srv-tech-item">NODE / AWS</div>
            <div className="srv-tech-item">·</div>
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
