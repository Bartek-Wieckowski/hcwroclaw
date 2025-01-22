import styles from './latestNews.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { getLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { Locale } from '@/i18n/i18n';
import { urlFor } from '@/sanity/lib/image';
import { getHomePageLatestNewsQuery } from '@/sanity/lib/queries';
import { getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';

export default async function LatestNews() {
  const lng = (await getLocale()) as Locale;
  const news = await client.fetch(getHomePageLatestNewsQuery);
  const t = await getTranslations('homePage.latestNews');

  if (!news || news.length === 0) {
    return (
      <div className={styles.latestNews}>
        <SectionTitle
          part1={t('sectionTitle1')}
          part2={t('sectionTitle2')}
          variant="primary-secondary"
        />
        <div className={styles.noNews}>
          <p>{t('noNews')}</p>
        </div>
      </div>
    );
  }

  const [latestNews, ...recentNews] = news;

  const getSlugByLocale = (item: typeof latestNews) => {
    return lng === 'pl' ? item.slugPL.current : item.slugEN.current;
  };

  return (
    <div className={styles.latestNews}>
      <SectionTitle
        part1={t('sectionTitle1')}
        part2={t('sectionTitle2')}
        variant="primary-secondary"
      />

      <div className={styles.newsGrid}>
        <article className={styles.featuredNews}>
          <Link href={ROUTES.SINGLENEWS(lng, getSlugByLocale(latestNews))}>
            <div className={styles.featuredImageWrapper}>
              <Image
                src={urlFor(latestNews.mainPostImage).url()}
                alt={latestNews.title[lng]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.featuredImage}
              />
            </div>
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{latestNews.title[lng]}</h3>
              <p className={styles.featuredExcerpt}>
                {latestNews.excerpt[lng]}
              </p>
            </div>
          </Link>
        </article>

        <div className={styles.otherNews}>
          {recentNews.map((newsItem) => (
            <article key={newsItem._id} className={styles.newsCard}>
              <Link href={ROUTES.SINGLENEWS(lng, getSlugByLocale(newsItem))}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={urlFor(newsItem.mainPostImage).url()}
                    alt={newsItem.title[lng]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{newsItem.title[lng]}</h3>
                  <p className={styles.excerpt}>{newsItem.excerpt[lng]}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
