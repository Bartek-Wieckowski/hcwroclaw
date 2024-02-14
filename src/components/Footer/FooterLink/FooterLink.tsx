import Link from 'next/link';
import styles from './footerLink.module.css';

type footerLink = {
  footerLink: {
    title: string;
    path: string;
  };
};

function FooterLink({ footerLink }: footerLink) {
  return (
    <li className={styles.footerItem}>
      <Link href={footerLink.path}>{footerLink.title}</Link>
    </li>
  );
}

export default FooterLink;
