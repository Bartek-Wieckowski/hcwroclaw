import styles from "./homepage.module.css";
import GameCalendar from "@/components/gameCalendar/GameCalendar";
import HeroHomepage from "@/components/pages/homepage/hero/HeroHompage";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import MeetClub from "@/components/pages/homepage/meetClub/MeetClub";
import WriteToUs from "@/components/pages/homepage/writeToUs/WriteToUs";
import LeagueTables from "@/components/leagueTables/LeagueTables";
import LatestNews from "@/components/pages/homepage/latestNews/LatestNews";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Locale } from "@/i18n/i18n";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { BsCalendar2Date } from "react-icons/bs";
import { ROUTES } from "@/lib/routes";

export const revalidate = 300;

type HomePageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: HomePageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "homePage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: "Hockey Club Wrocław | Oficjalna strona klubu",
    en: "Hockey Club Wroclaw | Official club website",
  };

  const defaultDesc = {
    pl: "Oficjalna strona Hockey Club Wrocław. Sprawdź aktualności, poznaj naszą drużynę i dołącz do hokejowej społeczności we Wrocławiu.",
    en: "Official website of Hockey Club Wroclaw. Check the news, meet our team and join the hockey community in Wrocław.",
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function HomePage() {
  const t = await getTranslations("common");
  const tAccessibility = await getTranslations("accessibility");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <HeroHomepage />
      <div className={styles.calendarTitleWithBtn}>
        <SectionTitle part1={t("calendar")} part2={t("games")} />
        <Link
          href={ROUTES.CALENDARALL(locale)}
          aria-label={tAccessibility("fullCalendar")}
        >
          <BsCalendar2Date aria-hidden="true" />
        </Link>
      </div>
      <GameCalendar key={"homepage"} withMargin={true} lng={locale} />
      <main className="main">
        <section className="pageContent">
          <MeetClub />
          <WriteToUs lng={locale} />
          <LatestNews />
        </section>
        <aside className="asideLeageTables">
          <LeagueTables />
        </aside>
      </main>
    </>
  );
}
