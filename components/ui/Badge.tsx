import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted' | 'frontend' | 'mobile' | 'backend' | 'tools';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/80 transition-colors duration-150',
    accent: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors duration-150',
    muted: 'bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-150',
    frontend: 'bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-900/50 hover:bg-sky-100/50 dark:hover:bg-sky-900/50 transition-colors duration-150',
    mobile: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50 transition-colors duration-150',
    backend: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/50 transition-colors duration-150',
    tools: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50 hover:bg-amber-100/50 dark:hover:bg-amber-900/50 transition-colors duration-150',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200 select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
