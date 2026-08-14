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
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl animate-scaleIn">
        {/* Close button */}
        <button
          id={`project-modal-close-${project.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150 cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image preview */}
        {project.thumbnail && (
          <div className="relative w-full h-64 md:h-72 bg-zinc-100 dark:bg-zinc-900 rounded-t-2xl overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
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
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Case Study · {project.title}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {project.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Technologies */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                Selected Features & Capabilities
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 text-xs md:text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    • {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Learnings */}
          <div className="grid gap-6 sm:grid-cols-2">
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                  Challenges Overcome
                </h3>
                <div className="space-y-2.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
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
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                  Key Learnings
                </h3>
                <div className="space-y-2.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                  {project.learnings.map((learning, idx) => (
                    <p key={idx} className="pl-3 border-l-2 border-blue-500 dark:border-blue-400 leading-relaxed">
                      {learning}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          {(project.github || project.link) && (
            <div className="pt-2 flex flex-wrap gap-3">
              {project.github && (
                <a
                  id={`project-modal-github-${project.id}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-5 py-2.5 text-xs font-semibold text-white dark:text-zinc-950 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-100"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Live Preview ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
