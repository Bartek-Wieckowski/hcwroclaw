import styles from './clubPage.module.css';
import CrestInteractive from '@/components/pages/clubPage/clubCrestDesc/CrestInteractive';
import ClubHistory from '@/components/pages/clubPage/clubHistory/ClubHistory';
import Spinner from '@/components/spinner/Spinner';
import { client } from '@/sanity/lib/client';
import { getClubPageQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { Metadata } from 'next';

export const revalidate = 30;

type ClubPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: ClubPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "clubPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Klub | HC Wrocław',
    en: 'Club | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Odkryj nasz klub, jego historię oraz wartości, które nas definiują. Dołącz do nas, aby poznać naszą drużynę, wydarzenia i osiągnięcia. Razem tworzymy pasję do sportu!',
    en: 'Discover our club, its history, and the values that define us. Join us to learn about our team, events, and achievements. Together, we create a passion for sports!',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function ClubPage({ params: { lng } }: ClubPageProps) {
  const data = await client.fetch(getClubPageQuery);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.clubPage}>
      <ClubHistory content={data.clubHistory[lng]} />
      <CrestInteractive
        content={data.clubCrest[lng]}
        intro={data.titleIntroduction[lng]}
        summary={data.sectionSummary[lng]}
      />
    </div>
  );
}
