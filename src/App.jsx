import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThreeDBackground from './components/Background'
import ContactSection from './components/Contact'
import ExperienceTimeline from './components/Experience'
import HeroSection from './components/Hero'
import ProjectsGrid from './components/Project'
import SkillsSection from './components/Skills'
import TestimonialsSection from './components/Test'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background component */}
      <ThreeDBackground />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10">
        
        <HeroSection />
        <SkillsSection />
        <ProjectsGrid />
        <TestimonialsSection />
        <ExperienceTimeline />
        <ContactSection />
      </div>
    </div>
  )
}

export default App