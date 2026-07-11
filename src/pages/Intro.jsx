import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import TypewriterText from '../components/ui/TypewriterText'
import soundManager from '../utils/soundManager'
import { storyData } from '../data/storyData'

const Intro = () => {
  const navigate = useNavigate()
  const [currentLine, setCurrentLine] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showAllText, setShowAllText] = useState(false)
  const [shootingStars, setShootingStars] = useState([])
  const [titleGlow, setTitleGlow] = useState(0)
  const [particles, setParticles] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef(null)
  const starIntervalRef = useRef(null)

  const introLines = storyData.cinematicIntro.lines

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize sound
  useEffect(() => {
    const initSound = () => {
      soundManager.init()
      document.removeEventListener('click', initSound)
      document.removeEventListener('touchstart', initSound)
    }
    
    document.addEventListener('click', initSound)
    document.addEventListener('touchstart', initSound)
    
    return () => {
      document.removeEventListener('click', initSound)
      document.removeEventListener('touchstart', initSound)
    }
  }, [])

  // Create title particles when title appears - REDUCED for mobile
  useEffect(() => {
    if (showTitle) {
      const particleCount = isMobile ? 15 : 40
      const newParticles = []
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (isMobile ? 2 : 4) + (isMobile ? 1 : 2),
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 4,
          color: `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`,
          vx: (Math.random() - 0.5) * (isMobile ? 0.5 : 2),
          vy: (Math.random() - 0.5) * (isMobile ? 0.5 : 2) - (isMobile ? 0.3 : 1),
        })
      }
      setParticles(newParticles)
    }
  }, [showTitle, isMobile])

  // Shooting stars effect - REDUCED for mobile
  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 10,
        delay: Math.random() * (isMobile ? 3 : 2),
        duration: (isMobile ? 1 : 1.5) + Math.random() * (isMobile ? 0.5 : 1),
        size: (isMobile ? 1 : 2) + Math.random() * (isMobile ? 1 : 3),
      }
      setShootingStars(prev => [...prev, newStar])
      soundManager.playShootingStar()
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id))
      }, (newStar.duration + newStar.delay) * 1000)
    }

    const interval = setInterval(createShootingStar, (isMobile ? 6000 : 4000) + Math.random() * (isMobile ? 3000 : 3000))
    createShootingStar()
    
    return () => clearInterval(interval)
  }, [isMobile])

  // Title glow animation - REDUCED for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => (prev + 1) % 6)
    }, isMobile ? 4000 : 3000)
    return () => clearInterval(interval)
  }, [isMobile])

  // Text progression
  useEffect(() => {
    let lineIndex = 0
    
    const showNextLine = () => {
      if (lineIndex < introLines.length) {
        setCurrentLine(lineIndex)
        lineIndex++
        timeoutRef.current = setTimeout(showNextLine, isMobile ? 4500 : 4000)
      } else {
        setShowAllText(true)
        timeoutRef.current = setTimeout(() => {
          setShowTitle(true)
          soundManager.playChime()
          timeoutRef.current = setTimeout(() => {
            setShowButton(true)
          }, isMobile ? 2500 : 2000)
        }, isMobile ? 1800 : 1500)
      }
    }

    timeoutRef.current = setTimeout(showNextLine, isMobile ? 1200 : 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isMobile])

  const handleLineComplete = () => {
    soundManager.playClick()
  }

  const handleBegin = () => {
    soundManager.playClick()
    soundManager.startHappyMusic()
    navigate('/birthday-station')
  }

  // Title glow colors
  const glowColors = [
    'rgba(107, 63, 245, 0.6)',
    'rgba(192, 132, 252, 0.6)',
    'rgba(244, 114, 182, 0.6)',
    'rgba(107, 63, 245, 0.6)',
    'rgba(192, 132, 252, 0.6)',
    'rgba(244, 114, 182, 0.6)',
  ]

  // Letter animations for the title - REDUCED for mobile
  const titleLetters = "BIRTHDAY JOURNEY".split('')

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '32px',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #1a0e38 0%, #0a0618 70%, #05020a 100%)',
    }}>
      {/* Shooting Stars - REDUCED opacity on mobile */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          initial={{ 
            x: `${star.x}%`, 
            y: `${star.y}%`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{ 
            x: `${star.x + 40}%`, 
            y: `${star.y + 40}%`,
            opacity: [0, isMobile ? 0.6 : 1, 0],
            scale: [0.5, isMobile ? 1.2 : 2, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div style={{
            width: star.size * (isMobile ? 2 : 3),
            height: star.size * (isMobile ? 2 : 3),
            background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(192,132,252,0.6), transparent)',
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * (isMobile ? 10 : 20)}px rgba(192,132,252,${isMobile ? 0.3 : 0.6}), 0 0 ${star.size * (isMobile ? 20 : 40)}px rgba(192,132,252,${isMobile ? 0.15 : 0.3})`,
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: star.size * (isMobile ? 4 : 8),
            height: star.size * (isMobile ? 0.3 : 0.5),
            background: 'linear-gradient(to right, rgba(255,255,255,0.8), transparent)',
            borderRadius: '50%',
          }} />
        </motion.div>
      ))}

      {/* Background gradient - LIGHTER on mobile */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(107, 63, 245, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(192, 132, 252, 0.05) 0%, transparent 50%)'
      }} />

      {/* Floating particles - REDUCED on mobile */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(isMobile ? 20 : 50)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: (isMobile ? 1 : 2) + Math.random() * (isMobile ? 1 : 2),
              height: (isMobile ? 1 : 2) + Math.random() * (isMobile ? 1 : 2),
              borderRadius: '50%',
              background: `hsl(${240 + Math.random() * 60}, 70%, ${70 + Math.random() * 30}%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isMobile ? 0.2 : 0.3,
            }}
            animate={{
              opacity: [0.1, isMobile ? 0.4 : 0.8, 0.1],
              scale: [1, isMobile ? 1.3 : 1.8, 1],
            }}
            transition={{
              duration: (isMobile ? 3 : 2) + Math.random() * (isMobile ? 3 : 4),
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.5 : 1 }}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '896px',
          textAlign: 'center'
        }}
      >
        <AnimatePresence mode="wait">
          {!showAllText && (
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: 'easeOut' }}
              style={{
                minHeight: isMobile ? '150px' : '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '10px' : '20px',
              }}
            >
              <motion.p
                initial={{ textShadow: '0 0 0px rgba(192,132,252,0)' }}
                animate={{ textShadow: '0 0 40px rgba(107,63,245,0.3), 0 0 80px rgba(107,63,245,0.1)' }}
                transition={{ duration: 1 }}
                style={{
                  fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.8rem)' : 'clamp(1.5rem, 3vw, 2.8rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.6,
                  letterSpacing: '0.02em',
                }}
              >
                <TypewriterText
                  text={introLines[currentLine]}
                  speed={isMobile ? 55 : 45}
                  onComplete={handleLineComplete}
                />
              </motion.p>
            </motion.div>
          )}

          {showAllText && showTitle && (
            <motion.div
              initial={{ scale: isMobile ? 0.6 : 0.5, opacity: 0, y: isMobile ? 30 : 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.8 : 1.2, type: 'spring', stiffness: isMobile ? 60 : 70, damping: isMobile ? 20 : 15 }}
            >
              <div style={{ marginBottom: isMobile ? '16px' : '32px' }}>
                <motion.div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {/* Glow Rings - REDUCED on mobile */}
                  {!isMobile && (
                    <>
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: '-80px',
                          borderRadius: '50%',
                          border: `2px solid ${glowColors[titleGlow % glowColors.length]}`,
                          opacity: 0.3,
                        }}
                        animate={{ 
                          scale: [1, 1.3, 1], 
                          rotate: [0, 360],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: '-120px',
                          borderRadius: '50%',
                          border: `1px solid ${glowColors[(titleGlow + 2) % glowColors.length]}`,
                          opacity: 0.15,
                        }}
                        animate={{ 
                          scale: [1, 1.15, 1], 
                          rotate: [-360, 0],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: '-160px',
                          borderRadius: '50%',
                          border: `1px solid ${glowColors[(titleGlow + 4) % glowColors.length]}`,
                          opacity: 0.1,
                        }}
                        animate={{ 
                          scale: [1, 1.08, 1], 
                          rotate: [0, 360],
                          opacity: [0.05, 0.2, 0.05],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      />
                    </>
                  )}

                  {/* Title with Letter-by-Letter Animation - SIMPLIFIED on mobile */}
                  <motion.div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 6vw, 5rem)',
                      fontWeight: 'bold',
                      lineHeight: isMobile ? 1.1 : 1.2,
                      position: 'relative',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: isMobile ? '0.01em' : '0.02em',
                    }}
                  >
                    {titleLetters.map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          y: isMobile ? 20 : 50, 
                          rotateX: isMobile ? 30 : 90,
                          scale: isMobile ? 0.7 : 0.5,
                        }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: isMobile ? 0.4 : 0.6,
                          delay: isMobile ? 0.05 + index * 0.03 : 0.1 + index * 0.05,
                          type: 'spring',
                          stiffness: isMobile ? 120 : 100,
                          damping: isMobile ? 15 : 12,
                        }}
                        style={{
                          display: 'inline-block',
                          color: letter === ' ' ? 'transparent' : 'inherit',
                          textShadow: `0 0 ${isMobile ? '15px' : '30px'} ${glowColors[index % glowColors.length]}`,
                          transformOrigin: 'center bottom',
                          cursor: 'default',
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Subtitle with floating animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    transition={{ 
                      delay: isMobile ? 0.5 : 0.8, 
                      duration: isMobile ? 0.5 : 0.8,
                      type: 'spring',
                      stiffness: isMobile ? 60 : 80,
                    }}
                    style={{
                      marginTop: isMobile ? '4px' : '8px',
                      position: 'relative',
                    }}
                  >
                    <motion.span
                      animate={!isMobile ? {
                        y: [0, -5, 0],
                        textShadow: [
                          '0 0 20px rgba(192,132,252,0.2)',
                          '0 0 40px rgba(192,132,252,0.4)',
                          '0 0 20px rgba(192,132,252,0.2)',
                        ]
                      } : {}}
                      transition={{
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      style={{
                        fontSize: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
                        color: 'rgba(192, 132, 252, 0.8)',
                        fontWeight: 'normal',
                        display: 'inline-block',
                        position: 'relative',
                      }}
                    >
                      ✦ for Luuxyy ✦
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              {showButton && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15, delay: isMobile ? 0.3 : 0.5 }}
                >
                  <motion.div
                    whileHover={!isMobile ? { scale: 1.08 } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassCard
                      onClick={handleBegin}
                      glow={true}
                      hover={!isMobile}
                      className="inline-block"
                    >
                      <motion.span
                        animate={!isMobile ? { 
                          scale: [1, 1.05, 1],
                          textShadow: [
                            '0 0 0px rgba(192,132,252,0)',
                            '0 0 20px rgba(192,132,252,0.4)',
                            '0 0 0px rgba(192,132,252,0)',
                          ]
                        } : {}}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1rem)' : '1.125rem',
                          fontFamily: "'Playfair Display', serif",
                          color: 'rgba(192, 132, 252, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        🌟 Begin Journey
                      </motion.span>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Intro