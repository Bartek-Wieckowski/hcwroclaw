import GameCalendarSlider from './GameCalendarSlider/GameCalendarSlider';
import styles from "./gameCalendar.module.css"

function GameCalendar() {
  return (
    <section className={styles.gameCalendarSection}>
      <GameCalendarSlider />
    </section>
  );
}

export default GameCalendar;
