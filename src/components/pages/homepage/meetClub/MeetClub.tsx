import styles from './meetClub.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';

type StatItemProps = {
  number: string;
  text: string;
};

function StatItem({ number, text }: StatItemProps) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statNumber}>{number}</span>
      <span className={styles.statText}>{text}</span>
    </div>
  );
}

export default function MeetClub() {
  return (
    <div className={styles.meetClub}>
      <div className={styles.meetClubBg}>
        <div className={styles.content}>
          <div className={styles.info}>
            <SectionTitle
              part1="klub"
              part2="w liczbach"
              variant="secondary-primary"
            />
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum quibusdam perspiciatis eum explicabo.
              Dignissimos atque
              culpa a perferendis et voluptates.
            </p>
            <div className={styles.stats}>
              <StatItem number="30" text="Aktywnych graczy" />
              <StatItem number="35+" text="Gier na sezon" />
              <StatItem number="3" text="treningi tygodniowo" />
              <StatItem number="2" text="w tylu ligach gramy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
