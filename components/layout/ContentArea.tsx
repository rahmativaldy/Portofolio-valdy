'use client';

import React, { ReactNode, useRef } from 'react';

interface ContentAreaProps {
  children: ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
      <div
        id="workspace-content-area"
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative focus:outline-none min-h-0"
        role="region"
        aria-live="polite"
      >
        {children}
      </div>
    </div>
  );
}
