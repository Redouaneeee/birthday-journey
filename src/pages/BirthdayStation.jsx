import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import TypewriterText from '../components/ui/TypewriterText'
import soundManager from '../utils/soundManager'
import { storyData } from '../data/storyData'

const BirthdayStation = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [followUpText, setFollowUpText] = useState('')
  const [showResponseButtons, setShowResponseButtons] = useState(false)
  const [isTextComplete, setIsTextComplete] = useState(false)
  const [collectedMemories, setCollectedMemories] = useState([])
  const [showSecretDoor, setShowSecretDoor] = useState(false)
  const [particles, setParticles] = useState([])
  
  const steps = storyData.birthdayStation.steps

  // Start happy music when entering Birthday Station
  useEffect(() => {
    soundManager.startHappyMusic()
    
    // Create floating particles
    const newParticles = []
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
        color: `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`
      })
    }
    setParticles(newParticles)

    return () => {
      // Cleanup
    }
  }, [])

  const handleChoice = (choice) => {
    soundManager.playClick()
    
    storyData.userChoices.birthdayStation = {
      ...storyData.userChoices.birthdayStation,
      [steps[currentStep].id]: choice.value
    }
    
    setCollectedMemories(prev => [...prev, { step: steps[currentStep].id, choice: choice.value }])
    setSelectedChoice(choice)
    
    const response = storyData.getResponse('station', choice.id)
    if (response) {
      setShowResponse(true)
      
      const currentStepData = steps[currentStep]
      if (currentStepData.followUp) {
        setFollowUpText(currentStepData.followUp.content)
      }
      
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
    setFollowUpText('')
    setIsTextComplete(false)
    
    if (currentStep >= steps.length - 1) {
      // Journey complete - show Secret Door reveal
      setShowSecretDoor(true)
      soundManager.playDoorOpen()
      setTimeout(() => {
        navigate('/secret-door', { state: { memories: collectedMemories } })
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
    setFollowUpText('')
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

  // Open Secret Door with mysterious music
  const handleOpenSecretDoor = () => {
    soundManager.playClick()
    soundManager.startMysteriousMusic() // Switch to mysterious music
    setShowSecretDoor(true)
    soundManager.playDoorOpen()
    setTimeout(() => {
      navigate('/secret-door', { state: { memories: collectedMemories } })
    }, 3000)
  }

  if (showResponse && selectedChoice) {
    const response = storyData.getResponse('station', selectedChoice.id)
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', overflow: 'hidden' }}>
        {/* Floating particles */}
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
              boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
              opacity: 0,
            }}
            animate={{
              y: [0, -200 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
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
                {selectedChoice.label.split(' ')[0]}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
              >
                <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'rgba(192, 132, 252, 0.9)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                  <TypewriterText
                    text={response}
                    speed={40}
                    onComplete={() => {}}
                  />
                </p>
              </motion.div>

              {followUpText && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
                  style={{ marginTop: '24px', padding: '20px', background: 'rgba(107, 63, 245, 0.1)', borderRadius: '12px', border: '1px solid rgba(107, 63, 245, 0.2)' }}
                >
                  <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'rgba(192, 132, 252, 0.8)', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                    <TypewriterText
                      text={followUpText}
                      speed={35}
                      delay={300}
                    />
                  </p>
                </motion.div>
              )}

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
                      color: 'rgba(192, 132, 252, 0.7)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Playfair Display', serif",
                    }}
                    whileHover={{ scale: 1.08, borderColor: 'rgba(107, 63, 245, 0.4)', boxShadow: '0 0 20px rgba(107, 63, 245, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ⬅️ Back
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, rgba(107, 63, 245, 0.3), rgba(244, 114, 182, 0.3))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(107, 63, 245, 0.4)',
                      borderRadius: '8px',
                      color: 'rgba(192, 132, 252, 0.9)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Playfair Display', serif",
                    }}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(107, 63, 245, 0.2)' }}
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
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', overflow: 'hidden' }}>
      {/* Background particles */}
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
            boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
            opacity: 0,
          }}
          animate={{
            y: [0, -200 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
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
        {/* Train Journey Progress with animations */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto 32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(192, 132, 252, 0.6)' }}>
              🚂 Station {Math.min(currentStep + 1, steps.length)} of {steps.length}
            </span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  style={{
                    width: index <= currentStep ? '12px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: index <= currentStep 
                      ? 'linear-gradient(to right, #a78bfa, #f472b6)' 
                      : 'rgba(255,255,255,0.1)',
                  }}
                  animate={index === currentStep ? { 
                    scale: [1, 1.3, 1],
                    boxShadow: ['0 0 0 rgba(167,139,250,0)', '0 0 20px rgba(167,139,250,0.6)', '0 0 0 rgba(167,139,250,0)']
                  } : {}}
                  transition={{ duration: 1, repeat: index === currentStep ? Infinity : 0 }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(192, 132, 252, 0.6)' }}>
              {Math.round(((currentStep) / steps.length) * 100)}%
            </span>
          </div>
          <div style={{ height: '4px', background: 'rgba(107, 63, 245, 0.3)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(to right, #a78bfa, #f472b6)', borderRadius: '4px' }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

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
                    {steps[currentStep].id === 'welcome' ? '🚂' : 
                     steps[currentStep].id === 'welcome2' ? '🎵' :
                     steps[currentStep].id === 'final' ? '🎯' : '✨'}
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                      color: 'rgba(192, 132, 252, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      marginBottom: '16px',
                    }}
                  >
                    {steps[currentStep].id === 'welcome' ? 'The Journey Begins' : 
                     steps[currentStep].id === 'welcome2' ? 'Aboard the Express' :
                     steps[currentStep].id === 'final' ? 'Destination Reached' : '✨'}
                  </motion.h2>
                  
                  <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'rgba(192, 132, 252, 0.9)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    <TypewriterText
                      text={steps[currentStep].content}
                      speed={35}
                      onComplete={handleTextComplete}
                    />
                  </p>
                  
                  {currentStep === steps.length - 1 && isTextComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
                      style={{ marginTop: '32px' }}
                    >
                      <motion.button
                        onClick={handleOpenSecretDoor}
                        style={{
                          padding: '16px 32px',
                          background: 'linear-gradient(135deg, rgba(107, 63, 245, 0.4), rgba(244, 114, 182, 0.4))',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(107, 63, 245, 0.5)',
                          borderRadius: '12px',
                          color: 'rgba(192, 132, 252, 0.9)',
                          fontSize: '1.125rem',
                          fontFamily: "'Playfair Display', serif",
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(107, 63, 245, 0.3)' }}
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
                        🚪 Open the Secret Door
                      </motion.button>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ marginTop: '16px' }}
                      >
                        <p style={{ fontSize: '0.875rem', color: 'rgba(192, 132, 252, 0.4)' }}>
                          Collected {collectedMemories.length} memories ✨
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
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
                    {steps[currentStep].id === 'smile_check' ? '😊' :
                     steps[currentStep].id === 'birthday_wish' ? '🎁' :
                     steps[currentStep].id === 'advice' ? '💭' :
                     steps[currentStep].id === 'fun_question' ? '🐼' : '✨'}
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                      color: 'rgba(192, 132, 252, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {steps[currentStep].id === 'smile_check' ? 'Station 1' :
                     steps[currentStep].id === 'birthday_wish' ? 'Station 2' :
                     steps[currentStep].id === 'advice' ? 'Station 3' :
                     steps[currentStep].id === 'fun_question' ? 'Station 4' : ''}
                  </motion.h2>
                  
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)', 
                    color: 'rgba(192, 132, 252, 0.9)', 
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
                          color: 'rgba(192, 132, 252, 0.9)',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'left',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          borderColor: 'rgba(107, 63, 245, 0.5)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          boxShadow: '0 0 40px rgba(107, 63, 245, 0.15)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(90deg, transparent, rgba(107, 63, 245, 0.08), transparent)`,
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
      </motion.div>
    </div>
  )
}

export default BirthdayStation