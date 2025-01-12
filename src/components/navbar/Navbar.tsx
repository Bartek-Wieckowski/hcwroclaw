'use client';

import styles from './navbar.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import MenuLink from './menuLink/MenuLink';
import { useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { navbarLinks } from './navbar-data';
import { GiPodium } from 'react-icons/gi';

type NavbarProps = {
  isScrolled: boolean;
  isHomePage: boolean;
};

export default function Navbar({
  isScrolled = false,
  isHomePage = false,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>(closeMenu);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHomePage ? styles.homePage : ''}`}
    >
      <div className={styles.navbarWrapper}>
        <ul
          ref={ref}
          className={`${styles.navbarList} ${isOpen ? styles.active : ''}`}
        >
          <BiX
            role="button"
            tabIndex={0}
            className={styles.hamburgerClose}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {navbarLinks.map((navLink) => (
            <MenuLink navLink={navLink} key={navLink.title} />
          ))}
          <SocialMediaIcons
            isScrolled={isScrolled}
            isNavigation={true}
            isInMobileMenu={isOpen}
            isHomePage={isHomePage}
          />
        </ul>
        <div className={styles.tableGamesIcon}>
          <GiPodium />
        </div>
        <BiMenuAltRight
          role="button"
          tabIndex={0}
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </nav>
  );
}
