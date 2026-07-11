import React, { useState } from 'react'
import { motion } from 'framer-motion'
import soundManager from '../../utils/soundManager'

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(false)

  const handleToggle = () => {
    const muted = soundManager.toggleMute()
    setIsMuted(muted)
  }

  return (
    <motion.button
      onClick={handleToggle}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '50%',
        color: 'rgba(192,132,252,0.8)',
        fontSize: '1.5rem',
        cursor: 'pointer',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ 
        scale: 1.1,
        borderColor: 'rgba(107,63,245,0.4)',
        background: 'rgba(255,255,255,0.1)',
      }}
      whileTap={{ scale: 0.9 }}
    >
      {isMuted ? '🔇' : '🔊'}
    </motion.button>
  )
}

export default SoundToggle