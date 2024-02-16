import Image from 'next/image';
import styles from './teamList.module.css';
import { PlayerType } from '@/types/Players.type';

type TeamListProps = {
  players: PlayerType[];
};

function TeamList({ players }: TeamListProps) {
  return (
    <>
      {players.map((player: PlayerType) => (
        <div className={styles.playerWrapper} key={player.id}>
          <div className={styles.playerImageWrapper}>
            <Image
              src={player.imgPlayer}
              width="50"
              height="50"
              alt={player.name}
              className={styles.playerImage}
            />
          </div>
          <div className={styles.playerDetails}>
            <div className={styles.playerDetailsNumber}>
              {player.jerseyNumber}
            </div>
            <div className={styles.playerDetailsNameAndPosition}>
              <div className={styles.playerDetailsName}>{player.name}</div>
              <div className={styles.playerDetailsPosition}>
                {player.position === 'goalie' && 'Bramkarz'}
                {player.position === 'defense' && 'Obrońca'}
                {player.position === 'forward' && 'Napastnik'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TeamList;
