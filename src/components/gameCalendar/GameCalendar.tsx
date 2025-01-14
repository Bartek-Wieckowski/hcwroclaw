import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { Locale } from '@/i18n/i18n';

type GameCalendarProps = {
  withMargin: boolean;
  lng: Locale;
};

export default async function GameCalendar({
  withMargin = false,
  lng,
}: GameCalendarProps) {
  const { data: games } = await sanityFetch({ query: getGamesCalendarQuery });
  return (
    <section
      className={`${styles.gameCalendarSection} ${withMargin ? 'sectionWithMargin' : ''}`}
    >
      <GameCalendarSlider games={games} lng={lng} />
    </section>
  );
}
