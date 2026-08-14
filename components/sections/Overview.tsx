'use client';

import React from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/context/WorkspaceContext';
import { PROJECTS } from '@/data/projects';
import { SKILL_GROUPS } from '@/data/skills';
import { TechIcon } from '@/components/icons/TechIcons';

export function Overview() {
  const { setActiveSection } = useWorkspace();

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-6 md:px-10 py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-10 md:space-y-12 animate-fadeIn"
      id="overview"
    >
      {/* 1. PROFILE / HERO */}
      <section className="space-y-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Developer & Designer Workspace
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Rahmat Ivaldy
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-snug max-w-3xl">
            I design interfaces and build the products behind them.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-sans">
            Specializing in structured web interfaces, cross-platform mobile applications, and polished user experiences using React, Next.js, TypeScript, and Flutter. Focused on clean architecture, responsive systems, and thoughtful UI design.
          </p>
        </div>
      </section>

      {/* 2. QUICK INFORMATION */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          01 / Quick Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold">
              Core Disciplines
            </div>
            <div className="text-sm md:text-base font-bold text-zinc-950 dark:text-white">
              Frontend · Mobile · UI/UX
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Building typed web components, cross-platform Flutter applications, and cohesive interface systems.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold">
              Featured Work
            </div>
            <div className="text-sm md:text-base font-bold text-zinc-950 dark:text-white">
              NusaGo Mobile & Workspace
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Real-world mobile property booking app and custom developer portfolio web shell.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold">
              Technologies & Tools
            </div>
            <div className="text-sm md:text-base font-bold text-zinc-950 dark:text-white">
              Next.js · Flutter · TypeScript
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              React 19, BLoC Pattern, Tailwind CSS, Node.js, Express, and Figma design workflow.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY PREVIEW */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            02 / Technology Preview
          </div>
          <button
            type="button"
            onClick={() => setActiveSection('skills')}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 font-medium"
          >
            <span>Full Toolkit</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-2.5">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {group.category}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="group px-3 py-1.5 h-[34px] border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2.5"
                  >
                    <TechIcon
                      name={skill.name}
                      className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white shrink-0 transition-colors"
                    />
                    <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white truncate transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SELECTED WORK */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            03 / Selected Work
          </div>
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 font-medium"
          >
            <span>All Projects ({PROJECTS.length})</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Featured Project 01: NusaGo Mobile (Asymmetric Hero Layout) */}
          {PROJECTS.find((p) => p.id === 'nusago-mobile') && (() => {
            const project = PROJECTS.find((p) => p.id === 'nusago-mobile')!;
            return (
              <div
                key={project.id}
                onClick={() => setActiveSection('projects')}
                className="group border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-200 cursor-pointer overflow-hidden p-6 md:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Content Column */}
                  <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">01</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">Mobile Application</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white transition-transform duration-200 group-hover:translate-x-1">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold">
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5 opacity-80" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-950 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        <span>View project</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Image Column (Visual Evidence) */}
                  {project.thumbnail && (
                    <div className="lg:col-span-7 order-1 lg:order-2">
                      <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-[280px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 560px"
                          className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Featured Project 02: Rahmat Workspace (Editorial Row) */}
          {PROJECTS.find((p) => p.id === 'rahmat-workspace') && (() => {
            const project = PROJECTS.find((p) => p.id === 'rahmat-workspace')!;
            return (
              <div
                key={project.id}
                onClick={() => setActiveSection('projects')}
                className="group border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-200 cursor-pointer overflow-hidden p-6 md:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Thumbnail Image Column */}
                  {project.thumbnail && (
                    <div className="lg:col-span-6">
                      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-[250px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">02</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">Web Application</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white transition-transform duration-200 group-hover:translate-x-1">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold">
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5 opacity-80" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-950 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        <span>View project</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5. CURRENT FOCUS */}
      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          04 / Current Focus
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
          <div className="space-y-2.5 pr-0 md:pr-6 pb-6 md:pb-0">
            <div className="text-3xl md:text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700">
              01
            </div>
            <h4 className="text-base md:text-lg font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
              Web Engineering
            </h4>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
              Next.js · React · TypeScript · Tailwind CSS
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Focus on building structured, responsive web interfaces.
            </p>
          </div>

          <div className="space-y-2.5 px-0 md:px-6 py-6 md:py-0">
            <div className="text-3xl md:text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700">
              02
            </div>
            <h4 className="text-base md:text-lg font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
              Mobile Development
            </h4>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
              Flutter · Dart · BLoC · Clean Architecture
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Focus on mobile product implementation and API integration.
            </p>
          </div>

          <div className="space-y-2.5 pl-0 md:pl-6 pt-6 md:pt-0">
            <div className="text-3xl md:text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700">
              03
            </div>
            <h4 className="text-base md:text-lg font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
              UI/UX Systems
            </h4>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
              Figma · Design Systems · Responsive UI
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
              Focus on connecting interface decisions with implementation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 py-8 md:py-12 space-y-5 bg-transparent">
        <div className="space-y-2.5 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            05 / Contact
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Have something worth building together?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            Available for frontend engineering, mobile app development, and UI/UX design opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono pt-1">
          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className="px-6 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Get in touch →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="px-6 py-2.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            View my journey →
          </button>
        </div>
      </section>
    </div>
  );
}
