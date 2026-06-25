'use client';

import { EXPERIENCE } from '@/data/experience';

export function Experience() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="experience">
      {/* Section Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Experience</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Learning Journey & Development
        </h2>
        <p className="text-zinc-650 dark:text-zinc-400 text-sm mt-2 max-w-lg">
          A timeline of milestones from independent projects and self-directed learning.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6 relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 to-transparent"></div>

        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="relative pl-14 md:pl-16">
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-2 top-1 w-8 h-8 bg-white dark:bg-zinc-950 border-2 border-blue-500/60 rounded-full flex items-center justify-center transition-colors duration-150">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/50 rounded-xl p-5 hover:border-zinc-350 dark:hover:border-zinc-700/60 transition duration-150">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {exp.role}
                </h3>
                <span className="text-zinc-550 dark:text-zinc-500 font-medium text-xs">
                  {exp.company}
                </span>
              </div>

              {/* Period */}
              <p className="text-zinc-500 text-xs font-mono mb-3">
                {exp.period}
              </p>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Technologies */}
              {exp.technologies && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200 dark:border-zinc-800/30">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700/30 transition-colors duration-150"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
