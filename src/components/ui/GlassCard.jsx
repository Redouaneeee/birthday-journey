import React from 'react'
import { motion } from 'framer-motion'

const GlassCard = ({ children, className = '', glow = false, hover = true, onClick = null }) => {
  const baseStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: glow ? '0 8px 32px rgba(107, 63, 245, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
  }

  return (
    <motion.div
      style={baseStyle}
      className={className}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      onClick={onClick}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent)',
          pointerEvents: 'none',
        }}
      />
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(107, 63, 245, 0.1), rgba(244, 114, 182, 0.1))',
            pointerEvents: 'none',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </motion.div>
  )
}

export default GlassCard