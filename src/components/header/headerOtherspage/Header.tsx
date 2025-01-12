import styles from './header.module.css';
import Logobar from '@/components/logobar/Logobar';
import Navbar from '@/components/navbar/Navbar';

export default function Header() {
  return (
    <header className={styles.header}>
      <Logobar isScrolled={false} />
      <Navbar isScrolled={false} isHomePage={false} />
    </header>
  );
}
