import GameCalendar from '@/components/gameCalendar/GameCalendar';
import HeroHomepage from '@/components/pages/homepage/hero/HeroHompage';
import MeetClub from '@/components/pages/homepage/meetClub/MeetClub';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { getTranslations, getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';

export default async function HomePage() {
  const t = await getTranslations('common');
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <HeroHomepage />
      <SectionTitle part1={t('calendar')} part2={t('games')} />
      <GameCalendar key={'homepage'} withMargin={true} lng={locale} />
      {/* <MeetClub /> */}
    </>
  );
}
