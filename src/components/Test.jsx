import React, { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    company: 'TechStart Inc.',
    image: '👩‍💼',
    text: 'Working with this developer was an absolute pleasure. They delivered our project on time and exceeded all expectations. The attention to detail and technical expertise is remarkable.',
    rating: 5,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Innovation Labs',
    image: '👨‍💻',
    text: 'Outstanding work! The solutions provided were innovative and perfectly aligned with our business goals. Communication was excellent throughout the entire project.',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Digital Wave',
    image: '👩‍🎨',
    text: 'Incredible talent and professionalism. The final product not only met but surpassed our requirements. Would definitely recommend and work together again!',
    rating: 5,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 4,
    name: 'David Kumar',
    role: 'CTO',
    company: 'CloudSystems',
    image: '👨‍🔬',
    text: 'Exceptional technical skills combined with great problem-solving abilities. The project was completed efficiently with high-quality code and documentation.',
    rating: 5,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Founder',
    company: 'StartupHub',
    image: '👩‍🚀',
    text: 'A true professional who understands both the technical and business aspects. The collaboration was smooth and the results were phenomenal!',
    rating: 5,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Lead Developer',
    company: 'CodeFactory',
    image: '👨‍💼',
    text: 'Outstanding developer with excellent communication skills. Delivered clean, maintainable code and was always available for questions and updates.',
    rating: 5,
    gradient: 'from-indigo-500 to-purple-500'
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
     <section id="testimonials" className="py-20">
      {/* Your testimonials content */}
      <div className='relative py-32 px-6 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
      </div>

      <div className='relative max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-20'>
          <div className='inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full'>
            <span className='text-sm text-pink-300'>💬 CLIENT FEEDBACK</span>
          </div>
          <h2 className='text-6xl font-bold mb-6'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400'>
              What Clients Say
            </span>
          </h2>
          <div className='w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full'></div>
        </div>

        {/* Testimonials Carousel */}
        <div className='relative'>
          {/* Main testimonial */}
          <div className='relative max-w-4xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ${
                  index === currentIndex
                    ? 'opacity-100 scale-100 relative'
                    : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className='group relative'>
                  {/* Card glow */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                  
                  {/* Card */}
                  <div className='relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-12'>
                    {/* Quote icon */}
                    <div className='absolute -top-6 left-12'>
                      <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-2xl transform rotate-6`}>
                        "
                      </div>
                    </div>

                    {/* Content */}
                    <div className='mt-4'>
                      {/* Stars */}
                      <div className='flex gap-1 mb-6 justify-center'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className='w-6 h-6 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                            <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                          </svg>
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <p className='text-xl text-gray-300 text-center mb-8 leading-relaxed italic'>
                        "{testimonial.text}"
                      </p>

                      {/* Author info */}
                      <div className='flex items-center justify-center gap-4'>
                        <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                          {testimonial.image}
                        </div>
                        <div className='text-left'>
                          <h4 className='text-xl font-bold text-white'>{testimonial.name}</h4>
                          <p className='text-purple-400 font-medium'>{testimonial.role}</p>
                          <p className='text-gray-500 text-sm'>{testimonial.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className={`absolute -bottom-6 right-12 w-20 h-20 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-2xl opacity-50`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group'
          >
            <svg className='w-6 h-6 text-white transform transition-transform group-hover:-translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group'
          >
            <svg className='w-6 h-6 text-white transform transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className='flex justify-center gap-3 mt-12'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'w-3 h-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Client logos section */}
        <div className='mt-24'>
          <p className='text-center text-gray-400 mb-8 text-sm uppercase tracking-wider'>Trusted by amazing companies</p>
          <div className='flex flex-wrap justify-center items-center gap-12'>
            {['🏢', '🚀', '💼', '🎯', '⚡', '🌟'].map((logo, index) => (
              <div 
                key={index}
                className='group relative w-20 h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-2'
              >
                <span className='text-4xl opacity-50 group-hover:opacity-100 transition-opacity duration-300'>{logo}</span>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
    
  )
}