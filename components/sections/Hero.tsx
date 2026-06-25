'use client';

import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden" aria-label="Hero section">
      {/* Subtle background gradient accent */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full text-center">
        {/* Greeting Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-950/40 border border-blue-900/60 rounded-full hover:border-blue-800 transition-all duration-300">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span className="text-blue-300 text-sm font-medium">Welcome to my portfolio</span>
          </div>
        </div>

        {/* Name - Premium Typography */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-snug">
          Rahmat Ivaldy
        </h1>

        {/* Role/Title */}
        <h2 className="text-xl md:text-2xl text-slate-300 font-medium mb-8 tracking-wide">
          Software Developer
        </h2>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>

        {/* Introduction - Better spacing */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          I build fast, scalable, and beautiful mobile and web applications. Specialized in Flutter, 
          React, and modern backend technologies. Passionate about creating exceptional user experiences.
        </p>

        {/* CTA Buttons - Improved Layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#projects">
            <Button variant="primary" size="lg" className="min-w-[160px]">
              View My Work
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" size="lg" className="min-w-[160px]">
              Get in Touch
            </Button>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex justify-center animate-bounce">
          <svg
            className="w-6 h-6 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
