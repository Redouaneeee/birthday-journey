import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import TypewriterText from '../components/ui/TypewriterText'
import soundManager from '../utils/soundManager'
import { storyData } from '../data/storyData'

const SecretDoor = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResponseButtons, setShowResponseButtons] = useState(false)
  const [isTextComplete, setIsTextComplete] = useState(false)
  const [memories, setMemories] = useState([])
  const [showFinale, setShowFinale] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const [particles, setParticles] = useState([])
  
  const steps = storyData.secretDoor.steps

  // Start mysterious music when entering Secret Door
  useEffect(() => {
    soundManager.startMysteriousMusic()
    
    // Create mysterious floating particles
    const newParticles = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
        color: `hsl(${260 + Math.random() * 40}, 80%, ${60 + Math.random() * 30}%)`
      })
    }
    setParticles(newParticles)

    // Get memories from birthday station
    if (location.state?.memories) {
      setMemories(location.state.memories)
    }
    
    // Animate door opening
    setTimeout(() => {
      setDoorOpen(true)
      soundManager.playDoorOpen()
    }, 1000)

    return () => {
      // Cleanup
    }
  }, [location])

  const handleChoice = (choice) => {
    soundManager.playClick()
    
    storyData.userChoices.secretDoor = {
      ...storyData.userChoices.secretDoor,
      [steps[currentStep].id]: choice.value
    }
    
    setSelectedChoice(choice)
    
    const response = storyData.getResponse('door', choice.id)
    if (response) {
      setShowResponse(true)
      setTimeout(() => {
        setShowResponseButtons(true)
        soundManager.playChime()
      }, 1500)
    }
  }

  const handleNext = () => {
    soundManager.playClick()
    setShowResponse(false)
    setShowResponseButtons(false)
    setSelectedChoice(null)
    setIsTextComplete(false)
    
    if (currentStep >= steps.length - 1) {
      // Journey complete - show Finale
      setShowFinale(true)
      soundManager.playSuccess()
      setTimeout(() => {
        navigate('/finale', { state: { memories, secretChoices: storyData.userChoices.secretDoor } })
      }, 3000)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    soundManager.playClick()
    setShowResponse(false)
    setShowResponseButtons(false)
    setSelectedChoice(null)
  }

  const handleTextComplete = () => {
    setIsTextComplete(true)
    const currentStepData = steps[currentStep]
    if (currentStepData.type === 'text' && currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsTextComplete(false)
      }, 2000)
    }
  }

  // Go to Finale with celebration music
  const handleRevealFinale = () => {
    soundManager.playClick()
    soundManager.startHappyMusic() // Switch back to happy music for finale
    setShowFinale(true)
    soundManager.playSuccess()
    setTimeout(() => {
      navigate('/finale', { state: { memories, secretChoices: storyData.userChoices.secretDoor } })
    }, 3000)
  }

  if (showResponse && selectedChoice) {
    const response = storyData.getResponse('door', selectedChoice.id)
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', overflow: 'hidden' }}>
        {/* Magical particle background */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: `0 0 ${p.size * 8}px ${p.color}`,
              opacity: 0,
            }}
            animate={{
              y: [0, -250 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 150],
              opacity: [0, 0.8, 0],
              scale: [0, 2.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '896px' }}
        >
          <GlassCard className="w-full" glow>
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
              style={{ textAlign: 'center', padding: '32px 0' }}
            >
              <motion.div 
                style={{ fontSize: '5rem', marginBottom: '16px' }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.6 }}
              >
                {selectedChoice.id.includes('key') ? '🔑' :
                 selectedChoice.id.includes('special') ? '💫' :
                 selectedChoice.id.includes('love') ? '🌷' :
                 selectedChoice.id.includes('promise') ? '🤝' : '✨'}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
              >
                <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'rgba(165, 180, 252, 0.9)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                  <TypewriterText
                    text={response}
                    speed={40}
                    onComplete={() => {}}
                  />
                </p>
              </motion.div>

              {showResponseButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    marginTop: '32px', 
                    display: 'flex', 
                    gap: '16px', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <motion.button
                    onClick={handleBack}
                    style={{
                      padding: '12px 24px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'rgba(165, 180, 252, 0.7)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Playfair Display', serif",
                    }}
                    whileHover={{ scale: 1.08, borderColor: 'rgba(129, 140, 248, 0.4)', boxShadow: '0 0 20px rgba(129, 140, 248, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ⬅️ Back
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.3), rgba(167, 139, 250, 0.3))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(129, 140, 248, 0.4)',
                      borderRadius: '8px',
                      color: 'rgba(165, 180, 252, 0.9)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Playfair Display', serif",
                    }}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(129, 140, 248, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next ➡️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '32px',
      overflow: 'hidden',
      background: doorOpen ? 'radial-gradient(ellipse at center, rgba(26, 14, 56, 0.9) 0%, rgba(5, 2, 10, 0.98) 100%)' : 'radial-gradient(ellipse at center, #1a0e38 0%, #0a0618 70%, #05020a 100%)'
    }}>
      {/* Mysterious floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 8}px ${p.color}`,
            opacity: 0,
          }}
          animate={{
            y: [0, -250 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 150],
            opacity: [0, 0.5, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Door opening animation overlay */}
      {!doorOpen && (
        <motion.div
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #1a0e38 0%, #0a0618 100%)',
          }}
        >
          <motion.div
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '6rem', textAlign: 'center' }}
          >
            🚪
            <p style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '1.5rem', 
              color: 'rgba(192, 132, 252, 0.6)',
              marginTop: '16px'
            }}>
              Opening the door...
            </p>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: doorOpen ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '896px' }}
      >
        {/* Progress - Rooms */}
        <div style={{ width: '100%', maxWidth: '448px', margin: '0 auto 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(165, 180, 252, 0.6)' }}>
              🚪 Room {Math.min(currentStep + 1, steps.length)} of {steps.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(165, 180, 252, 0.6)' }}>
              {Math.round(((currentStep) / steps.length) * 100)}%
            </span>
          </div>
          <div style={{ height: '4px', background: 'rgba(129, 140, 248, 0.3)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(to right, #818cf8, #a78bfa)', borderRadius: '4px' }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <GlassCard className="w-full" glow>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              style={{ minHeight: '300px' }}
            >
              {steps[currentStep].type === 'text' ? (
                <div style={{ textAlign: 'center' }}>
                  <motion.div 
                    style={{ fontSize: '5rem', marginBottom: '16px' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {steps[currentStep].id === 'welcome' ? '🌙' :
                     steps[currentStep].id === 'door_open' ? '🚪' : '✨'}
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                      color: 'rgba(165, 180, 252, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      marginBottom: '16px',
                    }}
                  >
                    {steps[currentStep].id === 'welcome' ? 'The Secret Awaits' :
                     steps[currentStep].id === 'door_open' ? 'Step Inside' : '✨'}
                  </motion.h2>
                  
                  <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'rgba(165, 180, 252, 0.9)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    <TypewriterText
                      text={steps[currentStep].content}
                      speed={35}
                      onComplete={handleTextComplete}
                    />
                  </p>
                </div>
              ) : (
                <div>
                  <motion.div 
                    style={{ fontSize: '5rem', marginBottom: '8px', textAlign: 'center' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {steps[currentStep].id === 'compliments' ? '🔑' :
                     steps[currentStep].id === 'what_makes_you_special' ? '💫' :
                     steps[currentStep].id === 'what_you_love' ? '🌷' :
                     steps[currentStep].id === 'promise' ? '🤝' : '✨'}
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                      color: 'rgba(165, 180, 252, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {steps[currentStep].id === 'compliments' ? 'Room 1' :
                     steps[currentStep].id === 'what_makes_you_special' ? 'Room 2' :
                     steps[currentStep].id === 'what_you_love' ? 'Room 3' :
                     steps[currentStep].id === 'promise' ? 'Room 4' : ''}
                  </motion.h2>
                  
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)', 
                    color: 'rgba(165, 180, 252, 0.9)', 
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}>
                    {steps[currentStep].content}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }} className="md:grid-cols-2">
                    {steps[currentStep].choices.map((choice, index) => (
                      <motion.button
                        key={choice.id}
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                        onClick={() => handleChoice(choice)}
                        style={{
                          padding: '16px 20px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'rgba(165, 180, 252, 0.9)',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'left',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          borderColor: 'rgba(129, 140, 248, 0.5)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          boxShadow: '0 0 40px rgba(129, 140, 248, 0.15)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.08), transparent)`,
                          }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        />
                        {choice.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '24px', textAlign: 'center' }}
          >
            <motion.button
              onClick={handleRevealFinale}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.4), rgba(167, 139, 250, 0.4))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(129, 140, 248, 0.5)',
                borderRadius: '12px',
                color: 'rgba(165, 180, 252, 0.9)',
                fontSize: '1.125rem',
                fontFamily: "'Playfair Display', serif",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(129, 140, 248, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              🌟 Reveal the Finale
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default SecretDoor