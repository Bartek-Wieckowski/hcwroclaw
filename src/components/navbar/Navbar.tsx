import styles from "./navbar.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import NavigationSocialMediaIcons from "../socialMediaIcons/NavigationSocialMediaIcons";
import MenuLink from "./menuLink/MenuLink";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useEffect, useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { GiPodium } from "react-icons/gi";
import { useRoutesLinks } from "@/hooks/useRoutesLinks";
import { useHeader } from "@/contexts/HeaderContext";
import { useLeagueTables } from "@/contexts/LeagueTablesContext";
import { useTranslations } from "next-intl";

import dynamic from "next/dynamic";

const TransferTaxBtn = dynamic(() => import("../transferTaxBtn/TransferTaxBtn"), {
  ssr: false,
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = useRoutesLinks();
  const { isScrolled, isHomePage } = useHeader();
  const { toggleModal } = useLeagueTables();
  const t = useTranslations("accessibility");

  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLDivElement>(closeMenu);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${isHomePage ? styles.homePage : ""}`}
    >
      <div className={styles.navbarWrapper}>
        <div
          ref={ref}
          className={`${styles.navbarList} ${isOpen ? styles.active : ""}`}
        >
          <BiX
            role="button"
            tabIndex={0}
            className={styles.hamburgerClose}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={t("closeMenu")}
          />
          <ul className={styles.navbarListItems}>
            {links.map((navLink) => (
              <MenuLink
                navLink={navLink}
                key={navLink.title}
                onNavigate={closeMenu}
              />
            ))}
          </ul>
          <div className={styles.navbarSocialMediaWrapper}>
            <NavigationSocialMediaIcons isInMobileMenu={isOpen} />
          </div>
        </div>
        <div className={styles.navbarUserActions}>
          <TransferTaxBtn />
          <LanguageSwitcher />
        </div>
        <div
          className={styles.tableGamesIcon}
          onClick={toggleModal}
          role="button"
          tabIndex={0}
          aria-label={t("leagueTables")}
        >
          <GiPodium aria-hidden="true" />
        </div>
        <BiMenuAltRight
          role="button"
          tabIndex={0}
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t("openMenu")}
        />
      </div>
    </nav>
  );
}
