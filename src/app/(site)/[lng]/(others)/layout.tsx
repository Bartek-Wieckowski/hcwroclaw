import Footer from '@/components/footer/Footer';
import HeaderOtherspage from '@/components/header/headerOtherspage/HeaderOtherspage';
import Sponsors from '@/components/sponsors/Sponsors';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';

type OthersLayoutProps = {
  children: React.ReactNode;
};

export default async function OtherspageLayout({
  children,
}: OthersLayoutProps) {
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <GameCalendar key={'otherspage'} withMargin={false} lng={locale} />
      <HeaderOtherspage />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </>
  );
}
