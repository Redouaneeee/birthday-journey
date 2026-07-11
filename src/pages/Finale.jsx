import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import confetti from 'canvas-confetti'
import GlassCard from '../components/ui/GlassCard'
import TypewriterText from '../components/ui/TypewriterText'
import soundManager from '../utils/soundManager'

const Finale = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(0)
  const [showCake, setShowCake] = useState(false)
  const [isBlowing, setIsBlowing] = useState(false)
  const [candlesOff, setCandlesOff] = useState(false)
  const [showClosing, setShowClosing] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showWishText, setShowWishText] = useState(false)
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)
  const hasBlownRef = useRef(false)

  // FINALE MESSAGE
  const finaleMessage = `Before we say goodbye, there's one last thing I want you to remember.🌟🌟

You are a truly wonderful person, and I hope you never forget that🌟🌟

I know sometimes you worry about the future or feel like you're running out of time. But please... don't rush your story.🌟🌟

You're only 24. Life still has so many chapters waiting for you.🌟🌟

I believe your destiny is quietly holding beautiful things for you. Maybe what you've been wishing for is already closer than you think ,you just haven't reached it yet.🌟🌟

One day, I hope you'll look back and realize that everything happened exactly when it was meant to.🌟🌟

Until then, keep smiling, keep believing in yourself, and keep being the amazing person you are.🌟🌟

Happy 24th Birthday.🌟🌟

Thank you for taking this journey with me.🌟🌟

The best part of your story may still be waiting just ahead.🌟🌟`

  const finaleSteps = [
    { type: 'intro', content: "🌌 Everything fades.\n\nStars appear.\n\nYou've reached the end.\n\nOr... maybe the beginning.", delay: 3000 },
    { type: 'cake', content: "🎂 The birthday cake appears.\n\nOne last mission.\n\nMake a wish.", delay: 2500 },
    { type: 'wish', content: "✨ Your wish is on its way...", delay: 1500 },
    { type: 'closing', content: finaleMessage, delay: 5000 }
  ]

  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        color: `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`
      })
    }
    setParticles(newParticles)

    const timer = setTimeout(() => {
      setShowStars(true)
      setTimeout(() => {
        setStep(1)
        setShowCake(true)
        soundManager.playChime()
      }, 1800)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleBlowCandle = () => {
    if (hasBlownRef.current) return
    hasBlownRef.current = true
    
    setIsBlowing(true)
    soundManager.playBlow()
    
    setTimeout(() => {
      setCandlesOff(true)
      setShowWishText(true)
      soundManager.playChime()
    }, 1000)
    
    const animateConfetti = () => {
      const duration = 2500
      const end = Date.now() + duration

      const frame = () => {
        const timeLeft = end - Date.now()
        if (timeLeft <= 0) return

        const count = Math.min(35, 35 * (timeLeft / duration))
        
        confetti({
          particleCount: count,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc']
        })
        
        requestAnimationFrame(frame)
      }
      
      frame()
    }

    animateConfetti()

    setTimeout(() => soundManager.playCelebration(), 300)
    setTimeout(() => soundManager.playCelebration(), 700)
    setTimeout(() => soundManager.playCelebration(), 1100)

    setTimeout(() => {
      setStep(2)
      setTimeout(() => {
        setStep(3)
        setShowClosing(true)
        soundManager.playSuccess()
        setShowButton(true)
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc']
          })
        }, 300)
      }, 2500)
    }, 3000)
  }

  const handleTouchBlow = (e) => {
    e.preventDefault()
    if (!isBlowing && !hasBlownRef.current && step === 1) {
      handleBlowCandle()
    }
  }

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px',
        background: 'radial-gradient(ellipse at center, #1a0e38 0%, #0a0618 70%, #05020a 100%)',
        overflow: 'hidden',
        touchAction: 'none',
      }}
      onTouchStart={handleTouchBlow}
    >
      {showStars && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                borderRadius: '50%',
                background: `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${5 + Math.random() * 10}px rgba(167,139,250,${0.2 + Math.random() * 0.2})`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

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
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            opacity: 0,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -150 - Math.random() * 150],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%', 
          maxWidth: '800px',
          maxHeight: '100vh',
          overflow: 'auto',
          padding: '8px',
        }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <GlassCard className="w-full" glow>
                <div style={{ padding: '24px 0' }}>
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ fontSize: '3.5rem', marginBottom: '12px' }}
                  >
                    🌌
                  </motion.div>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'rgba(192, 132, 252, 0.9)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    <TypewriterText
                      text={finaleSteps[0].content}
                      speed={35}
                      onComplete={() => {
                        setTimeout(() => {
                          setStep(1)
                          setShowCake(true)
                          soundManager.playChime()
                        }, 1200)
                      }}
                    />
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 1: Beautiful Cake with VISIBLE Candles */}
          {step === 1 && showCake && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ marginBottom: '16px' }}>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'rgba(192, 132, 252, 0.9)', lineHeight: 1.6, whiteSpace: 'pre-line' }}
                >
                  <TypewriterText
                    text={finaleSteps[1].content}
                    speed={30}
                    onComplete={() => {}}
                  />
                </motion.p>
              </div>

              {/* BEAUTIFUL CAKE WITH VISIBLE CANDLES */}
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 60 }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
              >
                <div style={{ position: 'relative', padding: '20px 10px 10px 10px' }}>
                  {/* Cake Glow */}
                  <div style={{ 
                    position: 'absolute', 
                    inset: '-30px', 
                    background: candlesOff ? 'rgba(236, 72, 153, 0.05)' : 'rgba(251, 191, 36, 0.1)', 
                    filter: 'blur(50px)', 
                    borderRadius: '50%',
                    transition: 'all 1s ease'
                  }} />
                  
                  {/* Candles Container - Positioned ABOVE the cake */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 'clamp(12px, 2.5vw, 22px)',
                    marginBottom: '-8px',
                    position: 'relative',
                    zIndex: 5,
                    height: 'clamp(70px, 10vw, 90px)',
                    alignItems: 'flex-end'
                  }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i} 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          position: 'relative',
                        }}
                        animate={{ 
                          y: isBlowing ? [0, -5, 0] : [0, -2, 0],
                          rotate: isBlowing ? [0, 3, -3, 0] : [0, 1, -1, 0]
                        }}
                        transition={{ 
                          duration: isBlowing ? 0.4 : 2, 
                          repeat: isBlowing ? 0 : Infinity,
                          delay: i * 0.05
                        }}
                      >
                        {/* Candle Stick - Visible and colorful */}
                        <div style={{ 
                          width: 'clamp(6px, 0.8vw, 10px)', 
                          height: 'clamp(40px, 6vw, 60px)', 
                          background: candlesOff 
                            ? 'linear-gradient(to bottom, #94a3b8, #64748b)' 
                            : ['#f472b6', '#f59e0b', '#34d399', '#60a5fa', '#a78bfa'][i % 5],
                          borderRadius: '3px 3px 0 0',
                          transition: 'all 1s ease',
                          boxShadow: candlesOff ? 'none' : `0 0 15px ${['rgba(244,114,182,0.3)', 'rgba(245,158,11,0.3)', 'rgba(52,211,153,0.3)', 'rgba(96,165,250,0.3)', 'rgba(167,139,250,0.3)'][i % 5]}`,
                          position: 'relative',
                        }}>
                          {/* Candle stripes */}
                          {!candlesOff && (
                            <div style={{
                              position: 'absolute',
                              top: '20%',
                              left: 0,
                              right: 0,
                              height: '2px',
                              background: 'rgba(255,255,255,0.2)',
                              borderRadius: '1px',
                            }} />
                          )}
                        </div>
                        
                        {/* Candle Base */}
                        <div style={{ 
                          width: 'clamp(10px, 1.2vw, 16px)', 
                          height: 'clamp(4px, 0.5vw, 6px)', 
                          background: candlesOff ? '#94a3b8' : '#f472b6',
                          borderRadius: '2px',
                          transition: 'all 1s ease',
                          marginTop: '-1px',
                        }} />
                        
                        {/* FLAME - Large and visible */}
                        {!candlesOff && (
                          <motion.div
                            style={{ 
                              position: 'absolute', 
                              top: '-clamp(16px, 2.5vw, 28px)', 
                              left: '50%', 
                              transform: 'translateX(-50%)', 
                              width: 'clamp(18px, 2.5vw, 30px)', 
                              height: 'clamp(18px, 2.5vw, 30px)', 
                              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                              background: 'radial-gradient(ellipse at 30% 30%, #fef08a, #fbbf24, #f59e0b, #f97316)',
                              boxShadow: '0 0 40px rgba(251,191,36,0.6), 0 0 80px rgba(251,191,36,0.3), 0 0 120px rgba(251,191,36,0.1)',
                              zIndex: 10,
                            }}
                            animate={{
                              scale: [1, 1.15, 0.95, 1],
                              rotate: [0, 3, -3, 2, -2, 0],
                              y: [0, -2, 1, -1, 0],
                              x: [0, 1, -1, 0.5, -0.5, 0],
                            }}
                            transition={{
                              duration: 0.3 + Math.random() * 0.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            {/* Inner flame glow */}
                            <div style={{ 
                              position: 'absolute', 
                              top: '15%', 
                              left: '20%', 
                              width: '50%', 
                              height: '50%', 
                              borderRadius: '50%', 
                              background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(254,240,138,0.5))',
                              filter: 'blur(2px)'
                            }} />
                            
                            {/* Outer glow ring */}
                            <div style={{ 
                              position: 'absolute', 
                              inset: '-50%', 
                              borderRadius: '50%', 
                              background: 'radial-gradient(circle, rgba(251,191,36,0.2), transparent)',
                              filter: 'blur(10px)'
                            }} />
                          </motion.div>
                        )}
                        
                        {/* Smoke when blown out */}
                        {candlesOff && (
                          <motion.div
                            initial={{ scale: 0.3, opacity: 1 }}
                            animate={{ 
                              scale: 2.5, 
                              opacity: 0,
                              y: -40,
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            style={{ 
                              position: 'absolute', 
                              top: '-10px', 
                              left: '50%', 
                              transform: 'translateX(-50%)',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: 'rgba(200,200,200,0.4)',
                              filter: 'blur(6px)',
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Cake Body */}
                  <div style={{ 
                    width: 'clamp(250px, 50vw, 350px)', 
                    height: 'clamp(120px, 22vw, 170px)', 
                    background: 'linear-gradient(180deg, #f9a8d4 0%, #f472b6 30%, #ec4899 70%, #db2777 100%)', 
                    borderRadius: '30px 30px 16px 16px', 
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(236,72,153,0.15)', 
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: '-5px',
                  }}>
                    {/* Cake Shine */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }} />
                    
                    {/* Cake Layer 1 - Top */}
                    <div style={{ 
                      position: 'absolute', 
                      top: '-12px', 
                      left: '10%', 
                      right: '10%',
                      height: '20px', 
                      background: 'linear-gradient(to bottom, #fbcfe8, #f9a8d4)', 
                      borderRadius: '9999px',
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
                    }} />
                    
                    {/* Cake Layer 2 - Middle */}
                    <div style={{ 
                      position: 'absolute', 
                      top: '30%', 
                      left: '5%', 
                      right: '5%',
                      height: '4px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '2px',
                    }} />
                    
                    {/* Cake Bottom Decoration */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      width: '100%', 
                      height: '20px', 
                      background: 'rgba(219, 39, 119, 0.4)', 
                      borderRadius: '0 0 16px 16px' 
                    }} />
                    
                    {/* Frosting Drips */}
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '10%',
                      width: '6px',
                      height: '15px',
                      background: '#f9a8d4',
                      borderRadius: '0 0 3px 3px',
                      opacity: 0.6
                    }} />
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '25%',
                      width: '4px',
                      height: '10px',
                      background: '#f9a8d4',
                      borderRadius: '0 0 2px 2px',
                      opacity: 0.5
                    }} />
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      right: '15%',
                      width: '5px',
                      height: '12px',
                      background: '#f9a8d4',
                      borderRadius: '0 0 3px 3px',
                      opacity: 0.6
                    }} />
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      right: '30%',
                      width: '3px',
                      height: '8px',
                      background: '#f9a8d4',
                      borderRadius: '0 0 2px 2px',
                      opacity: 0.4
                    }} />
                    
                    {/* Decorative Sprinkles */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          top: `${15 + Math.random() * 65}%`,
                          left: `${5 + Math.random() * 90}%`,
                          width: `${3 + Math.random() * 4}px`,
                          height: `${3 + Math.random() * 4}px`,
                          background: ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#f59e0b', '#fb923c', '#22d3ee'][i % 8],
                          borderRadius: '2px',
                          transform: `rotate(${Math.random() * 90}deg)`,
                          boxShadow: '0 0 4px rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                    
                    {/* Small decorative dots */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '15px', 
                      left: '15px', 
                      width: '6px', 
                      height: '6px', 
                      background: '#fbcfe8', 
                      borderRadius: '50%' 
                    }} />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '15px', 
                      right: '15px', 
                      width: '6px', 
                      height: '6px', 
                      background: '#fbcfe8', 
                      borderRadius: '50%' 
                    }} />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '15px', 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      width: '6px', 
                      height: '6px', 
                      background: '#fbcfe8', 
                      borderRadius: '50%' 
                    }} />
                    
                    {/* Wish Text - Appears after candles go out */}
                    {showWishText && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 80, delay: 0.3 }}
                        style={{
                          position: 'absolute',
                          bottom: '50%',
                          left: '50%',
                          transform: 'translate(-50%, 50%)',
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
                          color: 'rgba(255,255,255,0.95)',
                          textShadow: '0 0 40px rgba(192,132,252,0.6), 0 0 80px rgba(192,132,252,0.3)',
                          background: 'rgba(0,0,0,0.3)',
                          padding: '10px 20px',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)',
                          pointerEvents: 'none',
                          whiteSpace: 'nowrap',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 0 40px rgba(192,132,252,0.2)',
                        }}
                      >
                        ✨ Your wish is on its way...
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Blow Button */}
              {!isBlowing && !hasBlownRef.current && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    onClick={handleBlowCandle}
                    onTouchStart={(e) => {
                      e.preventDefault()
                      if (!isBlowing && !hasBlownRef.current && step === 1) {
                        handleBlowCandle()
                      }
                    }}
                    style={{
                      padding: 'clamp(14px, 2.5vw, 18px) clamp(32px, 5vw, 44px)',
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(107, 63, 245, 0.4))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(236, 72, 153, 0.5)',
                      borderRadius: '12px',
                      color: 'rgba(244, 114, 182, 0.95)',
                      fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                      fontFamily: "'Playfair Display', serif",
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      touchAction: 'none',
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    💨 Make a Wish (Tap or Click)
                  </motion.button>
                </motion.div>
              )}
              
              {/* Blowing animation text */}
              {isBlowing && !candlesOff && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginTop: '12px' }}
                >
                  <p style={{ 
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', 
                    color: 'rgba(192,132,252,0.7)',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    🌬️ Blowing out the candles...
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
              style={{ textAlign: 'center' }}
            >
              <GlassCard className="w-full" glow>
                <div style={{ padding: '24px 0' }}>
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '4rem', marginBottom: '12px' }}
                  >
                    ✨
                  </motion.div>
                  <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: 'rgba(192, 132, 252, 0.9)', lineHeight: 1.6 }}>
                    <TypewriterText
                      text={finaleSteps[2].content}
                      speed={35}
                      onComplete={() => {
                        setTimeout(() => {
                          setStep(3)
                          setShowClosing(true)
                          soundManager.playSuccess()
                          setShowButton(true)
                          setTimeout(() => {
                            confetti({
                              particleCount: 100,
                              spread: 70,
                              origin: { y: 0.5 },
                              colors: ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc']
                            })
                          }, 300)
                        }, 1500)
                      }}
                    />
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 3 && showClosing && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 60 }}
            >
              <GlassCard className="w-full" glow>
                <div style={{ padding: 'clamp(16px, 3vw, 32px)', textAlign: 'center' }}>
                  <motion.div 
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '12px' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎉
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ 
                      fontFamily: "'Playfair Display', serif", 
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                      color: 'rgba(192, 132, 252, 0.95)',
                      marginBottom: '20px',
                      textShadow: '0 0 30px rgba(192,132,252,0.2)'
                    }}
                  >
                    🎉Happy 24th Birthday LUUXXYYYYY !🎉 
                  </motion.h2>
                  
                  <div style={{ 
                    fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', 
                    color: 'rgba(192, 132, 252, 0.85)', 
                    lineHeight: 2,
                    whiteSpace: 'pre-line',
                    maxWidth: '650px',
                    margin: '0 auto',
                    textAlign: 'left',
                    padding: '0 8px',
                  }}>
                    <TypewriterText
                      text={finaleSteps[3].content}
                      speed={28}
                      onComplete={() => {}}
                    />
                  </div>
                  
                  {showButton && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      style={{ marginTop: '24px' }}
                    >
                      <motion.button
                        onClick={() => {
                          soundManager.playClick()
                          navigate('/')
                        }}
                        onTouchStart={() => {
                          soundManager.playClick()
                          navigate('/')
                        }}
                        style={{
                          padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: 'rgba(192, 132, 252, 0.8)',
                          fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Playfair Display', serif",
                          touchAction: 'none',
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          borderColor: 'rgba(107, 63, 245, 0.4)',
                          boxShadow: '0 0 20px rgba(107, 63, 245, 0.1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🌟 Return to the beginning
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Finale