import RootLayout from '@/layouts/RootLayout';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/header/headerOtherspage/Header';
import Sponsors from '@/components/sponsors/Sponsors';

export default function OtherspageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <GameCalendar withMargin={false} />
      <Header />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </RootLayout>
  );
}
