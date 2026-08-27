'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { NAV_ITEMS } from '@/data/navigation';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { NavIcon } from '@/components/icons/NavIcons';
import { ProfileIdentity } from '@/components/sections/ProfileIdentity';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { activeSection, setActiveSection } = useWorkspace();
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const getLocalizedNavLabel = (id: string, fallback: string) => {
    switch (id) {
      case 'overview':
        return t.navigation.overview;
      case 'about':
        return t.navigation.about;
      case 'projects':
        return t.navigation.projects;
      case 'skills':
        return t.navigation.toolkit;
      case 'experience':
        return t.navigation.journey;
      case 'blog':
        return t.navigation.notes;
      case 'contact':
        return t.navigation.contact;
      default:
        return fallback;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % NAV_ITEMS.length;
        itemRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
        itemRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        itemRefs.current[NAV_ITEMS.length - 1]?.focus();
        break;
      default:
        break;
    }
  };

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <aside
      className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto w-80 max-w-[85vw] md:w-80 md:min-w-[320px] md:max-w-[320px] border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0f0f11] flex flex-col h-full min-h-0 text-zinc-500 dark:text-zinc-400 select-none transition-transform duration-200 motion-reduce:transition-none overflow-hidden ${
        isOpen ? 'translate-x-0 md:flex' : '-translate-x-full md:hidden'
      }`}
    >
      {/* Compact Profile Identity Block with top-right collapse button */}
      <div className="relative shrink-0 border-b border-zinc-200 dark:border-zinc-800 pt-4 pb-3 px-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-20 inline-flex items-center justify-center p-1.5 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors duration-150 motion-reduce:transition-none cursor-pointer"
          aria-label={t.sidebar.collapseSidebar}
          title={t.sidebar.collapseSidebar}
        >
          <svg className="w-4 h-4 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <svg className="w-4 h-4 block md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <ProfileIdentity />
      </div>

      {/* Dedicated Scrollable Navigation Container */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        <nav className="relative p-3 space-y-1" role="navigation" aria-label="Sidebar Navigation">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3.5 py-1.5 font-medium">
            {t.sidebar.navigation}
          </div>
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            const label = getLocalizedNavLabel(item.id, item.label);
            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => {
                  handleNavigation(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative w-full h-10 flex items-center gap-3 px-3.5 text-sm font-sans font-medium rounded-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 transition-colors duration-150 motion-reduce:transition-none group ${
                  isActive
                    ? 'text-white dark:text-zinc-950'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {/* Active Pill Indicator with layoutId animation */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-full pointer-events-none z-0 shadow-xs"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: 'tween',
                            ease: [0.22, 1, 0.36, 1],
                            duration: 0.35,
                          }
                    }
                  />
                )}

                {/* Navigation Icon */}
                <div
                  className={`relative z-10 w-4 h-4 shrink-0 flex items-center justify-center transition-colors duration-150 motion-reduce:transition-none ${
                    isActive
                      ? 'text-white dark:text-zinc-950'
                      : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
                  }`}
                >
                  <NavIcon id={item.id} className="w-4 h-4" />
                </div>

                {/* Navigation Label */}
                <span className="relative z-10 font-medium transition-colors duration-150 motion-reduce:transition-none truncate">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

