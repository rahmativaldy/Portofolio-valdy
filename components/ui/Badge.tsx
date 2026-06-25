import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/80 transition-colors duration-150',
    accent: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors duration-150',
    muted: 'bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-150',
  };

  return (
    <span
      className={`inline-block px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-default ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
