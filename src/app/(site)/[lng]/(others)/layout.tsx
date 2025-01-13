import Footer from '@/components/footer/Footer';
import Header from '@/components/header/headerOtherspage/Header';
import Sponsors from '@/components/sponsors/Sponsors';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import { LangTypeFromParams } from '@/types/Lang.type';

type OthersLayoutProps = {
  children: React.ReactNode;
} & LangTypeFromParams;

export default function OtherspageLayout({
  children,
  params,
}: OthersLayoutProps) {
  return (
    <>
      <GameCalendar withMargin={false} lng={params.lng} />
      <Header />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </>
  );
}
