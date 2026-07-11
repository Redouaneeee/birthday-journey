import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 50,
      }}
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <div style={{ position: 'relative', width: 24, height: 24 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(107, 63, 245, 0.2)',
            filter: 'blur(20px)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c084fc, #f472b6, white)',
              boxShadow: '0 0 20px rgba(107, 63, 245, 0.5)',
            }}
          />
        </div>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
          animate={{
            scale: isHovering ? 1.8 : 1.2,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(107, 63, 245, 0.2)',
          }}
          animate={{
            scale: isHovering ? 2.2 : 1.5,
            opacity: isHovering ? 0.5 : 0.2,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200, delay: 0.1 }}
        />
      </div>
    </motion.div>
  )
}

export default GlowingCursor