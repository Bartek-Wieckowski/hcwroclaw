import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n/i18n';
import { pathnames } from './lib/pathnames';

export default createMiddleware({
  locales,
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames,
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|studio|favicon.*|icon.*|apple-icon.*|sitemap\\.xml|robots\\.txt|opengraph-image).*)',
  ],
};
