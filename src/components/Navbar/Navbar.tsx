'use client';
import MenuLink from './MenuLink/MenuLink';
import styles from './navbar.module.css';
import { navbarLinks } from './navbar-data';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>(closeMenu);

  return (
    <nav className={styles.navbar}>
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
      </ul>
      <BiMenuAltRight
        role="button"
        tabIndex={0}
        className={styles.hamburger}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </nav>
  );
}

export default Navbar;
