import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  { num: '01', color: '#c084fc', title: 'Discovery & Strategy', description: 'We immerse in your brand, market, and objectives. Deep research, competitor analysis, and strategic mapping forms the blueprint.', tags: ['Brand Audit', 'Market Research', 'Goal Mapping'] },
  { num: '02', color: '#f472b6', title: 'Creative Architecture', description: 'Design systems, wireframes, and content strategy crafted with intent. Every pixel and word serves conversion and brand truth.', tags: ['UI/UX Design', 'Content Strategy', 'Brand System'] },
  { num: '03', color: '#fb923c', title: 'AI-Powered Build', description: 'Our engineers deploy cutting-edge tech stacks, automation frameworks, and performance-first code — built to scale.', tags: ['Development', 'AI Integration', 'QA Testing'] },
  { num: '04', color: '#38bdf8', title: 'Launch & Amplify', description: 'Strategic launch execution across channels. Campaigns go live, analytics track everything, and performance compounds over time.', tags: ['Campaign Launch', 'Analytics', 'Growth Loops'] },
]

export default function Process() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="process" className="section process-section" ref={containerRef}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="process-header">
          <span className="section-label">How We Work</span>
          <h2 className="process-title">A process built for<br /><span className="gradient-text">exceptional outcomes</span></h2>
        </motion.div>
        <div className="process-timeline">
          <div className="timeline-track">
            <motion.div className="timeline-fill" style={{ height: lineHeight }} />
          </div>
          {steps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index }) {
  const [ref, stepInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <motion.div ref={ref} className="process-step" initial={{ opacity: 0, x: -40 }} animate={stepInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}>
      <div className="step-dot-wrap">
        <motion.div className="step-dot" animate={stepInView ? { scale: [0, 1.2, 1] } : {}} transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }} style={{ borderColor: step.color, background: `${step.color}20` }}>
          <div className="step-dot-inner" style={{ background: step.color }} />
        </motion.div>
      </div>
      <div className="step-card card">
        <div className="step-card-top">
          <span className="step-num" style={{ color: step.color }}>{step.num}</span>
          <div className="step-tags">
            {step.tags.map((t, i) => <span key={i} className="step-tag" style={{ color: step.color, background: `${step.color}10`, borderColor: `${step.color}20` }}>{t}</span>)}
          </div>
        </div>
        <h3 className="step-title">{step.title}</h3>
        <p className="step-desc">{step.description}</p>
      </div>
    </motion.div>
  )
}
