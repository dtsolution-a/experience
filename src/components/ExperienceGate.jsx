import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Valid Unique IDs ─────────────────────────────────────
// Share these privately — only holders can enter
const VALID_IDS = new Set([
  'DTS001', 'DTS002', 'DTS003', 'DTS004', 'DTS005',
  'DTS006', 'DTS007', 'DTS008', 'DTS009', 'DTS010',
  'MLDEMO', 'MAMADEMO', // special VIP codes
])

export default function ExperienceGate({ onUnlock }) {
  const [uid, setUid]       = useState('')
  const [name, setName]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!uid.trim() || !name.trim()) {
      setError('Please fill in both fields.')
      return
    }
    setLoading(true)
    // Simulate a brief "verifying" feel
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)

    if (VALID_IDS.has(uid.trim().toUpperCase())) {
      onUnlock(name.trim())
    } else {
      setError('Invalid Access ID. Please check and try again.')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="gate-root">
      {/* Background */}
      <div className="gate-bg" />
      <div className="gate-orb gate-orb-1" />
      <div className="gate-orb gate-orb-2" />
      <div className="gate-grid" />

      {/* Card */}
      <motion.div
        className={`gate-card ${shake ? 'gate-shake' : ''}`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Top brand */}
        <div className="gate-brand">
          <div className="gate-brand-dot" />
          <span className="gate-brand-label">DT Solution</span>
        </div>

        <h1 className="gate-title">Experience Centre</h1>
        <p className="gate-subtitle">
          Enter your access credentials to preview the exclusive client experience.
        </p>

        <form onSubmit={handleSubmit} className="gate-form">
          {/* Unique ID */}
          <div className="gate-field">
            <label className="gate-label">Access ID</label>
            <div className="gate-input-wrap">
              <svg className="gate-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                className="gate-input"
                type="text"
                placeholder="e.g. DTS001"
                value={uid}
                onChange={e => { setUid(e.target.value); setError('') }}
                autoComplete="off"
                spellCheck={false}
                maxLength={20}
              />
            </div>
          </div>

          {/* Name */}
          <div className="gate-field">
            <label className="gate-label">Your Name</label>
            <div className="gate-input-wrap">
              <svg className="gate-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
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
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            className="gate-btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="gate-spinner" />
            ) : (
              <>
                Enter Experience
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </motion.button>
        </form>

        <p className="gate-footer-note">
          Don't have an access ID? Contact us at{' '}
          <a href="mailto:support@medialooptech.com">support@medialooptech.com</a>
        </p>
      </motion.div>

      {/* Bottom watermark */}
      <div className="gate-watermark">
        Powered by <strong>DT Solution</strong> · Confidential Preview
      </div>
    </div>
  )
}
