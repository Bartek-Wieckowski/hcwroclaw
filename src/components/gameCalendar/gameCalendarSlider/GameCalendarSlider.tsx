'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import logoPlaceholder from '../../../assets/images/logo-team-placeholder.png';
import styles from './gameCalendarSlider.module.css';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GetGamesCalendarQueryResult } from '../../../../sanity.types';
import { formatDate } from '@/utils/helpers';
import { urlFor } from '@/sanity/lib/image';

type GameCalendarSliderProps = {
  games: GetGamesCalendarQueryResult;
};

export default function GameCalendarSlider({ games }: GameCalendarSliderProps) {
  return (
    <div className={styles.sliderSwiperWrapper}>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          597: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1500: { slidesPerView: 2 },
        }}
      >
        {games.map((game) => (
          <SwiperSlide key={game._id} className={styles.sliderSwiperSlide}>
            <div className={styles.gameWrapper}>
              <div className={styles.gameDate}>
                <div>{formatDate(game.date)}</div>
              </div>
              <div className={styles.gameDetails}>
                <small className={styles.gameType}>{game.gameType.name}</small>
                <div className={styles.teamHome}>
                  <div className="dFlex">
                    <Image
                      src={
                        game.firstTeam.logo
                          ? urlFor(game.firstTeam.logo).url()
                          : logoPlaceholder
                      }
                      alt={game.firstTeam?.name || ''}
                      height={20}
                      width={20}
                    />
                    <small className={styles.teamName}>
                      {game.firstTeam?.name}
                    </small>
                  </div>
                </div>
                <div className={styles.teamAway}>
                  <div className="dFlex">
                    <Image
                      src={
                        game.secondTeam.logo
                          ? urlFor(game.secondTeam.logo).url()
                          : logoPlaceholder
                      }
                      alt={game.secondTeam.name}
                      height={20}
                      width={20}
                    />
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
  );
}