'use client';

import styles from '@/app/(site)/[lng]/(others)/news/news.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@/components/spinner/Spinner';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Locale } from '@/i18n/i18n';
import { NewsSinglePage } from '../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { loadMoreNews } from '@/actions/actions';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { ROUTES } from '@/lib/routes';
import { NEWS_PER_PAGE } from '@/lib/constants';
import { useTranslations } from 'use-intl';

type NewsListingProps = {
  initialNews: NewsSinglePage[];
  lng: Locale;
};

export default function NewsListing({ initialNews, lng }: NewsListingProps) {
  const t = useTranslations('newsListingPage');
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.news],
      queryFn: async ({ pageParam = 0 }) => {
        const result = await loadMoreNews(pageParam, pageParam + NEWS_PER_PAGE);
        return result;
      },
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < NEWS_PER_PAGE) return undefined;
        return pages.length * NEWS_PER_PAGE;
      },
      initialData: { pages: [initialNews], pageParams: [0] },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd MMMM yyyy', {
      locale: lng === 'pl' ? pl : enUS,
    });
  };

  const allNews = data.pages.flat();

  if (!allNews || allNews.length === 0) {
    return (
      <div className={styles.newsListingContainer}>
        <div className={styles.noNews}>
          <p>{t('noNews')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.newsListingContainer}>
      {allNews.length > 0 && (
        <article className={styles.featuredNews}>
          <Link
            href={ROUTES.SINGLENEWS(
              lng,
              lng === 'pl'
                ? allNews[0].slugPL.current
                : allNews[0].slugEN.current
            )}
          >
            <div className={styles.featuredImageWrapper}>
              <Image
                src={urlFor(allNews[0].mainPostImage).url()}
                alt={allNews[0].mainPostImage.alt[lng]}
                fill
                className={styles.featuredImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.dateFeatured}>
                {formatDate(allNews[0]._createdAt)}
              </span>
              <h2 className={styles.featuredTitle}>{allNews[0].title[lng]}</h2>
              <p className={styles.featuredExcerpt}>
                {allNews[0].excerpt[lng]}
              </p>
            </div>
          </Link>
        </article>
      )}

      <div className={styles.otherNews}>
        {allNews.slice(1).map((item) => (
          <article key={item._id} className={styles.newsCard}>
            <Link
              href={ROUTES.SINGLENEWS(
                lng,
                lng === 'pl' ? item.slugPL.current : item.slugEN.current
              )}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={urlFor(item.mainPostImage).url()}
                  alt={item.mainPostImage.alt[lng]}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <span className={styles.date}>
                  {formatDate(item._createdAt)}
                </span>
                <h3 className={styles.title}>{item.title[lng]}</h3>
                <p className={styles.excerpt}>{item.excerpt[lng]}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div ref={ref} className={styles.loader}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
}
