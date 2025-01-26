import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { Locale } from '@/i18n/i18n';
import { GetContactPageQueryResult } from '../../../../sanity.types';
import { getTranslations } from 'next-intl/server';

type ContactOptionsDescProps = {
  description: NonNullable<GetContactPageQueryResult>;
  lng: Locale;
};

export default async function ContactOptionsDesc({
  description,
  lng,
}: ContactOptionsDescProps) {
  const t = await getTranslations('contactPage');

  return (
    <>
      <SectionTitle part1={t('title1')} part2={t('title2')} as={'h1'} />
      <PortableTextRenderer
        content={description.contactOptions[lng]}
        styles={baseStyles}
        enableSocialLinks={true}
      />
    </>
  );
}
