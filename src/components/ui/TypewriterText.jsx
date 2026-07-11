import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const TypewriterText = ({ 
  text, 
  speed = 50,
  delay = 0, 
  className = '', 
  onComplete = () => {}, 
  cursor = true,
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showCursorState, setShowCursorState] = useState(true)
  const timerRef = useRef(null)
  const indexRef = useRef(0)
  const completedRef = useRef(false)
  const textRef = useRef(text)

  useEffect(() => {
    // Reset when text changes
    textRef.current = text
    setDisplayText('')
    setIsComplete(false)
    setShowCursorState(true)
    indexRef.current = 0
    completedRef.current = false

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Start typing after delay
    const startDelay = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(startDelay)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [text, delay])

  const startTyping = () => {
    if (completedRef.current) return
    
    const currentText = textRef.current
    
    if (indexRef.current < currentText.length) {
      const char = currentText[indexRef.current]
      setDisplayText(prev => prev + char)
      indexRef.current++
      timerRef.current = setTimeout(startTyping, speed)
    } else {
      completedRef.current = true
      setIsComplete(true)
      setShowCursorState(false)
      
      setTimeout(() => {
        onComplete()
      }, 600)
    }
  }

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursorState && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            marginLeft: '2px',
            background: '#a78bfa',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </span>
  )
}

export default TypewriterText