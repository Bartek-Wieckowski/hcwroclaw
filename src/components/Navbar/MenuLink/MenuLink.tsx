'use client';

import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';
import { NavLinkType } from '@/types/Link.type';

export default function MenuLink({ navLink }: NavLinkType) {
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
