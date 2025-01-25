'use client';

import styles from './crestInteractive.module.css';
import ClubCrestLogo from './ClubCrestLogo';
import ClubCrestDesc from './ClubCrestDesc';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { useState, useRef } from 'react';
import { NewsBlock } from '../../../../../sanity.types';
import { useTranslations } from 'next-intl';

type CrestInteractiveProps = {
  content: NewsBlock;
  intro: string;
  summary: string;
};

export default function CrestInteractive({
  content,
  intro,
  summary,
}: CrestInteractiveProps) {
  const crestContentRef = useRef<HTMLDivElement | null>(null);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const t = useTranslations('clubPage.clubCrest');

  const handleElementClick = (elementId: string) => {
    setActiveElementId(activeElementId === elementId ? null : elementId);
    scrollToCrestContent();
  };

  const scrollToCrestContent = () => {
    if (window.innerWidth < 768 && crestContentRef.current) {
      crestContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SectionTitle
        part1={t('title1')}
        part2={t('title2')}
        variant={'secondary-primary'}
      />
      <div className={styles.intro} ref={crestContentRef}>
        <p>{intro}</p>
      </div>
      <div className={styles.crestContent}>
        <ClubCrestLogo activeElementId={activeElementId} />
        <ClubCrestDesc
          content={content}
          onElementClick={handleElementClick}
          activeElementId={activeElementId}
        />
      </div>
      <div className={styles.summary}>
        <p>{summary}</p>
      </div>
    </>
  );
}
