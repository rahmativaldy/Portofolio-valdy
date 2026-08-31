'use client';

import React from 'react';
import { WorkspaceProvider, useWorkspace } from '@/context/WorkspaceContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { WorkspaceLayout } from './WorkspaceLayout';
import { Overview } from '@/components/sections/Overview';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Blog } from '@/components/sections/Blog';
import { Guestbook } from '@/components/sections/Guestbook';

function WorkspaceInner() {
  const { activeSection } = useWorkspace();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'blog':
        return <Blog />;
      case 'guestbook':
        return <Guestbook />;
      case 'contact':
        return <Contact />;
      default:
        return <Overview />;
    }
  };

  return (
    <WorkspaceLayout>
      <div className="w-full min-h-full">
        {renderSection()}
      </div>
    </WorkspaceLayout>
  );
}

interface WorkspaceShellProps {
  initialSection?: string;
}

export function WorkspaceShell({ initialSection = 'overview' }: WorkspaceShellProps) {
  return (
    <LanguageProvider>
      <WorkspaceProvider initialSection={initialSection}>
        <WorkspaceInner />
      </WorkspaceProvider>
    </LanguageProvider>
  );
}




