import Logobar from '../Logobar/Logobar';
import Navbar from '../Navbar/Navbar';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
        <Logobar />
        <Navbar />
    </header>
  );
}
