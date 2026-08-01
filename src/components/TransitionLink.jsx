import { usePageTransition } from '../context/TransitionContext'

/**
 * TransitionLink — drop-in replacement for <a> / <Link>
 * Triggers the brand wipe animation before navigating.
 *
 * Usage:
 *   <TransitionLink to="/about">About</TransitionLink>
 *   <TransitionLink to="/contact" className="btn-primary">Get Started</TransitionLink>
 */
export default function TransitionLink({ to, children, className = '', style = {}, onClick }) {
  const { navigateTo } = usePageTransition()

  const handleClick = (e) => {
    // External links → open normally
    if (!to || to.startsWith('http') || to.startsWith('mailto') || to.startsWith('tel')) return
    
    // Hash-only links (same-page anchors) → let browser handle
    if (to.startsWith('#')) return

    e.preventDefault()
    onClick?.()
    navigateTo(to, e)
  }

  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
