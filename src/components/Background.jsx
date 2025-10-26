import React, { useEffect, useRef } from 'react'

export default function SPA3DBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2,
    active: false 
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set to full viewport for SPA
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Enhanced Particle class with more visibility
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 800 + 300 // Reduced z-range for larger particles
        this.size = (1000 / this.z) * 2.5 // Increased size multiplier
        this.speedY = Math.random() * 0.4 + 0.2 // Slightly faster
        this.speedX = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.6 + 0.3 // Increased opacity
        this.hue = 220 + Math.random() * 40 // Consistent blue-purple theme
        this.glowSize = this.size * 1.5 // Glow effect for better visibility
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX

        // Enhanced mouse interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            const angle = Math.atan2(dy, dx)
            const force = (120 - distance) / 120
            this.x -= Math.cos(angle) * force * 0.8
            this.y -= Math.sin(angle) * force * 0.8
          }
        }

        // Smooth boundary handling
        if (this.y > canvas.height + 20) {
          this.y = -20
          this.x = Math.random() * canvas.width
        }
        if (this.x < -20) this.x = canvas.width + 20
        if (this.x > canvas.width + 20) this.x = -20
      }

      draw(ctx) {
        // Draw glow effect for better visibility
        ctx.save()
        const glowGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowSize
        )
        glowGradient.addColorStop(0, `hsla(${this.hue}, 80%, 70%, ${this.opacity * 0.4})`)
        glowGradient.addColorStop(1, `hsla(${this.hue}, 80%, 70%, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw main particle
        ctx.fillStyle = `hsla(${this.hue}, 80%, 75%, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle inner highlight
        ctx.fillStyle = `hsla(${this.hue}, 60%, 85%, ${this.opacity * 0.6})`
        ctx.beginPath()
        ctx.arc(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Increased particle count for better visibility
    const particleCount = 70
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle())
    }

    // Enhanced connections between particles
    const drawConnections = () => {
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) { // Increased connection distance
            const opacity = (1 - distance / 150) * 0.25 // Increased opacity
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            // Gradient connection lines
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${opacity})`)
            gradient.addColorStop(1, `hsla(${otherParticle.hue}, 80%, 70%, ${opacity})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.2 // Thicker lines
            ctx.stroke()
          }
        })
      })
    }

    // Minimal grid for depth
    const drawGrid = () => {
      const gridSize = 60
      
      ctx.strokeStyle = 'rgba(100, 120, 230, 0.08)' // Slightly more visible
      ctx.lineWidth = 0.8

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Background elements for SPA
    class BackgroundElement {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 60 + 30
        this.speedX = (Math.random() - 0.5) * 0.15
        this.speedY = (Math.random() - 0.5) * 0.15
        this.opacity = Math.random() * 0.08 + 0.03 // Slightly more visible
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.003
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // Boundary wrap
        if (this.x < -this.size * 2) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size * 2) this.x = -this.size
        if (this.y < -this.size * 2) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size * 2) this.y = -this.size
      }

      draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity
        
        // Simple geometric shape
        ctx.strokeStyle = 'rgba(120, 140, 240, 0.5)' // More visible
        ctx.lineWidth = 1.2
        ctx.beginPath()
        
        // Draw hexagon
        const sides = 6
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.stroke()
        
        ctx.restore()
      }
    }

    // Create background elements
    const elements = []
    for (let i = 0; i < 4; i++) { // One more element
      elements.push(new BackgroundElement())
    }

    // Animation loop optimized for SPA
    const animate = () => {
      // Slightly lighter background for better particle contrast
      ctx.fillStyle = 'rgb(12, 20, 36)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw background elements
      drawGrid()
      
      // Update and draw background elements
      elements.forEach(element => {
        element.update()
        element.draw(ctx)
      })

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // Draw enhanced connections
      drawConnections()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Event listeners for SPA
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1, // Ensure it stays behind content
      }}
    />
  )
}