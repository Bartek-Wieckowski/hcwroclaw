import '../../../app/globals.css';
import localFont from 'next/font/local';
import QueryProvider from '@/lib/queryProvider';
import LeagueTablesWrapper from '@/components/leagueTables/LeagueTablesWrapper';
import LeagueTables from '@/components/leagueTables/LeagueTables';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { locales } from '@/i18n/i18n';

const robotoThin = localFont({
  src: '../../../assets/fonts/RobotoCondensed-Thin.ttf',
  variable: '--font-roboto-thin',
  weight: '300',
});
const robotoRegular = localFont({
  src: '../../../assets/fonts/RobotoCondensed-Regular.ttf',
  variable: '--font-roboto-regular',
  weight: '400',
});
const robotoBold = localFont({
  src: '../../../assets/fonts/RobotoCondensed-Bold.ttf',
  variable: '--font-roboto-bold',
  weight: '700',
});
const outfitThin = localFont({
  src: '../../../assets/fonts/Outfit-Thin.ttf',
  variable: '--font-outfit-thin',
  weight: '300',
});
const outfitRegular = localFont({
  src: '../../../assets/fonts/Outfit-Regular.ttf',
  variable: '--font-outfit-regular',
  weight: '400',
});
const outfitBold = localFont({
  src: '../../../assets/fonts/Outfit-Bold.ttf',
  variable: '--font-outfit-bold',
  weight: '700',
});
const blackIron = localFont({
  src: '../../../assets/fonts/Blackiron.ttf',
  variable: '--font-black-iron',
});
const fontClasses = `${robotoRegular.variable} ${robotoThin.variable} ${robotoBold.variable} ${outfitRegular.variable} ${outfitThin.variable} ${outfitBold.variable} ${blackIron.variable}`;

export const metadata: Metadata = {
  title: 'Hockey Club Wrocław',
  description: 'Test desc after GH actions work',
};

export function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={fontClasses}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <LeagueTablesWrapper>
              {children}
              <LeagueTables isModal />
            </LeagueTablesWrapper>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
