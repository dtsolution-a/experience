import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

/**
 * A universal reusable component that adds a "breathing" and "parallax"
 * blurred background effect behind any section.
 * The section MUST have `position: relative` and `overflow: hidden`.
 */
export default function SectionBackground({ 
  lightSrc, 
  darkSrc, 
  blur = '16px', 
  opacity = 0.8,
  scaleBase = 1.1,
  scaleMax = 1.25
}) {
  const { theme } = useTheme()
  const ref = useRef(null)

  // Subtle Y-axis parallax based on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  // The breathing animation using motion variants
  const breatheVariants = {
    animate: {
      scale: [scaleBase, scaleMax, scaleBase],
      transition: {
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  }

  const activeSrc = theme === 'light' ? lightSrc : darkSrc

  return (
    <div 
      ref={ref}
      style={{
        position: 'absolute',
        inset: '-20%', // Oversized to allow parallax and blur without edge clipping
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
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
              filter: `blur(${blur}) ${theme === 'dark' ? 'brightness(1.3) contrast(1.2)' : ''}`,
              y: y
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
