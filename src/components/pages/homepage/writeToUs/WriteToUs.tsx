'use client';

import styles from './writeToUs.module.css';
import Image from 'next/image';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import useClickOutside from '@/hooks/useClickOutside';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import toast from 'react-hot-toast';
import { usePlayersNextToTheForm } from '@/hooks/tanstack/queries/usePlayersNextToTheForm';
import { StaticImageData } from 'next/image';

import player1 from '@/assets/images/additional/hcwroclawplayer1.png';
import player2 from '@/assets/images/additional/hcwroclawplayer2.png';
import player3 from '@/assets/images/additional/hcwroclawplayer3.png';
import player4 from '@/assets/images/additional/hcwroclawplayer4.png';

type ContactOption = 'sparing' | 'join' | 'partner';

type FormData = {
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

type WriteToUsProps = {
  lng: Locale;
};

type PlayerImage = {
  src: string | StaticImageData;
  alt: string;
};

const fallbackPlayerImages: PlayerImage[] = [
  { src: player1, alt: 'Hockey Player 1' },
  { src: player2, alt: 'Hockey Player 2' },
  { src: player3, alt: 'Hockey Player 3' },
  { src: player4, alt: 'Hockey Player 4' },
];

export default function WriteToUs({ lng }: WriteToUsProps) {
  const { data: sanityPlayers } = usePlayersNextToTheForm();
  const playerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] =
    useState<ContactOption>('sparing');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerImage, setPlayerImage] = useState<PlayerImage>(
    fallbackPlayerImages[0]
  );
  const t = useTranslations('writeToUs');
  const isInView = useInView(playerRef, { once: true, amount: 0.3 });
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const availableImages = sanityPlayers?.images?.length
      ? sanityPlayers.images
          .map((img, index) => ({
            src: img.asset?.url || '',
            alt: `Hockey Player ${index + 1}`,
          }))
          .filter((img) => Boolean(img.src))
      : fallbackPlayerImages;

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    setPlayerImage(availableImages[randomIndex]);
  }, [sanityPlayers]);

  const options = [
    { value: 'sparing', label: t('options.sparing') },
    { value: 'join', label: t('options.join') },
    { value: 'partner', label: t('options.partner') },
  ];

  const selectedLabel = options.find(
    (opt) => opt.value === selectedOption
  )?.label;

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('validation.email');
    }

    const phoneRegex = /^[0-9+\- ]{9,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('validation.phone');
    }

    if (formData.message.trim().length === 0) {
      newErrors.message = t('validation.message');
    }

    if (!formData.consent) {
      newErrors.consent = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedOption,
          ...formData,
        }),
      });

      if (response.ok) {
        setFormData({
          email: '',
          phone: '',
          message: '',
          consent: false,
        });
        toast.success(t('success'), {
          duration: 4000,
          style: {
            background: 'var(--bg-body-black)',
            color: '#fff',
            border: '1px solid var(--hc-gold)',
          },
          iconTheme: {
            primary: 'var(--hc-gold)',
            secondary: 'var(--bg-body-black)',
          },
        });
      } else {
        throw new Error(t('error'));
      }
    } catch (error) {
      toast.error(t('error'), {
        duration: 4000,
        style: {
          background: 'var(--bg-body-black)',
          color: '#fff',
          border: '1px solid #ff4444',
        },
        iconTheme: {
          primary: '#ff4444',
          secondary: 'var(--bg-body-black)',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.email && formData.phone && formData.message && formData.consent;

  return (
    <div className={styles.writeToUs}>
      <motion.div
        ref={playerRef}
        className={styles.playerImage}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={playerImage.src}
          alt={playerImage.alt}
          width={400}
          height={600}
          className={styles.image}
          priority
        />
      </motion.div>

      <div className={styles.formWrapper}>
        <SectionTitle
          part1={t('title1')}
          part2={t('title2')}
          variant="secondary-primary"
        />
        <form onSubmit={handleSubmit} className={styles.form}>
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

          <div className={styles.inputRow}>
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={t('emailPlaceholder')}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder={t('phonePlaceholder')}
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>

          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder={t('placeholder')}
            className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
            rows={4}
          />
          {errors.message && (
            <span className={styles.errorText}>{errors.message}</span>
          )}

          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, consent: e.target.checked }))
              }
              className={styles.checkbox}
            />
            <span className={styles.consentText}>{t('consent')}</span>
          </label>
          {errors.consent && (
            <span className={styles.errorText}>{errors.consent}</span>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? t('sending') : t('button')}
          </button>
        </form>
      </div>
    </div>
  );
}
