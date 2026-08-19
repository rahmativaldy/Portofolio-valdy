import React from 'react';
import { NAV_ITEMS } from '@/data/navigation';
import { useWorkspace } from '@/context/WorkspaceContext';
import { NavIcon } from '@/components/icons/NavIcons';
import { ProfileIdentity } from '@/components/sections/ProfileIdentity';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { activeSection, setActiveSection } = useWorkspace();
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

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
      {/* Sidebar top bar (fixed) */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-5 shrink-0">
        <span className="text-xs font-mono font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
          Workspace
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center justify-center p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150 motion-reduce:transition-none cursor-pointer"
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          <svg className="w-4 h-4 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <svg className="w-4 h-4 block md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Fixed Profile Identity Block */}
      <div className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 py-2">
        <ProfileIdentity />
      </div>

      {/* Dedicated Scrollable Navigation Container */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        <nav className="p-3 space-y-1" role="navigation" aria-label="Sidebar Navigation">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 py-1 font-semibold">
            Navigation
          </div>
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => {
                  handleNavigation(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono tracking-tight rounded-md transition-colors duration-200 motion-reduce:transition-none group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                  isActive 
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <div className={`w-4 h-4 shrink-0 flex items-center justify-center transition-colors duration-200 motion-reduce:transition-none ${isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'}`}>
                  <NavIcon id={item.id} className="w-4 h-4" />
                </div>
                <span className="transition-colors duration-200 motion-reduce:transition-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
