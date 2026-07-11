import React, { useEffect, useRef } from 'react'

const StarField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []
    const starCount = 300

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      stars = []
      for (let i = 0; i < starCount; i++) {
        const hue = 240 + Math.random() * 60
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.05 + 0.02,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: `hsl(${hue}, 70%, ${70 + Math.random() * 30}%)`
        })
      }
    }

    const drawStars = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const opacity = star.opacity * twinkle
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = opacity
        ctx.fill()
        
        if (star.size > 1.5) {
          ctx.shadowColor = star.color
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.shadowBlur = 0
        }
        
        ctx.globalAlpha = 1
        star.y += star.speed * 0.1
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })
    }

    const animate = (time) => {
      drawStars(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate(0)

    window.addEventListener('resize', () => {
      resizeCanvas()
      createStars()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

export default StarField