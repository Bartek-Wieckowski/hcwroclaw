import RootLayout from '@/layouts/RootLayout';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/headerOtherspage/Header';
import Sponsors from '@/components/sponsors/Sponsors';
import GameCalendar from '@/components/gameCalendar/GameCalendar';

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
