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
    <div className="flex flex-col items-center text-center px-4 py-2 select-none">
      {/* Avatar Container (Responsive circular portrait) */}
      <div className="relative shrink-0 mb-2 group">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 aspect-square rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-xs mx-auto transition-transform duration-200 ease-out group-hover:scale-[1.02]">
          {avatarSrc && !imageError ? (
            <Image
              src={avatarSrc}
              alt="Rahmat Ivaldy Profile Photo"
              fill
              sizes="(max-width: 768px) 144px, 160px"
              className="object-cover object-[50%_35%] transition-transform duration-200"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            /* Minimalist Neutral Fallback Avatar (RI) */
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono text-2xl font-bold tracking-wider">
              RI
            </div>
          )}
        </div>
      </div>

      {/* Expanded Profile Info - hidden when collapsed */}
      {!isCollapsed && (
        <div className="space-y-1 w-full flex flex-col items-center">
          {/* Name */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">
              Rahmat Ivaldy
            </h2>
          </div>

          {/* Role */}
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono leading-normal max-w-[260px] text-center">
              Frontend Developer · Mobile Developer · UI/UX Designer
            </p>
          </div>

          {/* Status */}
          <div className="pt-0.5">
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
