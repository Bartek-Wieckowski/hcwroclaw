import Image from 'next/image';
import Link from 'next/link';
// import logo from '@/assets/images/logo.jpg';
import logo from '@/assets/images/logo-no-bg.png';
import logoText from '@/assets/images/text-club-name.png';
import styles from './logobar.module.css';

function Logobar() {
  return (
    <div className={styles.logoWrapper}>
      <Link href="/" className={styles.logoFlex}>
        <Image
          src={logo}
          alt="Hockey Club Wrocław"
          width="100"
          height="80"
          className={styles.logo}
        />
        <Image
          src={logoText}
          alt="Hockey Club Wrocław"
          width="400"
          height="40"
          className={styles.logoText}
        />
      </Link>
    </div>
  );
}

export default Logobar;
