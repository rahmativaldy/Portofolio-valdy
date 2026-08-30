'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { SKILL_GROUPS } from '@/data/skills';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function About() {
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
      id="about"
    >
      {/* 01 / ABOUT HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              {t.about.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Rahmat Ivaldy
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              {t.about.role}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{t.about.status}</span>
          </div>
        </div>

        <div className="space-y-5 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            {t.about.heroHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t.about.heroP1}
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t.about.heroP2}
          </p>
        </div>
      </section>

      {/* 02 / WHAT I DO */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              {t.about.disciplinesTag}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.about.disciplinesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {/* Discipline 01 */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.disciplines.webTag}
              </span>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.disciplines.webTitle}
              </h4>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {t.about.disciplines.webTools}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
                {t.about.disciplines.webDesc}
              </p>
            </div>

            {/* Discipline 02 */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.disciplines.mobileTag}
              </span>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.disciplines.mobileTitle}
              </h4>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {t.about.disciplines.mobileTools}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
                {t.about.disciplines.mobileDesc}
              </p>
            </div>

            {/* Discipline 03 */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.disciplines.designTag}
              </span>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.disciplines.designTitle}
              </h4>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {t.about.disciplines.designTools}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-1">
                {t.about.disciplines.designDesc}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 03 / APPROACH */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
              {t.about.methodologyTag}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.about.methodologyTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            {/* Step 01 */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.steps.s1Tag}
              </span>
              <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.steps.s1Title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {t.about.steps.s1Desc}
              </p>
            </div>

            {/* Step 02 */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.steps.s2Tag}
              </span>
              <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.steps.s2Title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {t.about.steps.s2Desc}
              </p>
            </div>

            {/* Step 03 */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.steps.s3Tag}
              </span>
              <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.steps.s3Title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {t.about.steps.s3Desc}
              </p>
            </div>

            {/* Step 04 */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                {t.about.steps.s4Tag}
              </span>
              <h4 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.steps.s4Title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {t.about.steps.s4Desc}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 04 / TOOLKIT */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                {t.about.toolkitTag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.about.toolkitTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveSection('skills')}
              className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{t.about.fullInventoryCta}</span>
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
      </ScrollReveal>

      {/* NAVIGATION FOOTER */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {t.about.footerText}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveSection('projects')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{t.about.exploreProjectsCta}</span>
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
              <span>{t.about.viewJourneyCta}</span>
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
              <span>{t.about.getInTouchCta}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}


