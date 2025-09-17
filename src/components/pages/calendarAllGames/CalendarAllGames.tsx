'use client';

import styles from './calendarAllGames.module.css';
import Image from 'next/image';
import useClickOutside from '@/hooks/useClickOutside';
import { useState } from 'react';
import { Locale } from '@/i18n/i18n';
import { GetAllGamesByYearQueryResult } from '../../../../sanity.types';
import { useGames } from '@/hooks/tanstack/queries/useGames';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';

type CalendarAllGamesProps = {
  initialGames: GetAllGamesByYearQueryResult;
  currentYear: number;
  availableYears: number[];
  lng: Locale;
};

export default function CalendarAllGames({
  initialGames,
  currentYear,
  availableYears,
  lng,
}: CalendarAllGamesProps) {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: games } = useGames({
    selectedYear,
    currentYear,
    initialGames,
  });

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(lng === 'pl' ? 'pl-PL' : 'en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={styles.calendarAllGames}>
      <div className={styles.customSelect} ref={dropdownRef}>
        <button
          type="button"
          className={styles.selectButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedYear}</span>
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
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`${styles.dropdownOption} ${
                    selectedYear === year ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsDropdownOpen(false);
                  }}
                >
                  {year}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.gamesList}>
        {games?.map((game) => (
          <div key={game._id} className={styles.gameItem}>
            <div className={styles.gameHeader}>
              <div className={styles.gameDate}>
                {formatDate(game.date)}&nbsp;&nbsp;&nbsp;
                <span className={styles.gameTime}>{game.time}</span>
              </div>
              <div className={styles.gameType}>{game.gameType.name[lng]}</div>
            </div>

            <div className={styles.gameContent}>
              <div className={styles.teamInfo}>
                {game.firstTeam.logo?.asset?.url && (
                  <div className={styles.logoWrapper}>
                    <Image
                      src={urlFor(game.firstTeam.logo).format('webp').quality(80).url()}
                      alt={game.firstTeam.name}
                      width={40}
                      height={40}
                      sizes="40px"
                      className={styles.teamLogo}
                    />
                  </div>
                )}
                <span className={styles.teamName}>{game.firstTeam.name}</span>
              </div>

              <div className={styles.scoreSection}>
                <div className={styles.score}>
                  {game.isCompleted ? (
                    <>
                      <span className={styles.scoreNumber}>
                        {game.firstTeamGoals}
                      </span>
                      <span className={styles.scoreDivider}>:</span>
                      <span className={styles.scoreNumber}>
                        {game.secondTeamGoals}
                      </span>
                    </>
                  ) : (
                    <span className={styles.vs}>VS</span>
                  )}
                </div>
              </div>

              <div className={styles.teamInfo}>
                {game.secondTeam.logo?.asset?.url && (
                  <div className={styles.logoWrapper}>
                    <Image
                      src={urlFor(game.secondTeam.logo).format('webp').quality(80).url()}
                      alt={game.secondTeam.name}
                      width={40}
                      height={40}
                      sizes="40px"
                      className={styles.teamLogo}
                    />
                  </div>
                )}
                <span className={styles.teamName}>{game.secondTeam.name}</span>
              </div>
            </div>

            <div className={styles.gameLocation}>
              <span>{game.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
