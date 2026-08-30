'use client';

import React, { createContext, useContext, useCallback, useMemo, useSyncExternalStore, ReactNode } from 'react';
import { Locale, TranslationDictionary, DEFAULT_LOCALE, LOCALE_STORAGE_KEY, translations } from '@/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('locale-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('locale-change', callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved === 'en' || saved === 'id') {
      return saved;
    }
  } catch {
    // Ignore
  }
  return DEFAULT_LOCALE;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      window.dispatchEvent(new Event('locale-change'));
    } catch {
      // Ignore
    }
  }, []);

  const t = useMemo(() => translations[locale] || translations[DEFAULT_LOCALE], [locale]);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

