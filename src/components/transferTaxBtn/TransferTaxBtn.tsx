'use client';

import Link from 'next/link';
import styles from './transferTaxBtn.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/routes';

export default function TransferTaxBtn() {
  const t = useTranslations('transferTax');
  const locale = useLocale();

  return (
    <Link href={ROUTES.INFO(locale)} className={styles.transferTaxBtn}>
      <span className={styles.buttonText}>{t('button')}</span>
      <span className={styles.percentage}>
        <span className={styles.percentageText}>{t('percentage')}</span>
      </span>
    </Link>
  );
}
