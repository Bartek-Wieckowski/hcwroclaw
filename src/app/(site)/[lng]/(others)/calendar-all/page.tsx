import styles from './calendarAllPage.module.css';
import CalendarAllGames from '@/components/pages/calendarAllGames/CalendarAllGames';
import Spinner from '@/components/spinner/Spinner';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { client } from '@/sanity/lib/client';
import { getAllGamesByYearQuery, getAllYearsQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export const revalidate = 300;

type CalendarAllPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: CalendarAllPageProps): Promise<Metadata> {
  const defaultTitle = {
    pl: 'Kalendarz Gier | HC Wrocław',
    en: 'Game Calendar | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Sprawdź pełny kalendarz gier HC Wrocław. Zobacz wszystkie mecze, turnieje i wydarzenia sportowe naszego klubu. Bądź na bieżąco z naszymi rozgrywkami!',
    en: 'Check out the complete game calendar of HC Wroclaw. See all matches, tournaments, and sporting events of our club. Stay up to date with our games!',
  };

  return {
    title: defaultTitle[lng],
    description: defaultDesc[lng],
  };
}

export default async function CalendarAll({
  params: { lng },
}: CalendarAllPageProps) {
  const t = await getTranslations('common');
  const locale = (await getLocale()) as Locale;
  const currentYear = new Date().getFullYear();

  const yearsData = await client.fetch(getAllYearsQuery);
  const availableYears = Array.from(
    new Set(yearsData.map((item) => new Date(item.date).getFullYear()))
  );

  availableYears.sort((a, b) => b - a);

  const games = await client.fetch(getAllGamesByYearQuery, {
    startDate: `${currentYear}-01-01T00:00:00Z`,
    endDate: `${currentYear + 1}-01-01T00:00:00Z`,
  });

  if (!games) {
    return <Spinner />;
  }

  return (
    <div className={styles.calendarAllPage}>
      <SectionTitle part1={t('calendar')} part2={t('games')} />
      <CalendarAllGames
        initialGames={games}
        currentYear={currentYear}
        availableYears={availableYears}
        lng={locale}
      />
    </div>
  );
}
