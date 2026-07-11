import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import { storyData } from '../data/storyData'

const Hub = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [completedPaths, setCompletedPaths] = useState({
    station: false,
    secret: false
  })
  const [highlightSecret, setHighlightSecret] = useState(false)

  useEffect(() => {
    // Check if coming from Birthday Station with "Open Secret Door" click
    if (location.state?.openSecret) {
      setHighlightSecret(true)
      setTimeout(() => setHighlightSecret(false), 3000)
    }

    const stationChoices = storyData.userChoices.birthdayStation
    const secretChoices = storyData.userChoices.secretDoor
    
    if (stationChoices && Object.keys(stationChoices).length > 0) {
      setCompletedPaths(prev => ({ ...prev, station: true }))
    }
    if (secretChoices && Object.keys(secretChoices).length > 0) {
      setCompletedPaths(prev => ({ ...prev, secret: true }))
    }
  }, [location])

  // Auto-start Birthday Station if not completed
  useEffect(() => {
    if (!completedPaths.station) {
      // Small delay before auto-navigating
      const timer = setTimeout(() => {
        navigate('/birthday-station')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [completedPaths.station, navigate])

  const handlePathSelect = (path) => {
    if (path === 'station' && !completedPaths.station) {
      navigate('/birthday-station')
    } else if (path === 'secret' && !completedPaths.secret) {
      navigate('/secret-door')
    }
  }

  const allCompleted = completedPaths.station && completedPaths.secret

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1152px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '16px' }}
            className="text-gradient glow-text"
          >
            Choose Your Path
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '1.125rem', color: 'rgba(192, 132, 252, 0.6)', fontWeight: 300 }}
          >
            {!completedPaths.station ? '🌟 Your journey begins now...' : 
             !completedPaths.secret ? '🌙 A door is waiting for you...' :
             '✨ Both paths complete! The finale awaits!'}
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="md:grid-cols-2">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlassCard
              className="h-full"
              glow={!completedPaths.station}
              hover={!completedPaths.station}
              onClick={() => handlePathSelect('station')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '3.75rem', marginBottom: '16px' }}>🚉</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 'bold', color: 'rgba(192, 132, 252, 0.9)', marginBottom: '8px' }}>
                  Birthday Station
                </h2>
                <p style={{ color: 'rgba(192, 132, 252, 0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  A cheerful journey filled with birthday wishes and happy moments.
                </p>
                {completedPaths.station && (
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(74, 222, 128, 0.8)' }}>✓ Completed</div>
                )}
                {!completedPaths.station && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(251, 191, 36, 0.8)' }}
                  >
                    ✨ Starting automatically...
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <GlassCard
              className={`h-full ${highlightSecret ? 'animate-pulse' : ''}`}
              glow={!completedPaths.secret || highlightSecret}
              hover={!completedPaths.secret}
              onClick={() => handlePathSelect('secret')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '3.75rem', marginBottom: '16px' }}>🚪</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 'bold', color: 'rgba(192, 132, 252, 0.9)', marginBottom: '8px' }}>
                  Secret Door
                </h2>
                <p style={{ color: 'rgba(192, 132, 252, 0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  A mysterious path filled with emotional conversations and hidden compliments.
                </p>
                {completedPaths.secret && (
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(74, 222, 128, 0.8)' }}>✓ Completed</div>
                )}
                {!completedPaths.secret && highlightSecret && (
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(251, 191, 36, 0.8)' }}>✨ A door is waiting for you...</div>
                )}
                {!completedPaths.secret && !highlightSecret && (
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(192, 132, 252, 0.6)' }}>🔒 Complete Birthday Station first</div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '48px', textAlign: 'center' }}
          >
            <GlassCard
              className="inline-block"
              glow={true}
              hover={true}
              onClick={() => navigate('/finale')}
            >
              <span style={{ fontSize: '1.125rem', fontFamily: "'Playfair Display', serif", color: 'rgba(192, 132, 252, 0.9)' }}>
                🎂 Unlock the Finale
              </span>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Hub