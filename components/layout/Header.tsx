'use client';

import React from 'react';

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
        <div className="relative flex items-center">
          <svg className="w-3.5 h-3.5 absolute left-3 text-zinc-400 dark:text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-40 sm:w-56 md:w-64 pl-8 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
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
