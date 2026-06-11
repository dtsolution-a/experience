import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* Designation only — no company name */
const testimonials = [
  {
    name: 'Rohan Mehta', role: 'Founder & CEO', avatar: 'RM', color: '#FF9C00',
    quote: 'MediaLoop completely transformed how we approach digital. Our organic traffic grew 4x in 8 months and the team felt like an extension of us, not a vendor.',
    metric: '4× organic growth',
  },
  {
    name: 'Aria Chen', role: 'Chief Marketing Officer', avatar: 'AC', color: '#FF2D55',
    quote: "The brand identity they created isn't just beautiful — it converts. Our conversion rate jumped 80% after the redesign. Absolutely world-class execution.",
    metric: '80% conversion uplift',
  },
  {
    name: 'James Okafor', role: 'Chief Executive Officer', avatar: 'JO', color: '#7B2FF7',
    quote: 'We had a legacy system nightmare. MediaLoop rebuilt our entire digital infrastructure in 12 weeks. On time, under budget, zero downtime. Exceptional.',
    metric: '12-week full rebuild',
  },
  {
    name: 'Sofia Vasiliev', role: 'Head of Growth', avatar: 'SV', color: '#FF2D55',
    quote: "Their AI-driven content strategy didn't just bring traffic — it brought the right traffic. Our lead quality went through the roof. Highly recommended.",
    metric: '220% lead quality up',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section testimonials-section">
      <div className="test-bg-orb" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="test-header"
        >
          <span className="section-label">Client Stories</span>
          <h2 className="test-title">
            Words from the<br />
            <span className="gradient-text">brands we've built</span>
          </h2>
        </motion.div>

        <motion.div
          className="test-content"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main quote card */}
          <div className="test-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="test-quote-card card"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Opening quote mark */}
                <div className="quote-mark" style={{ color: testimonials[active].color }}>"</div>

                {/* Quote text — Playfair Display Semi-Bold Italic */}
                <p className="quote-text playfair-quote">
                  {testimonials[active].quote}
                </p>

                {/* Closing quote mark */}
                <div className="quote-mark-close" style={{ color: testimonials[active].color }}>"</div>

                <div className="quote-footer">
                  <div
                    className="quote-avatar"
                    style={{
                      background: `${testimonials[active].color}20`,
                      borderColor: `${testimonials[active].color}40`,
                      color: testimonials[active].color,
                    }}
                  >
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <div className="quote-name">{testimonials[active].name}</div>
                    {/* Designation only, no company */}
                    <div className="quote-role">{testimonials[active].role}</div>
                  </div>
                  <div
                    className="quote-metric-pill"
                    style={{
                      color: testimonials[active].color,
                      background: `${testimonials[active].color}10`,
                      borderColor: `${testimonials[active].color}25`,
                    }}
                  >
                    ✦ {testimonials[active].metric}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="test-dots">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  className={`test-dot ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  style={{ background: active === i ? t.color : undefined }}
                />
              ))}
            </div>
          </div>

          {/* Side thumbnails */}
          <div className="test-side">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                className="test-thumb"
                onClick={() => setActive(i)}
                style={{
                  borderColor: active === i ? `${t.color}60` : 'var(--border)',
                  background: active === i ? 'var(--surface-2)' : 'var(--card-bg)',
                }}
                whileHover={{ x: 4 }}
              >
                <div className="thumb-avatar" style={{ background: `${t.color}15`, color: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="thumb-name">{t.name}</div>
                  <div className="thumb-role">{t.role}</div>
                </div>
                {active === i && <div className="thumb-active-dot" style={{ background: t.color }} />}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Playwrite Argentina — cursive calligraphy for quote body */
        .playfair-quote {
          font-family: 'Playwrite AR', cursive !important;
          font-weight: 300 !important;
          font-style: normal !important;
          font-size: 19px !important;
          line-height: 1.9 !important;
          letter-spacing: 0.01em !important;
          color: var(--text) !important;
          margin-bottom: 8px !important;
        }
        .quote-mark, .quote-mark-close {
          font-family: 'Playwrite AR', cursive;
        }
        .quote-mark-close {
          font-size: 80px; font-weight: 300; line-height: 0.2;
          margin-bottom: 24px; opacity: 0.7;
          display: block; text-align: right;
        }
        @media (max-width: 600px) {
          .playfair-quote { font-size: 16px !important; }
        }
      `}</style>
    </section>
  )
}
