import React, { ReactNode } from 'react';

interface ContentAreaProps {
  children: ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 scroll-smooth transition-colors duration-150">
      {children}
    </div>
  );
}
