import styles from './gameCalendar.module.css';
import GameCalendarSlider from './GameCalendarSlider/GameCalendarSlider';
import { getGamesCalendarQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

async function GameCalendar() {
  const { data: games } = await sanityFetch({ query: getGamesCalendarQuery });
  return (
    <section className={styles.gameCalendarSection}>
      <GameCalendarSlider games={games} />
    </section>
  );
}

export default GameCalendar;
