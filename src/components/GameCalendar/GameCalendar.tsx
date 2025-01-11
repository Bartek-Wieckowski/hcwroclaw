import styles from './gameCalendar.module.css';
import GameCalendarSlider from './gameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

type GameCalendarProps = {
  withMargin: boolean;
};

export default async function GameCalendar({
  withMargin = false,
}: GameCalendarProps) {
  const { data: games } = await sanityFetch({ query: getGamesCalendarQuery });
  return (
    <section
      className={`${styles.gameCalendarSection} ${withMargin ? 'sectionWithMargin' : ''}`}
    >
      <GameCalendarSlider games={games} />
    </section>
  );
}
