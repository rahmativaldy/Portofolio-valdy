'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { TechIcon } from '@/components/icons/TechIcons';

/* ─────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────── */
export interface LogoLoopItem {
  name: string;
}

export interface LogoLoopProps {
  items: Array<{ name: string } | string>;
  direction?: 'left' | 'right';
  /** Velocity in pixels per second (default: 30) */
  speed?: number;
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
}

/* ─────────────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────────────── */
const DEFAULT_GAP = 12;      // Spacing between items in px
const LERP_FACTOR = 10;      // Deceleration / acceleration ease rate
const MAX_DELTA_TIME = 0.1;  // Prevent frame jumps after inactive browser tabs

/* ─────────────────────────────────────────────────────
   TechCard — Pure [ICON] Technology Name
   ───────────────────────────────────────────────────── */
const TechCard = React.memo(function TechCard({
  name,
  isAccessible,
}: {
  name: string;
  isAccessible: boolean;
}) {
  return (
    <div
      {...(!isAccessible && { 'aria-hidden': true, tabIndex: -1 })}
      className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 border border-zinc-200/80 dark:border-zinc-800/80 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/60 dark:hover:bg-[#161619] transition-colors duration-150 cursor-pointer shrink-0 select-none group/tech"
    >
      <TechIcon
        name={name}
        className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover/tech:scale-105"
      />
      <span className="text-xs sm:text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
});

/* ─────────────────────────────────────────────────────
   LogoLoop — Rebuilt Clean Infinite Loop
   ───────────────────────────────────────────────────── */
export function LogoLoop({
  items,
  direction = 'left',
  speed = 30,
  gap = DEFAULT_GAP,
  className = '',
  pauseOnHover = true,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const currentVelocityRef = useRef<number>(speed);
  const sequenceWidthRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const prefersReducedMotion = useRef<boolean>(false);

  // Number of sequence duplicates required to seamlessly fill viewport + buffer
  const [copyCount, setCopyCount] = useState<number>(4);

  // Normalize item names
  const itemNames = useMemo(() => {
    return items.map((item) => (typeof item === 'string' ? item : item.name));
  }, [items]);

  // Reduced motion detection
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (trackRef.current && e.matches) {
        trackRef.current.style.transform = 'none';
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Measure exact width of one sequence
  const measure = useCallback(() => {
    const seq = sequenceRef.current;
    const container = containerRef.current;
    if (!seq || !container) return;

    const seqWidth = seq.getBoundingClientRect().width;
    const containerWidth = container.getBoundingClientRect().width;

    if (seqWidth > 0) {
      sequenceWidthRef.current = seqWidth;
      // Ensure enough copies to fill viewport plus entry/exit buffers
      const needed = Math.max(4, Math.ceil(containerWidth / seqWidth) + 2);
      setCopyCount((prev) => (prev < needed ? needed : prev));

      // Ensure clean initial transform immediately upon measurement
      if (trackRef.current && offsetRef.current === 0 && !prefersReducedMotion.current) {
        const initialX = direction === 'left' ? 0 : -seqWidth;
        trackRef.current.style.transform = `translate3d(${initialX}px, 0, 0)`;
      }
    }
  }, [direction]);

  // Observe resize on both sequence and container
  useEffect(() => {
    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure());
      if (containerRef.current) ro.observe(containerRef.current);
      if (sequenceRef.current) ro.observe(sequenceRef.current);
    }

    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [measure]);

  // Pointer hover listeners for smooth pause / resume
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => {
      if (pauseOnHover) isHoveredRef.current = true;
    };
    const onLeave = (e?: MouseEvent) => {
      if (pauseOnHover) {
        if (!e || !el.contains(e.relatedTarget as Node)) {
          isHoveredRef.current = false;
        }
      }
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', () => onLeave());
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', () => onLeave());

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', () => onLeave());
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', () => onLeave());
    };
  }, [pauseOnHover]);

  // Animation frame loop
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, MAX_DELTA_TIME);
      lastTimestampRef.current = timestamp;

      const seqW = sequenceWidthRef.current;

      if (seqW > 0 && !prefersReducedMotion.current) {
        // Target velocity: 0 on hover, speed when not hovered
        const targetVelocity = (pauseOnHover && isHoveredRef.current) ? 0 : speed;
        const current = currentVelocityRef.current;

        // Smooth ease toward target velocity
        let nextVelocity = current + (targetVelocity - current) * Math.min(LERP_FACTOR * dt, 1);
        if (targetVelocity === 0 && Math.abs(nextVelocity) < 0.1) {
          nextVelocity = 0;
        }
        currentVelocityRef.current = nextVelocity;

        // Advance position offset
        offsetRef.current += currentVelocityRef.current * dt;

        // Seamless wrap around one sequence width
        while (offsetRef.current >= seqW) {
          offsetRef.current -= seqW;
        }
        while (offsetRef.current < 0) {
          offsetRef.current += seqW;
        }

        // Apply transform
        // For 'left': 0 -> -seqW (first item starts at x=0)
        // For 'right': -seqW -> 0 (first item of sequence 1 starts at x=0)
        if (trackRef.current) {
          const translateX =
            direction === 'left'
              ? -offsetRef.current
              : -(seqW - offsetRef.current);
          trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed, pauseOnHover]);

  // Render copies of the sequence
  const copies = useMemo(() => {
    return Array.from({ length: copyCount }, (_, copyIdx) => (
      <div
        key={`seq-copy-${copyIdx}`}
        ref={copyIdx === 0 ? sequenceRef : undefined}
        className="flex shrink-0 items-center"
        style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        {...(copyIdx > 0 && { 'aria-hidden': true })}
      >
        {itemNames.map((name, idx) => (
          <TechCard
            key={`${copyIdx}-${name}-${idx}`}
            name={name}
            isAccessible={copyIdx === 0}
          />
        ))}
      </div>
    ));
  }, [copyCount, itemNames, gap]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-1 select-none logo-loop-mask ${className}`}
      role="region"
      aria-label="Technology loop"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {copies}
      </div>
    </div>
  );
}

export { LogoLoop as InfiniteTechMarquee };
