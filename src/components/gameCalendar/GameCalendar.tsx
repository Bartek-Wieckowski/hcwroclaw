import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { Locale } from '@/i18n/i18n';
import { GamesCalendar } from '@/types/GamesCalendar.type';
import { getTranslations } from 'next-intl/server';

type GameCalendarProps = {
  withMargin: boolean;
  lng: Locale;
};

export default async function GameCalendar({
  withMargin = false,
  lng,
}: GameCalendarProps) {
  const { data } = await sanityFetch({
    query: getGamesCalendarQuery,
  });
  const t = await getTranslations('gameCalendar');

  const games: GamesCalendar[] =
    data.futureGames.length === 0
      ? [...data.pastGames].reverse().slice(-12)
      : [...data.pastGames.reverse().slice(-3), ...data.futureGames];

  return (
    <section
      className={`${styles.gameCalendarSection} ${withMargin ? 'sectionWithMargin' : ''}`}
    >
      {games.length > 0 ? (
        <GameCalendarSlider games={games} lng={lng} />
      ) : (
        <h3 className={styles.noGamesMessage}>{t('noGames')}</h3>
      )}
    </section>
  );
}
