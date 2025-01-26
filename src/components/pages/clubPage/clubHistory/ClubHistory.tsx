import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { NewsBlock } from '../../../../../sanity.types';
import { useTranslations } from 'next-intl';

type ClubHistoryProps = {
  content: NewsBlock;
};

export default function ClubHistory({ content }: ClubHistoryProps) {
  const t = useTranslations('clubPage.clubHistory');

  return (
    <>
      <SectionTitle part1={t('title1')} part2={t('title2')} as={'h1'} />
      <PortableTextRenderer
        content={content}
        styles={baseStyles}
        enableSocialLinks={false}
      />
    </>
  );
}
