import GameCalendar from '@/components/gameCalendar/GameCalendar';
import HeroHomepage from '@/components/pages/homepage/hero/HeroHompage';
import MeetClub from '@/components/pages/homepage/meetClub/MeetClub';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { getTranslations } from '@/i18n/getTranslations';
import { Locale } from '@/i18n/config';

type HomePageProps = {
  params: { lng: Locale };
};

export default async function HomePage({ params }: HomePageProps) {
  const translations = getTranslations(params.lng);

  return (
    <>
      <HeroHomepage />
      <SectionTitle
        part1={translations.common.calendar}
        part2={translations.common.games}
      />
      <GameCalendar withMargin={true} lng={params.lng} />
      {/* <MeetClub /> */}
    </>
  );
}
