import React, { ReactNode } from 'react';

interface ContentAreaProps {
  children: ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/70 dark:bg-[#0a0a0b] text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
      <div
        className="flex-1 overflow-y-auto scroll-smooth animate-fadeIn relative focus:outline-none"
        role="region"
        aria-live="polite"
      >
        {children}
      </div>
    </div>
  );
}
