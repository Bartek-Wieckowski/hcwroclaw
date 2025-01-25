import NewsListing from '@/components/pages/newsListingPage/NewsListing';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';
import { loadMoreNews } from '@/actions/actions';
import { NEWS_PER_PAGE } from '@/lib/constants';
import { Metadata } from 'next';

export const revalidate = 300;

type NewsPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: NewsPageProps): Promise<Metadata> {
  const defaultTitle = {
    pl: 'Aktualności | HC Wrocław',
    en: 'News | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Najnowsze informacje i aktualności z życia klubu Hockey Club Wrocław. Bądź na bieżąco z wydarzeniami w naszym klubie.',
    en: 'Latest news and updates from Hockey Club Wroclaw. Stay up to date with events in our club.',
  };

  return {
    title: defaultTitle[lng],
    description: defaultDesc[lng],
  };
}

export default async function NewsListPage() {
  const locale = (await getLocale()) as Locale;
  const news = await loadMoreNews(0, NEWS_PER_PAGE);

  return (
    <>
      <NewsListing initialNews={news} lng={locale} />
    </>
  );
}
