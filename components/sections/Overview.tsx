'use client';

import React from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/context/WorkspaceContext';
import { PROJECTS } from '@/data/projects';
import { SKILL_GROUPS } from '@/data/skills';

export function Overview() {
  const { setActiveSection } = useWorkspace();

  const featuredProjects = PROJECTS.filter(
    (p) => p.id === 'nusago-mobile' || p.id === 'rahmat-workspace',
  );

  return (
    <div
      className="relative max-w-[1280px] mx-auto px-6 md:px-10 xl:px-14 py-8 md:py-12 text-zinc-900 dark:text-zinc-100 select-none"
      id="overview"
    >
      {/* 1. TOP INTRODUCTION SECTION */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Hello, I&apos;m Rahmat Ivaldy
        </h1>

        <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 font-medium">
          Frontend Developer · Mobile Developer · UI/UX Designer
        </p>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
          <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Indonesia · Open to opportunities</span>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-8 md:my-10" />

      {/* 2. ABOUT / INTRODUCTION SECTION */}
      <section className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
          About / Introduction
        </div>

        <h2 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-800 dark:text-zinc-200">
          I design interfaces and build the products behind them.
        </h2>

        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          My work spans Flutter mobile experiences, Next.js web interfaces, and UI/UX design — connecting product thinking with technical implementation.
        </p>

        <div className="pt-2 flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveSection('projects')}
            className="inline-flex items-center gap-2 text-zinc-950 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-180 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
          >
            <span>Selected work</span>
            <span className="transition-transform duration-180 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>

          <button
            onClick={() => setActiveSection('about')}
            className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-180 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
          >
            <span>About me</span>
            <span className="transition-transform duration-180 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-8 md:my-10" />

      {/* 3. SKILLS / TECHNOLOGY SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
            ⚙ Skills & Technology
          </div>
          <button
            onClick={() => setActiveSection('skills')}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer group inline-flex items-center gap-1"
          >
            <span>Full toolkit</span>
            <span className="transition-transform duration-180 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
                <span>{group.category}</span>
                <span>{group.id}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1 text-xs font-mono rounded-full border ${
                      skill.isPrimary
                        ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-200/70 dark:bg-zinc-800 text-zinc-950 dark:text-white font-medium'
                        : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-8 md:my-10" />

      {/* 4. SELECTED WORK SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
            Selected Work
          </div>
          <button
            onClick={() => setActiveSection('projects')}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer group inline-flex items-center gap-1"
          >
            <span>View all projects</span>
            <span className="transition-transform duration-180 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <div className="space-y-4">
          {featuredProjects.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setActiveSection('projects')}
              className="w-full text-left p-5 md:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <div className="space-y-2.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  <span>0{idx + 1}</span>
                  <span>•</span>
                  <span>{project.id === 'nusago-mobile' ? 'Mobile Product' : 'Web Experience'}</span>
                </div>

                <div className="text-lg md:text-xl font-bold text-zinc-950 dark:text-white group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </div>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.thumbnail && (
                <div className="relative w-full md:w-44 h-28 shrink-0 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    fill
                    sizes="176px"
                    className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03] origin-center"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-8 md:my-10" />

      {/* 5. CURRENT FOCUS SECTION */}
      <section className="space-y-6">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
          Current Focus
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">01 · Web</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              Frontend & Web Architecture
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Next.js 16 App Router, React 19, TypeScript, and modern component systems.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">02 · Mobile</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              Mobile Product Development
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Flutter & Dart cross-platform mobile architecture with BLoC state management.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">03 · UI/UX</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              Product UI/UX Design Systems
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Figma component architecture, wireframing, and design token integration.
            </p>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-8 md:my-10" />

      {/* 6. CONTACT CTA SECTION */}
      <section className="p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
            Contact
          </div>
          <div className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">
            Interested in collaborating or discussing a product?
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Open to opportunities in Indonesia and remote projects worldwide.
          </p>
        </div>

        <button
          onClick={() => setActiveSection('contact')}
          className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
        >
          Get in touch →
        </button>
      </section>
    </div>
  );
}
