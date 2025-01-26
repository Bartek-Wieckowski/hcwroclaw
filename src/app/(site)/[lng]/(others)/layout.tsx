import Footer from '@/components/footer/Footer';
import HeaderOtherspage from '@/components/header/headerOtherspage/HeaderOtherspage';
import Partners from '@/components/partners/Partners';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import LeagueTables from '@/components/leagueTables/LeagueTables';
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
      <main className="main">
        <section className="pageContent">{children}</section>
        <aside className="asideLeageTables">
          <LeagueTables />
        </aside>
      </main>
      <Partners />
      <Footer />
    </>
  );
}
