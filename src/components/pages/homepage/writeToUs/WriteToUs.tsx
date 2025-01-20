'use client';

import styles from './writeToUs.module.css';
import Image from 'next/image';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import useClickOutside from '@/hooks/useClickOutside';
import { useState, FormEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';

import player1 from '@/assets/images/additional/hcwroclawplayer1.png';
import player2 from '@/assets/images/additional/hcwroclawplayer2.png';
import player3 from '@/assets/images/additional/hcwroclawplayer3.png';
import player4 from '@/assets/images/additional/hcwroclawplayer4.png';

type ContactOption = 'sparing' | 'join' | 'partner';

type WriteToUsProps = {
  lng: Locale;
};

const playerImages = [
  { src: player1, alt: 'Hockey Player 1' },
  { src: player2, alt: 'Hockey Player 2' },
  { src: player3, alt: 'Hockey Player 3' },
  { src: player4, alt: 'Hockey Player 4' },
];

const getRandomPlayer = () => {
  const randomIndex = Math.floor(Math.random() * playerImages.length);
  return playerImages[randomIndex];
};

export default function WriteToUs({ lng }: WriteToUsProps) {
  const playerRef = useRef(null);
  const [selectedOption, setSelectedOption] =
    useState<ContactOption>('sparing');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomPlayer] = useState(getRandomPlayer);
  const t = useTranslations('writeToUs');
  const isInView = useInView(playerRef, { once: true, amount: 0.3 });
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const options = [
    { value: 'sparing', label: t('options.sparing') },
    { value: 'join', label: t('options.join') },
    { value: 'partner', label: t('options.partner') },
  ];

  const selectedLabel = options.find(
    (opt) => opt.value === selectedOption
  )?.label;

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

  const isMessageValid = message.trim().length > 0;

  return (
    <section className={styles.writeToUs}>
      <motion.div
        ref={playerRef}
        className={styles.playerImage}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={randomPlayer.src}
          alt={randomPlayer.alt}
          width={400}
          height={600}
          className={styles.image}
          priority
        />
      </motion.div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <SectionTitle
            part1={t('title1')}
            part2={t('title2')}
            variant="secondary-primary"
          />

          <div className={styles.customSelect} ref={dropdownRef}>
            <button
              type="button"
              className={styles.selectButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedLabel}</span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className={styles.dropdownList}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.dropdownOption} ${
                        selectedOption === option.value ? styles.selected : ''
                      }`}
                      onClick={() => {
                        setSelectedOption(option.value as ContactOption);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            disabled={isSubmitting || !isMessageValid}
          >
            {isSubmitting ? t('sending') : t('button')}
          </button>
        </form>
      </div>
    </section>
  );
}
