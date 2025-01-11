import RootLayout from '@/layouts/RootLayout';
import GameCalendar from '@/components/gameCalendar/GameCalendar';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/headerOtherspage/Header';
import Sponsors from '@/components/sponsors/Sponsors';

export default function OthersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <GameCalendar />
      <Header />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </RootLayout>
  );
}
