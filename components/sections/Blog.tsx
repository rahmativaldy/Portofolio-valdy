'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { EDITORIAL_NOTES, EditorialNote } from '@/data/blog';

export function Blog() {
  const { setActiveSection } = useWorkspace();
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

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10 text-zinc-900 dark:text-zinc-100 select-none space-y-8 sm:space-y-10 md:space-y-12 animate-fadeIn"
      id="blog"
    >
      {/* 01 / NOTES */}
      <section className="space-y-4 pb-2 animate-fadeInUp">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              01 / Notes
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Technical Notes &amp; Documentation
            </h1>
            <p className="text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Indonesia · Open to opportunities</span>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight max-w-3xl">
            &ldquo;Architectural observations, technical decisions, and software engineering takeaways.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl">
            A collection of short technical notes, architectural tradeoffs, and practical engineering reflections written while building mobile applications with Flutter and web interface systems with Next.js and TypeScript.
          </p>
        </div>
      </section>

      {/* 02 / TECHNICAL INDEX */}
      <section
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-6 animate-fadeInUp"
        style={{ animationDelay: '100ms' }}
      >
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            02 / Technical Index
          </div>
          <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            {EDITORIAL_NOTES.length} Notes Published
          </div>
        </div>

        {/* Index List */}
        <div className="space-y-6">
          {EDITORIAL_NOTES.map((note) => (
            <article
              key={note.id}
              className="group p-4 sm:p-5 md:p-6 rounded-sm border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] hover:bg-zinc-50/80 dark:hover:bg-[#16161a] transition-colors duration-200 space-y-4"
            >
              {/* Top Meta Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                {/* Desktop Left / Mobile Top: Sequence & Context */}
                <div className="md:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-950 dark:group-hover:bg-white transition-colors shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-950 dark:text-white">
                      NOTE {note.sequence}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pl-3.5">
                    {note.category} · {note.projectContext}
                  </div>
                </div>

                {/* Desktop Right / Mobile Body: Title */}
                <div className="md:col-span-8">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">
                    {note.title}
                  </h3>
                </div>
              </div>

              {/* Body & Excerpt */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-start-5 md:col-span-8 space-y-3">
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {note.summary}
                  </p>

                  {/* Technologies Tags */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {note.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
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
                      className="group/btn inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <span>Read Note</span>
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
          ))}
        </div>
      </section>

      {/* Reading Panel Detail Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-sm bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 select-text text-zinc-900 dark:text-zinc-100">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 sm:pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-950 dark:text-white">{selectedNote.category}</span>
                <span>·</span>
                <span>{selectedNote.projectContext}</span>
              </div>

              <button
                type="button"
                onClick={handleCloseNote}
                className="w-8 h-8 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                aria-label="Close note panel"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 sm:space-y-6">
              <h2
                id="note-modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight"
              >
                {selectedNote.title}
              </h2>

              {/* Observation Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                  01 / Observation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                  {selectedNote.observation}
                </p>
              </div>

              {/* Decision & Implementation Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                  02 / Decision &amp; Implementation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                  {selectedNote.decision}
                </p>
              </div>

              {/* Key Takeaway Box */}
              <div className="border-l-2 border-zinc-950 dark:border-white bg-zinc-100 dark:bg-zinc-900/90 p-3 sm:p-4 rounded-r-sm space-y-1">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-semibold">
                  Key Takeaway
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {selectedNote.takeaway}
                </p>
              </div>

              {/* Technologies Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedNote.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={handleCloseNote}
                className="w-full sm:w-auto px-4 py-2 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION FOOTER */}
      <section
        className="pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeInUp"
        style={{ animationDelay: '300ms' }}
      >
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Technical Notebook
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
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
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
            onClick={() => setActiveSection('skills')}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <span>View Toolkit</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
