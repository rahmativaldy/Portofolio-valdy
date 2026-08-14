'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

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

export function Header({ isSidebarOpen, onMenuToggle }: HeaderProps) {
  const { triggerCommandPalette } = useWorkspace();
  const [state, dispatch] = React.useReducer(headerReducer, initialHeaderState);

  React.useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as ThemeMode) || 'dark';
    dispatch({ type: 'hydrate', theme: storedTheme });
  }, []);

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
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    dispatch({ type: 'toggle', theme: nextTheme });
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0e0e10] flex items-center justify-between px-4 md:px-8 select-none transition-colors duration-150">
      {/* Left side: Hamburger control */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className={`p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition cursor-pointer ${
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
      <div className="flex items-center gap-4">
        {/* Search button styled like a minimal search bar */}
        <button
          onClick={triggerCommandPalette}
          className="flex items-center gap-2 px-3 py-2 md:py-1.5 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-400 transition duration-150 cursor-pointer min-h-[44px] md:min-h-0"
          aria-label="Open Search"
        >
          <svg className="w-4 h-4 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="inline md:hidden font-medium">Search</span>
          <span className="hidden md:inline">Search workspace...</span>
          <kbd className="hidden md:inline-block px-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-[9px] font-mono font-medium">⌘K</kbd>
        </button>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition cursor-pointer"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {themeIcon}
          </button>
        </div>
      </div>
    </header>
  );
}
