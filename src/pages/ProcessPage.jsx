import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import '../styles/process.css'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your business logic, market position, and technical constraints to map out a foolproof architecture.'
  },
  {
    num: '02',
    title: 'Creative Architecture',
    desc: 'Crafting premium aesthetics with high-performance UX, mapping out user journeys that convert and engage.'
  },
  {
    num: '03',
    title: 'Agile Development',
    desc: 'Building robust, scalable ecosystems using modern tech stacks. Clean code, rigorous testing, rapid iterations.'
  },
  {
    num: '04',
    title: 'Launch & Scale',
    desc: 'Deployment is just the beginning. We optimize, maintain, and aggressively scale your product in the market.'
  }
]

// Fallback images from the bg folder
const fallbacks = ['/bg/bg_1.jpg', '/bg/bg_2.jpg', '/bg/bg_3.jpg', '/bg/bg_4.jpg']

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef([])

  useEffect(() => {
    // Refresh ScrollTrigger to ensure accurate layout calculations
    ScrollTrigger.refresh()

    stepsRef.current.forEach((step, i) => {
      if (!step) return
      ScrollTrigger.create({
        trigger: step,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="process-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, background: 'var(--bg)', marginBottom: 'var(--footer-height, 400px)' }}>
        
        <section className="process-hero">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="process-hero-content"
            >
              <div className="process-badge">HOW WE WORK</div>
              <h1 className="process-title">The MediaLoop<br />Process</h1>
            </motion.div>
          </div>
        </section>

        <section className="process-split-section">
          <div className="container process-grid">
            
            {/* Left Scrollable Column */}
            <div className="process-left">
              {processSteps.map((step, i) => (
                <div 
                  key={step.num} 
                  className={`process-step-item ${activeStep === i ? 'active' : ''}`}
                  ref={el => stepsRef.current[i] = el}
                >
                  <div className="step-num">{step.num}</div>
                  <h2 className="step-title">{step.title}</h2>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
              <div className="process-bottom-spacer"></div>
            </div>

            {/* Right Sticky Column */}
            <div className="process-right">
              <div className="process-sticky-container">
                {processSteps.map((step, i) => (
                  <div 
                    key={`img-${i}`}
                    className={`process-image-layer ${activeStep === i ? 'active' : ''}`}
                  >
                    <img src={fallbacks[i % fallbacks.length]} alt={step.title} className="process-img" />
                    <div className="process-img-overlay"></div>
                  </div>
                ))}
                
                {/* Compass / Dashboard abstract element inspired by screenshot */}
                <div className="process-glass-accent">
                  <div className="glass-accent-inner">
                    <div className="pulse-dot"></div>
                    <span className="accent-text">Phase {processSteps[activeStep].num} Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="process-cta">
          <div className="container">
            <h2 className="cta-heading">Ready to start?</h2>
            <p className="cta-sub">Let's build something extraordinary together.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">Get in Touch <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  )
}
