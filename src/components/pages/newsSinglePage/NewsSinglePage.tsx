import styles from './componentNewsSinglePage.module.css';
import Image from 'next/image';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { formatDateInNews } from '@/lib/helpers';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { GetSingleNewsQueryResult } from '../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { Locale } from '@/i18n/i18n';
import {
  CustomPortableTextComponents,
  BlockContent,
  LinkMarkDef,
} from './types';

type NewsSinglePageProps = {
  news: NonNullable<GetSingleNewsQueryResult>;
  lng: Locale;
};

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
    }: PortableTextComponentProps<CustomPortableTextComponents['youtube']>) => (
      <VideoPlayer url={value.url} />
    ),
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
    blockquote: ({ children }: PortableTextComponentProps<BlockContent>) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
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

export function NewsSinglePage({ news, lng }: NewsSinglePageProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{news.title[lng]}</h1>
        <time className={styles.date}>
          {formatDateInNews(news._createdAt, lng)}
        </time>
      </header>

      {news.mainPostImage && (
        <div className={styles.mainImageWrapper}>
          <Image
            src={urlFor(news.mainPostImage).url()}
            alt={news.mainPostImage.alt[lng] || ''}
            fill
            className={styles.mainImage}
          />
        </div>
      )}

      <div className={styles.content}>
        {news.content?.[lng] ? (
          <PortableText value={news.content[lng]!} components={components} />
        ) : (
          <p className={styles.excerpt}>{news.excerpt[lng]}</p>
        )}
      </div>
    </article>
  );
}
