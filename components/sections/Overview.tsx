'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface OverviewProps {
  setActiveSection: (section: string) => void;
}

const STATS = [
  {
    id: 'projects',
    label: 'Projects',
    value: '2',
    sublabel: 'Real apps shipped',
  },
  {
    id: 'technologies',
    label: 'Technologies',
    value: '18+',
    sublabel: 'Genuinely used tools',
  },
  {
    id: 'learning',
    label: 'Years Learning',
    value: '5',
    sublabel: 'Building software daily',
  },
];

export function Overview({ setActiveSection }: OverviewProps) {
  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="overview">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 rounded-xl transition-colors duration-150">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center select-none shadow-sm transition-colors duration-150 flex-shrink-0">
            <span className="font-mono text-xl font-bold text-zinc-800 dark:text-zinc-100">RI</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Rahmat Ivaldy
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
              Frontend · Mobile · UI/UX
            </p>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Open to opportunities
          </span>
        </div>
      </div>

      {/* Short Introduction */}
      <Card className="p-6 bg-white dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/50">
        <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
          Introduction
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
          I build mobile apps with Flutter and web interfaces with Next.js. Started coding out of curiosity,
          stayed for the problem-solving. I care about clean architecture, readable code, and shipping things
          that actually work — not just demos.
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATS.map(({ id, label, value, sublabel }) => (
          <div
            key={id}
            className="p-5 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700/60 transition duration-150"
          >
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {label}
            </span>
            <div className="mt-4">
              <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                {value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1">{sublabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions bar */}
      <div className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 select-none transition-colors duration-150">
        <div className="flex items-center gap-2">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-mono text-zinc-800 dark:text-zinc-200">
            ⌘K
          </kbd>
          <span>to search commands or navigate sections</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="overview-explore-projects"
            onClick={() => setActiveSection('projects')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition duration-150 cursor-pointer"
          >
            Explore Projects →
          </button>
          <span className="text-zinc-200 dark:text-zinc-800">|</span>
          <button
            id="overview-get-in-touch"
            onClick={() => setActiveSection('contact')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition duration-150 cursor-pointer"
          >
            Get In Touch →
          </button>
        </div>
      </div>
    </div>
  );
}
