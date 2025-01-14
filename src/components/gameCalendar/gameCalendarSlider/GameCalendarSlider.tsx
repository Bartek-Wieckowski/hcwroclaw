'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import styles from './gameCalendarSlider.module.css';
import Spinner from '../../spinner/Spinner';
import { useState, useRef } from 'react';
import { A11y, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { GetGamesCalendarQueryResult } from '../../../../sanity.types';
import { formatDate, getInitials } from '@/lib/helpers';
import { urlFor } from '@/sanity/lib/image';
import { Locale } from '@/i18n/i18n';
import { useTranslations } from 'next-intl';

type GameCalendarSliderProps = {
  games: GetGamesCalendarQueryResult;
  lng: Locale;
};

export default function GameCalendarSlider({
  games,
  lng,
}: GameCalendarSliderProps) {
  const [swiperLoaded, setSwiperLoaded] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const t = useTranslations('gameCalendarSlider');

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={styles.sliderSwiperWrapper}>
      {!swiperLoaded && <Spinner />}
      {swiperLoaded && (
        <button
          onClick={handlePrev}
          className={`${styles.prevButton} ${isBeginning ? styles.buttonDisabled : ''}`}
          disabled={isBeginning}
        >
          <span>&#10094;</span>
        </button>
      )}
      <div className={swiperLoaded ? styles.sliderContent : 'hidden'}>
        <Swiper
          modules={[A11y, Scrollbar]}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
          breakpoints={{
            597: { slidesPerView: Math.min(2, games.length) },
            992: { slidesPerView: Math.min(3, games.length) },
            1500: { slidesPerView: Math.min(5, games.length) },
          }}
          onInit={() => setSwiperLoaded(true)}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {games.map((game) => (
            <SwiperSlide key={game._id} className={styles.sliderSwiperSlide}>
              <div className={styles.gameWrapper}>
                <div className={styles.gameDate}>
                  <div>{formatDate(game.date, lng)}</div>
                </div>
                <div className={styles.gameDetails}>
                  <div className={styles.gameTypeWrapper}>
                    <small className={styles.gameType}>
                      {game.gameType.name[lng] || game.gameType.name.pl}
                    </small>
                    <small className={styles.gameType}>
                      {game.isCompleted ? (
                        t('completed')
                      ) : (
                        <>
                          {game.location}&nbsp;{game.time}
                        </>
                      )}
                    </small>
                  </div>
                  <div className={styles.teamHome}>
                    <div className="dFlex">
                      {game.firstTeam.logo ? (
                        <Image
                          src={urlFor(game.firstTeam.logo).url()}
                          alt={game.firstTeam?.name || ''}
                          height={25}
                          width={25}
                        />
                      ) : (
                        <div className={styles.logoPlaceholder}>
                          {getInitials(game.firstTeam?.name || '')}
                        </div>
                      )}
                      <small className={styles.teamName}>
                        {game.firstTeam?.name}
                      </small>
                    </div>
                  </div>
                  <div className={styles.teamAway}>
                    <div className="dFlex">
                      {game.secondTeam.logo ? (
                        <Image
                          src={urlFor(game.secondTeam.logo).url()}
                          alt={game.secondTeam.name}
                          height={25}
                          width={25}
                        />
                      ) : (
                        <div className={styles.logoPlaceholder}>
                          {getInitials(game.secondTeam?.name || '')}
                        </div>
                      )}
                      <small className={styles.teamName}>
                        {game.secondTeam?.name}
                      </small>
                    </div>
                  </div>
                </div>
                <div className={styles.gameScore}>
                  <div className={styles.goalHome}>
                    {game.isCompleted ? game.firstTeamGoals : '-'}
                  </div>
                  <div className={styles.goalAway}>
                    {game.isCompleted ? game.secondTeamGoals : '-'}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {swiperLoaded && (
        <>
          <button
            onClick={handleNext}
            className={`${styles.nextButton} ${isEnd ? styles.buttonDisabled : ''}`}
            disabled={isEnd}
          >
            <span>&#10095;</span>
          </button>
        </>
      )}
    </div>
  );
}
