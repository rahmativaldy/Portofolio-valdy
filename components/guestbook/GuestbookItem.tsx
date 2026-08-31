'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export interface GuestbookMessageItem {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  isOwner: boolean;
}

interface GuestbookItemProps {
  item: GuestbookMessageItem;
  onDeleteRequest: (id: string) => void;
}

function formatDate(isoString: string, locale: 'en' | 'id'): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function GuestbookItem({ item, onDeleteRequest }: GuestbookItemProps) {
  const { locale, t } = useLanguage();
  const formattedDate = formatDate(item.createdAt, locale);

  const initials = (item.user?.name || 'V')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="p-4 sm:p-5 rounded-md border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-3 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700/80">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {item.user?.image ? (
            <Image
              src={item.user.image}
              alt={item.user.name || 'User'}
              width={28}
              height={28}
              unoptimized
              className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-300 text-[10px] shrink-0 font-mono">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-sans block truncate">
              {item.user?.name || 'Anonymous Visitor'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <time
            dateTime={item.createdAt}
            className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500"
          >
            {formattedDate}
          </time>

          {item.isOwner && (
            <button
              type="button"
              onClick={() => onDeleteRequest(item.id)}
              className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors cursor-pointer"
              title={t.guestbook.management.deleteBtn}
              aria-label={t.guestbook.management.deleteBtn}
            >
              {t.guestbook.management.deleteBtn}
            </button>
          )}
        </div>
      </div>

      <div className="text-xs sm:text-sm font-sans text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap break-words pl-0 sm:pl-9.5">
        {item.message}
      </div>
    </article>
  );
}
