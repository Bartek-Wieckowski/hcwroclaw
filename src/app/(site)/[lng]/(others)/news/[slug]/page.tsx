import styles from './slugSingleNewsPage.module.css';
import { getSingleNewsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { NewsSinglePage } from '@/components/pages/newsSinglePage/NewsSinglePage';
import { Locale } from '@/i18n/i18n';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type NewsSinglePageProps = {
  params: {
    lng: Locale;
    slug: string;
  };
};

export async function generateMetadata({ params: { lng, slug } }: NewsSinglePageProps): Promise<Metadata> {
  const meta = await client.fetch(`
    *[_type == "newsSinglePage" && (slugEN.current == $slug || slugPL.current == $slug)][0] {
      title,
      excerpt,
      seo {
        title,
        desc
      }
    }
  `, { slug });
  
  if (!meta) {
    return {
      title: 'Not Found | HC Wrocław',
      description: 'The page you are looking for does not exist.'
    };
  }

  const defaultTitle = {
    pl: `${meta.title?.pl || ''} | HC Wrocław`,
    en: `${meta.title?.en || ''} | HC Wroclaw`
  };
  
  const defaultDesc = {
    pl: meta.excerpt?.pl || '',
    en: meta.excerpt?.en || ''
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function NewsSinglePageRoute({
  params,
}: NewsSinglePageProps) {
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
