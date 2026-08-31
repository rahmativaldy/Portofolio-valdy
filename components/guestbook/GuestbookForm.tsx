'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface FormMessageData {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  isOwner: boolean;
}

interface GuestbookFormProps {
  onMessagePosted: (message: FormMessageData) => void;
}

export function GuestbookForm({ onMessagePosted }: GuestbookFormProps) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const charCount = message.length;
  const isOverLimit = charCount > 500;
  const isValidLength = message.trim().length >= 3 && !isOverLimit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = message.trim();
    if (!trimmed) {
      setError(t.guestbook.form.errors.empty);
      return;
    }

    if (trimmed.length < 3) {
      setError(t.guestbook.form.errors.tooShort);
      return;
    }

    if (trimmed.length > 500) {
      setError(t.guestbook.form.errors.tooLong);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.guestbook.form.errors.generic);
        setIsSubmitting(false);
        return;
      }

      if (data.message) {
        onMessagePosted(data.message);
      }

      setMessage('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch {
      setError(t.guestbook.form.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] space-y-4 shadow-xs"
    >
      <div className="relative">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          placeholder={t.guestbook.form.placeholder}
          maxLength={520}
          disabled={isSubmitting}
          className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 text-xs sm:text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors resize-none disabled:opacity-50"
        />

        <div className="flex items-center justify-between mt-2 text-[11px] font-mono">
          <div className="text-red-500 dark:text-red-400">
            {error && <span>{error}</span>}
            {showSuccess && !error && (
              <span className="text-emerald-600 dark:text-emerald-400 font-sans font-medium animate-fadeIn">
                {t.guestbook.form.successToast}
              </span>
            )}
          </div>

          <span
            className={`transition-colors shrink-0 ml-2 ${
              isOverLimit
                ? 'text-red-500 font-bold'
                : 'text-zinc-400 dark:text-zinc-500'
            }`}
          >
            {charCount} / 500
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !isValidLength}
          className="px-4 py-2 text-xs font-sans font-medium rounded bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
        >
          {isSubmitting && (
            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          <span>
            {isSubmitting
              ? t.guestbook.form.submittingBtn
              : t.guestbook.form.submitBtn}
          </span>
        </button>
      </div>
    </form>
  );
}
