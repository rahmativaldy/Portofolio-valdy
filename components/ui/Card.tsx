import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
}

export function Card({ children, className = '', hover = false, interactive = false }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 text-zinc-900 dark:text-zinc-100 transition-colors duration-150
        ${hover ? 'hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:shadow-md dark:hover:shadow-lg transition-all duration-300' : ''}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
