import HeaderOtherspage from '@/components/header/headerOtherspage/HeaderOtherspage';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';
import dynamic from "next/dynamic";

const LeagueTables = dynamic(() => import('@/components/leagueTables/LeagueTables'), {
  ssr: false,
});
const Partners = dynamic(() => import('@/components/partners/Partners'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/footer/Footer'), {
  ssr: false,
});

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
