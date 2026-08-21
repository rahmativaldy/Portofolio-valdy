'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS, WORKFLOW_PIPELINE } from '@/data/skills';
import { TechIcon } from '@/components/icons/TechIcons';

export function Skills() {
  const { setActiveSection } = useWorkspace();

  const sectionLabels: Record<string, { num: string; title: string }> = {
    '01': { num: '02', title: 'Frontend Engineering' },
    '02': { num: '03', title: 'Mobile Development' },
    '03': { num: '04', title: 'Backend & Integration' },
    '04': { num: '05', title: 'Design & Workflow' },
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="skills"
    >
      {/* 01 / TOOLKIT HEADER */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              01 / Full Toolkit
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Technologies &amp; Tools
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              Categorized technical inventory and workflow architecture
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>22 Core Technologies · Authentic Marks</span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
          A structured inventory of the languages, frameworks, state architectures, and developer tools used across my frontend, mobile, and UI design practice.
        </p>
      </section>

      {/* CATEGORIZED SKILL INVENTORY (SECTIONS 02 - 05) */}
      {SKILL_GROUPS.map((group) => {
        const meta = sectionLabels[group.id] || {
          num: `0${parseInt(group.id, 10) + 1}`,
          title: group.category,
        };

        return (
          <section
            key={group.id}
            className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                  {meta.num} / {meta.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {group.category}
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-sans text-zinc-500 dark:text-zinc-400">
                {group.description}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="group p-4 border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/60 dark:hover:bg-[#16161a] transition-all duration-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <TechIcon
                        name={item.name}
                        className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                      />
                      <span className="text-sm font-sans font-semibold text-zinc-950 dark:text-white truncate">
                        {item.name}
                      </span>
                    </div>
                    {item.projectRef && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-sm border border-zinc-200 dark:border-zinc-800 shrink-0">
                        {item.projectRef}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
              Note: {group.footnote}
            </div>
          </section>
        );
      })}

      {/* 06 / WORKFLOW */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
            06 / Workflow Pipeline
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Development &amp; Design Lifecycle
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {WORKFLOW_PIPELINE.map((item) => (
            <div
              key={item.step}
              className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] p-5 space-y-3 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/60 dark:hover:bg-[#16161a] transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.step}</span>
                <span className="uppercase tracking-wider">{item.phase}</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-sans font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <TechIcon name={item.tool.split(' ')[0]} className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.tool}</span>
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Toolkit &amp; Workflow Architecture
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>Back to Overview</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            onClick={() => setActiveSection('contact')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
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
