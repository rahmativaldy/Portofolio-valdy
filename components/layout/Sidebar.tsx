import React from 'react';
import { Logo } from '@/components/ui/Logo';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
}

export function Sidebar({ activeSection, setActiveSection, isOpen }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '⚡' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '📂' },
    { id: 'skills', label: 'Skills', icon: '⚙️' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <aside 
      className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col h-screen text-zinc-500 dark:text-zinc-400 select-none transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Workspace Brand / Header */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-5">
        <Logo variant="full" version="v2" />
      </div>

      {/* Nav Section */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3 mb-2">
          Workspace
        </div>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition duration-150 group text-left cursor-pointer ${
                isActive 
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-l-2 border-blue-500 pl-[10px]' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] flex justify-between items-center text-zinc-400 dark:text-zinc-500">
        <span>Command Palette</span>
        <span className="font-mono bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-800">⌘K</span>
      </div>
    </aside>
  );
}
