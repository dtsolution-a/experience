import { useRef, useState, useEffect } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [state, setState] = useState({ large: false, label: '' })

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useEffect(() => {
    window.__setCursor = setState
    return () => { delete window.__setCursor }
  }, [])

  return (
    <div ref={cursorRef} className={`custom-cursor ${state.large ? 'large' : ''}`}>
      {state.large && <span className="cursor-label">{state.label}</span>}
    </div>
  )
}
