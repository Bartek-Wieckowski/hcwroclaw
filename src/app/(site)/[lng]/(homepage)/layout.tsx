import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';
import Footer from '@/components/footer/Footer';
import Sponsors from '@/components/sponsors/Sponsors';

type HomepageLayoutProps = {
  children: React.ReactNode;
};

export default function HomepageLayout({ children }: HomepageLayoutProps) {
  return (
    <>
      <HeaderHomepage />
      <main>{children}</main>
      <Sponsors />
      <Footer />
    </>
  );
}
