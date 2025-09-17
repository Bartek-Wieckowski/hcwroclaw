import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { GetGamesCalendarQueryResult } from '../../../sanity.types';

export const revalidate = 30;

type GameCalendarProps = {
  withMargin: boolean;
  lng: Locale;
};

export default async function GameCalendar({
  withMargin = false,
  lng,
}: GameCalendarProps) {
  const { futureGames, pastGames, leagueTables } = await client.fetch(
    getGamesCalendarQuery
  );
  const t = await getTranslations('gameCalendar');

  const games: Array<
    | GetGamesCalendarQueryResult['pastGames'][number]
    | GetGamesCalendarQueryResult['futureGames'][number]
  > =
    futureGames.length === 0
      ? [...pastGames].reverse().slice(-12)
      : [...pastGames.reverse().slice(-3), ...futureGames];

  return (
    <section
      className={`${styles.gameCalendarSection} ${withMargin ? 'sectionWithMargin' : ''}`}
    >
      {games.length > 0 ? (
        <GameCalendarSlider
          games={games}
          leagueTables={leagueTables}
          lng={lng}
        />
      ) : (
        <h4 className={styles.noGamesMessage}>{t('noGames')}</h4>
      )}
    </section>
  );
}
