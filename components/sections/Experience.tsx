'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { JOURNEY_MILESTONES } from '@/data/experience';

export function Experience() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="experience"
    >
      {/* 01 / JOURNEY HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              01 / Career &amp; Experience
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Development Journey
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
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

        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Evolution across design, web systems, and mobile engineering.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            A chronological record of personal development, UI/UX design practice, and software engineering discipline. From exploring core computer science fundamentals to engineering mobile ecosystems with Flutter and building structured web interfaces with Next.js and TypeScript.
          </p>
        </div>
      </section>

      {/* 02 / EXPERIENCE TIMELINE */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              02 / Timeline
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Chronological Experience
            </h3>
          </div>
          <span className="text-xs sm:text-sm font-sans text-zinc-500 dark:text-zinc-400">
            2023 — Present
          </span>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="space-y-10 sm:space-y-12">
          {JOURNEY_MILESTONES.map((milestone, index) => (
            <article
              key={milestone.id}
              className={`space-y-4 pb-10 sm:pb-12 ${
                index !== JOURNEY_MILESTONES.length - 1
                  ? 'border-b border-zinc-200/80 dark:border-zinc-800/80'
                  : ''
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Left: Period & Category */}
                <div className="md:col-span-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-mono font-semibold text-zinc-950 dark:text-white">
                      {milestone.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pl-3.5">
                    {milestone.categoryLabel}
                  </div>
                </div>

                {/* Right: Title, Role & Details */}
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                      {milestone.title}
                    </h4>
                    <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-medium">
                      {milestone.role}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {milestone.summary}
                  </p>

                  {/* Design to Code Sequence */}
                  {milestone.designToCodeSequence && milestone.designToCodeSequence.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                        Workflow Sequence
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100/70 dark:bg-zinc-900/70 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
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

                  {/* Highlights */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                      Scope &amp; Responsibilities
                    </div>
                    <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400 font-sans">
                      {milestone.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5">
                          <span className="font-mono text-zinc-400 dark:text-zinc-500 shrink-0 text-xs mt-0.5">—</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {milestone.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
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
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              03 / Progression
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Skill Acquisition Path
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            UI/UX → Web → Mobile → Product
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Step 01 */}
          <div className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] p-5 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              01 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              UI/UX Design
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Figma · Design Systems
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Crafting visual hierarchies, user flows, and systematic design tokens that transition cleanly into code.
            </p>
          </div>

          {/* Step 02 */}
          <div className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] p-5 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              02 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Web Development
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              React · Next.js · TypeScript
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Building structured, responsive web applications with reusable component systems and strict type safety.
            </p>
          </div>

          {/* Step 03 */}
          <div className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] p-5 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              03 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Mobile Development
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Flutter · Dart · BLoC
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Engineering cross-platform mobile applications backed by clean architecture and predictable state management.
            </p>
          </div>

          {/* Step 04 */}
          <div className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] p-5 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              04 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Product Engineering
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              REST APIs · Node.js · Integration
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Connecting client applications with backend REST services, database modeling, and end-to-end delivery.
            </p>
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Chronological Experience
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
