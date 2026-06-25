import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContentArea } from './ContentArea';
import { CommandPalette } from '@/components/sections/CommandPalette';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function WorkspaceLayout({ children, activeSection, setActiveSection }: WorkspaceLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans relative transition-colors duration-150">
      {/* Sidebar Navigation - handles desktop and mobile slide-out */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={(section) => {
          setActiveSection(section);
          setIsSidebarOpen(false); // Auto close sidebar on mobile choice
        }}
        isOpen={isSidebarOpen}
      />

      {/* Backdrop overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-150"
        />
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Bar */}
        <Header 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          activeSection={activeSection}
        />

        {/* Scrollable Work Area */}
        <ContentArea>{children}</ContentArea>
      </div>

      {/* Command Palette Launcher */}
      <CommandPalette setActiveSection={setActiveSection} />
    </div>
  );
}
