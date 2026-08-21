'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS } from '@/data/skills';
import { LogoLoop } from '@/components/ui/LogoLoop';

export function About() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="about"
    >
      {/* 01 / ABOUT HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              01 / Biography &amp; Identity
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Rahmat Ivaldy
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

        <div className="space-y-5 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Designing with structure. Building with purpose.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            I specialize in frontend engineering with Next.js, React, and TypeScript, mobile application development with Flutter and Dart, and user interface design. My approach bridges the gap between interface design and software engineering—building structured design systems, clean state architecture, and responsive user experiences.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            Whether architecting a mobile property booking app with BLoC and Clean Architecture, or developing a custom developer portfolio shell with Next.js App Router, I treat code and design as equal disciplines.
          </p>
        </div>
      </section>

      {/* 02 / WHAT I DO */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
            02 / Core Disciplines
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            What I Do
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {/* Discipline 01 */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              01 — Web
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Frontend Engineering
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              React · Next.js · TypeScript · Tailwind
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Building responsive, accessible web interfaces and component systems with strict TypeScript contracts and reusable UI patterns.
            </p>
          </div>

          {/* Discipline 02 */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              02 — Mobile
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Mobile Development
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Flutter · Dart · BLoC Architecture
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Developing cross-platform mobile apps for Android and iOS using Clean Architecture and stream-based state management.
            </p>
          </div>

          {/* Discipline 03 */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              03 — Design
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
              UI/UX Design
            </h4>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Figma · Design Systems · Tokens
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
              Designing modular UI kits, wireframes, and developer-ready mockups that map directly into code components.
            </p>
          </div>
        </div>
      </section>

      {/* 03 / APPROACH */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
            03 / Methodology
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Engineering Approach
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
          {/* Step 01 */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              01 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Understand
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Analyze product requirements, define data flow, and clarify technical constraints upfront.
            </p>
          </div>

          {/* Step 02 */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              02 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Design
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Construct high-fidelity wireframes, interface layouts, and consistent spacing rules in Figma.
            </p>
          </div>

          {/* Step 03 */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              03 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Build
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Develop clean, modular frontend and mobile code using typed structures and predictable state patterns.
            </p>
          </div>

          {/* Step 04 */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              04 —
            </span>
            <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
              Refine
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Test responsiveness, polish interaction details, verify API endpoints, and ensure build stability.
            </p>
          </div>
        </div>
      </section>

      {/* 04 / TOOLKIT */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              04 / Technical Toolkit
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Technologies &amp; Tools
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection('skills')}
            className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Full Inventory</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {SKILL_GROUPS.map((group, index) => (
            <div key={group.id} className="space-y-2">
              <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {group.category}
              </div>
              <LogoLoop
                items={group.items}
                direction={index % 2 === 0 ? 'left' : 'right'}
                speed={40}
              />
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Developer Biography &amp; Systems
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
            onClick={() => setActiveSection('experience')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
