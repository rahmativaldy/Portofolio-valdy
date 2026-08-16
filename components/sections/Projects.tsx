'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { TechIcon } from '@/components/icons/TechIcons';

export function Projects() {
  const { setActiveSection } = useWorkspace();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectCategory = (id: string) => {
    switch (id) {
      case 'nusago-mobile':
        return 'Mobile Application';
      case 'rahmat-workspace':
        return 'Web Application';
      case 'nusago-api':
        return 'Backend API';
      case 'taskflow-dashboard':
        return 'Web Application';
      default:
        return 'Software Project';
    }
  };

  const getProjectRole = (id: string) => {
    switch (id) {
      case 'nusago-mobile':
        return 'Mobile Engineering · UI/UX Design';
      case 'rahmat-workspace':
        return 'Frontend Engineering · UI/UX Design';
      case 'nusago-api':
        return 'Backend Engineering · REST API';
      case 'taskflow-dashboard':
        return 'Frontend Engineering · State Systems';
      default:
        return 'Engineering & Design';
    }
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-6 md:px-10 py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-10 md:space-y-12 animate-fadeIn"
      id="projects"
    >
      {/* 01 / SELECTED PROJECTS HEADER */}
      <section className="space-y-4 pb-2 animate-fadeInUp">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / Selected Projects
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Selected Work
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Personal projects &amp; technical case studies across mobile and web
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{PROJECTS.length} Built Projects · Case Studies Available</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl pt-1">
          A collection of real-world products and software projects built with Next.js, React, TypeScript, Flutter, and Node.js. Select any project to view architectural decisions, state patterns, and technical learnings.
        </p>
      </section>

      {/* PROJECT SHOWCASE ROWS */}
      <section
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-6 md:space-y-8 animate-fadeInUp"
        style={{ animationDelay: '100ms' }}
      >
        {PROJECTS.map((project, index) => {
          const category = getProjectCategory(project.id);
          const role = getProjectRole(project.id);

          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-250 cursor-pointer overflow-hidden p-5 sm:p-6 md:p-7"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left: Project Information */}
                <div className="lg:col-span-7 space-y-3.5 md:space-y-4">
                  {/* Category & Role Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-zinc-100 dark:border-zinc-800/60 pb-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 shrink-0">
                        0{index + 1} —
                      </span>
                      <span className="uppercase tracking-wider font-bold text-zinc-900 dark:text-zinc-100">
                        {category}
                      </span>
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                      {role}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white transition-transform duration-250 ease-out group-hover:translate-x-[3px]">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology Stack */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                      Technologies &amp; Tools
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                        >
                          <TechIcon name={tech} className="w-3.5 h-3.5 opacity-80 shrink-0" />
                          <span className="whitespace-nowrap">{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
                      <span>View project</span>
                      <span
                        className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right: Large Project Preview */}
                <div className="lg:col-span-5">
                  <div className="relative w-full h-52 sm:h-60 md:h-64 lg:h-[260px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top transition-transform duration-250 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-zinc-400 dark:text-zinc-500 font-mono text-xs space-y-2">
                        <span className="text-2xl">⚙</span>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                          {project.title}
                        </span>
                        <span className="text-[11px] text-zinc-500 max-w-xs">
                          {project.technologies.slice(0, 4).join(' · ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* NAVIGATION FOOTER */}
      <section
        className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeInUp"
        style={{ animationDelay: '200ms' }}
      >
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Selected Case Studies &amp; Projects
        </p>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="group inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>Back to Overview</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="group inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>View Journey</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className="group inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Get In Touch</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </section>

      {/* PROJECT CASE STUDY MODAL */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
