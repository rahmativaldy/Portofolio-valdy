'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { GuestbookAuth } from '@/components/guestbook/GuestbookAuth';
import { GuestbookForm, FormMessageData } from '@/components/guestbook/GuestbookForm';
import { GuestbookList } from '@/components/guestbook/GuestbookList';
import { GuestbookMessageItem } from '@/components/guestbook/GuestbookItem';
import { DeleteConfirmModal } from '@/components/guestbook/DeleteConfirmModal';

interface UserSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
}

export function Guestbook() {
  const { setActiveSection } = useWorkspace();
  const { t } = useLanguage();

  const [sessionUser, setSessionUser] = useState<UserSession | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [messages, setMessages] = useState<GuestbookMessageItem[]>([]);
  const [total, setTotal] = useState(0);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/guestbook?limit=20');
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.guestbook.list.errorTitle);
        return;
      }

      setMessages(data.messages || []);
      setTotal(data.total || (data.messages ? data.messages.length : 0));
      setHasMore(Boolean(data.hasMore));
      setNextCursor(data.nextCursor || null);
    } catch {
      setError(t.guestbook.list.errorTitle);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let ignore = false;

    async function initialize() {
      try {
        const [sessionRes, messagesRes] = await Promise.all([
          fetch('/api/auth/session').catch(() => null),
          fetch('/api/guestbook?limit=20').catch(() => null),
        ]);

        if (!ignore && sessionRes && sessionRes.ok) {
          const sessionData = await sessionRes.json();
          setSessionUser(sessionData?.user || null);
        }

        if (!ignore && messagesRes && messagesRes.ok) {
          const data = await messagesRes.json();
          setMessages(data.messages || []);
          setTotal(data.total || (data.messages ? data.messages.length : 0));
          setHasMore(Boolean(data.hasMore));
          setNextCursor(data.nextCursor || null);
        } else if (!ignore && messagesRes && !messagesRes.ok) {
          const data = await messagesRes.json().catch(() => ({}));
          setError(data.error || t.guestbook.list.errorTitle);
        }
      } catch {
        if (!ignore) {
          setError(t.guestbook.list.errorTitle);
        }
      } finally {
        if (!ignore) {
          setIsAuthLoading(false);
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      ignore = true;
    };
  }, [t]);

  useEffect(() => {
    // Poll for live updates every 4 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 4000);

    const onFocus = () => {
      fetchMessages();
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [fetchMessages]);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const res = await fetch(`/api/guestbook?limit=20&cursor=${encodeURIComponent(nextCursor)}`);
      const data = await res.json();

      if (res.ok && data.messages) {
        setMessages((prev) => [...prev, ...data.messages]);
        setHasMore(Boolean(data.hasMore));
        setNextCursor(data.nextCursor || null);
      }
    } catch (err) {
      console.error('Failed to load more messages:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleMessagePosted = (newMsg: FormMessageData) => {
    setMessages((prev) => [newMsg, ...prev]);
    setTotal((prev) => prev + 1);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId || isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/guestbook?id=${encodeURIComponent(deleteId)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteId));
        setTotal((prev) => Math.max(0, prev - 1));
        setDeleteId(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete message.');
      }
    } catch {
      alert('Failed to delete message. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplySubmit = async (messageId: string, replyText: string, pin?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/guestbook/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, reply: replyText, pin }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to submit reply.');
        return false;
      }

      if (data.reply) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, reply: data.reply } : msg
          )
        );
      }
      return true;
    } catch {
      alert('Failed to submit reply.');
      return false;
    }
  };

  const handleDeleteReply = async (messageId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/guestbook/reply?messageId=${encodeURIComponent(messageId)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, reply: null } : msg
          )
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSignIn = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/guestbook' });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/guestbook' }).then(() => {
      setSessionUser(null);
      fetchMessages();
    });
  };

  return (
    <div
      className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-zinc-900 dark:text-zinc-100 select-none space-y-12 sm:space-y-16 md:space-y-20"
      id="guestbook"
    >
      {/* 01 / HERO */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 sm:pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
              {t.guestbook.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {t.guestbook.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 font-normal">
              {t.guestbook.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/90 px-3 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>
              {total} {t.guestbook.statusCount}
            </span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
            {t.guestbook.heroHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            {t.guestbook.heroDescription}
          </p>
        </div>
      </section>

      {/* 02 / COMPOSER & AUTH */}
      <section className="space-y-4 max-w-2xl">
        <GuestbookForm
          user={sessionUser}
          onMessagePosted={handleMessagePosted}
        />

        <GuestbookAuth
          user={sessionUser}
          isLoading={isAuthLoading}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
      </section>

      {/* 03 / MESSAGES FEED */}
      <section className="max-w-2xl">
        <GuestbookList
          messages={messages}
          total={total}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onRetry={fetchMessages}
          onDeleteRequest={handleDeleteRequest}
          onReplySubmit={handleReplySubmit}
          onDeleteReply={handleDeleteReply}
        />
      </section>

      {/* 04 / SECTION FOOTER NAVIGATION */}
      <footer className="pt-8 sm:pt-12 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
        <div>{t.guestbook.footerText}</div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            ← {t.guestbook.backToOverviewCta}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('blog')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            {t.guestbook.readNotesCta} →
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('contact')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            {t.guestbook.getInTouchCta} →
          </button>
        </div>
      </footer>

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteId)}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
