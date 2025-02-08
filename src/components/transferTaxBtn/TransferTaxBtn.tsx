'use client';

import styles from './transferTaxBtn.module.css';
import Image from 'next/image';
import Spinner from '../spinner/Spinner';
import useClickOutside from '@/hooks/useClickOutside';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/routes';
import { useTaxTransferModal } from '@/hooks/tanstack/queries/useTaxTransferModal';
import { urlFor } from '@/sanity/lib/image';

export default function TransferTaxBtn() {
  const t = useTranslations('transferTax');
  const locale = useLocale();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: modalImage, isLoading } = useTaxTransferModal(isModalOpen);

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setIsModalOpen(false);
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        router.push(ROUTES.INFO(locale));
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isModalOpen, locale, router]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className={styles.transferTaxBtn}>
        <span className={styles.buttonText}>{t('button')}</span>
        <span className={styles.percentage}>
          <span className={styles.percentageText}>{t('percentage')}</span>
        </span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className={styles.modalContent}
            >
              {isLoading ? (
                <div className={styles.loading}>
                  <Spinner />
                </div>
              ) : (
                modalImage?.image && (
                  <div className={styles.imageWrapper}>
                    <Image
                      src={urlFor(modalImage.image).url()}
                      alt="Tax transfer information"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 60vw"
                      priority
                      className={styles.modalImage}
                    />
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
