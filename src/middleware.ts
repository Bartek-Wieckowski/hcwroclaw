import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Sprawdź czy ścieżka zaczyna się od obsługiwanej lokalizacji
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Przekieruj na domyślny język jeśli nie ma lokalizacji w URL
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Dopasuj wszystkie ścieżki oprócz:
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
