'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';

interface HeaderProps {
  onMenuToggle: () => void;
  activeSection: string;
}

export function Header({ onMenuToggle, activeSection }: HeaderProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const currentTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    const t = setTimeout(() => {
      setTheme(currentTheme);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 md:px-8 select-none transition-colors duration-150">
      {/* Left side: Hamburger (Mobile only) & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-xs md:text-sm">
          <Logo variant="mark" />
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-semibold tracking-tight capitalize">{activeSection}</span>
        </div>
      </div>

      {/* Right side: Search shortcut & Theme switcher */}
      <div className="flex items-center gap-4">
        {/* Search button styled like a minimal search bar */}
        <button
          onClick={triggerCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 transition duration-150 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search workspace...</span>
          <kbd className="px-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-[9px] font-mono font-medium">⌘K</kbd>
        </button>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-850 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              /* Sun Icon for Light Mode */
              <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              /* Moon Icon for Dark Mode */
              <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
