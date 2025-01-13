'use client';

import { Locale } from '@/i18n/config';
import { createContext, useContext } from 'react';

const LanguageContext = createContext<Locale>('pl');

export function LanguageProvider({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: Locale;
}) {
  return (
    <LanguageContext.Provider value={lng}>{children}</LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider'
    );
  }

  return context;
}
