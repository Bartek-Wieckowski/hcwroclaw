'use client';
import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

type navLink = {
  navLink: {
    title: string;
    path: string;
  };
};

function MenuLink({ navLink }: navLink) {
  const pathName = usePathname();
  return (
    <li className={styles.menuItem}>
      <Link
        href={navLink.path}
        className={`${pathName === navLink.path && styles.active}`}
      >
        {navLink.title}
      </Link>
    </li>
  );
}

export default MenuLink;
