import styles from './notFound.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n/i18n';

export default function NotFound() {
  const t = useTranslations('pageNotfound');

  return (
    <div className={styles.notFound}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>{t('availableLanguages')}</p>
      <div className={styles.languages}>
        {locales.map((locale) => (
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
