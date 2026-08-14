'use client';

import React from 'react';
import Image from 'next/image';

interface ProfileIdentityProps {
  avatarSrc?: string;
  isCollapsed?: boolean;
}

export function ProfileIdentity({
  avatarSrc = '/rahmat-profile.jpg',
  isCollapsed = false,
}: ProfileIdentityProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex flex-col items-center text-center px-4 pt-2 pb-1 select-none">
      {/* Avatar Container (approx 125px centered circular portrait) */}
      <div className="relative shrink-0 mb-3 group">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 bg-white shadow-sm mx-auto transition-transform duration-200 ease-out group-hover:scale-[1.025]">
          {avatarSrc && !imageError ? (
            <Image
              src={avatarSrc}
              alt="Rahmat Ivaldy Profile Photo"
              fill
              sizes="128px"
              className="object-cover scale-[0.82] translate-y-[8%] transition-transform duration-200"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            /* Minimalist Neutral Fallback Avatar (RI) */
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono text-xl font-bold tracking-wider">
              RI
            </div>
          )}
        </div>
      </div>

      {/* Expanded Profile Info - hidden when collapsed */}
      {!isCollapsed && (
        <div className="space-y-1.5 w-full flex flex-col items-center">
          {/* Name (30px–34px bold/semibold) */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
              Rahmat Ivaldy
            </h2>
          </div>

          {/* Role */}
          <div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed max-w-[260px] text-center">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>

          {/* Status */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to opportunities</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
