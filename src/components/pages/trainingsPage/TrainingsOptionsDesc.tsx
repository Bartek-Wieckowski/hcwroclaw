import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { Locale } from '@/i18n/i18n';
import { GetTrainingsPageQueryResult } from '../../../../sanity.types';
import { getTranslations } from 'next-intl/server';

type TrainingsOptionsDescProps = {
  description: NonNullable<GetTrainingsPageQueryResult>;
  lng: Locale;
};

export default async function TrainingsOptionsDesc({
  description,
  lng,
}: TrainingsOptionsDescProps) {
  const t = await getTranslations('trainingsPage');

  return (
    <>
      <SectionTitle part1={t('title1')} part2={t('title2')} as={'h1'} />
      <PortableTextRenderer
        content={description.trainingsOptions[lng]}
        styles={baseStyles}
        enableSocialLinks={true}
      />
    </>
  );
}
