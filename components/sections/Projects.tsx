'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-6xl xl:max-w-7xl mx-auto space-y-12 animate-fadeIn" id="projects">
      {/* Section Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Project Inventory & Case Studies
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Selected Work
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Real products built across mobile and web. Click any project card to open the technical case study details, architecture decisions, and key learnings.
        </p>
      </header>

      {/* Editorial Case Study List */}
      <div className="space-y-12">
        {PROJECTS.map((project, index) => {
          const roleText =
            project.id === 'nusago-mobile'
              ? 'Mobile Engineering · UI/UX'
              : project.id === 'rahmat-workspace'
              ? 'Frontend Engineering · UI/UX'
              : project.id === 'nusago-api'
              ? 'Backend API Engineering'
              : 'Frontend Web Engineering';

          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417] p-6 md:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div className="space-y-6">
                {/* Top Metadata Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 text-xs font-mono">
                  <div className="font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
                    PROJECT 0{index + 1} · {project.id}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400">
                    {roleText}
                  </div>
                </div>

                {/* Main Grid Content */}
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                  {/* Text Details */}
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <div className="space-y-2">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white flex items-center gap-2">
                        <span>{project.title}</span>
                        <span className="text-xs font-mono text-zinc-400" aria-hidden="true">→</span>
                      </h2>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {project.highlights.slice(0, 3).map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technologies Pills */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[11px] font-mono rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action trigger */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 dark:text-white">
                        <span>View Technical Case Study</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail / Image Preview */}
                  <div className="lg:col-span-5 relative w-full h-56 sm:h-64 md:h-72 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-zinc-400 dark:text-zinc-500 font-mono text-xs space-y-2">
                        <span className="text-xl">⚙</span>
                        <span>API Backend Architecture</span>
                        <span className="text-[10px] text-zinc-500">{project.technologies.slice(0, 4).join(' · ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
