import React, { useEffect, useState, useRef } from 'react'

const experiences = [
  {
    id: 1,
    role: 'React.js Developer',
    company: 'Tech Corp',
    period: 'Jan 2023 - Present',
    description: [
      'Designing and maintaining web applications',
      'Collaborating with cross-functional teams',
      'Implementing responsive design and ensuring cross-browser compatibility'
    ],
    icon: '⚛️'
  },
  {
    id: 2,
    role: 'React Native Developer',
    company: 'Mobile Solutions',
    period: 'Jun 2021 - Dec 2022',
    description: [
      'Developing mobile applications for iOS and Android',
      'Integrating APIs and third-party services',
      'Optimizing app performance'
    ],
    icon: '📱'
  },
  {
    id: 3,
    role: 'Full Stack Developer',
    company: 'StartUp Inc',
    period: 'Jan 2020 - May 2021',
    description: [
      'Building end-to-end web applications',
      'Database design and optimization',
      'Implementing CI/CD pipelines'
    ],
    icon: '💻'
  },
  {
    id: 4,
    role: 'Web Developer',
    company: 'Digital Agency',
    period: 'Jun 2019 - Dec 2019',
    description: [
      'Creating responsive websites',
      'Working with modern frameworks',
      'Client communication and project management'
    ],
    icon: '🌐'
  }
]

export default function ExperienceTimeline() {
  const [visibleItems, setVisibleItems] = useState([])
  const [lineProgress, setLineProgress] = useState(0)
  const timelineRef = useRef(null)
  const itemRefs = useRef([])
  const lineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            setVisibleItems(prev => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return
      
      const timeline = timelineRef.current
      const timelineRect = timeline.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress based on scroll position
      const timelineTop = timelineRect.top
      const timelineHeight = timelineRect.height
      
      let progress = 0
      
      if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        // Timeline is in viewport
        const visiblePart = Math.min(windowHeight - timelineTop, timelineHeight)
        progress = (visiblePart / timelineHeight) * 100
      } else if (timelineTop >= windowHeight) {
        // Timeline is below viewport
        progress = 0
      } else {
        // Timeline is above viewport
        progress = 100
      }
      
      setLineProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    
    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section id="experience" className="py-20">
      <div className='relative py-32 px-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-20'>
            <div className='inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full'>
              <span className='text-sm text-purple-300'>💼 MY JOURNEY</span>
            </div>
            <h2 className='text-6xl font-bold mb-6'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400'>
                Work Experience
              </span>
            </h2>
            <div className='w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto rounded-full'></div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className='relative'>
            {/* Central line with animated progress */}
            <div className='absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block'>
              {/* Background line */}
              <div className='absolute inset-0 bg-gradient-to-b from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full'></div>
              
              {/* Animated progress line */}
              <div 
                ref={lineRef}
                className='absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out'
                style={{ 
                  height: `${lineProgress}%`,
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)'
                }}
              ></div>
              
              {/* Glowing dots along the line */}
              {experiences.map((_, index) => {
                const dotPosition = (index / (experiences.length - 1)) * 100
                const isActive = lineProgress >= dotPosition
                
                return (
                  <div
                    key={index}
                    className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-500 ${
                      isActive 
                        ? 'bg-white scale-150 shadow-lg shadow-purple-500/50' 
                        : 'bg-purple-400/30 scale-100'
                    }`}
                    style={{ top: `${dotPosition}%` }}
                  >
                    {isActive && (
                      <div className='absolute inset-0 rounded-full bg-white animate-ping opacity-60'></div>
                    )}
                  </div>
                )
              })}
            </div>

            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.includes(exp.id.toString())
              const dotPosition = (index / (experiences.length - 1)) * 100
              const isLineActive = lineProgress >= dotPosition

              return (
                <div
                  key={exp.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-id={exp.id}
                  className={`relative mb-16 md:mb-24 ${isLeft ? 'md:pr-1/2' : 'md:pl-1/2'}`}
                >
                  <div className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content Card */}
                    <div
                      className={`flex-1 transform transition-all duration-1000 ${
                        isVisible && isLineActive
                          ? 'opacity-100 translate-x-0 scale-100' 
                          : `opacity-0 ${isLeft ? '-translate-x-20' : 'translate-x-20'} scale-95`
                      }`}
                    >
                      <div className='group relative'>
                        {/* Card glow effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-500 ${
                          isLineActive ? 'scale-105' : 'scale-100'
                        }`}></div>
                        
                        {/* Card content */}
                        <div className={`relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 ${
                          isLineActive ? 'border-purple-500/30' : 'border-white/10'
                        }`}>
                          {/* Period badge */}
                          <div className={`inline-block mb-4 px-4 py-1.5 rounded-full transition-all duration-500 ${
                            isLineActive 
                              ? 'bg-purple-500/30 border border-purple-500/50 shadow-lg shadow-purple-500/20' 
                              : 'bg-purple-500/20 border border-purple-500/30'
                          }`}>
                            <span className='text-sm text-purple-300 font-medium'>{exp.period}</span>
                          </div>

                          {/* Role and Company */}
                          <h3 className='text-2xl font-bold text-white mb-2'>{exp.role}</h3>
                          <p className={`text-lg mb-4 transition-colors duration-500 ${
                            isLineActive ? 'text-pink-400' : 'text-purple-400'
                          }`}>{exp.company}</p>

                          {/* Description */}
                          <ul className='space-y-2'>
                            {exp.description.map((item, i) => (
                              <li key={i} className='flex items-start gap-2 text-gray-300'>
                                <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-500 ${
                                  isLineActive ? 'text-pink-400' : 'text-purple-400'
                                }`} fill='currentColor' viewBox='0 0 20 20'>
                                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Active state decorative corner */}
                          {isLineActive && (
                            <div className='absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse'></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2'>
                      <div className='relative'>
                        {/* Outer ring with pulse */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transform transition-all duration-1000 ${
                          isLineActive 
                            ? 'scale-110 opacity-100 bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50' 
                            : 'scale-100 opacity-70 bg-gradient-to-br from-purple-600/50 to-pink-600/50'
                        }`}>
                          {/* Inner dot */}
                          <div className={`w-12 h-12 rounded-full bg-slate-900 border-4 flex items-center justify-center text-2xl transition-all duration-500 ${
                            isLineActive 
                              ? 'border-white/40 scale-110' 
                              : 'border-white/20 scale-100'
                          }`}>
                            {exp.icon}
                          </div>
                        </div>
                        
                        {/* Pulse animation when active */}
                        {isLineActive && (
                          <div className='absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-40'></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.7), 0 0 60px rgba(236, 72, 153, 0.5);
          }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}