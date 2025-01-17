import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';
import { NavLinkType } from '@/types/Link.type';

export default function MenuLink({ navLink }: NavLinkType) {
  const pathName = usePathname();

  const isActive =
    pathName === navLink.path || pathName.startsWith(navLink.path);

  return (
    <li className={styles.menuItem}>
      <Link href={navLink.path} className={`${isActive ? styles.active : ''}`}>
        {navLink.title}
      </Link>
    </li>
  );
}
