'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WorkspaceContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
  initialSection?: string;
}

export function WorkspaceProvider({ children, initialSection = 'overview' }: WorkspaceProviderProps) {
  const [activeSection, setActiveSectionState] = useState(initialSection);

  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section);
    if (typeof document !== 'undefined') {
      const scrollEl = document.getElementById('workspace-content-area');
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }
    }
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}



