import styles from './supportPage.module.css';
import Spinner from '@/components/spinner/Spinner';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import SupportDesc from '@/components/pages/supportPage/SupportDesc';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { Locale } from '@/i18n/i18n';
import { getLocale, getTranslations } from 'next-intl/server';
import { getSupportPageQuery } from '@/sanity/lib/queries';

export const revalidate = 30;

type SupportPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: SupportPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "supportPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Wsparcie | HC Wrocław',
    en: 'Support | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Dołącz do naszej drużyny hokejowej i stań się częścią naszej pasji do sportu! Wspieraj nas jako partner i razem osiągajmy sukcesy na lodzie.',
    en: 'Join our hockey team and become part of our passion for the sport! Support us as a partner and together let`s achieve success on the ice.',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function SupportPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('supportPage');
  const data = await client.fetch(getSupportPageQuery);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.becomePartnerPage}>
      <SectionTitle
        part1={t('title1')}
        part2={t('title2')}
        as={'h1'}
        variant="secondary-primary"
      />
      <SupportDesc description={data} lng={locale} />
    </div>
  );
}
