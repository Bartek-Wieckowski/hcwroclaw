import styles from './navbar.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import NavigationSocialMediaIcons from '../socialMediaIcons/NavigationSocialMediaIcons';
import MenuLink from './menuLink/MenuLink';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { useEffect, useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { GiPodium } from 'react-icons/gi';
import { useRoutesLinks } from '@/hooks/useRoutesLinks';
import { useHeader } from '@/contexts/HeaderContext';
import { useLeagueTables } from '@/contexts/LeagueTablesContext';
import TransferTaxBtn from '../transferTaxBtn/TransferTaxBtn';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = useRoutesLinks();
  const { isScrolled, isHomePage } = useHeader();
  const { toggleModal } = useLeagueTables();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>(closeMenu);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

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
            <MenuLink
              navLink={navLink}
              key={navLink.title}
              onNavigate={closeMenu}
            />
          ))}
          <NavigationSocialMediaIcons isInMobileMenu={isOpen} />
        </ul>
        <div className={styles.navbarUserActions}>
          <TransferTaxBtn />
          <LanguageSwitcher />
        </div>
        <div
          className={styles.tableGamesIcon}
          onClick={toggleModal}
          role="button"
          tabIndex={0}
        >
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
