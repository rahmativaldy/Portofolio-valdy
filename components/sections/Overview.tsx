'use client';

import React from 'react';
import Image from 'next/image';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS } from '@/data/projects';
import { SKILL_GROUPS } from '@/data/skills';
import { TechIcon } from '@/components/icons/TechIcons';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { Ballpit } from '@/components/ui/Ballpit';

export function Overview() {
  const { setActiveSection } = useWorkspace();
  const { t } = useLanguage();

  const getSkillCategoryName = (id: string) => {
    switch (id) {
      case '01':
        return t.skills.sections.frontend.category;
      case '02':
        return t.skills.sections.mobile.category;
      case '03':
        return t.skills.sections.backend.category;
      case '04':
        return t.skills.sections.design.category;
      default:
        return id;
    }
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="overview"
    >
      {/* 1. HERO / IDENTITY */}
      <section className="relative overflow-hidden space-y-6 sm:space-y-8">
        {/* Ballpit Interactive Background — Overview Hero Only */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-55 dark:opacity-40 transition-opacity duration-300">
          <Ballpit />
        </div>

        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
                {t.overview.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Rahmat Ivaldy
              </h1>
              <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
                {t.overview.role}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
              <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t.overview.status}</span>
            </div>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
              {t.overview.heroHeading}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              {t.overview.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. TECHNOLOGY PREVIEW */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              {t.overview.techStackTag}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.overview.techStackTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection('skills')}
            className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>{t.overview.fullToolkitCta}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {SKILL_GROUPS.map((group, index) => (
            <div key={group.id} className="space-y-2">
              <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {getSkillCategoryName(group.id)}
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

      {/* 3. SELECTED WORK */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              {t.overview.selectedWorkTag}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.overview.selectedWorkTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>{t.overview.viewAllProjectsCta}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {/* Project 01: NusaGo Mobile */}
          {PROJECTS.find((p) => p.id === 'nusago-mobile') && (() => {
            const project = PROJECTS.find((p) => p.id === 'nusago-mobile')!;
            return (
              <article
                key={project.id}
                onClick={() => setActiveSection('projects')}
                className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-250 cursor-pointer overflow-hidden p-5 sm:p-7 md:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Thumbnail Image Column */}
                  {project.thumbnail && (
                    <div className="lg:col-span-6">
                      <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-[290px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-250 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">01</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">{t.projects.categories.mobile} · Flutter</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white transition-transform duration-250 ease-out group-hover:translate-x-1">
                      {project.title}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {t.projects.items.nusagoMobile.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                        {t.overview.technologiesTitle}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-zinc-950 dark:text-white">
                        <span>{t.overview.readCaseStudy}</span>
                        <span
                          className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* Project 02: Rahmat Workspace */}
          {PROJECTS.find((p) => p.id === 'rahmat-workspace') && (() => {
            const project = PROJECTS.find((p) => p.id === 'rahmat-workspace')!;
            return (
              <article
                key={project.id}
                onClick={() => setActiveSection('projects')}
                className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-250 cursor-pointer overflow-hidden p-5 sm:p-7 md:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Thumbnail Image Column */}
                  {project.thumbnail && (
                    <div className="lg:col-span-6">
                      <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-[290px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-250 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">02</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">{t.projects.categories.web} · Next.js</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white transition-transform duration-250 ease-out group-hover:translate-x-1">
                      {project.title}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {t.projects.items.rahmatWorkspace.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                        {t.overview.technologiesTitle}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                          >
                            <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-zinc-950 dark:text-white">
                        <span>{t.overview.readCaseStudy}</span>
                        <span
                          className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}
        </div>
      </section>

      {/* 4. CONTACT CTA */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
            {t.overview.contactTag}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {t.overview.contactHeading}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-xl">
            {t.overview.contactDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSection('contact')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{t.overview.getInTouchCta}</span>
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
              <span>{t.overview.viewJourneyCta}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

