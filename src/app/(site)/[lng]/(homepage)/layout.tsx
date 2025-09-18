import HeaderHomepage from '@/components/header/headerHomepage/HeaderHomepage';
import dynamic from "next/dynamic";

const Partners = dynamic(() => import('@/components/partners/Partners'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/footer/Footer'), {
  ssr: false,
});

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
