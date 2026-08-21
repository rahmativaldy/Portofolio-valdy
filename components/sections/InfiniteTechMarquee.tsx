'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { TechIcon } from '@/components/icons/TechIcons';
import { DetailedSkillItem } from '@/data/skills';

/* ─────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────── */
interface InfiniteTechMarqueeProps {
  items: DetailedSkillItem[] | { name: string }[];
  direction?: 'left' | 'right';
  /** Pixels per second — constant visual velocity */
  speed?: number;
}

/* ─────────────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────────────── */
const GAP = 10;        // gap between items in px (matches gap-2.5 = 10px)
const LERP_SPEED = 8;  // velocity interpolation factor (higher = faster ease)
const MAX_DT = 0.1;    // cap deltaTime to prevent jumps after tab switch

/* ─────────────────────────────────────────────────────
   TechCard — memoised to prevent re-renders each frame
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
      title={name}
      {...(!isAccessible && { 'aria-hidden': true, tabIndex: -1 })}
      className="inline-flex items-center gap-2 px-3 sm:px-3.5 h-[34px] sm:h-[36px] border border-zinc-200/90 dark:border-zinc-800/90 rounded-sm bg-white dark:bg-[#121215] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-[#161619] transition-colors duration-150 ease-out cursor-default shrink-0"
    >
      <TechIcon name={name} className="w-4 h-4 shrink-0" />
      <span className="text-[11.5px] sm:text-[12px] font-mono font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
});

/* ─────────────────────────────────────────────────────
   LogoLoop — rAF-driven continuous offset loop
   ───────────────────────────────────────────────────── */
export function InfiniteTechMarquee({
  items,
  direction = 'left',
  speed = 40,
}: InfiniteTechMarqueeProps) {
  /* ── refs ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const currentVelocityRef = useRef<number>(speed);
  const targetVelocityRef = useRef<number>(speed);
  const sequenceWidthRef = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);

  /* ── state ── */
  const [copyCount, setCopyCount] = useState(3);

  /* ── detect prefers-reduced-motion ── */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  /* ── measure sequence width & compute copy count ── */
  const measure = useCallback(() => {
    const seq = sequenceRef.current;
    const container = containerRef.current;
    if (!seq || !container) return;

    const seqWidth = seq.getBoundingClientRect().width;
    const containerWidth = container.getBoundingClientRect().width;

    if (seqWidth > 0) {
      sequenceWidthRef.current = seqWidth;
      // Need enough copies to fill the container + 2 extra for seamless wrapping
      const needed = Math.ceil(containerWidth / seqWidth) + 2;
      setCopyCount((prev) => Math.max(prev, needed));
    }
  }, []);

  /* ── ResizeObserver for responsive measurement ── */
  useEffect(() => {
    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    if (sequenceRef.current) ro.observe(sequenceRef.current);

    return () => ro.disconnect();
  }, [measure]);

  /* ── rAF animation loop ── */
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, MAX_DT);
      lastTimeRef.current = timestamp;

      const seqW = sequenceWidthRef.current;

      if (seqW > 0 && !prefersReducedMotion.current) {
        // Smooth velocity interpolation (lerp toward target)
        const target = targetVelocityRef.current;
        const current = currentVelocityRef.current;
        currentVelocityRef.current = current + (target - current) * Math.min(LERP_SPEED * dt, 1);

        // Update offset
        offsetRef.current += currentVelocityRef.current * dt;

        // Wrap offset seamlessly around one sequence width
        if (offsetRef.current >= seqW) {
          offsetRef.current -= seqW;
        } else if (offsetRef.current < 0) {
          offsetRef.current += seqW;
        }

        // Apply transform — direction determines sign
        if (trackRef.current) {
          const translateX = direction === 'left'
            ? -offsetRef.current
            : -(seqW - offsetRef.current);
          trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  /* ── hover handlers ── */
  const handleMouseEnter = useCallback(() => {
    targetVelocityRef.current = 0;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetVelocityRef.current = speed;
  }, [speed]);

  /* ── build the repeated items for one "sequence" ── */
  const sequenceItems = useMemo(() => items, [items]);

  /* ── build all copies ── */
  const copies = useMemo(() => {
    return Array.from({ length: copyCount }, (_, copyIdx) => (
      <div
        key={`copy-${copyIdx}`}
        ref={copyIdx === 0 ? sequenceRef : undefined}
        className="flex shrink-0 items-center"
        style={{ gap: `${GAP}px`, paddingRight: `${GAP}px` }}
        {...(copyIdx > 0 && { 'aria-hidden': true })}
      >
        {sequenceItems.map((item, itemIdx) => (
          <TechCard
            key={`${copyIdx}-${item.name}-${itemIdx}`}
            name={item.name}
            isAccessible={copyIdx === 0}
          />
        ))}
      </div>
    ));
  }, [copyCount, sequenceItems]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-1 select-none logo-loop-mask"
      role="region"
      aria-label="Technology stream"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

export { InfiniteTechMarquee as LogoLoop };
