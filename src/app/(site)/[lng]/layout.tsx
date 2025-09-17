import '../../../app/globals.css';
import localFont from 'next/font/local';
import QueryProvider from '@/lib/queryProvider';
import LeagueTablesWrapper from '@/components/leagueTables/LeagueTablesWrapper';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { locales } from '@/i18n/i18n';
import dynamic from "next/dynamic";

const LeagueTables = dynamic(() => import('@/components/leagueTables/LeagueTables'), {
  ssr: false,
});
const CookieBarInfo = dynamic(() => import("@/components/cookieBarInfo/CookieBarInfo"), {
  ssr: false,
});
const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});

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
const misterPablo = localFont({
  src: '../../../assets/fonts/mister-pablo.ttf',
  variable: '--font-mister-pablo',
});
const russoOne = localFont({
  src: '../../../assets/fonts/RussoOne-Regular.ttf',
  variable: '--font-russo-one',
  weight: '400',
});
const fontClasses = `${robotoRegular.variable} ${robotoThin.variable} ${robotoBold.variable} ${outfitRegular.variable} ${outfitThin.variable} ${outfitBold.variable} ${misterPablo.variable} ${russoOne.variable}`;


export async function generateMetadata(){
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return {
    title: 'HC Wrocław - Drużyna hokejowa',
    description: 'Oficjalna strona drużyny hokejowej HC Wrocław. Najnowsze informacje, mecze, treningi i aktualności.',
    metadataBase: new URL(siteUrl),
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      siteName: 'HC Wrocław',
      images: [`${siteUrl}/opengraph-image.png`], 
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${siteUrl}/opengraph-image.png`], 
    },
  }
}

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
            <CookieBarInfo />
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
