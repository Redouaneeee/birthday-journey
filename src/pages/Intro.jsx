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
  const timeoutRef = useRef(null)

  const introLines = storyData.cinematicIntro.lines

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

  // Create title particles when title appears
  useEffect(() => {
    if (showTitle) {
      const newParticles = []
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 4,
          color: `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        })
      }
      setParticles(newParticles)
    }
  }, [showTitle])

  // Shooting stars effect
  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 10,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 1,
        size: 2 + Math.random() * 3,
      }
      setShootingStars(prev => [...prev, newStar])
      soundManager.playShootingStar()
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id))
      }, (newStar.duration + newStar.delay) * 1000)
    }

    const interval = setInterval(createShootingStar, 4000 + Math.random() * 3000)
    createShootingStar()
    return () => clearInterval(interval)
  }, [])

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Text progression
  useEffect(() => {
    let lineIndex = 0
    
    const showNextLine = () => {
      if (lineIndex < introLines.length) {
        setCurrentLine(lineIndex)
        lineIndex++
        timeoutRef.current = setTimeout(showNextLine, 4000)
      } else {
        setShowAllText(true)
        timeoutRef.current = setTimeout(() => {
          setShowTitle(true)
          soundManager.playChime()
          timeoutRef.current = setTimeout(() => {
            setShowButton(true)
          }, 2000)
        }, 1500)
      }
    }

    timeoutRef.current = setTimeout(showNextLine, 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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

  // Letter animations for the title
  const titleLetters = "BIRTHDAY JOURNEY".split('')

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
    }}>
      {/* Shooting Stars */}
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
            opacity: [0, 1, 0],
            scale: [0.5, 2, 0.5],
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
            width: star.size * 3,
            height: star.size * 3,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(192,132,252,0.6), transparent)',
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 20}px rgba(192,132,252,0.6), 0 0 ${star.size * 40}px rgba(192,132,252,0.3)`,
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: star.size * 8,
            height: star.size * 0.5,
            background: 'linear-gradient(to right, rgba(255,255,255,0.8), transparent)',
            borderRadius: '50%',
          }} />
        </motion.div>
      ))}

      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(107, 63, 245, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(192, 132, 252, 0.05) 0%, transparent 50%)'
      }} />

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              borderRadius: '50%',
              background: `hsl(${240 + Math.random() * 60}, 70%, ${70 + Math.random() * 30}%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <motion.p
                initial={{ textShadow: '0 0 0px rgba(192,132,252,0)' }}
                animate={{ textShadow: '0 0 40px rgba(107,63,245,0.3), 0 0 80px rgba(107,63,245,0.1)' }}
                transition={{ duration: 1 }}
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.6,
                  letterSpacing: '0.02em',
                }}
              >
                <TypewriterText
                  text={introLines[currentLine]}
                  speed={45}
                  onComplete={handleLineComplete}
                />
              </motion.p>
            </motion.div>
          )}

          {showAllText && showTitle && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 70, damping: 15 }}
            >
              <div style={{ marginBottom: '32px' }}>
                <motion.div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {/* Rotating Glow Rings */}
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

                  {/* Explosion Sparkles behind title */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: Math.cos((i / 20) * Math.PI * 2) * (80 + Math.random() * 60),
                        y: Math.sin((i / 20) * Math.PI * 2) * (80 + Math.random() * 60),
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 0.5,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: 2 + Math.random() * 2,
                      }}
                      style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: ['#fbbf24', '#f472b6', '#a78bfa', '#34d399', '#60a5fa', '#f59e0b'][i % 6],
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 10px ${['#fbbf24', '#f472b6', '#a78bfa', '#34d399', '#60a5fa', '#f59e0b'][i % 6]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  ))}

                  {/* Title with Letter-by-Letter Animation */}
                  <motion.div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                      position: 'relative',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '0.02em',
                    }}
                  >
                    {titleLetters.map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          y: 50, 
                          rotateX: 90,
                          scale: 0.5,
                        }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.1 + index * 0.05,
                          type: 'spring',
                          stiffness: 100,
                          damping: 12,
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, 5, -5, 0],
                          transition: { duration: 0.3 }
                        }}
                        style={{
                          display: 'inline-block',
                          color: letter === ' ' ? 'transparent' : 'inherit',
                          textShadow: `0 0 30px ${glowColors[index % glowColors.length]}`,
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    transition={{ 
                      delay: 0.8, 
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 80,
                    }}
                    style={{
                      marginTop: '8px',
                      position: 'relative',
                    }}
                  >
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        textShadow: [
                          '0 0 20px rgba(192,132,252,0.2)',
                          '0 0 40px rgba(192,132,252,0.4)',
                          '0 0 20px rgba(192,132,252,0.2)',
                        ]
                      }}
                      transition={{
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        color: 'rgba(192, 132, 252, 0.8)',
                        fontWeight: 'normal',
                        display: 'inline-block',
                        position: 'relative',
                      }}
                    >
                      ✦ for Luuxyy ✦
                    </motion.span>
                  </motion.div>

                  {/* Floating particles around title */}
                  {particles.map((p, i) => (
                    <motion.div
                      key={`title-particle-${i}`}
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: `${p.x}%`,
                        y: `${p.y}%`,
                      }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.5, 0],
                        x: `${p.x + p.vx * 10}%`,
                        y: `${p.y + p.vy * 10}%`,
                      }}
                      transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeOut',
                      }}
                      style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                        left: 0,
                        top: 0,
                        pointerEvents: 'none',
                      }}
                    />
                  ))}

                  {/* Title shine effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-20%',
                      left: '-10%',
                      right: '-10%',
                      height: '40%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      opacity: 0.3,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </div>

              {showButton && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15, delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassCard
                      onClick={handleBegin}
                      glow={true}
                      hover={true}
                      className="inline-block"
                    >
                      <motion.span
                        animate={{ 
                          scale: [1, 1.05, 1],
                          textShadow: [
                            '0 0 0px rgba(192,132,252,0)',
                            '0 0 20px rgba(192,132,252,0.4)',
                            '0 0 0px rgba(192,132,252,0)',
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          fontSize: '1.125rem',
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