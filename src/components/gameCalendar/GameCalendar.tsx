import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { getLocaleValue } from '@/i18n/getTranslations';
import { Locale } from '@/i18n/config';

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
