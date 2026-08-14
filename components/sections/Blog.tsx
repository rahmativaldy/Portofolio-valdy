'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    <section className="py-12 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto space-y-16 animate-fadeIn" id="blog">
      {/* Section Header */}
      <header className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 font-medium">
            Notes
          </span>
          <span className="h-px flex-1 bg-blue-500/20 dark:bg-blue-500/30" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            Things I learn while designing and building.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A collection of technical observations, design decisions, implementation lessons, and project reflections.
          </p>
        </div>
      </header>

      {/* Un-boxed Editorial Notebook Index */}
      <div className="space-y-16">
        {EDITORIAL_NOTES.map((note) => (
          <article
            key={note.id}
            className="border-t border-zinc-200/80 dark:border-zinc-800/70 pt-10 grid gap-8 md:grid-cols-[120px_1fr] items-start"
          >
            {/* Sequence Marker Column */}
            <div
              className="text-3xl md:text-4xl font-mono font-light text-zinc-300 dark:text-zinc-700 select-none leading-none"
              aria-hidden="true"
            >
              {note.sequence}
            </div>

            {/* Main Content Column */}
            <div className="space-y-5">
              {/* Category & Project Context (Clean Typography) */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                  <span>{note.category}</span>
                  <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">{note.projectContext}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-snug">
                  {note.title}
                </h3>
              </div>

              {/* Excerpt Narrative */}
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {note.summary}
              </p>

              {/* Read Note Trigger */}
              <div>
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[note.id] = el;
                  }}
                  onClick={() => handleOpenNote(note)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
                >
                  Read Note
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Reading Panel Modal Overlay */}
      {selectedNote && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
        >
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 md:p-10 space-y-8">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/70 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <span>{selectedNote.category}</span>
                <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                  ·
                </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {selectedNote.projectContext}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCloseNote}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
                aria-label="Close note panel (Press Escape)"
              >
                <span className="text-lg font-mono leading-none" aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-8">
              <h2
                id="note-modal-title"
                className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight"
              >
                {selectedNote.title}
              </h2>

              {/* Observation Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Observation
                </h3>
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedNote.observation}
                </p>
              </div>

              {/* Decision / Approach Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Decision / Approach
                </h3>
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedNote.decision}
                </p>
              </div>

              {/* Key Takeaway Highlight Box */}
              <div className="border-l-2 border-blue-600 dark:border-blue-400 bg-blue-500/10 dark:bg-blue-400/10 p-5 rounded-r-xl space-y-1">
                <h3 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Key Takeaway
                </h3>
                <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                  {selectedNote.takeaway}
                </p>
              </div>

              {/* Related Technologies */}
              <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/70 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Related:
                </span>
                <span>{selectedNote.technologies.join(' · ')}</span>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleCloseNote}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contextual Navigation */}
      <footer className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/50 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Selected work
            <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
          >
            Journey
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          Rahmat Workspace · Editorial Notebook
        </p>
      </footer>
    </section>
  );
}
