'use client';

import { SKILLS } from '@/data/skills';
import { Badge } from '@/components/ui/Badge';

export function Skills() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn" id="skills">
      {/* Section Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Skills</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Technologies & Tools
        </h2>
        <p className="text-zinc-650 dark:text-zinc-400 text-sm mt-2 max-w-lg">
          Grouped by domain. Only includes tools and frameworks I have hands-on experience with.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILLS.map((skillGroup) => (
          <div key={skillGroup.category} className="space-y-3 p-5 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl transition-colors duration-150">
            {/* Category Label */}
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide flex items-center gap-2">
              <span className="text-blue-500">→</span>
              {skillGroup.category}
            </h3>
            
            {/* Skill Badges */}
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
