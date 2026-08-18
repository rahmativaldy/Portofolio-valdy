'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

function FadeIn({ children, delay = 0.7, duration = 0.7, className = '' }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
}

function MagnetButton({ children, className = '' }: MagnetButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse') return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX / 3.5);
    y.set(distanceY / 3.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FloatingNodes() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Node 1: Neutral Glow */}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 will-change-transform opacity-40"
        style={{
          boxShadow: '0 0 12px 2px rgba(161, 161, 170, 0.2)',
        }}
        initial={{ x: '15vw', y: '25vh' }}
        animate={{
          x: ['15vw', '75vw', '50vw', '20vw', '15vw'],
          y: ['25vh', '65vh', '15vh', '80vh', '25vh'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Node 2: Muted Glow */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 will-change-transform opacity-30"
        style={{
          boxShadow: '0 0 10px 2px rgba(161, 161, 170, 0.15)',
        }}
        initial={{ x: '80vw', y: '70vh' }}
        animate={{
          x: ['80vw', '25vw', '70vw', '10vw', '80vw'],
          y: ['70vh', '20vh', '85vh', '40vh', '70vh'],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center font-sans select-none transition-colors duration-150">
      {/* 1. BACKGROUND (AMBIENT CANVAS) */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none">
        {/* SVG Grid Pattern */}
        <svg className="w-full h-full text-zinc-300/40 dark:text-zinc-800/40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-404" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-404)" />
        </svg>

        {/* Floating Wandering Nodes */}
        <FloatingNodes />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        {/* Sub-eyebrow */}
        <FadeIn delay={0.1} duration={0.6}>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2 font-semibold">
            ERROR // 404_MODULE_NOT_FOUND
          </p>
        </FadeIn>

        {/* Hero Heading */}
        <motion.h1
          initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-[25vw] sm:text-[20vw] md:text-[18vw] font-black tracking-tighter leading-none text-zinc-950 dark:text-white cursor-default"
        >
          404
        </motion.h1>

        {/* Paragraph Description */}
        <FadeIn delay={0.3} duration={0.7} className="mt-2">
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans max-w-[320px] sm:max-w-[420px] leading-relaxed">
            The workspace component you are looking for has been moved, deleted, or never existed.
          </p>
        </FadeIn>

        {/* 3. ACTION BUTTON */}
        <FadeIn delay={0.5} duration={0.7} className="mt-8 sm:mt-10">
          <MagnetButton>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border border-zinc-300 dark:border-zinc-800 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Return to Workspace</span>
            </Link>
          </MagnetButton>
        </FadeIn>
      </div>
    </div>
  );
}
