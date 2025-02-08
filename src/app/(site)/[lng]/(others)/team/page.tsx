import styles from './teamPage.module.css';
import TeamSlider from '@/components/pages/teamPage/teamSlider/TeamSlider';
import TeamListPlayers from '@/components/pages/teamPage/teamListPlayers/TeamListPlayers';
import Spinner from '@/components/spinner/Spinner';
import { getTeamPageDataQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Locale } from '@/i18n/i18n';

export const revalidate = 300;

type TeamPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: TeamPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "teamPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Drużyna | HC Wrocław',
    en: 'Team | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Poznaj zawodników HC Wrocław - bramkarzy, obrońców i napastników tworzących naszą drużynę hokejową.',
    en: 'Meet HC Wroclaw players - goalkeepers, defenders and forwards that make up our hockey team.',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function TeamPage() {
  const teamData = await client.fetch(getTeamPageDataQuery);
  const t = await getTranslations('teamPage');

  if (!teamData) {
    return <Spinner />;
  }

  return (
    <div className={styles.teamPage}>
      <TeamSlider images={teamData.teamSliderImages} />

      <div className={styles.playersSection}>
        {teamData.goalkeepers && (
          <>
            <h2 className="">{t('positions.goalkeepers')}</h2>
            <TeamListPlayers players={teamData.goalkeepers} />
          </>
        )}

        {teamData.defenders && (
          <>
            <h2 className="">{t('positions.defenders')}</h2>
            <TeamListPlayers players={teamData.defenders} />
          </>
        )}

        {teamData.forwards && (
          <>
            <h2 className="">{t('positions.forwards')}</h2>
            <TeamListPlayers players={teamData.forwards} />
          </>
        )}
      </div>
    </div>
  );
}
