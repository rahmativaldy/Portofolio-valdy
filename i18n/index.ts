import { en } from './en';
import { id } from './id';
import { Locale, TranslationDictionary } from './types';

export * from './types';

export const translations: Record<Locale, TranslationDictionary> = {
  en,
  id,
};

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'rahmat-workspace-locale';

export function getTranslations(locale: Locale): TranslationDictionary {
  return translations[locale] || translations[DEFAULT_LOCALE];
}
