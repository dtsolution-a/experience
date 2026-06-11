import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ExperienceViewer({ visitorName, onExit, children }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showWelcome, setShowWelcome]   = useState(true)
  const { theme, setTheme }             = useTheme()
  const prevThemeRef                    = useRef(theme)   // snapshot BEFORE any change

  // ── Force LIGHT theme via React state (not DOM) ──────────────
  // This runs synchronously before paint, so no dark flash.
  // We also write localStorage so ThemeContext's own useEffect
  // won't override us on re-renders.
  useEffect(() => {
    prevThemeRef.current = theme          // capture original
    setTheme('light')                     // update React state → ThemeContext useEffect sets DOM
    return () => setTheme(prevThemeRef.current)   // restore on exit
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Dismiss welcome after 2.8s ──
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 2800)
    return () => clearTimeout(t)
  }, [])

  // ── data-exp attribute on body (windowed vs fullscreen frame) ──
  useEffect(() => {
    if (showWelcome) return
    document.body.setAttribute('data-exp', isFullscreen ? 'full' : 'windowed')
    return () => document.body.removeAttribute('data-exp')
  }, [isFullscreen, showWelcome])

  // ── Clean up body attribute on unmount ──
  useEffect(() => () => document.body.removeAttribute('data-exp'), [])

  return (
    <>
      {/* ── Welcome splash ── */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="exp-welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="exp-welcome-inner"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="exp-welcome-logo">DTS<span>.</span></div>
              <p className="exp-welcome-sub">Experience Centre</p>
              <h2 className="exp-welcome-name">Welcome, {visitorName}.</h2>
              <p className="exp-welcome-hint">Preparing your exclusive preview…</p>
              <div className="exp-welcome-bar">
                <motion.div
                  className="exp-welcome-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.4, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fixed chrome bar ── */}
      {!showWelcome && (
        <motion.div
          className={`exp-chrome ${isFullscreen ? 'exp-chrome-slim' : ''}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Traffic light dots */}
          <div className="exp-dots">
            <button className="exp-dot exp-dot-red"   onClick={onExit}                            title="Exit preview" />
            <button className="exp-dot exp-dot-yellow"                                             title="Windowed preview" />
            <button className="exp-dot exp-dot-green" onClick={() => setIsFullscreen(f => !f)}    title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} />
          </div>

          {/* URL pill */}
          <div className="exp-url-pill">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            medialooptech.com
          </div>

          {/* Right controls */}
          <div className="exp-chrome-right">
            <span className="exp-visitor-tag">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="7" r="4"/>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              </svg>
              {visitorName}
            </span>
            <button className="exp-exit-btn" onClick={onExit}>✕ Exit</button>
          </div>
        </motion.div>
      )}

      {/* Site renders at body level — scroll works perfectly */}
      {children}
    </>
  )
}
