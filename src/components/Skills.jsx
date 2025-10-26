import React, { useState, useEffect, useRef } from 'react'

const skillCategories = [
  {
    category: 'Frontend',
    icon: '🎨',
    gradient: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 90, icon: '▲' },
      { name: 'TypeScript', level: 88, icon: '💙' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
      { name: 'Vue.js', level: 85, icon: '💚' }
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    gradient: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Node.js', level: 90, icon: '🟢' },
      { name: 'Express', level: 88, icon: '🚂' },
      { name: 'MongoDB', level: 85, icon: '🍃' },
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'GraphQL', level: 80, icon: '◆' }
    ]
  },
  {
    category: 'Tools & Others',
    icon: '🛠️',
    gradient: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Git', level: 93, icon: '📦' },
      { name: 'Docker', level: 85, icon: '🐳' },
      { name: 'AWS', level: 80, icon: '☁️' },
      { name: 'Figma', level: 88, icon: '🎯' },
      { name: 'CI/CD', level: 82, icon: '🔄' }
    ]
  }
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [visibleSkills, setVisibleSkills] = useState([])
  const sectionRef = useRef(null)
  const skillRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            setVisibleSkills(prev => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.3 }
    )

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [activeCategory])

  return (
     <section id="skills" className="py-20">
      {/* Your skills content */}
      <div ref={sectionRef} className='relative py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-20'>
          <div className='inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full'>
            <span className='text-sm text-purple-300'>⚡ EXPERTISE</span>
          </div>
          <h2 className='text-6xl font-bold mb-6'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400'>
              Skills & Technologies
            </span>
          </h2>
          <div className='w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto rounded-full'></div>
          <p className='text-gray-400 mt-6 text-lg max-w-2xl mx-auto'>
            Proficient in modern technologies and frameworks
          </p>
        </div>

        {/* Category Tabs */}
        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          {skillCategories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                activeCategory === index
                  ? 'text-white scale-110'
                  : 'text-gray-400 hover:text-white scale-100 hover:scale-105'
              }`}
            >
              {/* Background */}
              {activeCategory === index ? (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-xl`}></div>
                  <div className='absolute -inset-1 bg-gradient-to-r ${cat.gradient} rounded-xl blur opacity-75'></div>
                </>
              ) : (
                <div className='absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all duration-300'></div>
              )}
              
              {/* Content */}
              <span className='relative flex items-center gap-3'>
                <span className='text-2xl'>{cat.icon}</span>
                {cat.category}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {skillCategories[activeCategory].skills.map((skill, index) => {
            const isVisible = visibleSkills.includes(`${activeCategory}-${index}`)
            
            return (
              <div
                key={index}
                ref={(el) => (skillRefs.current[index] = el)}
                data-id={`${activeCategory}-${index}`}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className='group relative'>
                  {/* Card glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${skillCategories[activeCategory].gradient} rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500`}></div>
                  
                  {/* Card */}
                  <div className='relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105'>
                    {/* Skill name and icon */}
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <span className='text-3xl'>{skill.icon}</span>
                        <h3 className='text-xl font-bold text-white'>{skill.name}</h3>
                      </div>
                      <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${skillCategories[activeCategory].gradient}'>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className='relative h-3 bg-slate-800 rounded-full overflow-hidden'>
                      {/* Background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${skillCategories[activeCategory].gradient} opacity-20`}
                      ></div>
                      
                      {/* Progress fill */}
                      <div 
                        className={`relative h-full bg-gradient-to-r ${skillCategories[activeCategory].gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + 300}ms`
                        }}
                      >
                        {/* Shine effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-20'>
          {[
            { number: '50+', label: 'Projects Completed', icon: '🚀' },
            { number: '30+', label: 'Happy Clients', icon: '😊' },
            { number: '5+', label: 'Years Experience', icon: '⏱️' },
            { number: '15+', label: 'Technologies', icon: '⚡' }
          ].map((stat, index) => (
            <div key={index} className='group relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500'></div>
              <div className='relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-2'>
                <div className='text-4xl mb-2'>{stat.icon}</div>
                <div className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-1'>
                  {stat.number}
                </div>
                <div className='text-sm text-gray-400'>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </div>
    </section>
    
  )
}