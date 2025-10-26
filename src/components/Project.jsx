import React, { useState, useRef, useEffect } from 'react'

const projects = [
  {
    id: 1,
    title: 'Car Rent',
    category: 'Web Application',
    description: 'Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '🚗',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Job IT',
    category: 'Mobile App',
    description: 'Web application that enables users to search jobs, browse job opportunities, and connect with verified IT companies based on their career aspirations.',
    tags: ['React', 'TypeScript', 'PostgreSQL'],
    image: '💼',
    gradient: 'from-green-500 to-emerald-500',
    color: 'green'
  },
  {
    id: 3,
    title: 'Trip Guide',
    category: 'Travel Platform',
    description: 'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular travel destinations.',
    tags: ['Next.js', 'Tailwind', 'Stripe'],
    image: '✈️',
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple'
  },
  {
    id: 4,
    title: 'E-Commerce',
    category: 'Online Store',
    description: 'Full-featured e-commerce platform with product management, cart functionality, secure payment processing, and order tracking.',
    tags: ['React', 'Redux', 'Express'],
    image: '🛒',
    gradient: 'from-orange-500 to-red-500',
    color: 'orange'
  },
  {
    id: 5,
    title: 'Social Media',
    category: 'Social Network',
    description: 'Modern social media platform with real-time messaging, post sharing, story features, and advanced privacy controls.',
    tags: ['React', 'Socket.io', 'AWS'],
    image: '📱',
    gradient: 'from-pink-500 to-rose-500',
    color: 'pink'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    category: 'Data Visualization',
    description: 'Comprehensive analytics dashboard with real-time data visualization, custom reports, and advanced filtering capabilities.',
    tags: ['React', 'D3.js', 'Firebase'],
    image: '📊',
    gradient: 'from-indigo-500 to-blue-500',
    color: 'indigo'
  }
]

export default function ProjectsGrid() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [visibleProjects, setVisibleProjects] = useState([])
  const projectRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            setVisibleProjects(prev => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.2 }
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20">
      {/* Your projects content */}
      <div className='relative py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <div className='inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full'>
            <span className='text-sm text-blue-300'>🚀 MY WORK</span>
          </div>
          <h2 className='text-6xl font-bold mb-6'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
              Featured Projects
            </span>
          </h2>
          <div className='w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full'></div>
          <p className='text-gray-400 mt-6 text-lg max-w-2xl mx-auto'>
            Explore my latest work showcasing innovation, creativity, and technical excellence
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => {
            const isVisible = visibleProjects.includes(project.id.toString())
            
            return (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                data-id={project.id}
                className={`transform transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className='group relative h-full'>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                  
                  <div className='relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-full transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-3'>
                    <div className={`relative h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className='absolute inset-0 opacity-20'>
                        <div className='absolute inset-0' style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                        }}></div>
                      </div>
                      
                      <div className='relative text-9xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'>
                        {project.image}
                      </div>

                      <div className='absolute top-4 right-4 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full animate-float'></div>
                      <div className='absolute bottom-8 left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg transform rotate-45 animate-float-delayed'></div>
                    </div>

                    <div className='p-6'>
                      <div className='inline-block mb-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full'>
                        <span className='text-xs text-gray-400 font-medium'>{project.category}</span>
                      </div>

                      <h3 className='text-2xl font-bold text-white mb-3'>
                        {project.title}
                      </h3>

                      <p className='text-gray-400 mb-4 line-clamp-3'>
                        {project.description}
                      </p>

                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className='px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors duration-300'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className='flex gap-3 mt-6'>
                        <button className={`flex-1 py-2.5 bg-gradient-to-r ${project.gradient} rounded-xl font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                          View Project
                        </button>
                        <button className='px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='text-center mt-16'>
          <button className='group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50'>
            <span className='relative z-10 flex items-center gap-3'>
              View All Projects
              <svg className='w-6 h-6 transform transition-transform group-hover:translate-x-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-10px) rotate(50deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
    </section>
    
  )
}