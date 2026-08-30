'use client';

import React, { ReactNode, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import { useWorkspace } from '@/context/WorkspaceContext';

interface ContentAreaProps {
  children: ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { activeSection } = useWorkspace();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const contentContainer = contentRef.current;
    if (!scrollContainer || !contentContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis on the workspace scroll container
    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: contentContainer,
      lerp: prefersReducedMotion ? 1 : 0.08,
      duration: prefersReducedMotion ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When activeSection changes, reset scroll position cleanly to the top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
      <div
        id="workspace-content-area"
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative focus:outline-none min-h-0 [scrollbar-width:thin]"
        role="region"
        aria-live="polite"
      >
        <div ref={contentRef} className="w-full min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

