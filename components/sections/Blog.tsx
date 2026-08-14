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
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-5xl mx-auto space-y-12 animate-fadeIn" id="blog">
      {/* Section Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          Technical Notes & Reflections
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Notes & Learnings
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          A collection of short technical observations, architectural decisions, and project takeaways written while building mobile and web software.
        </p>
      </header>

      {/* Reading Index List */}
      <div className="space-y-10">
        {EDITORIAL_NOTES.map((note) => (
          <article
            key={note.id}
            className="border-b border-zinc-200 dark:border-zinc-800 pb-8 grid gap-6 md:grid-cols-12 items-start"
          >
            {/* Sequence Marker Column */}
            <div className="md:col-span-2 font-mono text-3xl font-light text-zinc-400 dark:text-zinc-600 select-none">
              {note.sequence}
            </div>

            {/* Main Content Column */}
            <div className="md:col-span-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{note.category}</span>
                <span>·</span>
                <span>{note.projectContext}</span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">
                {note.title}
              </h2>

              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {note.summary}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[note.id] = el;
                  }}
                  onClick={() => handleOpenNote(note)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-950 dark:text-white hover:underline cursor-pointer"
                >
                  Read Note →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reading Panel Modal Overlay */}
      {selectedNote && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-md bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedNote.category}</span>
                <span>·</span>
                <span>{selectedNote.projectContext}</span>
              </div>

              <button
                type="button"
                onClick={handleCloseNote}
                className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
                aria-label="Close note panel"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              <h2
                id="note-modal-title"
                className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight"
              >
                {selectedNote.title}
              </h2>

              {/* Observation Section */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                  Observation
                </h3>
                <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedNote.observation}
                </p>
              </div>

              {/* Decision Section */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                  Decision & Implementation
                </h3>
                <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedNote.decision}
                </p>
              </div>

              {/* Key Takeaway Box */}
              <div className="border-l-2 border-zinc-950 dark:border-white bg-zinc-100 dark:bg-zinc-900 p-4 rounded-r-md space-y-1">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-950 dark:text-white font-semibold">
                  Key Takeaway
                </h3>
                <p className="text-xs md:text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {selectedNote.takeaway}
                </p>
              </div>

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span>Related: {selectedNote.technologies.join(' · ')}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={handleCloseNote}
                className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <footer className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Explore Projects →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('experience')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            View Journey →
          </button>
        </div>

        <p className="text-zinc-400 dark:text-zinc-500">
          Rahmat Workspace · Technical Notebook
        </p>
      </footer>
    </section>
  );
}
