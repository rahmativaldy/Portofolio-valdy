'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Project } from '@/types';

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
    <div
      id={`project-modal-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 rounded-md shadow-2xl">
        {/* Close button */}
        <button
          id={`project-modal-close-${project.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image preview */}
        {project.thumbnail && (
          <div className="relative w-full h-64 md:h-72 bg-zinc-100 dark:bg-zinc-900 rounded-t-md overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
            <Image
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-8 text-left">
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Technical Case Study · {project.id}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Technologies */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                Selected Features & Architecture Highlights
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="p-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs text-zinc-700 dark:text-zinc-300 font-mono"
                  >
                    • {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Learnings */}
          <div className="grid gap-6 sm:grid-cols-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                  Challenges Overcome
                </h3>
                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {project.challenges.map((challenge, idx) => (
                    <p key={idx} className="pl-3 border-l-2 border-zinc-300 dark:border-zinc-700 leading-relaxed">
                      {challenge}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                  Key Learnings
                </h3>
                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {project.learnings.map((learning, idx) => (
                    <p key={idx} className="pl-3 border-l-2 border-zinc-900 dark:border-zinc-100 leading-relaxed">
                      {learning}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          {(project.github || project.link) && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3">
              {project.github && (
                <a
                  id={`project-modal-github-${project.id}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-950 dark:bg-white px-4 py-2 text-xs font-mono font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  View Repository →
                </a>
              )}
              {project.link && (
                <a
                  id={`project-modal-demo-${project.id}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
