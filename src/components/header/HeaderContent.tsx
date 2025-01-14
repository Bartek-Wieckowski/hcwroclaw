'use client';

import homepageStyles from './headerHomepage/headerHomepage.module.css';
import othersStyles from './headerOtherspage/headerOtherspage.module.css';
import Logobar from '@/components/logobar/Logobar';
import Navbar from '@/components/navbar/Navbar';
import { useHeader } from '@/contexts/HeaderContext';

type HeaderContentProps = {
  variant: 'homepage' | 'others';
};

export default function HeaderContent({ variant }: HeaderContentProps) {
  const { isScrolled } = useHeader();
  const headerStyles = variant === 'homepage' ? homepageStyles : othersStyles;

  return (
    <header
      className={`${headerStyles.header} ${
        variant === 'homepage' && isScrolled ? homepageStyles.scrolled : ''
      }`}
    >
      <Logobar />
      <Navbar />
    </header>
  );
}
