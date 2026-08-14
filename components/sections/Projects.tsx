'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';

const FEATURED_PROJECT_IDS = ['nusago-mobile', 'rahmat-workspace'];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = PROJECTS.filter((project) =>
    FEATURED_PROJECT_IDS.includes(project.id),
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto space-y-16 animate-fadeIn" id="projects">
      {/* Section Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 font-semibold">
          Featured Projects
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Selected Work
        </h2>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Real products built across mobile and web. Click any project to view technical decisions, architectural details, and key learnings.
        </p>
      </div>

      {/* Large Editorial Project Cards */}
      <div className="space-y-16 md:space-y-20">
        {featuredProjects.map((project, index) => {
          const roleText =
            project.id === 'nusago-mobile'
              ? 'Mobile Development · UI/UX'
              : 'Frontend Development · UI/UX';
          const techText = project.technologies.slice(0, 6).join(' · ');

          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#111113] p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md"
            >
              <div className="space-y-8">
                {/* Top Bar: Sequence Number & Role */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    PROJECT 0{index + 1}
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {roleText}
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
                  {/* Metadata & Narrative */}
                  <div className="space-y-6 text-left">
                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white motion-safe:transition-transform duration-250 ease-out group-hover:translate-x-1">
                        {project.title}
                      </h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-2">
                      {project.highlights?.slice(0, 3).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Built With */}
                    <div className="pt-4 space-y-2 border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Built With
                      </p>
                      <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium">
                        {techText}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        <span>View Case Study</span>
                        <span className="motion-safe:transition-transform duration-180 ease-out group-hover:translate-x-[5px]" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Screenshot Preview */}
                  <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[440px] rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top motion-safe:transition-transform duration-400 ease-out group-hover:scale-[1.06] origin-center"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-400 dark:text-zinc-600">
                        <span className="text-3xl">📸</span>
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
