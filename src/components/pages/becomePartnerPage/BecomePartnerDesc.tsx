import styles from './becomePartnerDesc.module.css';
import Image from 'next/image';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { urlFor } from '@/sanity/lib/image';
import { Locale } from '@/i18n/i18n';
import {
  CustomPortableTextComponents,
  BlockContent,
  LinkMarkDef,
} from './types';
import { GetBecomePartnerPageQueryResult } from '../../../../sanity.types';

type BecomePartnerDescProps = {
  description: NonNullable<GetBecomePartnerPageQueryResult>;
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
      const formatLink = (
        linkType: string | undefined,
        href: string | undefined
      ): string => {
        if (!href) return '#';

        switch (linkType) {
          case 'whatsapp':
            return `https://wa.me/${href.replace(/[^0-9+]/g, '')}`;
          case 'messenger':
            return `https://m.me/${href}`;
          case 'phone':
            return `tel:${href.replace(/[^0-9+]/g, '')}`;
          case 'email':
            return `mailto:${href}`;
          default:
            return href;
        }
      };

      const href = formatLink(value?.linkType, value?.href);
      const isExternal =
        value?.linkType === 'external' ||
        value?.linkType === 'whatsapp' ||
        value?.linkType === 'messenger' ||
        value?.linkType === 'email';

      return (
        <a
          href={href}
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

export default function BecomePartnerDesc({
  description,
  lng,
}: BecomePartnerDescProps) {
  return (
    <div className={styles.becomePartnerDesc}>
      <PortableText
        value={description.becomePartnerDesc[lng]}
        components={components}
      />
    </div>
  );
}
