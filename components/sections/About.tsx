'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS } from '@/data/skills';
import { TechIcon } from '@/components/icons/TechIcons';

export function About() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-8 sm:space-y-10 md:space-y-12"
      id="about"
    >
      {/* 01 / ABOUT */}
      <section className="space-y-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / About
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Rahmat Ivaldy
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
            &ldquo;Designing with structure. Building with purpose.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
            Specializing in frontend engineering with Next.js, React, and TypeScript, mobile application development with Flutter and Dart, and UI/UX design. I focus on bridging the gap between interface design and software implementation—building structured systems, clean state architecture, and responsive user experiences.
          </p>
        </div>
      </section>

      {/* 02 / WHAT I DO */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          02 / What I Do
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 rounded-sm overflow-hidden">
          {/* Column 01 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                01 —
              </span>
              <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Frontend Engineering
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              React · Next.js · TypeScript · Tailwind CSS
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Building responsive, accessible web interfaces and design systems with strict TypeScript contracts and reusable UI patterns.
            </p>
          </div>

          {/* Column 02 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                02 —
              </span>
              <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Mobile Development
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Flutter · Dart · BLoC Architecture
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Developing cross-platform mobile apps for Android and iOS using Clean Architecture and stream-based state management.
            </p>
          </div>

          {/* Column 03 */}
          <div className="group bg-white dark:bg-[#121215] p-4 md:p-5 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                03 —
              </span>
              <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                UI/UX Design
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Figma · Design Systems · Prototyping
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Designing modular UI kits, wireframes, and developer-ready mockups that map directly to code components.
            </p>
          </div>
        </div>
      </section>

      {/* 03 / APPROACH */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          03 / Approach
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

      {/* 04 / TOOLKIT */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          04 / Toolkit
        </div>

        <div className="space-y-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-2.5">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="group inline-flex items-center gap-2 px-3 h-[36px] border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-[#18181b] transition-all duration-150 cursor-default"
                  >
                    <TechIcon
                      name={skill.name}
                      className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5"
                    />
                    <span className="text-[12px] font-mono font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white whitespace-nowrap transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Developer Biography &amp; Systems
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
            onClick={() => setActiveSection('experience')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>View Journey</span>
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
