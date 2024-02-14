'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { formatDate } from '@/utils/helpers';
import { GameCalendarType } from '@/types/GameCalendar.type';
import { useGameCalendar } from '@/api/queries/gameCalendar/useGameCalendar';
import Image from 'next/image';
import styles from './gameCalendarSlider.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

function GameCalendarSlider() {
  const { isLoading, gamesCalendar, isError } = useGameCalendar();

  return (
    <div className={styles.sliderSwiperWrapper}>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          597: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1500: {
            slidesPerView: 5,
          },
        }}
      >
        {gamesCalendar.map((game: GameCalendarType) => (
          <SwiperSlide key={game?.id} className={styles.sliderSwiperSlide}>
            <div className={styles.gameWrapper}>
              <div className={styles.gameDate}>
                <div>{formatDate(game.date)}</div>
              </div>
              <div className={styles.gameDetails}>
                <small className={styles.gameType}>{game.gameType}</small>
                <div className={styles.teamHome}>
                  <div className="dFlex">
                    <Image
                      src={game.firstTeamLogo}
                      alt={game.firstTeamName}
                      height={20}
                      width={20}
                    />
                    <small className={styles.teamName}>
                      {game.firstTeamName}
                    </small>
                  </div>
                </div>
                <div className={styles.teamAway}>
                  <div className="dFlex">
                    <Image
                      src={game.secondTeamLogo}
                      alt={game.secondTeamName}
                      height={20}
                      width={20}
                    />
                    <small className={styles.teamName}>
                      {game.secondTeamName}
                    </small>
                  </div>
                </div>
              </div>
              <div className={styles.gameScore}>
                <div className={styles.goalHome}>{game.firstTeamGoals}</div>
                <div className={styles.goalAway}>{game.secondTeamGoals}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default GameCalendarSlider;
