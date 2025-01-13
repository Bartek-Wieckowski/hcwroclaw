import styles from './notFound.module.css';
import Link from 'next/link';
import { i18n } from '@/i18n/config';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Available languages:</p>
      <div className={styles.languages}>
        {i18n.locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className={styles.languageLink}
          >
            {locale.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
