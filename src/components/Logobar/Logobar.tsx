import styles from './logobar.module.css';
import Link from 'next/link';
import logoText from '@/assets/images/text-club-name.png';
import Image from 'next/image';
import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';

type LogobarProps = {
  isScrolled: boolean;
  isHomePage?: boolean;
};

export default function Logobar({
  isScrolled,
  isHomePage = false,
}: LogobarProps) {
  return (
    <div className={styles.logoWrapper}>
      <Link href="/" className={styles.logoFlex}>
        <div className={styles.logoTextParent}>
          <Image
            src={logoText}
            alt="Hockey Club Wrocław"
            fill
            sizes="33vw"
            className={styles.logoText}
            priority
          />
        </div>
      </Link>
      <SocialMediaIcons
        isScrolled={isScrolled}
        isNavigation={true}
        isHomePage={isHomePage}
      />
    </div>
  );
}
