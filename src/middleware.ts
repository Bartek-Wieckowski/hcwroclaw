import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
