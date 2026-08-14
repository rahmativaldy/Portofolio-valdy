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
      className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto w-72 lg:w-80 border-r border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0e0e10] flex flex-col h-full min-h-0 text-zinc-500 dark:text-zinc-400 select-none transition-transform duration-200 motion-reduce:transition-none overflow-hidden ${
        isOpen ? 'translate-x-0 md:flex' : '-translate-x-full md:hidden'
      }`}
    >
      {/* Sidebar top bar */}
      <div className="h-14 border-b border-zinc-200 dark:border-white/10 flex items-center justify-end px-5 shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="hidden md:inline-flex items-center justify-center p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150 motion-reduce:transition-none"
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      </div>

      {/* Fixed Profile Identity Block */}
      <div className="shrink-0 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2">
        <ProfileIdentity />
      </div>

      {/* Dedicated Scrollable Navigation Container */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        <nav className="p-4 pt-3 space-y-1.5" role="navigation" aria-label="Sidebar Navigation">
          <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3 mb-2">
            Workspace
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
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-180 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80 dark:focus-visible:ring-blue-400/80 ${
                  isActive 
                    ? 'bg-blue-500/10 dark:bg-blue-500/15 text-zinc-950 dark:text-white font-semibold border-l-2 border-blue-500 pl-[10px]' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <div className={`w-5 h-5 shrink-0 flex items-center justify-center motion-safe:transition-transform duration-180 ease-out motion-safe:group-hover:translate-x-[2px] ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`}>
                  <NavIcon id={item.id} className="w-[18px] h-[18px]" />
                </div>
                <span className="motion-safe:transition-transform duration-180 ease-out motion-safe:group-hover:translate-x-[2px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
