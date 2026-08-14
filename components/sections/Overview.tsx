'use client';

import React from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/context/WorkspaceContext';
import { PROJECTS } from '@/data/projects';
import { SKILL_GROUPS } from '@/data/skills';

export function Overview() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="relative max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12 text-zinc-900 dark:text-zinc-100 select-none space-y-12 animate-fadeIn"
      id="overview"
    >
      {/* 1. DASHBOARD HEADER & INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Personal Developer Dashboard
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
              Rahmat Ivaldy
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Frontend Developer, Mobile Developer, and UI/UX Designer crafting structured interfaces, cross-platform mobile apps, and robust web applications with React, Next.js, TypeScript, and Flutter.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveSection('projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span>Read Profile</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* 2. AUTHENTIC DASHBOARD METRICS & STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Projects Built
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-950 dark:text-white">
            04
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            Mobile & Web Applications
          </div>
        </div>

        <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Disciplines
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-950 dark:text-white">
            03
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            Frontend · Mobile · UI/UX
          </div>
        </div>

        <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Core Toolkit
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-950 dark:text-white">
            15+
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            Languages & Frameworks
          </div>
        </div>

        <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Primary Stack
          </div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-950 dark:text-white">
            TS · Flutter
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            Next.js & Dart / BLoC
          </div>
        </div>
      </section>

      {/* 3. SKILLS PREVIEW */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Skills & Technology Inventory
          </div>
          <button
            onClick={() => setActiveSection('skills')}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>Full Toolkit</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{group.category}</span>
                <span>{group.id}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-0.5 text-xs font-mono rounded border ${
                      skill.isPrimary
                        ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white font-medium'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400'
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

      {/* 4. FEATURED PROJECTS INDEX */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Featured Projects
          </div>
          <button
            onClick={() => setActiveSection('projects')}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View All ({PROJECTS.length})</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveSection('projects')}
              className="p-5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  <span>0{idx + 1}</span>
                  <span>·</span>
                  <span>{project.technologies.slice(0, 3).join(' · ')}</span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className="text-xs font-mono text-zinc-400" aria-hidden="true">→</span>
                </h3>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.thumbnail && (
                <div className="relative w-full md:w-44 h-28 shrink-0 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    sizes="176px"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CURRENT FOCUS */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Current Focus
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1.5">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">01 · Web Architecture</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              Frontend Systems & Next.js
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              React 19, Next.js App Router, TypeScript, and clean layout system design.
            </p>
          </div>

          <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1.5">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">02 · Mobile Engineering</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              Flutter & BLoC Architecture
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Cross-platform mobile apps with Dart, BLoC streams, and clean layered modules.
            </p>
          </div>

          <div className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1.5">
            <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">03 · Interface Design</div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-white">
              UI/UX & Figma Systems
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Component planning, wireframing, and translating visual designs to structured code.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section className="p-6 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#141417] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Get In Touch
          </div>
          <div className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">
            Interested in collaborating on frontend, mobile, or design projects?
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            Primary email: rahmativaldy65@gmail.com
          </p>
        </div>

        <button
          onClick={() => setActiveSection('contact')}
          className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-md border border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
        >
          Contact Me →
        </button>
      </section>
    </div>
  );
}
