import GameCalendar from '@/components/gameCalendar/GameCalendar';
import HeroHomepage from '@/components/pages/homepage/hero/HeroHompage';
import MeetClub from '@/components/pages/homepage/meetClub/MeetClub';
import SectionTitle from '@/components/sectionTitle/SectionTitle';

export default async function HomePage() {
  return (
    <>
      <HeroHomepage />
      <SectionTitle part1="Kalendarz" part2="Gier" />
      <GameCalendar withMargin={true} />
      {/* <MeetClub /> */}
    </>
  );
}
