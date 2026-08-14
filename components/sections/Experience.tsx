'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { JOURNEY_MILESTONES } from '@/data/experience';

export function Experience() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-12 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 max-w-6xl xl:max-w-7xl mx-auto space-y-16 animate-fadeIn" id="experience">
      {/* Section Header */}
      <header className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 font-medium">
            Journey
          </span>
          <span className="h-px flex-1 bg-blue-500/20 dark:bg-blue-500/30" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            How my work has developed across design, mobile, and web.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A chronological record of personal development, software engineering discipline, and the visual design practice that shapes every interface I build.
          </p>
        </div>
      </header>

      {/* Editorial Journey Chronology */}
      <div className="border-l border-zinc-200/80 dark:border-zinc-800/70 pl-6 md:pl-10 space-y-16">
        {JOURNEY_MILESTONES.map((milestone) => (
          <article
            key={milestone.id}
            className="border-t border-zinc-200/80 dark:border-zinc-800/70 pt-10 grid gap-8 md:grid-cols-[140px_1fr] items-start"
          >
            {/* Narrow Metadata Column: Sequence & Period */}
            <div className="space-y-1">
              <div
                className="text-3xl md:text-4xl font-mono font-light text-zinc-300 dark:text-zinc-700 select-none leading-none"
                aria-hidden="true"
              >
                {milestone.sequence}
              </div>
              <p className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 tracking-wider">
                {milestone.period}
              </p>
            </div>

            {/* Main Content Column */}
            <div className="space-y-6">
              {/* Category Indicator & Title */}
              <div>
                <span className="inline-block text-xs font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-2.5 py-1 rounded mb-3">
                  {milestone.categoryLabel}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {milestone.title}
                </h3>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                  {milestone.role}
                </p>
              </div>

              {/* Summary Narrative */}
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {milestone.summary}
              </p>

              {/* Design to Code Flow Sequence */}
              {milestone.designToCodeSequence && milestone.designToCodeSequence.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Progression / Design to Code
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 p-3 rounded-xl">
                    {milestone.designToCodeSequence.map((step, idx) => (
                      <span key={step} className="flex items-center gap-2">
                        {idx > 0 && (
                          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">
                            →
                          </span>
                        )}
                        <span>{step}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Contributions */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Key Scope & Outcomes
                </p>
                <ul className="grid gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {milestone.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Disciplines (Restrained Typographic Metadata) */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="uppercase tracking-wider text-xs text-zinc-400 dark:text-zinc-500">
                  Disciplines:
                </span>
                <span>{milestone.technologies.join(' · ')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

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
            onClick={() => setActiveSection('skills')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Toolkit
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          Rahmat Workspace · Journey Narrative
        </p>
      </footer>
    </section>
  );
}
