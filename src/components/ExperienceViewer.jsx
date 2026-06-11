import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExperienceViewer({ visitorName, onExit, children }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const frameRef = useRef(null)

  // Hide welcome overlay after 2.6s
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 2600)
    return () => clearTimeout(t)
  }, [])

  // Native browser fullscreen API
  function toggleFullscreen() {
    if (!isFullscreen) {
      frameRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  // Sync state if user presses Escape
  useEffect(() => {
    function onFsChange() {
      if (!document.fullscreenElement) setIsFullscreen(false)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  return (
    <div className="viewer-root">
      {/* ── Welcome splash overlay ── */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="viewer-welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="viewer-welcome-inner"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="viewer-welcome-tag">DT Solution · Experience Centre</div>
              <h2 className="viewer-welcome-name">Welcome, {visitorName} 👋</h2>
              <p className="viewer-welcome-sub">
                You're about to experience the MediaLoop Technologies preview.
              </p>
              <div className="viewer-welcome-bar">
                <motion.div
                  className="viewer-welcome-progress"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating window frame ── */}
      <div className="viewer-stage">
        <motion.div
          className="viewer-window"
          ref={frameRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Browser chrome bar */}
          <div className="viewer-chrome">
            <div className="viewer-chrome-dots">
              <span className="chrome-dot chrome-red" onClick={onExit} title="Exit preview" />
              <span className="chrome-dot chrome-yellow" />
              <span className="chrome-dot chrome-green" onClick={toggleFullscreen} title="Fullscreen" />
            </div>
            <div className="viewer-chrome-url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              medialooptech.com · Preview Mode
            </div>
            <div className="viewer-chrome-actions">
              <span className="viewer-chip">👤 {visitorName}</span>
              <button className="viewer-fs-btn" onClick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}>
                {isFullscreen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                )}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
              <button className="viewer-exit-btn" onClick={onExit}>✕ Exit</button>
            </div>
          </div>

          {/* Site content */}
          <div className="viewer-content">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
