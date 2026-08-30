'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { EDITORIAL_NOTES, EditorialNote } from '@/data/blog';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Blog() {
  const { setActiveSection } = useWorkspace();
  const { t } = useLanguage();
  const [selectedNote, setSelectedNote] = useState<EditorialNote | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleOpenNote = (note: EditorialNote) => {
    setSelectedNote(note);
  };

  const handleCloseNote = useCallback(() => {
    const closedId = selectedNote?.id;
    setSelectedNote(null);
    if (closedId && triggerRefs.current[closedId]) {
      setTimeout(() => {
        triggerRefs.current[closedId]?.focus();
      }, 50);
    }
  }, [selectedNote]);

  // Keyboard Escape listener & Body scroll lock
  useEffect(() => {
    if (!selectedNote) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseNote();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedNote, handleCloseNote]);

  const getNoteData = (id: string) => {
    switch (id) {
      case 'note-01':
        return t.blog.notes.cleanArchitecture;
      case 'note-02':
        return t.blog.notes.nextjsAppRouter;
      case 'note-03':
        return t.blog.notes.zustandVsBloc;
      default:
        return null;
    }
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="blog"
    >
      {/* 01 / NOTES HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              {t.blog.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.blog.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              {t.blog.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{EDITORIAL_NOTES.length} {t.blog.statusCount}</span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            {t.blog.heroHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t.blog.heroDescription}
          </p>
        </div>
      </section>

      {/* 02 / TECHNICAL INDEX */}
      <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8 sm:space-y-10">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium block">
                {t.blog.indexTag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t.blog.indexTitle}
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-sans text-zinc-500 dark:text-zinc-400">
              {EDITORIAL_NOTES.length} {t.blog.articleCount}
            </span>
          </div>
        </ScrollReveal>

        {/* Index List */}
        <div className="space-y-10 sm:space-y-12">
          {EDITORIAL_NOTES.map((note, index) => {
            const noteData = getNoteData(note.id);
            const title = noteData?.title || note.title;
            const summary = noteData?.summary || note.summary;

            return (
              <ScrollReveal key={note.id} delay={index * 0.08}>
                <article
                  className={`space-y-4 pb-10 sm:pb-12 ${
                    index !== EDITORIAL_NOTES.length - 1
                      ? 'border-b border-zinc-200/80 dark:border-zinc-800/80'
                      : ''
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Left: Sequence & Context */}
                    <div className="md:col-span-4 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-mono font-semibold text-zinc-950 dark:text-white">
                          {t.blog.notePrefix} {note.sequence}
                        </span>
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pl-3.5">
                        {note.category} · {note.projectContext}
                      </div>
                    </div>

                    {/* Right: Title, Summary & Read Action */}
                    <div className="md:col-span-8 space-y-4">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                        {title}
                      </h4>

                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                        {summary}
                      </p>

                      {/* Technologies Tags */}
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {note.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-xs font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          ref={(el) => {
                            triggerRefs.current[note.id] = el;
                          }}
                          onClick={() => handleOpenNote(note)}
                          className="group/btn inline-flex items-center gap-1.5 text-sm font-sans font-medium text-zinc-950 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                        >
                          <span>{t.blog.readNote}</span>
                          <span
                            className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Reading Panel Detail Modal */}
      {selectedNote && (() => {
        const modalNoteData = getNoteData(selectedNote.id);
        const title = modalNoteData?.title || selectedNote.title;
        const observation = modalNoteData?.observation || selectedNote.observation;
        const decision = modalNoteData?.decision || selectedNote.decision;
        const takeaway = modalNoteData?.takeaway || selectedNote.takeaway;

        return (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-8 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-modal-title"
          >
            <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-sm bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-7 md:p-8 space-y-6 select-text text-zinc-900 dark:text-zinc-100">
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-950 dark:text-white">{selectedNote.category}</span>
                  <span>·</span>
                  <span>{selectedNote.projectContext}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseNote}
                  className="w-8 h-8 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                  aria-label={t.blog.closeAria}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-6">
                <h2
                  id="note-modal-title"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans leading-tight"
                >
                  {title}
                </h2>

                {/* Observation Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
                    {t.blog.modalObservation}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                    {observation}
                  </p>
                </div>

                {/* Decision & Implementation Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
                    {t.blog.modalDecision}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                    {decision}
                  </p>
                </div>

                {/* Key Takeaway Box */}
                <div className="border-l-2 border-zinc-950 dark:border-white bg-zinc-100 dark:bg-zinc-900/90 p-4 rounded-r-sm space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-semibold">
                    {t.blog.modalTakeaway}
                  </h3>
                  <p className="text-sm sm:text-base font-sans text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {takeaway}
                  </p>
                </div>

                {/* Technologies Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {selectedNote.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseNote}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer"
                >
                  {t.blog.closeNote}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* NAVIGATION FOOTER */}
      <ScrollReveal delay={0.1}>
        <section className="pt-8 sm:pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {t.blog.footerText}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveSection('projects')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-sm font-sans font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{t.blog.exploreProjectsCta}</span>
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
              <span>{t.blog.viewJourneyCta}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('skills')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-sm font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <span>{t.blog.viewToolkitCta}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}


