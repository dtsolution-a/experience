import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import ExperienceGate from './components/ExperienceGate'
import ExperienceViewer from './components/ExperienceViewer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'
import './app.css'
import './components.css'
import './experience.css'

// ─── Session helpers ──────────────────────────────────────
const SESSION_KEY = 'ml_exp_visitor'

function saveSession(name) {
  sessionStorage.setItem(SESSION_KEY, name)
}
function loadSession() {
  return sessionStorage.getItem(SESSION_KEY)
}
function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

// ─── Main site content ────────────────────────────────────
function SiteContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><WhyUs /></ErrorBoundary>
        <ErrorBoundary><Process /></ErrorBoundary>
        <ErrorBoundary><Work /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><CTABanner /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <ErrorBoundary><Footer /></ErrorBoundary>
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────
function AppContent() {
  // null = gate, string = visitor name (unlocked)
  const [visitor, setVisitor] = useState(() => loadSession())

  function handleUnlock(name) {
    saveSession(name)
    setVisitor(name)
  }

  function handleExit() {
    clearSession()
    setVisitor(null)
  }

  // Gate — not authenticated
  if (!visitor) {
    return <ExperienceGate onUnlock={handleUnlock} />
  }

  // Authenticated — show site inside the experience viewer
  return (
    <ExperienceViewer visitorName={visitor} onExit={handleExit}>
      <SiteContent />
    </ExperienceViewer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
