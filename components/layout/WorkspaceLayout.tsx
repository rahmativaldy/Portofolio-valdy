'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContentArea } from './ContentArea';
import { StatusBar } from './StatusBar';
import { CustomCursor } from '@/components/visual/CustomCursor';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  // Start with a deterministic closed state on server to avoid hydration mismatches.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // On mount, determine preferred state from persisted preference or viewport size.
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) {
        // defer setState to avoid synchronous state update inside effect
        setTimeout(() => setIsSidebarOpen(saved === 'true'));
        return;
      }
    } catch {
      // ignore localStorage errors
    }

    const desktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    // defer to next tick to avoid cascading renders
    setTimeout(() => setIsSidebarOpen(Boolean(desktop)));
  }, []);

  // Persist changes to localStorage
  const setSidebarOpen = (open: boolean) => {
    setIsSidebarOpen(open);
    try {
      localStorage.setItem('sidebarOpen', String(open));
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col h-dvh min-h-0 w-screen overflow-hidden bg-zinc-100 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans relative transition-colors duration-150">
      {/* Upper part containing sidebar and content area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Sidebar Navigation - handles desktop and mobile slide-out */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Backdrop overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-150"
          />
        )}

        {/* Main Workspace Frame */}
        <main className="flex-1 min-w-0 min-h-0 flex flex-col h-full overflow-hidden">
          {/* Header Bar */}
          <Header
            isSidebarOpen={isSidebarOpen}
            onMenuToggle={() => setSidebarOpen(!isSidebarOpen)}
          />

          {/* Scrollable Work Area */}
          <ContentArea>
            {children}
          </ContentArea>
        </main>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Interactive Custom Animated Cursor */}
      <CustomCursor />
    </div>
  );
}
