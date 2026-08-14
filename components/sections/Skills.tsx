'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { SKILL_GROUPS, WORKFLOW_PIPELINE } from '@/data/skills';

export function Skills() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-12 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 max-w-6xl xl:max-w-7xl mx-auto space-y-16 animate-fadeIn" id="skills">
      {/* Section Header */}
      <header className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 font-medium">
            Toolkit
          </span>
          <span className="h-px flex-1 bg-blue-500/20 dark:bg-blue-500/30" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            The tools and technologies I actually use to design and build.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A practical technical inventory of the technologies, frameworks, and workflows I rely on for interface design, mobile product development, and connected web experiences.
          </p>
        </div>
      </header>

      {/* Conceptual Technology Inventory Groups */}
      <div className="space-y-16">
        {SKILL_GROUPS.map((group) => (
          <section
            key={group.id}
            className="border-t border-zinc-200/80 dark:border-zinc-800/70 pt-10 grid gap-8 md:grid-cols-[140px_1fr] items-start"
          >
            {/* Large Decorative Numbering */}
            <div
              className="text-4xl md:text-5xl font-mono font-light tracking-tight text-zinc-300 dark:text-zinc-700/80 leading-none select-none"
              aria-hidden="true"
            >
              {group.id}
            </div>

            {/* Category Content */}
            <div className="space-y-8">
              {/* Category Header & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {group.category}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Items Inventory Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group space-y-1.5 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`tracking-tight ${
                          item.isPrimary
                            ? 'text-base md:text-lg font-semibold text-zinc-950 dark:text-white'
                            : 'text-sm font-medium text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {item.name}
                      </span>

                      {item.projectRef && (
                        <span className="text-[11px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-2 py-0.5 rounded">
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

              {/* Group Footnote */}
              <div className="pt-2 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="h-px flex-1 bg-zinc-200/60 dark:bg-zinc-800/50" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {group.footnote}
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Editorial Design & Development Workflow Sequence */}
      <section className="border-t border-zinc-200/80 dark:border-zinc-800/70 pt-10 space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            Workflow Pipeline
          </span>
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {WORKFLOW_PIPELINE.map((item) => (
            <div
              key={item.step}
              className="space-y-3 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <span>{item.step}</span>
                <span className="uppercase tracking-wider text-xs">{item.phase}</span>
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-950 dark:text-white">
                  {item.tool}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contextual Navigation */}
      <footer className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/50 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Selected work
            <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            My journey
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          Rahmat Workspace · Personal Technical Inventory
        </p>
      </footer>
    </section>
  );
}
