'use client';

import { useWorkspace } from '@/context/WorkspaceContext';
import { JOURNEY_MILESTONES } from '@/data/experience';

export function Experience() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-6xl xl:max-w-7xl mx-auto space-y-12 animate-fadeIn" id="experience">
      {/* Section Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Chronological Development & Experience
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Journey & Milestones
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          A chronological record of personal development, software engineering discipline, and visual design practice shaping the products I build.
        </p>
      </header>

      {/* Chronological Timeline */}
      <div className="border-l border-zinc-200 dark:border-zinc-800 pl-6 md:pl-8 space-y-12">
        {JOURNEY_MILESTONES.map((milestone) => (
          <article
            key={milestone.id}
            className="relative space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-10"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-zinc-900 dark:bg-white border-2 border-zinc-100 dark:border-[#09090b]" />

            {/* Sequence & Period Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="font-semibold uppercase tracking-wider text-zinc-950 dark:text-white">
                MILESTONE {milestone.sequence} · {milestone.categoryLabel}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                {milestone.period}
              </span>
            </div>

            {/* Title & Role */}
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {milestone.title}
              </h2>
              <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                {milestone.role}
              </p>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
              {milestone.summary}
            </p>

            {/* Design to Code Flow */}
            {milestone.designToCodeSequence && milestone.designToCodeSequence.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Progression / Design to Code
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-md">
                  {milestone.designToCodeSequence.map((step, idx) => (
                    <span key={step} className="flex items-center gap-2">
                      {idx > 0 && (
                        <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">→</span>
                      )}
                      <span>{step}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Key Scope & Outcomes
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                {milestone.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {milestone.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

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
            onClick={() => setActiveSection('skills')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            View Toolkit →
          </button>
        </div>

        <p className="text-zinc-400 dark:text-zinc-500">
          Rahmat Workspace · Chronological Experience
        </p>
      </footer>
    </section>
  );
}
