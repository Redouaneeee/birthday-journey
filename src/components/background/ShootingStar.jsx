import React, { useEffect, useRef } from 'react'

const ShootingStar = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let shootingStars = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class ShootingStar {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width * 0.8
        this.y = Math.random() * canvas.height * 0.5
        this.length = Math.random() * 80 + 40
        this.speed = Math.random() * 6 + 4
        this.opacity = 1
        this.trail = []
        this.active = false
        this.timer = Math.random() * 5000 + 3000
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
      }

      update() {
        if (!this.active) {
          this.timer -= 16
          if (this.timer <= 0) {
            this.active = true
            this.x = Math.random() * canvas.width * 0.8
            this.y = Math.random() * canvas.height * 0.5
            this.trail = []
          }
          return
        }

        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 20) {
          this.trail.shift()
        }

        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        this.opacity -= 0.004

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.active = false
          this.opacity = 1
          this.timer = Math.random() * 5000 + 3000
          this.reset()
        }
      }

      draw(ctx) {
        if (!this.active || this.trail.length < 2) return

        const gradient = ctx.createLinearGradient(
          this.trail[0].x, this.trail[0].y,
          this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.1})`)
        gradient.addColorStop(0.5, `rgba(192, 132, 252, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`)

        ctx.beginPath()
        ctx.moveTo(this.trail[0].x, this.trail[0].y)
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y)
        }
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.shadowColor = 'rgba(192, 132, 252, 0.5)'
        ctx.shadowBlur = 20
        ctx.stroke()
        ctx.shadowBlur = 0

        const head = this.trail[this.trail.length - 1]
        ctx.beginPath()
        ctx.arc(head.x, head.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.shadowColor = 'rgba(192, 132, 252, 0.8)'
        ctx.shadowBlur = 30
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const initShootingStars = () => {
      shootingStars = []
      for (let i = 0; i < 3; i++) {
        const star = new ShootingStar()
        star.timer = i * 2000
        shootingStars.push(star)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      shootingStars.forEach(star => {
        star.update()
        star.draw(ctx)
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    resizeCanvas()
    initShootingStars()
    draw()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initShootingStars()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

export default ShootingStar