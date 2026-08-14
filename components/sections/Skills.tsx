'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS, WORKFLOW_PIPELINE } from '@/data/skills';

export function Skills() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-6xl xl:max-w-7xl mx-auto space-y-12 animate-fadeIn" id="skills">
      {/* Section Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Toolkit & Technology Inventory
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Technologies & Tools
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          A categorized inventory of the technologies, state architectures, frameworks, and workflow tools I use to design, build, and ship digital products.
        </p>
      </header>

      {/* Categorized Inventory Groups */}
      <div className="space-y-12">
        {SKILL_GROUPS.map((group) => (
          <section
            key={group.id}
            className="border-t border-zinc-200 dark:border-zinc-800 pt-8 grid gap-6 md:grid-cols-12 items-start"
          >
            {/* Sequence ID */}
            <div className="md:col-span-2 font-mono text-3xl font-light text-zinc-400 dark:text-zinc-600 select-none">
              {group.id}
            </div>

            {/* Content Area */}
            <div className="md:col-span-10 space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {group.category}
                </h2>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Skill Items Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-sm ${item.isPrimary ? 'font-bold text-zinc-950 dark:text-white' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>
                        {item.name}
                      </span>
                      {item.projectRef && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                          {item.projectRef}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.context}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footnote */}
              <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
                Note: {group.footnote}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Workflow Pipeline */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Design to Engineering Workflow Pipeline
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {WORKFLOW_PIPELINE.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500">
                <span>{item.step}</span>
                <span className="uppercase">{item.phase}</span>
              </div>
              <div>
                <p className="text-sm font-mono font-bold text-zinc-950 dark:text-white">
                  {item.tool}
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Explore Projects →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            View Journey →
          </button>
        </div>

        <p className="text-zinc-400 dark:text-zinc-500">
          Rahmat Workspace · Toolkit & Workflow Architecture
        </p>
      </footer>
    </section>
  );
}
