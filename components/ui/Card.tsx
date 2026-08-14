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
        bg-white dark:bg-[#141417] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 p-5 rounded-md transition-colors duration-150 overflow-hidden
        ${hover ? 'hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors' : ''}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
