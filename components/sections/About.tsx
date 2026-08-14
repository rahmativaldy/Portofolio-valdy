'use client';

import { useWorkspace } from '@/context/WorkspaceContext';

export function About() {
  const { setActiveSection } = useWorkspace();

  return (
    <section className="py-12 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 max-w-6xl xl:max-w-7xl mx-auto animate-fadeIn" id="about">
      <div className="space-y-12">
        <div className="inline-flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400 font-medium">Profile</span>
          <span className="h-px flex-1 bg-blue-500/20 dark:bg-blue-500/30" aria-hidden="true" />
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.4fr_1fr] 2xl:gap-14 items-start">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                  About
                </p>
                <h1 className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  RAHMAT
                  <br />
                  IVALDY
                </h1>
                <p className="max-w-3xl text-xl md:text-2xl leading-[1.1] text-zinc-700 dark:text-zinc-300">
                  Frontend Developer. Mobile Developer. UI/UX Designer.
                </p>
              </div>

              <div className="grid gap-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                <p>
                  I started with mobile interfaces because I wanted to build real products, not just
                  experiment with code. Building NusaGo Mobile taught me how a screen should behave on
                  a device, how state flows through an app, and why architecture matters when the UI grows.
                </p>

                <p>
                  On the web, I use Next.js, React, TypeScript, and Tailwind to bring the same clarity to
                  reusable layouts, responsive states, and accessible interactions. I treat design and
                  implementation as one process, not separate steps.
                </p>

                <p>
                  UI/UX work changes the way I code. I think about hierarchy, spacing, and interaction
                  rhythm before writing markup, and I keep implementation constraints in mind while I
                  shape the interface.
                </p>

                <p>
                  My work is grounded in hands-on projects like NusaGo Mobile and Rahmat Workspace. Those
                  experiences keep the portfolio honest and help me choose practical solutions over
                  clever ones.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveSection('projects')}
                className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
              >
                Selected work
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('experience')}
                className="inline-flex items-center gap-2 font-medium text-zinc-600 dark:text-zinc-300 transition motion-safe:transition-transform duration-200 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 cursor-pointer"
              >
                My journey
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <aside className="space-y-10 text-zinc-600 dark:text-zinc-300">
            <div className="grid gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400 mb-4">
                  Profile details
                </p>
                <dl className="grid gap-4 text-sm">
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                      Location
                    </dt>
                    <dd className="mt-1 text-zinc-950 dark:text-white font-medium">Indonesia</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                      Practice
                    </dt>
                    <dd className="mt-1 text-zinc-950 dark:text-white font-medium">Frontend · Mobile · UI/UX</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                      Tools
                    </dt>
                    <dd className="mt-1 text-zinc-950 dark:text-white font-medium">Flutter · Next.js · TypeScript · Tailwind · Figma</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                      Status
                    </dt>
                    <dd className="mt-1 text-zinc-950 dark:text-white font-medium">Open to opportunities</dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-zinc-200/70 dark:border-zinc-800/60 pt-6">
                <p className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-4">
                  Currently exploring
                </p>
                <ul className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {[
                    'Next.js App Router and page architecture',
                    'Flutter animations and reusable mobile components',
                    'System design for consistent interfaces',
                    'Interaction detail and responsive states',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t border-zinc-200/70 dark:border-zinc-800/60 pt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            I keep design and development close together because the best interfaces are the ones that
            can be built cleanly and used comfortably. This profile is a record of the work I can stand
            behind: projects that were coded, shaped, and refined as one connected process.
          </p>
        </div>
      </div>
    </section>
  );
}
