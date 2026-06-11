import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Valid Unique IDs ─────────────────────────────────────
const VALID_IDS = new Set([
  'DTS001', 'DTS002', 'DTS003', 'DTS004', 'DTS005',
  'DTS006', 'DTS007', 'DTS008', 'DTS009', 'DTS010',
  'MLDEMO', 'MAMADEMO',
])

export default function ExperienceGate({ onUnlock }) {
  const [uid, setUid]         = useState('')
  const [name, setName]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake]     = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!uid.trim() || !name.trim()) {
      setError('Both fields are required.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)

    if (VALID_IDS.has(uid.trim().toUpperCase())) {
      onUnlock(name.trim())
    } else {
      setError('Invalid Access ID. Please contact DT Solution.')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="gate-root">
      {/* Subtle particle grid */}
      <div className="gate-grid" />
      {/* Faint center glow */}
      <div className="gate-glow" />

      {/* DTS. Logo — top left */}
      <div className="gate-logo">
        DTS<span className="gate-logo-dot">.</span>
      </div>

      {/* Center content */}
      <motion.div
        className="gate-center"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Eyebrow */}
        <div className="gate-eyebrow">
          <span className="gate-eyebrow-line" />
          EXPERIENCE PORTAL
          <span className="gate-eyebrow-line" />
        </div>

        {/* Headline */}
        <h1 className="gate-headline">
          ENTER TO<br />
          <span className="gate-headline-red">ACCESS.</span>
        </h1>

        <p className="gate-desc">
          Exclusive preview of the MediaLoop Technologies experience.<br />
          Enter your access credentials to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`gate-form ${shake ? 'gate-shake' : ''}`}>
          <div className="gate-row">
            {/* Access ID */}
            <div className="gate-field">
              <label className="gate-label">ACCESS ID</label>
              <input
                className="gate-input"
                type="text"
                placeholder="Enter your access ID"
                value={uid}
                onChange={e => { setUid(e.target.value); setError('') }}
                autoComplete="off"
                spellCheck={false}
                maxLength={20}
              />
            </div>

            {/* Name */}
            <div className="gate-field">
              <label className="gate-label">YOUR NAME</label>
              <input
                className="gate-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                autoComplete="off"
                maxLength={60}
              />
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="gate-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✕ {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            type="submit"
            className="gate-btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading
              ? <span className="gate-spinner" />
              : <>ENTER EXPERIENCE <span className="gate-btn-arrow">→</span></>
            }
          </motion.button>
        </form>

        <p className="gate-note">
          No access ID?{' '}
          <a href="mailto:support@medialooptech.com">Contact DT Solution</a>
        </p>
      </motion.div>

      {/* Bottom tag */}
      <div className="gate-bottom-tag">
        Powered by <strong>DT Solution</strong> · Confidential Preview · {new Date().getFullYear()}
      </div>
    </div>
  )
}
