'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [project, handleEsc]);

  if (!project) return null;

  return (
    /* Backdrop */
    <div
      id={`project-modal-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl animate-slideInUp flex flex-col">

        {/* Close button */}
        <button
          id={`project-modal-close-${project.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Screenshot / Thumbnail */}
        {project.thumbnail && (
          <div className="relative w-full h-48 md:h-56 bg-zinc-100 dark:bg-zinc-900 rounded-t-2xl overflow-hidden flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {project.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <section>
            <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <section>
              <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                Challenges
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <span className="text-amber-500 mt-1 flex-shrink-0 text-xs">▸</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Learnings */}
          {project.learnings && project.learnings.length > 0 && (
            <section>
              <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                Learnings
              </h3>
              <ul className="space-y-2">
                {project.learnings.map((learning, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <span className="text-blue-500 mt-1 flex-shrink-0 text-xs">▸</span>
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Divider + Links */}
          {(project.github || project.link) && (
            <div className="flex gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
              {project.github && (
                <a
                  id={`project-modal-github-${project.id}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.link && (
                <a
                  id={`project-modal-demo-${project.id}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
