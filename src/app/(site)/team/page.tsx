// import TeamList from '@/components/Team/TeamList/TeamList';
import TeamSlider from '@/components/Team/TeamSlider/TeamSlider';
import styles from './team.module.css';
// import axios from 'axios';
// import { API_URL } from '@/utils/constants';
// import { PlayerType } from '@/types/Players.type';

// const getAllPlayers = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/players`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Błąd ładowania danych...');
//   }
// };

async function Team() {
  // const players = await getAllPlayers();
  // const goalkeepers = players.filter(
  //   (goalkeaper: PlayerType) => goalkeaper.position === 'goalie'
  // );
  // const defenders = players.filter(
  //   (defender: PlayerType) => defender.position === 'defense'
  // );
  // const forwards = players.filter(
  //   (forward: PlayerType) => forward.position === 'forward'
  // );

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <TeamSlider />
        {/* <h2>Brzmkarze</h2> */}
        {/* <TeamList players={goalkeepers} /> */}
        {/* <h2>Obrońcy</h2> */}
        {/* <TeamList players={defenders} /> */}
        {/* <h2>Napastnicy</h2> */}
        {/* <TeamList players={forwards} /> */}
      </div>
    </section>
  );
}

export default Team;
