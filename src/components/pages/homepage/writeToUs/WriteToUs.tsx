'use client';

import styles from './writeToUs.module.css';
import Image from 'next/image';
import hockeyPlayer from '@/assets/images/additional/hcwroclawplayer1.png';
import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n/i18n';

type ContactOption = 'sparing' | 'join' | 'partner';

type WriteToUsProps = {
  lng: Locale;
};

export default function WriteToUs({ lng }: WriteToUsProps) {
  const t = useTranslations('writeToUs');
  const [selectedOption, setSelectedOption] =
    useState<ContactOption>('sparing');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedOption,
          message,
        }),
      });

      if (response.ok) {
        setMessage('');
        alert(t('success'));
      } else {
        throw new Error(t('error'));
      }
    } catch (error) {
      alert(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.writeToUs}>
      <div className={styles.playerImage}>
        <Image
          src={hockeyPlayer}
          alt="Hockey Player"
          width={400}
          height={600}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>{t('title')}</h2>

          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value as ContactOption)}
            className={styles.select}
          >
            <option value="sparing">{t('options.sparing')}</option>
            <option value="join">{t('options.join')}</option>
            <option value="partner">{t('options.partner')}</option>
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('placeholder')}
            className={styles.textarea}
            rows={4}
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('sending') : t('button')}
          </button>
        </form>
      </div>
    </section>
  );
}
