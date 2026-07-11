import React, { useEffect, useRef } from 'react'

const SparkleTrail = () => {
  const canvasRef = useRef(null)
  const sparkles = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const isActive = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isActive.current = true
      
      // Create sparkles
      for (let i = 0; i < 2; i++) {
        const colors = [
          `hsl(${240 + Math.random() * 60}, 80%, ${70 + Math.random() * 30}%)`,
          `hsl(${280 + Math.random() * 40}, 80%, ${70 + Math.random() * 30}%)`,
          `hsl(${320 + Math.random() * 30}, 80%, ${70 + Math.random() * 30}%)`,
        ]
        sparkles.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 15,
          y: mousePos.current.y + (Math.random() - 0.5) * 15,
          size: Math.random() * 3 + 1.5,
          life: 1,
          decay: 0.01 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const handleMouseLeave = () => {
      isActive.current = false
    }

    const drawSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Limit sparkles
      if (sparkles.current.length > 100) {
        sparkles.current = sparkles.current.slice(-50)
      }
      
      sparkles.current = sparkles.current.filter(s => s.life > 0)
      
      sparkles.current.forEach((s, index) => {
        s.x += s.vx + Math.sin(s.phase + index) * 0.1
        s.y += s.vy + Math.cos(s.phase + index) * 0.1
        s.life -= s.decay
        s.size *= 0.998
        s.phase += 0.1
        
        // Glow
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3)
        gradient.addColorStop(0, s.color)
        gradient.addColorStop(0.3, s.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = s.life * 0.3
        ctx.fill()
        
        // Core sparkle
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.life * 0.9
        ctx.shadowColor = s.color
        ctx.shadowBlur = 15
        ctx.fill()
        ctx.shadowBlur = 0
        
        // Cross sparkle
        ctx.beginPath()
        ctx.moveTo(s.x - s.size * 2, s.y)
        ctx.lineTo(s.x + s.size * 2, s.y)
        ctx.moveTo(s.x, s.y - s.size * 2)
        ctx.lineTo(s.x, s.y + s.size * 2)
        ctx.strokeStyle = s.color
        ctx.globalAlpha = s.life * 0.4
        ctx.lineWidth = 0.5
        ctx.shadowColor = s.color
        ctx.shadowBlur = 5
        ctx.stroke()
        ctx.shadowBlur = 0
        
        // Small dots around
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2 + s.phase
          const dist = s.size * 3
          ctx.beginPath()
          ctx.arc(
            s.x + Math.cos(angle) * dist,
            s.y + Math.sin(angle) * dist,
            s.size * 0.3,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = s.color
          ctx.globalAlpha = s.life * 0.3
          ctx.fill()
        }
      })
      
      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(drawSparkles)
    }

    resizeCanvas()
    drawSparkles()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20 }} />
}

export default SparkleTrail