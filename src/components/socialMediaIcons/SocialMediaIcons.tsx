import styles from './socialMediaIcons.module.css';
import Link from 'next/link';
import { BiLogoFacebook, BiLogoInstagramAlt } from 'react-icons/bi';

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
  return (
    <ul
      className={`${styles.socialMediaWrapper} ${
        isNavigation ? styles.navigation : ''
      } ${isScrolled ? styles.scrolled : ''} ${
        isInMobileMenu ? styles.inMobileMenu : ''
      } ${isHomePage ? styles.homePage : ''} ${className}`}
    >
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.facebook.com/people/HC-Wroc%C5%82aw/100092880184129/?locale=pl_PL"
          target="_blank"
          className={styles.socialMediaLink}
        >
          <BiLogoFacebook className={styles.socialMediaIcon} />
        </Link>
      </li>
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.instagram.com/hc_wroclaw/"
          target="_blank"
          className={styles.socialMediaLink}
        >
          <BiLogoInstagramAlt className={styles.socialMediaIcon} />
        </Link>
      </li>
    </ul>
  );
}
