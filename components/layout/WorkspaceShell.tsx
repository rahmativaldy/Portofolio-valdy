'use client';

import React from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { WorkspaceProvider, useWorkspace } from '@/context/WorkspaceContext';
import { WorkspaceLayout } from './WorkspaceLayout';
import { Overview } from '@/components/sections/Overview';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Blog } from '@/components/sections/Blog';

function WorkspaceInner() {
  const { activeSection } = useWorkspace();
  const shouldReduceMotion = useReducedMotion();

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
      case 'contact':
        return <Contact />;
      default:
        return <Overview />;
    }
  };

  const variants: Variants = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0 } },
        exit: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        initial: {
          opacity: 0,
          y: 8,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
        exit: {
          opacity: 0,
          y: -8,
          transition: {
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      };

  return (
    <WorkspaceLayout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSection}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationStart={(definition) => {
            if (definition === 'animate') {
              const scrollEl = document.getElementById('workspace-content-area');
              if (scrollEl) {
                scrollEl.scrollTop = 0;
              }
            }
          }}
          className="w-full min-h-full"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </WorkspaceLayout>
  );
}

export function WorkspaceShell() {
  return (
    <WorkspaceProvider>
      <WorkspaceInner />
    </WorkspaceProvider>
  );
}


