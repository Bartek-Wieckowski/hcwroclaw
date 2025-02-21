import styles from './languageSwitcher.module.css';
import Link from 'next/link';
import useClickOutside from '@/hooks/useClickOutside';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/i18n';
import { useHeader } from '@/contexts/HeaderContext';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { isScrolled, isHomePage } = useHeader();

  const getPathInNewLocale = (newLocale: string) => {
    if (pathname === '/' || pathname === '/en') {
      return newLocale === 'pl' ? '/' : '/en';
    }

    if (newLocale === 'pl') {
      return pathname.replace('/en/', '/');
    } else {
      return pathname.replace('/', '/en/');
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.languageSwitcher} ref={ref}>
      <button
        onClick={toggleDropdown}
        className={`${styles.switcherButton} ${isScrolled ? styles.scrolled : ''} ${isHomePage ? styles.homePage : ''}`}
      >
        {currentLocale.toUpperCase()}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={getPathInNewLocale(locale)}
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
