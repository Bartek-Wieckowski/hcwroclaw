'use client';

import styles from './headerHomepage.module.css';
import Logobar from '@/components/logobar/Logobar';
import Navbar from '@/components/navbar/Navbar';
import { useEffect, useState } from 'react';

export default function HeaderHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Logobar isScrolled={isScrolled} isHomePage={true} />
      <Navbar isScrolled={isScrolled} isHomePage={true} />
    </header>
  );
}
