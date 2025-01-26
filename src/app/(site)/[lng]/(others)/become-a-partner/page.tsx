import styles from './becomePartnerPage.module.css';
import Spinner from '@/components/spinner/Spinner';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import BecomePartnerDesc from '@/components/pages/becomePartnerPage/BecomePartnerDesc';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { Locale } from '@/i18n/i18n';
import { getLocale, getTranslations } from 'next-intl/server';
import { getBecomePartnerPageQuery } from '@/sanity/lib/queries';

export const revalidate = 300;

type BecomePartnerPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: BecomePartnerPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "becomePartnerPage"][0] {seo{title, desc}}`
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

export default async function BecomePartnerPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('becomePartnerPage');
  const data = await client.fetch(getBecomePartnerPageQuery);

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
      <BecomePartnerDesc description={data} lng={locale} />
    </div>
  );
}
