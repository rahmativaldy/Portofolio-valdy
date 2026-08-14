'use client';

import React from 'react';
import Image from 'next/image';

interface ProfileIdentityProps {
  avatarSrc?: string;
  isCollapsed?: boolean;
}

export function ProfileIdentity({ avatarSrc, isCollapsed = false }: ProfileIdentityProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex flex-col items-center text-center px-4 pt-3 pb-1 select-none">
      {/* Avatar Container (68px centered) */}
      <div className="relative shrink-0 animate-sidebar-avatar opacity-0 mb-2.5">
        <div className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.03] group mx-auto">
          {avatarSrc && !imageError ? (
            <Image
              src={avatarSrc}
              alt="Rahmat Ivaldy"
              fill
              sizes="68px"
              className="object-cover object-center"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            /* Minimalist Neutral Fallback Avatar (RI) */
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono text-xl font-bold tracking-tight">
              RI
            </div>
          )}
        </div>
      </div>

      {/* Expanded Profile Info - hidden when collapsed */}
      {!isCollapsed && (
        <div className="space-y-1 w-full flex flex-col items-center">
          {/* Name */}
          <div className="animate-sidebar-name opacity-0">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white transition-colors duration-200 hover:text-zinc-800 dark:hover:text-zinc-200">
              Rahmat Ivaldy
            </h2>
          </div>

          {/* Role */}
          <div className="animate-sidebar-role opacity-0">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-snug max-w-[190px] text-center">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>

          {/* Status */}
          <div className="animate-sidebar-status opacity-0 pt-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span className="relative flex h-1.5 w-1.5 items-center justify-center" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Open to opportunities</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
