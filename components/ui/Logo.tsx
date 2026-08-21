import React from 'react';

interface LogoProps {
  /** Show the full brand name or just the monogram */
  variant?: 'full' | 'mark';
  /** Badge label shown beside the name — defaults to 'v2' */
  version?: string;
  className?: string;
}

/**
 * Minimal personal brand mark for Rahmat Workspace.
 * Uses pure CSS — no image dependency, theme-aware.
 */
export function Logo({ variant = 'full', version = 'v3', className = '' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <span
        className={`inline-flex items-center justify-center w-8 h-8 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-sm font-bold select-none tracking-tighter ${className}`}
        aria-label="Rahmat Workspace"
      >
        RI
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`} aria-label="Rahmat Workspace">
      {/* Monogram badge */}
      <span className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center font-mono text-[11px] font-bold text-zinc-100 dark:text-zinc-900 tracking-tighter flex-shrink-0">
        RI
      </span>
      {/* Wordmark */}
      <span className="font-sans font-medium text-zinc-900 dark:text-zinc-100 tracking-tight text-sm">
        Rahmat
        <span className="text-zinc-400 dark:text-zinc-500 font-normal"> Workspace</span>
      </span>
      {/* Version pill */}
      {version && (
        <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700 font-mono leading-none">
          {version}
        </span>
      )}
    </span>
  );
}
