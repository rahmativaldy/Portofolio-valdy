'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { TechIcon } from '@/components/icons/TechIcons';

export function Projects() {
  const { setActiveSection } = useWorkspace();
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectCategory = (id: string) => {
    switch (id) {
      case 'nusago-mobile':
        return t.projects.categories.mobile;
      case 'rahmat-workspace':
        return t.projects.categories.web;
      case 'nusago-api':
        return t.projects.categories.api;
      case 'taskflow-dashboard':
        return t.projects.categories.web;
      default:
        return t.projects.categories.software;
    }
  };

  const getProjectRole = (id: string) => {
    switch (id) {
      case 'nusago-mobile':
        return t.projects.roles.nusagoMobile;
      case 'rahmat-workspace':
        return t.projects.roles.rahmatWorkspace;
      case 'nusago-api':
        return t.projects.roles.nusagoApi;
      case 'taskflow-dashboard':
        return t.projects.roles.taskflow;
      default:
        return t.projects.roles.general;
    }
  };

  const getProjectDescription = (id: string, fallback: string) => {
    switch (id) {
      case 'nusago-mobile':
        return t.projects.items.nusagoMobile.description;
      case 'rahmat-workspace':
        return t.projects.items.rahmatWorkspace.description;
      case 'nusago-api':
        return t.projects.items.nusagoApi.description;
      case 'taskflow-dashboard':
        return t.projects.items.taskflow.description;
      default:
        return fallback;
    }
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="projects"
    >
      {/* 01 / SELECTED PROJECTS HEADER */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              {t.projects.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.projects.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{PROJECTS.length} {t.projects.statusCount}</span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
          {t.projects.heroDescription}
        </p>
      </section>

      {/* PROJECT SHOWCASE LIST */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8 sm:space-y-10">
        {PROJECTS.map((project, index) => {
          const category = getProjectCategory(project.id);
          const role = getProjectRole(project.id);
          const description = getProjectDescription(project.id, project.description);

          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-[#151518] transition-all duration-250 cursor-pointer overflow-hidden p-5 sm:p-7 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left: Project Information */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Category & Role Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-semibold text-zinc-400 dark:text-zinc-500">
                        0{index + 1} —
                      </span>
                      <span className="uppercase tracking-wider font-semibold text-zinc-900 dark:text-zinc-100">
                        {category}
                      </span>
                    </div>
                    <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 font-normal">
                      {role}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white transition-transform duration-250 ease-out group-hover:translate-x-1">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Technology Stack */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                      {t.projects.technologiesTitle}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 rounded-sm flex items-center gap-1.5"
                        >
                          <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60">
                    <span className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-zinc-950 dark:text-white">
                      <span>{t.projects.viewCaseStudy}</span>
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
                  <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-[280px] rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
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
                        <span className="text-[11px] text-zinc-500 max-w-xs font-sans">
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
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Selected Case Studies &amp; Projects
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
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
