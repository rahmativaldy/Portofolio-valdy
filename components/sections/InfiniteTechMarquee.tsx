'use client';

import React, { useState } from 'react';
import { TechIcon } from '@/components/icons/TechIcons';
import { DetailedSkillItem } from '@/data/skills';

interface InfiniteTechMarqueeProps {
  items: DetailedSkillItem[] | { name: string }[];
  direction?: 'left' | 'right';
  duration?: number;
}

export function InfiniteTechMarquee({
  items,
  direction = 'left',
  duration = 30,
}: InfiniteTechMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items inside each segment to ensure seamless infinite looping across all viewport widths
  const repeatCount = items.length <= 5 ? 3 : 2;
  const repeatedItems = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <div
      className="group relative w-full overflow-hidden marquee-mask py-1 select-none"
      role="region"
      aria-label="Technology stream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className={`${
          direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'
        } group-hover:[animation-play-state:paused]`}
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationPlayState: isPaused ? 'paused' : undefined,
          } as React.CSSProperties
        }
      >
        {/* Primary Track Segment */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5 pr-2 sm:pr-2.5 motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:pr-0">
          {repeatedItems.map((item, index) => (
            <div
              key={`primary-${item.name}-${index}`}
              title={item.name}
              className="group/badge inline-flex items-center gap-2 px-3 sm:px-3.5 h-[34px] sm:h-[36px] border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-[#18181b] hover:scale-[1.06] transition-[transform,border-color,background-color] duration-200 ease-out cursor-default shrink-0 shadow-2xs"
            >
              <TechIcon
                name={item.name}
                className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover/badge:scale-108"
              />
              <span className="text-[11.5px] sm:text-[12px] font-mono font-medium text-zinc-800 dark:text-zinc-200 group-hover/badge:text-zinc-950 dark:group-hover/badge:text-white whitespace-nowrap transition-colors duration-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate Track Segment for Seamless Infinite Loop */}
        <div
          className="flex shrink-0 items-center gap-2 sm:gap-2.5 pr-2 sm:pr-2.5 motion-reduce:hidden"
          aria-hidden="true"
        >
          {repeatedItems.map((item, index) => (
            <div
              key={`duplicate-${item.name}-${index}`}
              tabIndex={-1}
              className="group/badge inline-flex items-center gap-2 px-3 sm:px-3.5 h-[34px] sm:h-[36px] border border-zinc-200 dark:border-zinc-800 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-[#18181b] hover:scale-[1.06] transition-[transform,border-color,background-color] duration-200 ease-out cursor-default shrink-0 shadow-2xs"
            >
              <TechIcon
                name={item.name}
                className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover/badge:scale-108"
              />
              <span className="text-[11.5px] sm:text-[12px] font-mono font-medium text-zinc-800 dark:text-zinc-200 group-hover/badge:text-zinc-950 dark:group-hover/badge:text-white whitespace-nowrap transition-colors duration-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
