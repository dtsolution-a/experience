import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import '../styles/process.css'
import SectionBackground from '../components/SectionBackground'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your business logic, market position, and technical constraints to map out a blueprint that guarantees ROI.',
    img: '/bg/business-concept-with-graphic-holography.jpg'
  },
  {
    num: '02',
    title: 'Architecture Design',
    desc: 'Our senior engineers architect the infrastructure. We prioritize scalable, cloud-native solutions that handle growth gracefully.',
    img: '/bg/25537441_1dg3_egm8_211202.jpg'
  },
  {
    num: '03',
    title: 'Development & AI Integration',
    desc: 'We write clean, modular code. We integrate automation and LLMs where they add tangible value, not just hype.',
    img: '/bg/close-up-businessman-with-digital-tablet.jpg'
  },
  {
    num: '04',
    title: 'Testing & QA',
    desc: 'Rigorous automated and manual testing ensures your product is impenetrable, lightning-fast, and universally accessible.',
    img: '/bg/rpa-concept-with-blurry-hand-touching-screen.jpg'
  },
  {
    num: '05',
    title: 'Deployment & Scale',
    desc: 'We launch seamlessly and set up CI/CD pipelines for continuous iteration. Your ecosystem is now alive and growing.',
    img: '/bg/close-up-business-man-hand-typing-laptop.jpg'
  }
]

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    // Refresh ScrollTrigger to ensure accurate layout calculations
    ScrollTrigger.refresh()

    // MediaLoop gradient animation
    gsap.to('.hero-grad-text', {
      backgroundPosition: '200% center',
      ease: 'linear',
      duration: 8,
      repeat: -1
    })

    // GSAP ScrollTrigger for pinning image logic
    const images = gsap.utils.toArray('.pr-img-wrapper img')

    // Initial state: first image visible, rest hidden
    gsap.set(images, { opacity: 0, scale: 1.1 })
    gsap.set(images[0], { opacity: 1, scale: 1 })

    stepsRef.current.forEach((step, i) => {
      if (!step) return
      ScrollTrigger.create({
        trigger: step,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveStep(i)
          gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, ease: 'power3.out' })
          gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
        },
        onEnterBack: () => {
          setActiveStep(i)
          gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, ease: 'power3.out' })
          gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="process-page" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, background: 'transparent', marginBottom: 'var(--footer-height, 400px)' }}>
        
        {/* Breathing Background spanning entire process main */}
        <SectionBackground 
          lightSrc="/bg/sections/light bg/Floating_glass_panels_crystal_st._202608020543.jpeg"
          darkSrc="/bg/sections/dark bg/Neural_ecosystem_glowing_nodes_l._202608020544.jpeg"
          blur="80px"
          opacity={0.3}
        />
        
        {/* Subtle Background Grid inside main to cover footer */}
        <div className="process-bg-grid" aria-hidden="true" />

        <section className="process-hero">
          {/* Giant scrolling/fixed watermark */}
          <div className="process-watermark-wrapper">
            <h1 className="process-watermark">ENGINEERING.</h1>
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="process-hero-layout">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="process-hero-content"
              >
                <div className="process-badge">HOW WE WORK</div>
                <h1 className="process-title">The <span className="gradient-text">MediaLoop</span><br />Process</h1>
              </motion.div>
              
              {/* Fill the right side of the hero */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="process-hero-right"
              >
                <p className="process-hero-sub">
                  We don't just build software. We engineer scalable ecosystems. 
                  Our battle-tested methodology bridges the gap between ambitious 
                  strategy and flawless execution.
                </p>
                <div className="process-hero-stats">
                  <div className="ph-stat">
                    <span>99%</span>
                    <label>Uptime</label>
                  </div>
                  <div className="ph-stat">
                    <span>3x</span>
                    <label>Velocity</label>
                  </div>
                  <div className="ph-stat">
                    <span>100+</span>
                    <label>Releases</label>
                  </div>
                </div>
              </motion.div>
            </div>
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
