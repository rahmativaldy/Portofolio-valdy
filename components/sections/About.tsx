'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

export function About() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 md:space-y-16 animate-fadeIn"
      id="about"
    >
      {/* Editorial Profile Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
            01 / About & Biography
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white uppercase">
          Rahmat Ivaldy
        </h1>
        <p className="text-sm md:text-base font-mono text-zinc-600 dark:text-zinc-400">
          Frontend Developer · Mobile Developer · UI/UX Designer
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 pt-2 leading-tight max-w-3xl">
          I design interfaces and build the products behind them.
        </h2>
      </header>

      {/* Main Grid: Narrative vs Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Biography & Principles */}
        <div className="lg:col-span-7 space-y-10">
          {/* Biography Narrative */}
          <div className="space-y-5 text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
            <p>
              I started with mobile interfaces because I wanted to build real products, not just experiment with code. Building NusaGo Mobile taught me how a screen should behave on a device, how state flows through an app, and why architecture matters when the UI grows.
            </p>

            <p>
              On the web, I use Next.js, React, TypeScript, and Tailwind CSS to bring clarity to reusable layout structures, responsive states, and accessible interactions. I treat visual design and code implementation as one connected process, not separate steps.
            </p>

            <p>
              UI/UX design directly influences the way I write software. I evaluate hierarchy, contrast, spacing, and interaction rhythm before writing markup, ensuring technical constraints are considered from the earliest wireframes.
            </p>

            <p>
              My practice is grounded in authentic, hands-on projects like NusaGo Mobile and Rahmat Workspace. Those real-world builds keep my engineering decisions practical, honest, and focused on user experience.
            </p>
          </div>

          {/* Principles Section */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              Core Engineering Principles
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">01 / INTEGRATION</div>
                <div className="text-xs font-bold font-mono text-zinc-950 dark:text-white">Connected Practice</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Design and code as one unified workflow from Figma layout systems to typed React components.
                </p>
              </div>

              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">02 / ARCHITECTURE</div>
                <div className="text-xs font-bold font-mono text-zinc-950 dark:text-white">Explicit State</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Predictable state transitions (BLoC streams, Zustand stores) over ad-hoc mutations.
                </p>
              </div>

              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">03 / CODE CRAFT</div>
                <div className="text-xs font-bold font-mono text-zinc-950 dark:text-white">Practical Code</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Readable, maintainable engineering decisions over unnecessary complexity and abstraction.
                </p>
              </div>

              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">04 / INTERFACE</div>
                <div className="text-xs font-bold font-mono text-zinc-950 dark:text-white">Layout Rhythm</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Accessible semantic HTML, responsive grid math, and consistent typography hierarchy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Specifications & Workflow */}
        <aside className="lg:col-span-5 space-y-6">
          {/* Specifications Table */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium pb-2 border-b border-zinc-200 dark:border-zinc-800">
              Profile Specifications
            </div>

            <dl className="space-y-3.5 text-xs font-mono">
              <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800/60 pb-2.5">
                <dt className="text-zinc-400 dark:text-zinc-500 uppercase">Location</dt>
                <dd className="text-zinc-950 dark:text-white font-medium">Indonesia</dd>
              </div>

              <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800/60 pb-2.5">
                <dt className="text-zinc-400 dark:text-zinc-500 uppercase">Disciplines</dt>
                <dd className="text-zinc-950 dark:text-white font-medium">Frontend · Mobile · UI/UX Design</dd>
              </div>

              <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800/60 pb-2.5">
                <dt className="text-zinc-400 dark:text-zinc-500 uppercase">Primary Stack</dt>
                <dd className="text-zinc-950 dark:text-white font-medium">Next.js · React · TypeScript · Flutter · Dart</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-zinc-400 dark:text-zinc-500 uppercase">Status</dt>
                <dd className="text-zinc-950 dark:text-white font-medium">Open to opportunities</dd>
              </div>
            </dl>
          </div>

          {/* Design to Code Pipeline */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium pb-2 border-b border-zinc-200 dark:border-zinc-800">
              Design-to-Code Workflow
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold shrink-0">
                  01
                </span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Design & Wireframing</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">Figma interface systems, layout math, and interaction flows.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold shrink-0">
                  02
                </span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Frontend & Mobile Code</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">Next.js App Router, React 19, TypeScript, and Flutter/Dart BLoC apps.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold shrink-0">
                  03
                </span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Version & Architecture</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">Git version control, clean modular boundaries, and explicit stores.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-1.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold shrink-0">
                  04
                </span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Integration & Validation</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">REST API integration, Postman testing, and build verification.</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Navigation Footer Controls */}
      <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Developer Biography & Practice Statement
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="px-4 py-2 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Explore Projects →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="px-4 py-2 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            View Journey →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className="px-4 py-2 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Get In Touch →
          </button>
        </div>
      </footer>
    </div>
  );
}
