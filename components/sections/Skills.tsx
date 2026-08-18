'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS, WORKFLOW_PIPELINE } from '@/data/skills';
import { TechIcon } from '@/components/icons/TechIcons';

export function Skills() {
  const { setActiveSection } = useWorkspace();

  // Map skill groups to section numbers 02-05 to match required numbering schema
  const sectionLabels: Record<string, string> = {
    '01': '02 / Frontend Engineering',
    '02': '03 / Mobile Development',
    '03': '04 / Backend & Integration',
    '04': '05 / Design & Workflow',
  };

  const sectionDelays: Record<string, string> = {
    '01': '100ms',
    '02': '200ms',
    '03': '300ms',
    '04': '400ms',
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-8 sm:space-y-10 md:space-y-12 animate-fadeIn"
      id="skills"
    >
      {/* 01 / TOOLKIT HEADER */}
      <section className="space-y-4 pb-2 animate-fadeInUp">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / Toolkit
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Technologies &amp; Tools
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Categorized technical inventory and workflow architecture
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>22 Core Technologies · Authentic Inventory</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl pt-1">
          A structured inventory of the languages, frameworks, state architectures, and developer tools used across my frontend, mobile, and UI design practice.
        </p>
      </section>

      {/* CATEGORIZED SKILL INVENTORY (SECTIONS 02 - 05) */}
      {SKILL_GROUPS.map((group) => {
        const label = sectionLabels[group.id] || `0${parseInt(group.id, 10) + 1} / ${group.category}`;
        const delay = sectionDelays[group.id] || '100ms';

        return (
          <section
            key={group.id}
            className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-fadeInUp"
            style={{ animationDelay: delay }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                {label}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {group.description}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="group p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-[#16161a] transition-all duration-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <TechIcon
                        name={item.name}
                        className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white shrink-0 transition-colors"
                      />
                      <span className="text-xs font-mono font-bold text-zinc-950 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-white truncate">
                        {item.name}
                      </span>
                    </div>
                    {item.projectRef && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-sm border border-zinc-200 dark:border-zinc-800 shrink-0">
                        {item.projectRef}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-0.5">
              Note: {group.footnote}
            </div>
          </section>
        );
      })}

      {/* 06 / WORKFLOW */}
      <section
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-fadeInUp"
        style={{ animationDelay: '500ms' }}
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          06 / Workflow Pipeline
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 rounded-sm overflow-hidden">
          {WORKFLOW_PIPELINE.map((item) => (
            <div
              key={item.step}
              className="group bg-white dark:bg-[#121215] p-4 space-y-2 hover:bg-zinc-50 dark:hover:bg-[#16161a] transition-colors duration-200"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.step}</span>
                <span className="uppercase tracking-wider font-semibold">{item.phase}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-mono font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <TechIcon name={item.tool.split(' ')[0]} className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>{item.tool}</span>
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <section
        className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeInUp"
        style={{ animationDelay: '600ms' }}
      >
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Toolkit &amp; Workflow Architecture
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
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
