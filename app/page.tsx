'use client';

import { useState } from 'react';
import { Overview } from '@/components/sections/Overview';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview setActiveSection={setActiveSection} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      default:
        return <Overview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <WorkspaceLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </WorkspaceLayout>
  );
}