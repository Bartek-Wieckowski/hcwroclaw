import NewsListing from '@/components/pages/newsListingPage/NewsListing';
import WriteToUs from '@/components/pages/homepage/writeToUs/WriteToUs';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';
import { loadMoreNews } from '@/actions/actions';
import { NEWS_PER_PAGE } from '@/lib/constants';

export const revalidate = 300;

export default async function NewsListPage() {
  const locale = (await getLocale()) as Locale;
  const news = await loadMoreNews(0, NEWS_PER_PAGE);

  return (
    <>
      <NewsListing initialNews={news} lng={locale} />
      <WriteToUs lng={locale} />
    </>
  );
}
