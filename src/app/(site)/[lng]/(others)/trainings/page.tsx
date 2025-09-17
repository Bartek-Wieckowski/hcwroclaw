import styles from './trainingsPage.module.css';
import Spinner from '@/components/spinner/Spinner';
import TrainingsOptionsDesc from '@/components/pages/trainingsPage/TrainingsOptionsDesc';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { getTrainingsPageQuery } from '@/sanity/lib/queries';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';

export const revalidate = 30;

type TrainingsPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: TrainingsPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "trainingsPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Treningi | HC Wrocław',
    en: 'Trainings | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Sprawdź harmonogram treningów Klubu Hokejowego HC Wrocław. Aktualne terminy, godziny oraz lokalizacja treningów dla wszystkich grup wiekowych.',
    en: 'Check the training schedule of the HC Hockey Club Wrocław. Current dates, times and location of trainings for all age groups.',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function TrainingsPage() {
  const locale = (await getLocale()) as Locale;
  const data = await client.fetch(getTrainingsPageQuery);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.trainingsPage}>
      <TrainingsOptionsDesc description={data} lng={locale} />
    </div>
  );
}
