import styles from './languageSwitcher.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const currentLocale = currentPath.split('/')[1];

  const pathWithoutLocale = currentPath.split('/').slice(2).join('/');

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={toggleDropdown} className={styles.switcherButton}>
        {currentLocale.toUpperCase()}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {i18n.locales.map((locale) => (
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
