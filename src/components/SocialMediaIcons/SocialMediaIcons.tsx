import styles from './socialMediaIcons.module.css';
import Link from 'next/link';
import { BiLogoFacebook, BiLogoInstagramAlt } from 'react-icons/bi';

function SocialMediaIcons() {
  return (
    <ul className={styles.socialMediaWrapper}>
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.facebook.com/people/HC-Wroc%C5%82aw/100092880184129/?locale=pl_PL"
          target="_blank"
          className={styles.socialMediaLink}
        >
          <BiLogoFacebook />
        </Link>
      </li>
      <li className={styles.socialMediaItem}>
        <Link
          href="https://www.instagram.com/hc_wroclaw/"
          target="_blank"
          className={styles.socialMediaLink}
        >
          <BiLogoInstagramAlt />
        </Link>
      </li>
    </ul>
  );
}

export default SocialMediaIcons;
