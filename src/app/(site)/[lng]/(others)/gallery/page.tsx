import styles from './galleryPage.module.css';
import Spinner from '@/components/spinner/Spinner';
import Gallery from '@/components/pages/galleryPage/Gallery';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { getGalleryPageQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { getTranslations } from 'next-intl/server';

export const revalidate = 300;

type GalleryPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: GalleryPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "galleryPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Galeria | HC Wrocław',
    en: 'Gallery | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Zobacz galerię zdjęć Klubu Hokejowego HC Wrocław. Relacje z treningów, meczów i wydarzeń klubowych - uchwycone sportowe emocje na lodzie!',
    en: 'Check out the photo gallery of the HC Wrocław Hockey Club. Reports from training, matches and club events - capturing sporting emotions on the ice!',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function GalleryPage() {
  const data = await client.fetch(getGalleryPageQuery);
  const t = await getTranslations('galleryPage');

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.galleryPage}>
      <SectionTitle part1={t('title1')} part2={t('title2')} as="h1" />
      <Gallery data={data} />
    </div>
  );
}
