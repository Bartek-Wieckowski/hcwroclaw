import RootLayout from '@/layouts/RootLayout';
import Footer from '@/components/footer/Footer';
import Sponsors from '@/components/sponsors/Sponsors';
import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';

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
