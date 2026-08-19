'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { JOURNEY_MILESTONES } from '@/data/experience';

export function Experience() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-8 sm:space-y-10 md:space-y-12"
      id="experience"
    >
      {/* 01 / JOURNEY */}
      <section className="space-y-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / Journey
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Development Journey
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight max-w-3xl">
            &ldquo;Evolution across design, web systems, and mobile engineering.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
            A chronological record of personal development, UI/UX design practice, and software engineering discipline. From exploring core computer science fundamentals to engineering mobile app ecosystems with Flutter and building structured web interfaces with Next.js and TypeScript.
          </p>
        </div>
      </section>

      {/* 02 / EXPERIENCE TIMELINE */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            02 / Experience
          </div>
          <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            Chronological Timeline
          </div>
        </div>

        {/* Timeline Container */}
        <div className="space-y-6">
          {JOURNEY_MILESTONES.map((milestone) => (
            <article
              key={milestone.id}
              className="group p-4 sm:p-5 md:p-6 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] hover:bg-zinc-50/80 dark:hover:bg-[#16161a] transition-colors duration-200 space-y-4"
            >
              {/* Editorial Header / Meta Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                {/* Desktop Left / Mobile Top: Period & Category */}
                <div className="md:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-950 dark:group-hover:bg-white transition-colors shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-950 dark:text-white">
                      {milestone.period}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pl-3.5">
                    {milestone.categoryLabel}
                  </div>
                </div>

                {/* Desktop Right / Mobile Body: Title & Role */}
                <div className="md:col-span-8 space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400">
                    {milestone.role}
                  </p>
                </div>
              </div>

              {/* Description & Responsibilities */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-start-5 md:col-span-8 space-y-4">
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {milestone.summary}
                  </p>

                  {/* Progression / Design to Code Sequence */}
                  {milestone.designToCodeSequence && milestone.designToCodeSequence.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Workflow Sequence
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/80 px-3 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800">
                        {milestone.designToCodeSequence.map((step, idx) => (
                          <span key={step} className="flex items-center gap-2">
                            {idx > 0 && (
                              <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">→</span>
                            )}
                            <span>{step}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Responsibilities & Scope */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                      Key Responsibilities & Scope
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                      {milestone.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="font-mono text-zinc-400 dark:text-zinc-500 shrink-0 text-xs">—</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {milestone.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 / LEARNING PATH */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            03 / Learning Path
          </div>
          <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            UI/UX → Web → Mobile → Product Engineering
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 rounded-sm overflow-hidden">
          {/* Step 01 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                01 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                UI/UX Design
              </h4>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Figma · Design Systems · Wireframing
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Crafting visual hierarchies, user flows, and systematic design tokens that transition cleanly into code.
            </p>
          </div>

          {/* Step 02 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                02 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Web Development
              </h4>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              React · Next.js · TypeScript · Tailwind CSS
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Building structured, responsive web applications with reusable component systems and strict type safety.
            </p>
          </div>

          {/* Step 03 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                03 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Mobile Development
              </h4>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Flutter · Dart · BLoC Pattern
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Engineering cross-platform mobile applications backed by clean architecture and predictable state management.
            </p>
          </div>

          {/* Step 04 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                04 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Product Engineering
              </h4>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              REST APIs · Node.js · Integration
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Connecting client applications with backend REST services, database modeling, and end-to-end product delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 04 / APPROACH */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          04 / Approach
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 rounded-sm overflow-hidden">
          {/* Step 01 */}
          <div className="group bg-white dark:bg-[#121215] p-4 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                01 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Understand
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Analyze product requirements, define data flow, and clarify technical constraints upfront.
            </p>
          </div>

          {/* Step 02 */}
          <div className="group bg-white dark:bg-[#121215] p-4 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                02 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Design
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Construct high-fidelity wireframes, interface layouts, and consistent spacing rules in Figma.
            </p>
          </div>

          {/* Step 03 */}
          <div className="group bg-white dark:bg-[#121215] p-4 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                03 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Build
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Develop clean, modular frontend and mobile code using typed structures and predictable state patterns.
            </p>
          </div>

          {/* Step 04 */}
          <div className="group bg-white dark:bg-[#121215] p-4 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                04 —
              </span>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Refine
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Test responsiveness, polish interaction details, verify API endpoints, and ensure build stability.
            </p>
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Chronological Experience
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('skills')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>View Toolkit</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>Get In Touch</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
