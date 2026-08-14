'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { COMMANDS_METADATA } from '@/data/navigation';
import { PROJECTS } from '@/data/projects';
import { EDITORIAL_NOTES } from '@/data/blog';
import { JOURNEY_MILESTONES } from '@/data/experience';
import { SKILL_GROUPS } from '@/data/skills';

interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuToggle: () => void;
}

type ThemeMode = 'dark' | 'light';

type HeaderState = {
  mounted: boolean;
  theme: ThemeMode;
};

type HeaderAction =
  | { type: 'hydrate'; theme: ThemeMode }
  | { type: 'toggle'; theme: ThemeMode };

function headerReducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case 'hydrate':
      return { mounted: true, theme: action.theme };
    case 'toggle':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

const initialHeaderState: HeaderState = {
  mounted: false,
  theme: 'dark',
};

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  sectionId: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  ...COMMANDS_METADATA.map((nav) => ({
    id: `nav-${nav.id}`,
    title: nav.label,
    category: 'Section',
    description: nav.description,
    sectionId: nav.id,
  })),
  ...PROJECTS.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    category: 'Project',
    description: project.description,
    sectionId: 'projects',
  })),
  ...EDITORIAL_NOTES.map((note) => ({
    id: `note-${note.id}`,
    title: note.title,
    category: 'Note',
    description: note.summary,
    sectionId: 'blog',
  })),
  ...JOURNEY_MILESTONES.map((journey) => ({
    id: `journey-${journey.id}`,
    title: journey.title,
    category: 'Journey',
    description: journey.summary,
    sectionId: 'experience',
  })),
  ...SKILL_GROUPS.map((skill) => ({
    id: `skill-${skill.id}`,
    title: skill.category,
    category: 'Toolkit',
    description: skill.description,
    sectionId: 'skills',
  })),
];

export function Header({ isSidebarOpen, onMenuToggle }: HeaderProps) {
  const { setActiveSection } = useWorkspace();
  const [state, dispatch] = React.useReducer(headerReducer, initialHeaderState);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as ThemeMode | null;
      let theme: ThemeMode;
      if (stored === 'dark' || stored === 'light') {
        theme = stored;
      } else {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      dispatch({ type: 'hydrate', theme });
    } catch {
      dispatch({ type: 'hydrate', theme: 'dark' });
    }
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  const handleSelect = (item: SearchItem) => {
    setActiveSection(item.sectionId);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || filteredResults.length === 0) {
      if (e.key === 'ArrowDown' && searchQuery.trim() !== '') {
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  const themeIcon = state.mounted ? (
    state.theme === 'dark' ? (
      <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ) : (
      <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  ) : (
    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );

  const themeLabel = state.mounted
    ? state.theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'
    : 'Toggle theme';

  const toggleTheme = () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore localStorage errors
    }
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    dispatch({ type: 'toggle', theme: nextTheme });
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f0f11] flex items-center justify-between px-4 md:px-6 select-none transition-colors duration-150">
      {/* Left side: Hamburger control */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className={`p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer ${
            isSidebarOpen ? 'md:hidden' : 'md:inline-flex'
          }`}
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right side: Search workspace field & Theme switcher */}
      <div className="flex items-center gap-3">
        {/* Global Search Workspace Field */}
        <div ref={searchContainerRef} className="relative flex items-center">
          <svg className="w-3.5 h-3.5 absolute left-3 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              if (searchQuery.trim() !== '') {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search workspace..."
            className="w-40 sm:w-56 md:w-64 pl-8 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />

          {/* Search Dropdown */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full right-0 sm:left-0 mt-1.5 w-64 sm:w-80 max-h-72 overflow-y-auto bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl z-50 py-1 font-mono text-xs animate-fadeIn">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <button
                    key={`${item.id}-${idx}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3 py-2 flex flex-col gap-0.5 transition-colors cursor-pointer ${
                      idx === selectedIndex
                        ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{item.title}</span>
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0 font-mono">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-sans">
                        {item.description}
                      </p>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-zinc-400 dark:text-zinc-500 italic text-[11px]">
                  No matching workspace items
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer"
          aria-label={themeLabel}
          title={themeLabel}
        >
          {themeIcon}
        </button>
      </div>
    </header>
  );
}
