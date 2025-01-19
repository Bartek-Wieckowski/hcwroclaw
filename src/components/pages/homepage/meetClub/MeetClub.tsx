import styles from './meetClub.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { Locale } from '@/i18n/i18n';
import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { getHomePageAboutUsSectionQuery } from '@/sanity/lib/queries';

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

export default async function MeetClub() {
  const lng = (await getLocale()) as Locale;
  const t = await getTranslations('homePage');

  const [aboutUsData] = await client.fetch(getHomePageAboutUsSectionQuery);
  const aboutUsSection = aboutUsData.aboutUsSection;

  return (
    <div className={styles.meetClub}>
      <div className={styles.meetClubBg}>
        <div className={styles.content}>
          <div className={styles.info}>
            <SectionTitle
              part1={t('aboutUsSection.sectionTitle1')}
              part2={t('aboutUsSection.sectionTitle2')}
              variant="secondary-primary"
            />
            <p className={styles.description}>
              {aboutUsSection.description[lng]}
            </p>
            <div className={styles.stats}>
              <StatItem
                number={aboutUsSection.activePlayers.number}
                text={aboutUsSection.activePlayers.text[lng]}
              />

              <StatItem
                number={aboutUsSection.gamePerSeasson.number}
                text={aboutUsSection.gamePerSeasson.text[lng]}
              />

              <StatItem
                number={aboutUsSection.trainingAtWeek.number}
                text={aboutUsSection.trainingAtWeek.text[lng]}
              />

              <StatItem
                number={aboutUsSection.leagueNumbers.number}
                text={aboutUsSection.leagueNumbers.text[lng]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
