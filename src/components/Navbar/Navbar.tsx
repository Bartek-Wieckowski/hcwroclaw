'use client';

import MenuLink from './MenuLink/MenuLink';
import styles from './navbar.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import { useState } from 'react';
import { navbarLinks } from './navbar-data';
import { BiMenuAltRight, BiX } from 'react-icons/bi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>(closeMenu);

  return (
    <nav className={styles.navbar}>
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
          <SocialMediaIcons />
        </ul>
        <BiMenuAltRight
          role="button"
          tabIndex={0}
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <small className={styles.trainingInfo}>
          Treningi: wtorek i czwartek 23:00 <br /> Lodowisko Wrocław
        </small>
      </div>
    </nav>
  );
}

export default Navbar;
