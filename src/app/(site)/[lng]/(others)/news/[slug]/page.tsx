import styles from './slugSingleNewsPage.module.css';
import { getSingleNewsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { NewsSinglePage } from '@/components/pages/newsSinglePage/NewsSinglePage';
import { Locale } from '@/i18n/i18n';
import { getTranslations } from 'next-intl/server';

type NewsSinglePageRouteProps = {
  params: {
    slug: string;
    lng: Locale;
  };
};

export default async function NewsSinglePageRoute({
  params,
}: NewsSinglePageRouteProps) {
  const t = await getTranslations('newsSinglePage');
  const { slug, lng } = params;
  const news = await client.fetch(getSingleNewsQuery, { slug });

  if (!news) {
    return (
      <div className={styles.newsSinglePageContainer}>
        <p className={styles.noNews}>{t('noSingleContentNews')}</p>
      </div>
    );
  }

  return <NewsSinglePage news={news} lng={lng} />;
}
