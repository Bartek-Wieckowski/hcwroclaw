'use client';

import styles from './languageSwitcher.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/i18n';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const currentLocale = useLocale();

  const pathWithoutLocale = currentPath.split('/').slice(2).join('/');

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleDropdown} className={styles.switcherButton}>
        {currentLocale.toUpperCase()}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}/${pathWithoutLocale}`}
              className={`${styles.option} ${
                locale === currentLocale ? styles.active : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
