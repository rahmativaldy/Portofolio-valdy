'use client';

import { useState, useEffect } from 'react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  action: () => void;
}

interface CommandPaletteProps {
  setActiveSection: (section: string) => void;
}

export function CommandPalette({ setActiveSection }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands: CommandItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      description: 'View dashboard overview and statistics',
      action: () => {
        setActiveSection('overview');
        setOpen(false);
      },
    },
    {
      id: 'about',
      label: 'About',
      description: 'Read the developer story and biography',
      action: () => {
        setActiveSection('about');
        setOpen(false);
      },
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Explore completed and active projects',
      action: () => {
        setActiveSection('projects');
        setOpen(false);
      },
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Check categorized list of skills and tools',
      action: () => {
        setActiveSection('skills');
        setOpen(false);
      },
    },
    {
      id: 'experience',
      label: 'Experience',
      description: 'View independent learning and project timeline',
      action: () => {
        setActiveSection('experience');
        setOpen(false);
      },
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Find real developer contact channels',
      action: () => {
        setActiveSection('contact');
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleOpenPalette = () => {
      setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenPalette);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenPalette);
    };
  }, []);

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-fadeIn"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette container */}
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50 px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden transition-colors duration-150">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800/80">
            <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
            {filtered.length > 0 ? (
              filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full px-3 py-2.5 text-left rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div>
                    <div className="text-zinc-700 dark:text-zinc-200 font-semibold group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{cmd.label}</div>
                    {cmd.description && (
                      <div className="text-zinc-500 mt-0.5 text-[11px]">{cmd.description}</div>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-650 font-mono">Select</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-xs text-zinc-500">
                No commands found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
