'use client';

import styles from './cookieBarInfo.module.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CookieBarInfo() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('cookieBar');

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cAhcW');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cAhcW', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.cookieBarInfo}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.content}>{t('message')}</div>
          <button onClick={handleAccept} className={styles.button}>
            {t('accept')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
