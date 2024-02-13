import Link from 'next/link';
import styles from './menuLink.module.css';

type navLink = {
  navLink: {
    title: string;
    path: string;
  };
};

function MenuLink({ navLink }: navLink) {
  return (
    <li className={styles.menuItem}>
      <Link href={navLink.path}>{navLink.title}</Link>
    </li>
  );
}

export default MenuLink;
