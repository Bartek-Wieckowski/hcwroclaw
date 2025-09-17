'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import styles from './gameCalendarSlider.module.css';
import Spinner from '../../spinner/Spinner';
import { useState, useRef, useMemo } from 'react';
import { A11y, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { formatDate, getInitials } from '@/lib/helpers';
import { urlFor } from '@/sanity/lib/image';
import { Locale } from '@/i18n/i18n';
import { useTranslations } from 'next-intl';
import { GetGamesCalendarQueryResult } from '../../../../sanity.types';

type GameCalendarSliderProps = {
  games: Array<
    | GetGamesCalendarQueryResult['pastGames'][number]
    | GetGamesCalendarQueryResult['futureGames'][number]
  >;
  leagueTables: GetGamesCalendarQueryResult['leagueTables'];
  lng: Locale;
};

export default function GameCalendarSlider({
  games,
  leagueTables,
  lng,
}: GameCalendarSliderProps) {
  const [swiperLoaded, setSwiperLoaded] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const t = useTranslations('gameCalendarSlider');

  const initialSlide = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return games.findIndex((game) => {
      const gameDate = new Date(game.date);
      gameDate.setHours(0, 0, 0, 0);
      return gameDate >= now;
    });
  }, [games]);

  const updateNavigationVisibility = () => {
    let currentSlidesPerView = 1;

    const windowWidth = window.innerWidth;
    if (windowWidth >= 1500) {
      currentSlidesPerView = Math.min(5, games.length);
    } else if (windowWidth >= 992) {
      currentSlidesPerView = Math.min(3, games.length);
    } else if (windowWidth >= 597) {
      currentSlidesPerView = Math.min(2, games.length);
    }

    const shouldShowNavigation = games.length > currentSlidesPerView;
    setShowNavigation(shouldShowNavigation);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const findLeagueLogo = (gameTypeName: { [key: string]: string }) => {
    const name = gameTypeName[lng] || gameTypeName.pl;
    const league = leagueTables.find((table) =>
      table.title.toLowerCase().includes(name.toLowerCase())
    );
    return league?.logo?.asset?.url;
  };

  return (
    <div className={styles.sliderSwiperWrapper}>
      {!swiperLoaded && <Spinner />}
      {swiperLoaded && games.length > 1 && showNavigation && (
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
          initialSlide={initialSlide !== -1 ? initialSlide : 0}
          scrollbar={{ draggable: true }}
          breakpoints={{
            597: { slidesPerView: Math.min(2, games.length) },
            992: { slidesPerView: Math.min(3, games.length) },
            1500: { slidesPerView: Math.min(5, games.length) },
          }}
          onInit={() => {
            setSwiperLoaded(true);
            updateNavigationVisibility();
          }}
          onBreakpoint={() => {
            updateNavigationVisibility();
          }}
          onResize={() => {
            updateNavigationVisibility();
          }}
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
                {findLeagueLogo(game.gameType.name) ? (
                  <div className={styles.gameDateWithLogo}>
                    <small className={styles.gameType}>
                      {game.gameType.name[lng] || game.gameType.name.pl}
                    </small>
                    {findLeagueLogo(game.gameType.name) && (
                      <Image
                        src={urlFor(findLeagueLogo(game.gameType.name)!).format('webp').quality(80).url()}
                        alt={game.gameType.name[lng] || game.gameType.name.pl}
                        width={20}
                        height={20}
                        className={styles.leagueLogo}
                      />
                    )}
                    <div>{formatDate(game.date, lng)}</div>
                  </div>
                ) : (
                  <div className={styles.gameDate}>
                    <small className={styles.gameType}>
                      {game.gameType.name[lng] || game.gameType.name.pl}
                    </small>
                    <div>{formatDate(game.date, lng)}</div>
                  </div>
                )}
                <div className={styles.gameDetails}>
                  <div className={styles.gameTypeWrapper}>
                    <small className={styles.gameTypeLocationAndTime}>
                      {game.isCompleted ? (
                        t('completed')
                      ) : (
                        <span className={styles.gameTypeTime}>
                          {game.location}&nbsp;{game.time}
                        </span>
                      )}
                    </small>
                  </div>
                  <div className={styles.teamHome}>
                    <div className={styles.teamLogoAndName}>
                      {game.firstTeam.logo ? (
                        <Image
                          src={urlFor(game.firstTeam.logo).format('webp').quality(80).url()}
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
                    <div className={styles.gameScore}>
                      <div className={styles.goalHome}>
                        {game.isCompleted ? game.firstTeamGoals : '-'}
                      </div>
                    </div>
                  </div>
                  <div className={styles.teamAway}>
                    <div className={styles.teamLogoAndName}>
                      {game.secondTeam.logo ? (
                        <Image
                          src={urlFor(game.secondTeam.logo).format('webp').quality(80).url()}
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
                    <div className={styles.gameScore}>
                      <div className={styles.goalAway}>
                        {game.isCompleted ? game.secondTeamGoals : '-'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {swiperLoaded && games.length > 1 && showNavigation && (
        <button
          onClick={handleNext}
          className={`${styles.nextButton} ${isEnd ? styles.buttonDisabled : ''}`}
          disabled={isEnd}
        >
          <span>&#10095;</span>
        </button>
      )}
    </div>
  );
}
