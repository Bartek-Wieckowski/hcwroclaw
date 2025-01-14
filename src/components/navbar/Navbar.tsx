import styles from './navbar.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import NavigationSocialMediaIcons from '../socialMediaIcons/NavigationSocialMediaIcons';
import MenuLink from './menuLink/MenuLink';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { GiPodium } from 'react-icons/gi';
import { useRoutesLinks } from '@/hooks/useRoutesLinks';
import { useHeader } from '@/contexts/HeaderContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = useRoutesLinks();
  const { isScrolled, isHomePage } = useHeader();

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
          {links.map((navLink) => (
            <MenuLink navLink={navLink} key={navLink.title} />
          ))}
          <NavigationSocialMediaIcons isInMobileMenu={isOpen} />
        </ul>
        <LanguageSwitcher />
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
