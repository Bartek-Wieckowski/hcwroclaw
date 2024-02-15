import Link from 'next/link';
import styles from './footerLink.module.css';
import { FooterLinkType } from '@/types/Link.type';

function FooterLink({ footerLink }: FooterLinkType) {
  return (
    <li className={styles.footerItem}>
      <Link href={footerLink.path}>{footerLink.title}</Link>
    </li>
  );
}

export default FooterLink;
