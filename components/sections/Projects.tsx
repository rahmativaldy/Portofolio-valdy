'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="projects">
        {/* Section Header */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Projects</span>
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 max-w-lg">
            Real applications I&apos;ve built and actively maintain. Click any card for full details.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group text-left bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-md dark:hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`View details for ${project.title}`}
            >
              {/* Project Thumbnail */}
              {project.thumbnail ? (
                <div className="relative w-full h-40 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* View details pill */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                      View Details →
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
                  <span className="text-3xl opacity-30">📂</span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech badges — show first 4 only */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="default" className="text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 self-center">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
