import styles from './teamPage.module.css';
import TeamSlider from '@/components/pages/teamPage/teamSlider/TeamSlider';
import TeamListPlayers from '@/components/pages/teamPage/teamListPlayers/TeamListPlayers';
import { getTeamPageDataQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { getTranslations } from 'next-intl/server';

export const revalidate = 300;

export default async function TeamPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const teamData = await client.fetch(getTeamPageDataQuery);
  const t = await getTranslations('teamPage');

  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.teamPage}>
      <TeamSlider images={teamData.teamSliderImages} />

      <div className={styles.playersSection}>
        {teamData.goalkeepers && (
          <>
            <h2 className={`layoutH2effect`}>{t('positions.goalkeepers')}</h2>
            <TeamListPlayers players={teamData.goalkeepers} />
          </>
        )}

        {teamData.defenders && (
          <>
            <h2 className={`layoutH2effect`}>{t('positions.defenders')}</h2>
            <TeamListPlayers players={teamData.defenders} />
          </>
        )}

        {teamData.forwards && (
          <>
            <h2 className={`layoutH2effect`}>{t('positions.forwards')}</h2>
            <TeamListPlayers players={teamData.forwards} />
          </>
        )}
      </div>
    </div>
  );
}
