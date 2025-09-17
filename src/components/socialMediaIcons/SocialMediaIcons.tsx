import styles from "./socialMediaIcons.module.css";
import Link from "next/link";
import { BiLogoFacebook, BiLogoInstagramAlt } from "react-icons/bi";
import { useTranslations } from "next-intl";

type SocialMediaIconsProps = {
  isNavigation?: boolean;
  isInMobileMenu?: boolean;
  isScrolled?: boolean;
  isHomePage?: boolean;
  className?: string;
};

export default function SocialMediaIcons({
  isNavigation = false,
  isInMobileMenu = false,
  isScrolled = false,
  isHomePage = false,
  className,
}: SocialMediaIconsProps) {
  const t = useTranslations("socialMedia");

  return (
    <ul
      className={`${styles.socialMediaWrapper} ${
        isNavigation ? styles.navigation : ""
      } ${isScrolled ? styles.scrolled : ""} ${
        isInMobileMenu ? styles.inMobileMenu : ""
      } ${isHomePage ? styles.homePage : ""} ${className}`}
    >
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.facebook.com/people/HC-Wroc%C5%82aw/100092880184129/?locale=pl_PL"
          target="_blank"
          className={styles.socialMediaLink}
          aria-label={t("facebookLabel")}
        >
          <BiLogoFacebook
            className={styles.socialMediaIcon}
            aria-hidden="true"
          />
        </Link>
      </li>
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.instagram.com/hc_wroclaw/"
          target="_blank"
          className={styles.socialMediaLink}
          aria-label={t("instagramLabel")}
        >
          <BiLogoInstagramAlt
            className={styles.socialMediaIcon}
            aria-hidden="true"
          />
        </Link>
      </li>
    </ul>
  );
}
