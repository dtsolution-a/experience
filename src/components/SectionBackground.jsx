import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

/**
 * A universal reusable component that adds a "breathing" and "parallax"
 * background effect behind any section.
 * The section MUST have `position: relative` and `overflow: hidden`.
 */
export default function SectionBackground({ 
  lightSrc, 
  darkSrc, 
  blur = '0px', 
  opacity,
  scaleBase = 1.05,
  scaleMax = 1.18
}) {
  const { theme } = useTheme()
  const ref = useRef(null)

  // Subtle Y-axis parallax based on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // The breathing animation using motion variants
  const breatheVariants = {
    animate: {
      scale: [scaleBase, scaleMax, scaleBase],
      transition: {
        duration: 22,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  }

  const activeSrc = theme === 'light' ? lightSrc : darkSrc
  // Default opacities: high visibility in dark mode (0.85), subtle overlay in light mode (0.65)
  const activeOpacity = opacity !== undefined ? opacity : (theme === 'light' ? 0.65 : 0.85)

  return (
    <div 
      ref={ref}
      style={{
        position: 'absolute',
        inset: '-10%', // Oversized to allow parallax without edge clipping
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.img
            src={activeSrc}
            alt="Section Background"
            variants={breatheVariants}
            animate="animate"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: blur && blur !== '0px' ? `blur(${blur})` : 'none',
              y: y
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
