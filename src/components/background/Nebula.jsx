import React, { useEffect, useRef } from 'react'

const Nebula = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const particleCount = 80

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const colors = [
        'rgba(107, 63, 245, 0.15)',
        'rgba(192, 132, 252, 0.1)',
        'rgba(244, 114, 182, 0.08)',
        'rgba(126, 200, 227, 0.05)'
      ]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    const drawNebula = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        )
        
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(0.5, particle.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        particle.x += particle.speedX * Math.sin(time * 0.0005 + index)
        particle.y += particle.speedY * Math.cos(time * 0.0005 + index)

        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius
      })
    }

    const animate = (time) => {
      drawNebula(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate(0)

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }} />
}

export default Nebula