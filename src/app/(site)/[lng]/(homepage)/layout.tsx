import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';
import Footer from '@/components/footer/Footer';
import Partners from '@/components/partners/Partners';

type HomepageLayoutProps = {
  children: React.ReactNode;
};

export default function HomepageLayout({ children }: HomepageLayoutProps) {
  return (
    <>
      <HeaderHomepage />
      {children}
      <Partners />
      <Footer />
    </>
  );
}
