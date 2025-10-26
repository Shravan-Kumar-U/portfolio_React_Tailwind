import React, { useEffect, useState, useRef } from 'react'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [currentTagline, setCurrentTagline] = useState(0)
  const heroRef = useRef(null)

  const taglines = [
    "Building Scalable Full-Stack Solutions with React, Node.js & Modern Technologies",
    "Transforming Ideas into Powerful Digital Solutions Through Code",
    "Full-Stack Developer | React • Node.js • MongoDB • Next.js",
    "Where Clean Code Meets Creative Design in Full-Stack Development",
    "Crafting High-Performance Web Applications from Concept to Deployment",
    "Full-Stack Developer Crafting Digital Experiences with Code & Creativity"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 4000) // Changed to 6 seconds for better visibility

    return () => clearInterval(interval)
  }, [taglines.length])

  // Smooth scroll to Projects section
  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Smooth scroll to Contact section
  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  const opacity = Math.max(0, 1 - scrollY / 500)
  const scale = Math.max(0.8, 1 - scrollY / 2000)

  return (
    <section id="home" className="min-h-screen pt-16">
      <div 
        ref={heroRef}
        className='relative min-h-screen flex items-center justify-center overflow-hidden'
        style={{ 
          transform: `scale(${scale})`,
          opacity: opacity
        }}
      >
        {/* Animated geometric shapes */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div 
            className='absolute top-1/4 left-1/4 w-64 h-64 border-2 border-purple-500/20 rounded-lg transform rotate-45'
            style={{ 
              transform: `rotate(${45 + scrollY * 0.1}deg) translateZ(0)`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className='absolute top-1/3 right-1/4 w-48 h-48 border-2 border-blue-500/20 rounded-full'
            style={{ 
              transform: `translateY(${scrollY * 0.2}px) translateZ(0)`,
              animation: 'float 6s ease-in-out infinite reverse'
            }}
          />
          <div 
            className='absolute bottom-1/4 left-1/3 w-32 h-32 border-2 border-pink-500/20 transform -rotate-12'
            style={{ 
              transform: `rotate(${-12 + scrollY * 0.15}deg) translateZ(0)`,
              animation: 'float 10s ease-in-out infinite'
            }}
          />
        </div>

        <div className='relative z-10 max-w-6xl mx-auto px-6 text-center'>
          {/* Badge */}
          <div 
            className='inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full'
            style={{ 
              animation: 'fadeInDown 1s ease-out'
            }}
          >
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-sm text-gray-300'>Available for new projects</span>
          </div>
          

          {/* Main heading with 3D effect */}
          <h1 
            className='text-8xl md:text-9xl font-bold mb-6 leading-tight'
            style={{ 
              animation: 'fadeInUp 1s ease-out 0.2s both',
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5)'
            }}
          >
            <span className='block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400'>
              Hello There,
            </span>
            <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'>
              I'm Shravan
            </span>
          </h1>

          {/* Animated Tagline with Type.js effect */}
          <div 
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto min-h-[60px] flex items-center justify-center"
            style={{ 
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}
          >
            <TypeWriter 
              text={taglines[currentTagline]}
              key={currentTagline}
            />
          </div>

          {/* CTA Buttons */}
          <div 
            className='flex flex-wrap gap-6 justify-center'
            style={{ 
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}
          >
            <button
              onClick={handleViewProjects}
              className='group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50'
            >
              <span className='relative z-10 flex items-center gap-2'>
                View Projects
                <svg className='w-5 h-5 transform transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </button>

            <button 
              onClick={handleContactMe}
              className='group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transform transition-all duration-300 hover:scale-110'
            >
              <span className='flex items-center gap-2'>
                Contact Me
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div 
            className='absolute bottom-12 left-1/2 transform -translate-x-1/2'
            style={{ 
              animation: 'bounce 2s ease-in-out infinite'
            }}
          >
            <div className='flex flex-col items-center gap-2 text-gray-400'>
              <span className='text-sm'>Scroll to explore</span>
              <svg className='w-6 h-6 animate-bounce' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
              </svg>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            0%, 100% { border-color: transparent }
            50% { border-color: rgb(156, 163, 175) }
          }
        `}</style>
      </div>
    </section>
  )
}

// TypeWriter Component for typing effect
const TypeWriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setShowCursor(true)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30) // Faster typing speed (changed from 30 to 20)

      return () => clearTimeout(timeout)
    } else {
      // When typing is complete, keep cursor visible for a while then start blinking
      const cursorTimeout = setTimeout(() => {
        const blinkInterval = setInterval(() => {
          setShowCursor(prev => !prev)
        }, 500)

        return () => clearInterval(blinkInterval)
      }, 1000)
      
      return () => clearTimeout(cursorTimeout)
    }
  }, [currentIndex, text])

  return (
    <div className="inline-flex items-center">
      <span>{displayText}</span>
      <span 
        className={`ml-1 h-6 w-0.5 bg-gray-300 transition-opacity duration-300 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}