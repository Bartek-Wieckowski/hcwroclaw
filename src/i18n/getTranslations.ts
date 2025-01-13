import { Locale } from './config';
import pl from './locales/pl.json';
import en from './locales/en.json';

const translations = {
  pl,
  en,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.pl;
}

export function getLocaleValue(
  field: { pl?: string; en?: string } | undefined,
  locale: Locale
): string {
  if (!field) return '';
  return field[locale] || field.pl || '';
}
