import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted' | 'frontend' | 'mobile' | 'backend' | 'tools';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800',
    accent: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold border border-zinc-900 dark:border-white',
    muted: 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/60',
    frontend: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700',
    mobile: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700',
    backend: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700',
    tools: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono rounded border select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
