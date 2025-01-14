import Footer from '@/components/footer/Footer';
import Header from '@/components/header/headerOtherspage/Header';
import Sponsors from '@/components/sponsors/Sponsors';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';

type OthersLayoutProps = {
  children: React.ReactNode;
};

export default async function OtherspageLayout({ children }: OthersLayoutProps) {
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <GameCalendar withMargin={false} lng={locale} />
      <Header />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </>
  );
}
