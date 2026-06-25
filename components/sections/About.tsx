'use client';

export function About() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="about">
      {/* Section Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">About</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Behind the Workspace
        </h2>
      </div>

      {/* Natural writing — no buzzwords */}
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed max-w-3xl">
        <p>
          I got into programming because I wanted to build things — not to become a developer, just
          to make stuff that worked. That curiosity eventually turned into a real obsession with
          Flutter and mobile development. There&apos;s something satisfying about compiling to a device
          and seeing your UI respond exactly as you intended.
        </p>

        <p>
          Most of my time goes into Flutter work right now. I&apos;ve spent a lot of hours learning
          the BLoC pattern — not because a tutorial told me to, but because I kept running into
          problems with setState getting messy as apps grew. Clean Architecture was another one of
          those things I resisted at first and then couldn&apos;t imagine working without.
        </p>

        <p>
          On the web side, Next.js is where I spend my time. I built this portfolio specifically
          to learn the App Router properly, and it turned into something I&apos;m actually happy
          with. TypeScript caught enough real bugs during that process to convert me completely —
          I&apos;m not going back to plain JavaScript on anything serious.
        </p>

        <p>
          I&apos;ve got a background in UI/UX design too, which changes how I think about frontend work.
          Before writing a component I usually have a clear picture of what it should feel like to
          use it, not just what it should look like. That probably explains why I spend more time
          on spacing and interaction details than most people think is reasonable.
        </p>

        <p>
          Outside of code: I read a lot about how products are built and why certain design decisions
          get made. I find the reasoning behind tools like Raycast, Linear, and Vercel more interesting
          than the tools themselves. That&apos;s where a lot of the design inspiration for this site came from.
        </p>
      </div>

      {/* Currently learning callout */}
      <div className="p-4 border border-zinc-200 dark:border-zinc-800/60 rounded-xl bg-white dark:bg-zinc-900/20">
        <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
          Currently Digging Into
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js App Router',
            'React Server Components',
            'Flutter Animations',
            'System Design',
          ].map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-md border border-zinc-200 dark:border-zinc-700/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
