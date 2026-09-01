'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GuestbookItem, GuestbookMessageItem } from './GuestbookItem';

interface GuestbookListProps {
  messages: GuestbookMessageItem[];
  total: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
  onDeleteRequest: (id: string) => void;
  onReplySubmit?: (messageId: string, replyText: string, pin?: string) => Promise<boolean>;
  onDeleteReply?: (messageId: string) => Promise<boolean>;
}

export function GuestbookList({
  messages,
  total,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onLoadMore,
  onRetry,
  onDeleteRequest,
  onReplySubmit,
  onDeleteReply,
}: GuestbookListProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Subheader */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
          {t.guestbook.list.title}
        </h2>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800">
          {total} {t.guestbook.list.count}
        </span>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-4 sm:p-5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-[#121215]/60 animate-pulse space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
                <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="p-6 sm:p-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] text-center space-y-3">
          <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
              {t.guestbook.list.errorTitle}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">{error}</p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1.5 text-xs font-sans font-medium rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {t.guestbook.list.retry}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && messages.length === 0 && (
        <div className="p-8 sm:p-12 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-[#121215]/40 text-center space-y-2">
          <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500 flex items-center justify-center mx-auto">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
            {t.guestbook.list.emptyTitle}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
            {t.guestbook.list.emptySubtitle}
          </p>
        </div>
      )}

      {/* Messages Feed */}
      {!isLoading && !error && messages.length > 0 && (
        <div className="space-y-3.5">
          {messages.map((item) => (
            <GuestbookItem
              key={item.id}
              item={item}
              onDeleteRequest={onDeleteRequest}
              onReplySubmit={onReplySubmit}
              onDeleteReply={onDeleteReply}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && !error && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            disabled={isLoadingMore}
            onClick={onLoadMore}
            className="px-4 py-2 text-xs font-sans font-medium rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
          >
            {isLoadingMore && (
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            <span>
              {isLoadingMore
                ? t.guestbook.list.loadingMore
                : t.guestbook.list.loadMore}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
