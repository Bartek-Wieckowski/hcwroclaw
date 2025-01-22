import styles from './newsSinglePage.module.css';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { formatDateInNews } from '@/lib/helpers';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { GetSingleNewsQueryResult } from '../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { Locale } from '@/i18n/i18n';

type Props = {
  news: NonNullable<GetSingleNewsQueryResult>;
  lng: Locale;
};

const components = {
  types: {
    image: ({ value }: any) => (
      <div className={styles.imageContainer}>
        <Image
          src={urlFor(value.asset).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className={styles.image}
        />
        {value.alt && <p className={styles.imageCaption}>{value.alt}</p>}
      </div>
    ),
    youtube: ({ value }: any) => <VideoPlayer url={value.url} />,
    textWithImage: ({ value }: any) => (
      <div className={styles.textWithImage}>
        <div className={styles.textContent}>
          <p>{value.text}</p>
        </div>
        <div className={styles.imageContent}>
          <Image
            src={urlFor(value.image).url()}
            alt={value.image.alt || ''}
            width={400}
            height={300}
            className={styles.image}
          />
        </div>
      </div>
    ),
  },
};

export function NewsSinglePage({ news, lng }: Props) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{news.title[lng]}</h1>
        <time className={styles.date}>
          {formatDateInNews(news._createdAt, lng)}
        </time>
      </header>

      {news.mainPostImage && (
        <div className={styles.mainImageContainer}>
          <Image
            src={urlFor(news.mainPostImage).url()}
            alt={news.mainPostImage.alt[lng] || ''}
            width={1200}
            height={675}
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
