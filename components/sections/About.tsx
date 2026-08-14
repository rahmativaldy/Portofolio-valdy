'use client';

import { useWorkspace } from '@/context/WorkspaceContext';

export function About() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-6xl xl:max-w-7xl mx-auto space-y-12 animate-fadeIn" id="about">
      {/* Editorial Profile Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
          About & Biography
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
          RAHMAT IVALDY
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-zinc-700 dark:text-zinc-300 font-medium">
          Frontend Developer · Mobile Developer · UI/UX Designer
        </p>
      </header>

      {/* Main Editorial Content & Profile Details */}
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Biography & Practice Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              I started with mobile interfaces because I wanted to build real products, not just experiment with code. Building NusaGo Mobile taught me how a screen should behave on a device, how state flows through an app, and why architecture matters when the UI grows.
            </p>

            <p>
              On the web, I use Next.js, React, TypeScript, and Tailwind CSS to bring clarity to reusable layout structures, responsive states, and accessible interactions. I treat visual design and code implementation as one connected process, not separate steps.
            </p>

            <p>
              UI/UX design directly influences the way I write software. I evaluate hierarchy, contrast, spacing, and interaction rhythm before writing markup, ensuring technical constraints are considered from the earliest wireframes.
            </p>

            <p>
              My practice is grounded in authentic, hands-on projects like NusaGo Mobile and Rahmat Workspace. Those real-world builds keep my engineering decisions practical, honest, and focused on user experience.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveSection('projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>Selected Projects</span>
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('experience')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <span>View Journey</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Profile Specifications & Principles */}
        <aside className="lg:col-span-4 space-y-6 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141417]">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Profile Specifications
            </h3>
            <dl className="space-y-3 text-xs font-mono">
              <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                <dt className="text-zinc-400 dark:text-zinc-500">LOCATION</dt>
                <dd className="text-zinc-950 dark:text-white font-medium mt-0.5">Indonesia</dd>
              </div>
              <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                <dt className="text-zinc-400 dark:text-zinc-500">PRACTICE</dt>
                <dd className="text-zinc-950 dark:text-white font-medium mt-0.5">Frontend · Mobile · UI/UX</dd>
              </div>
              <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                <dt className="text-zinc-400 dark:text-zinc-500">PRIMARY TOOLKIT</dt>
                <dd className="text-zinc-950 dark:text-white font-medium mt-0.5">Next.js · Flutter · TypeScript · Figma</dd>
              </div>
              <div>
                <dt className="text-zinc-400 dark:text-zinc-500">STATUS</dt>
                <dd className="text-zinc-950 dark:text-white font-medium mt-0.5">Open to opportunities</dd>
              </div>
            </dl>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Core Principles
            </h3>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                <span>Design and development as one connected process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                <span>Explicit state management over ad-hoc mutations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                <span>Practical, readable code over unnecessary complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">•</span>
                <span>Accessible semantic markup & clean layout rhythm</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Summary Footer */}
      <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Rahmat Workspace · Personal Profile & Developer Statement
        </p>
      </footer>
    </section>
  );
}
