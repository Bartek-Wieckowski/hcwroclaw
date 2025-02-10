'use client';

import styles from './transferTaxBtn.module.css';
import Image from 'next/image';
import Spinner from '../spinner/Spinner';
import useClickOutside from '@/hooks/useClickOutside';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTaxTransferModal } from '@/hooks/tanstack/queries/useTaxTransferModal';
import { urlFor } from '@/sanity/lib/image';
import { createPortal } from 'react-dom';

export default function TransferTaxBtn() {
  const t = useTranslations('transferTax');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: modalImage, isLoading } = useTaxTransferModal(isModalOpen);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setIsModalOpen(false);
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const modalContent = (
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
  );

  return (
    <>
      <button onClick={handleClick} className={styles.transferTaxBtn}>
        <span className={styles.buttonText}>{t('button')}</span>
        <span className={styles.percentage}>
          <span className={styles.percentageText}>{t('percentage')}</span>
        </span>
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
