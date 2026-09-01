'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export interface GuestbookReply {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface GuestbookMessageItem {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  isOwner: boolean;
  reply?: GuestbookReply | null;
}

interface GuestbookItemProps {
  item: GuestbookMessageItem;
  onDeleteRequest: (id: string) => void;
  onReplySubmit?: (messageId: string, replyText: string, pin?: string) => Promise<boolean>;
  onDeleteReply?: (messageId: string) => Promise<boolean>;
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

export function GuestbookItem({
  item,
  onDeleteRequest,
  onReplySubmit,
  onDeleteReply,
}: GuestbookItemProps) {
  const { locale, t } = useLanguage();
  const formattedDate = formatDate(item.createdAt, locale);

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [pinText, setPinText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  const initials = (item.user?.name || 'V')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingReply) return;

    const trimmed = replyText.trim();
    if (!trimmed || trimmed.length < 2) {
      setReplyError(t.guestbook.reply.errors.tooShort);
      return;
    }

    setReplyError(null);
    setIsSubmittingReply(true);

    if (onReplySubmit) {
      const ok = await onReplySubmit(item.id, trimmed, pinText.trim() || undefined);
      if (ok) {
        setReplyText('');
        setPinText('');
        setIsReplying(false);
      } else {
        setReplyError(t.guestbook.reply.errors.generic);
      }
    }
    setIsSubmittingReply(false);
  };

  const handleDeleteReplyClick = async () => {
    if (!onDeleteReply) return;
    if (confirm('Hapus balasan ini?')) {
      await onDeleteReply(item.id);
    }
  };

  return (
    <article className="p-4 sm:p-5 rounded-md border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] space-y-3.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700/80">
      {/* Header */}
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

          {/* Reply Toggle Button */}
          {!item.reply && (
            <button
              type="button"
              onClick={() => setIsReplying(!isReplying)}
              className="px-2 py-0.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
            >
              {isReplying ? t.guestbook.reply.cancelBtn : t.guestbook.reply.replyBtn}
            </button>
          )}

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

      {/* Visitor Message */}
      <div className="text-xs sm:text-sm font-sans text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap break-words pl-0 sm:pl-9.5">
        {item.message}
      </div>

      {/* Existing Reply (Author Response Card) */}
      {item.reply && (
        <div className="ml-2 sm:ml-9.5 mt-2.5 p-3 sm:p-3.5 rounded-md border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900/70 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-bold text-[9px] font-mono shrink-0">
                RI
              </div>
              <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 font-sans truncate">
                {item.reply.name || t.guestbook.reply.authorName}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded shrink-0">
                {t.guestbook.reply.authorBadge}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              <time dateTime={item.reply.createdAt}>
                {formatDate(item.reply.createdAt, locale)}
              </time>
              {onDeleteReply && (
                <button
                  type="button"
                  onClick={handleDeleteReplyClick}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                  title={t.guestbook.reply.deleteReplyBtn}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="text-xs font-sans text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap break-words pl-7">
            {item.reply.message}
          </div>
        </div>
      )}

      {/* Inline Reply Form */}
      {isReplying && !item.reply && (
        <form
          onSubmit={handleSendReply}
          className="ml-0 sm:ml-9.5 mt-3 p-3 sm:p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
              Balas sebagai <strong className="text-zinc-900 dark:text-zinc-100">{t.guestbook.reply.authorName}</strong>
            </span>
          </div>

          <textarea
            rows={2}
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
              if (replyError) setReplyError(null);
            }}
            placeholder={t.guestbook.reply.placeholder}
            maxLength={500}
            disabled={isSubmittingReply}
            className="w-full bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-md p-2.5 text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors resize-none"
          />

          {replyError && (
            <p className="text-[11px] font-mono text-red-500 dark:text-red-400">
              {replyError}
            </p>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setReplyError(null);
              }}
              className="px-3 py-1.5 text-xs font-sans text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded transition-colors cursor-pointer"
            >
              {t.guestbook.reply.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={isSubmittingReply || replyText.trim().length < 2}
              className="px-3 py-1.5 text-xs font-sans font-medium rounded bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-40 cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              {isSubmittingReply ? t.guestbook.reply.submittingBtn : t.guestbook.reply.submitBtn}
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
