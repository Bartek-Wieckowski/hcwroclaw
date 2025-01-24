'use client';

import styles from './teamListPlayers.module.css';
import Image from 'next/image';
import defaultSkaterBasicPhoto from '@/assets/images/default-skater.png';
import defaultSkaterActionPhoto from '@/assets/images/default-skater-in-action.png';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GetTeamPageDataQueryResult } from '../../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';

type PlayerArray = NonNullable<GetTeamPageDataQueryResult>[
  | 'goalkeepers'
  | 'defenders'
  | 'forwards'];

type TeamListProps = {
  players: PlayerArray;
};

export default function TeamListPlayers({ players }: TeamListProps) {
  const t = useTranslations('teamPage');
  const [isFlipped, setIsFlipped] = useState<Record<string, boolean>>({});

  if (!players) return null;

  const handleFlip = (playerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {}
      );
      return {
        ...newState,
        [playerId]: !prev[playerId],
      };
    });
  };

  const handleBackgroundClick = () => {
    setIsFlipped({});
  };

  const translateStickHand = (hand: string) => {
    if (typeof hand !== 'string') return '';

    const translations: Record<string, string> = {
      right: t('playerInfo.stickHandRight'),
      left: t('playerInfo.stickHandLeft'),
    };

    return translations[hand.toLowerCase()] || hand;
  };

  return (
    <div className={styles.playersGrid} onClick={handleBackgroundClick}>
      {players.map((player) => (
        <div className={styles.cardContainer} key={player._key}>
          <motion.div
            className={styles.card}
            animate={{ rotateY: isFlipped[player._key] ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleFlip(player._key, e)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <motion.div
              className={styles.cardFace}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={styles.playerImageWrapper}>
                <Image
                  src={
                    player.photo?.asset?.url
                      ? urlFor(player.photo).url()
                      : defaultSkaterBasicPhoto.src
                  }
                  fill
                  alt={`${player.firstName} ${player.lastName}`}
                  className={styles.playerImage}
                />
              </div>
              <div className={styles.playerInfo}>
                <div className={styles.basicInfo}>
                  <div className={styles.playerNumber}>{player.number}</div>
                  <h3 className={styles.playerName}>
                    {player.firstName} {player.lastName}
                    {player.isCaptain && (
                      <span className={styles.captainLabel}>C</span>
                    )}
                    {player.isAssistantCaptain && (
                      <span className={styles.assistantLabel}>A</span>
                    )}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Back */}
            <motion.div
              className={styles.cardFace}
              style={{
                backfaceVisibility: 'hidden',
                rotateY: 180,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <div className={styles.playerImageWrapper}>
                <Image
                  src={
                    player.actionPhoto?.asset?.url
                      ? urlFor(player.actionPhoto).url()
                      : defaultSkaterActionPhoto.src
                  }
                  fill
                  alt={`${player.firstName} ${player.lastName} in action`}
                  className={`${styles.playerImage} ${
                    !player.actionPhoto?.asset?.url
                      ? styles.defaultActionImage
                      : ''
                  }`}
                />
              </div>
              <div className={styles.playerDetails}>
                <div className={styles.playerStats}>
                  <div className={styles.playerStat}>
                    <span className={styles.playerStatLabel}>
                      {t('playerInfo.height')}:
                    </span>
                    {player.height ? (
                      <span className={styles.playerStatValue}>
                        {player.height} cm
                      </span>
                    ) : (
                      <span className={styles.playerStatValue}>-</span>
                    )}
                  </div>
                  <div className={styles.playerStat}>
                    <span className={styles.playerStatLabel}>
                      {t('playerInfo.weight')}:
                    </span>
                    {player.weight ? (
                      <span className={styles.playerStatValue}>
                        {player.weight} kg
                      </span>
                    ) : (
                      <span className={styles.playerStatValue}>-</span>
                    )}
                  </div>
                  <div className={styles.playerStat}>
                    <span className={styles.playerStatLabel}>
                      {t('playerInfo.stickHand')}:
                    </span>
                    {player.stickHand ? (
                      <span className={styles.playerStatValue}>
                        {translateStickHand(player.stickHand)}
                      </span>
                    ) : (
                      <span className={styles.playerStatValue}>-</span>
                    )}
                  </div>
                </div>
                <div className={styles.playerRoles}>
                  {player.isCaptain && (
                    <span className={styles.captain}>
                      {t('playerInfo.captain')}
                    </span>
                  )}
                  {player.isAssistantCaptain && (
                    <span className={styles.assistantCaptain}>
                      {t('playerInfo.assistantCaptain')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
