import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { GamesCalendar } from '@/types/GamesCalendar.type';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';

export const revalidate = 300;

type GameCalendarProps = {
  withMargin: boolean;
  lng: Locale;
};

export default async function GameCalendar({
  withMargin = false,
  lng,
}: GameCalendarProps) {
  const { futureGames, pastGames } = await client.fetch(getGamesCalendarQuery);
  const t = await getTranslations('gameCalendar');

  const games: GamesCalendar[] =
    futureGames.length === 0
      ? [...pastGames].reverse().slice(-12)
      : [...pastGames.reverse().slice(-3), ...futureGames];

  return (
    <section
      className={`${styles.gameCalendarSection} ${withMargin ? 'sectionWithMargin' : ''}`}
    >
      {games.length > 0 ? (
        <GameCalendarSlider games={games} lng={lng} />
      ) : (
        <h4 className={styles.noGamesMessage}>{t('noGames')}</h4>
      )}
    </section>
  );
}
