import styles from './ClubCrestLogo.module.css';
import Image from 'next/image';
import crest from '@/assets/images/logo-home-hero.png';

type ClubCrestLogoProps = {
  activeElementId: string | null;
};

// Dodajemy mapowanie ID dla obu wersji językowych
const elementIdMapping: Record<string, string[]> = {
  // Polski
  'lwy-jako-straznicy-tarczy': ['lions-as-shield-guardians'],
  'tarcza-herbowa-duma-dolnego-slaska': ['coat-of-arms-pride-of-lower-silesia'],
  'korony-krolewski-charakter-i-aspiracje': [
    'crowns-royal-character-and-aspirations',
  ],
  'skrzyzowane-kije-hokejowe-serce-sportu': [
    'crossed-hockey-sticks-heart-of-sport',
  ],
  'tozsamosc-klubu-i-regionu': ['club-and-region-identity'],
  'motto-dum-pugnas-victor-es': ['motto-dum-pugnas-victor-es'],
  'rok-zalozenia-i-mlodzienczy-zapal': ['year-of-foundation-and-youth-passion'],
  // Angielski (odwrotne mapowanie)
  'lions-as-shield-guardians': ['lwy-jako-straznicy-tarczy'],
  'coat-of-arms-pride-of-lower-silesia': ['tarcza-herbowa-duma-dolnego-slaska'],
  'crowns-royal-character-and-aspirations': [
    'korony-krolewski-charakter-i-aspiracje',
  ],
  'crossed-hockey-sticks-heart-of-sport': [
    'skrzyzowane-kije-hokejowe-serce-sportu',
  ],
  'club-and-region-identity': ['tozsamosc-klubu-i-regionu'],
  'year-of-foundation-and-youth-passion': ['rok-zalozenia-i-mlodzienczy-zapal'],
} as const;

export default function ClubCrestLogo({ activeElementId }: ClubCrestLogoProps) {
  // Funkcja sprawdzająca czy element powinien być aktywny
  const isElementActive = (elementIds: string[]) => {
    if (!activeElementId) return false;
    return (
      elementIds.includes(activeElementId) ||
      elementIdMapping[
        activeElementId as keyof typeof elementIdMapping
      ]?.includes(elementIds[0]) ||
      false
    );
  };

  return (
    <div className={styles.crestContainer}>
      <Image
        src={crest.src}
        alt="Hockey Club Wrocław Crest"
        width={500}
        height={638}
        className={styles.crest}
      />

      {/* Nakładka do efektów hover/active */}
      <div className={styles.highlightOverlay}>
        {/* Lwy */}
        <div
          className={`${styles.highlightArea} ${styles['left-lion']} ${
            isElementActive(['lwy-jako-straznicy-tarczy']) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['right-lion']} ${
            isElementActive(['lwy-jako-straznicy-tarczy']) ? styles.active : ''
          }`}
        />

        {/* Tarcza i orzeł */}
        <div
          className={`${styles.highlightArea} ${styles['main-shield']} ${
            isElementActive(['tarcza-herbowa-duma-dolnego-slaska'])
              ? styles.active
              : ''
          }`}
        />

        {/* Korony */}
        <div
          className={`${styles.highlightArea} ${styles['shield-crown']} ${
            isElementActive(['korony-krolewski-charakter-i-aspiracje'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['left-lion-crown']} ${
            isElementActive(['korony-krolewski-charakter-i-aspiracje'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['right-lion-crown']} ${
            isElementActive(['korony-krolewski-charakter-i-aspiracje'])
              ? styles.active
              : ''
          }`}
        />

        {/* Kije hokejowe */}
        <div
          className={`${styles.highlightArea} ${styles['hockey-sticks-top-left']} ${
            isElementActive(['skrzyzowane-kije-hokejowe-serce-sportu'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['hockey-sticks-top-right']} ${
            isElementActive(['skrzyzowane-kije-hokejowe-serce-sportu'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['hockey-sticks-bottom-left']} ${
            isElementActive(['skrzyzowane-kije-hokejowe-serce-sportu'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['hockey-sticks-bottom-right']} ${
            isElementActive(['skrzyzowane-kije-hokejowe-serce-sportu'])
              ? styles.active
              : ''
          }`}
        />

        {/* Napisy */}
        <div
          className={`${styles.highlightArea} ${styles['club-name-top']} ${
            isElementActive(['tozsamosc-klubu-i-regionu']) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['club-name-bottom']} ${
            isElementActive(['tozsamosc-klubu-i-regionu']) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['region-name']} ${
            isElementActive(['tozsamosc-klubu-i-regionu']) ? styles.active : ''
          }`}
        />

        {/* Motto */}
        <div
          className={`${styles.highlightArea} ${styles.motto} ${
            isElementActive(['motto-dum-pugnas-victor-es']) ? styles.active : ''
          }`}
        />

        {/* Daty założenia */}
        <div
          className={`${styles.highlightArea} ${styles['foundation-dates-left']} ${
            isElementActive(['rok-zalozenia-i-mlodzienczy-zapal'])
              ? styles.active
              : ''
          }`}
        />
        <div
          className={`${styles.highlightArea} ${styles['foundation-dates-right']} ${
            isElementActive(['rok-zalozenia-i-mlodzienczy-zapal'])
              ? styles.active
              : ''
          }`}
        />
      </div>
    </div>
  );
}
