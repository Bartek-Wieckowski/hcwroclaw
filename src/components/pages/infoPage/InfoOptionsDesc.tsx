import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { Locale } from '@/i18n/i18n';
import { GetInfoPageQueryResult } from '../../../../sanity.types';
import { getTranslations } from 'next-intl/server';

type InfoOptionsDescProps = {
  description: NonNullable<GetInfoPageQueryResult>;
  lng: Locale;
};

export default async function InfoOptionsDesc({
  description,
  lng,
}: InfoOptionsDescProps) {
  const t = await getTranslations('infoPage');

  return (
    <>
      <SectionTitle part1={t('title1')} part2={t('title2')} as={'h1'} />
      <PortableTextRenderer
        content={description.infoOptions[lng]}
        styles={baseStyles}
        enableSocialLinks={true}
      />
    </>
  );
}
