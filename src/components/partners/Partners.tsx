import styles from './partners.module.css';
import PartnersSlider from './PartnersSlider';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';
import { getPartnersQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export const revalidate = 300;

export default async function Partners() {
  const lng = (await getLocale()) as Locale;
  const data = await client.fetch(getPartnersQuery);

  if (!data?.partners?.length) return null;

  const { sectionTitle, partners } = data;

  return (
    <section className={styles.partnersSection}>
      <h2 className={`layoutH2effect ${styles.partnersTitle}`}>
        {sectionTitle[lng]}
      </h2>
      <PartnersSlider partners={partners} />
    </section>
  );
}
