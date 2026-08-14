'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Motion values for instant inner dot position
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Spring physics for smooth outer trailing ring
  const springConfig = { damping: 24, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  useEffect(() => {
    // Enable only on fine pointer (desktop mouse) without reduced-motion preference
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .group')
      );
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mouseover', handlePointerOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseover', handlePointerOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, rawMouseX, rawMouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none" aria-hidden="true">
      {/* Outer Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-zinc-400/40 dark:border-zinc-600/50 bg-zinc-500/10 dark:bg-zinc-400/10 backdrop-blur-[0.5px] will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : isMouseDown ? 20 : 30,
          height: isHovered ? 48 : isMouseDown ? 20 : 30,
          scale: isMouseDown ? 0.85 : 1,
          borderColor: isHovered
            ? 'rgba(113, 113, 122, 0.8)'
            : 'rgba(113, 113, 122, 0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-zinc-950 dark:bg-white will-change-transform"
        style={{
          x: rawMouseX,
          y: rawMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : isMouseDown ? 0.5 : 1,
          opacity: isHovered ? 0.85 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
