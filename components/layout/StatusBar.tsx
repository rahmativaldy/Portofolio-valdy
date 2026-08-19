'use client';

import React, { useState, useEffect } from 'react';

export function StatusBar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const updateTime = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-6 bg-zinc-100 dark:bg-[#0f0f11] border-t border-zinc-200 dark:border-zinc-800 text-[11px] flex items-center justify-between px-3 text-zinc-500 dark:text-zinc-400 select-none transition-colors duration-150 shrink-0">
      {/* Left side: Status indicators */}
      <div className="flex items-center gap-2 sm:gap-3 truncate">
        {/* Branch / Status */}
        <div className="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>main</span>
        </div>

        <span className="text-zinc-300 dark:text-zinc-700 shrink-0">|</span>

        {/* Live Availability */}
        <div className="flex items-center gap-1.5 truncate">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="truncate">Open to opportunities</span>
        </div>
      </div>

      {/* Right side: Editor configuration and local time */}
      <div className="flex items-center gap-3">
        {/* Technologies / Mode indicators */}
        <div className="hidden sm:flex items-center gap-2">
          <span>TypeScript</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>React 19</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>Next.js 16</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>UTF-8</span>
        </div>

        <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>

        {/* Live Local Time */}
        <div className="flex items-center gap-1 font-mono">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span suppressHydrationWarning>{time || 'Ready'}</span>
        </div>
      </div>
    </footer>
  );
}
