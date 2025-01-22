import { getSingleNewsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { NewsSinglePage } from '@/components/pages/newsSinglePage/NewsSinglePage';
import { Locale } from '@/i18n/i18n';

type NewsSinglePageRouteProps = {
  params: {
    slug: string;
    lng: Locale;
  };
};

export default async function NewsSinglePageRoute({
  params,
}: NewsSinglePageRouteProps) {
  const { slug, lng } = params;
  const news = await client.fetch(getSingleNewsQuery, { slug });

  if (!news) {
    return <div>News not found</div>;
  }

  return <NewsSinglePage news={news} lng={lng} />;
}
