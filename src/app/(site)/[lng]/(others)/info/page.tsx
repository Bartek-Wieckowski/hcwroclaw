import styles from './infoPage.module.css';
import Spinner from '@/components/spinner/Spinner';
import InfoOptionsDesc from '@/components/pages/infoPage/InfoOptionsDesc';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { getInfoPageQuery } from '@/sanity/lib/queries';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';

export const revalidate = 30;

type InfoPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: InfoPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "infoPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Info | HC Wrocław',
    en: 'Info | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Oficjalna strona Klubu Sportowego HC Wrocław. Sprawdź aktualne dane i najnowsze informacje dotyczące klubu.',
    en: 'The official website of the HC Wrocław Sports Club. Check out the up-to-date data and latest information about the club.',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function InfoPage() {
  const locale = (await getLocale()) as Locale;
  const data = await client.fetch(getInfoPageQuery);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.infoPage}>
      <InfoOptionsDesc description={data} lng={locale} />
    </div>
  );
}
