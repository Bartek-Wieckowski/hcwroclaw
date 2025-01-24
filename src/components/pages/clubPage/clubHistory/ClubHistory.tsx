import styles from './clubHistory.module.css';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import Image from 'next/image';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { urlFor } from '@/sanity/lib/image';
import {
  BlockContent,
  CustomPortableTextComponents,
  LinkMarkDef,
} from '../types';
import { NewsBlock } from '../../../../../sanity.types';
import { useTranslations } from 'next-intl';

type ClubHistoryProps = {
  content: NewsBlock;
};

export default function ClubHistory({ content }: ClubHistoryProps) {
  const t = useTranslations('clubPage.clubHistory');
  const components = {
    types: {
      image: ({
        value,
      }: PortableTextComponentProps<CustomPortableTextComponents['image']>) => (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={urlFor(value.asset).url()}
              alt={value.alt || ''}
              fill
              className={styles.image}
            />
          </div>
        </div>
      ),
      youtube: ({
        value,
      }: PortableTextComponentProps<
        CustomPortableTextComponents['youtube']
      >) => <VideoPlayer url={value.url} />,
      textWithImage: ({
        value,
      }: PortableTextComponentProps<
        CustomPortableTextComponents['textWithImage']
      >) => (
        <div className={styles.textWithImage}>
          <div className={styles.textContent}>
            <p>{value.text}</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={urlFor(value.image).url()}
              alt={value.image.alt || ''}
              fill
              className={styles.image}
            />
          </div>
        </div>
      ),
    },
    block: {
      h3: ({ children }: PortableTextComponentProps<BlockContent>) => (
        <h3 className={styles.heading3}>{children}</h3>
      ),
      normal: ({ children }: PortableTextComponentProps<BlockContent>) => (
        <p className={styles.paragraph}>{children}</p>
      ),
    },
    marks: {
      link: ({
        value,
        children,
      }: PortableTextMarkComponentProps<LinkMarkDef>) => {
        const isExternal = value?.linkType === 'external';
        return (
          <a
            href={value?.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={styles.link}
          >
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<BlockContent>) => (
        <ul className={styles.bulletList}>{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }: PortableTextComponentProps<BlockContent>) => (
        <li className={styles.bulletListItem}>{children}</li>
      ),
    },
  };

  return (
    <>
      <SectionTitle part1={t('title1')} part2={t('title2')} />
      <PortableText value={content} components={components} />
    </>
  );
}
