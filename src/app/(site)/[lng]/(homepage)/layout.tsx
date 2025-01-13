import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';
import Footer from '@/components/footer/Footer';
import Sponsors from '@/components/sponsors/Sponsors';

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderHomepage />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </>
  );
}
