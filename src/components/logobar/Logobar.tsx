import styles from './logobar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logoText from '@/assets/images/text-club-name.png';
import NavigationSocialMediaIcons from '../socialMediaIcons/NavigationSocialMediaIcons';
import { ROUTES } from '@/lib/routes';
import { useLocale } from 'next-intl';

export default function Logobar() {
  const locale = useLocale();
  return (
    <div className={styles.logoWrapper}>
      <Link href={ROUTES.HOME(locale)} className={styles.logoFlex}>
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
      <NavigationSocialMediaIcons />
    </div>
  );
}
