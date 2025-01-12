import RootLayout from '@/layouts/RootLayout';
import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';
import Footer from '@/components/Footer/Footer';
import Sponsors from '@/components/sponsors/Sponsors';

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <HeaderHomepage />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </RootLayout>
  );
}
