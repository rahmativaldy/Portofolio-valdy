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
        surface-card text-zinc-900 dark:text-zinc-100 p-6 transition-colors duration-150 overflow-hidden
        ${hover ? 'hover:shadow-md hover:transform hover:-translate-y-[2px] dark:hover:shadow-lg transition-all duration-300' : ''}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
