import Image from 'next/image';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { urlFor } from '@/sanity/lib/image';
import {
  BaseCustomPortableTextComponents,
  BaseBlockContent,
  BaseLinkMarkDef,
  StylesConfig,
} from '@/types/PortableText.type';

type PortableTextRendererProps = {
  content: any;
  styles: StylesConfig;
  enableSocialLinks?: boolean;
  customComponents?: {
    types?: Record<string, any>;
    block?: Record<string, any>;
    marks?: Record<string, any>;
    list?: Record<string, any>;
    listItem?: Record<string, any>;
  };
};

export function PortableTextRenderer({
  content,
  styles,
  enableSocialLinks = false,
  customComponents = {},
}: PortableTextRendererProps) {
  const defaultComponents = {
    types: {
      image: ({
        value,
      }: PortableTextComponentProps<
        BaseCustomPortableTextComponents['image']
      >) => (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={urlFor(value.asset).format('webp').quality(80).url()}
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
        BaseCustomPortableTextComponents['youtube']
      >) => <VideoPlayer url={value.url} />,
      textWithImage: ({
        value,
      }: PortableTextComponentProps<
        BaseCustomPortableTextComponents['textWithImage']
      >) => (
        <div className={styles.textWithImage}>
          <div className={styles.textContent}>
            <p>{value.text}</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={urlFor(value.image).format('webp').quality(80).url()}
              alt={value.image.alt || ''}
              fill
              className={styles.image}
            />
          </div>
        </div>
      ),
      ...customComponents.types,
    },
    block: {
      h3: ({ children }: PortableTextComponentProps<BaseBlockContent>) => (
        <h3 className={styles.heading3}>{children}</h3>
      ),
      blockquote: ({
        children,
      }: PortableTextComponentProps<BaseBlockContent>) => (
        <blockquote className={styles.blockquote}>{children}</blockquote>
      ),
      normal: ({ children }: PortableTextComponentProps<BaseBlockContent>) => (
        <p className={styles.paragraph}>{children}</p>
      ),
      ...customComponents.block,
    },
    marks: {
      link: ({
        value,
        children,
      }: PortableTextMarkComponentProps<BaseLinkMarkDef>) => {
        const formatLink = enableSocialLinks
          ? (
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
            }
          : (linkType: string | undefined, href: string | undefined): string =>
              href || '#';

        const href = formatLink(value?.linkType, value?.href);
        const isExternal =
          value?.linkType === 'external' ||
          (enableSocialLinks &&
            ['whatsapp', 'messenger', 'email'].includes(value?.linkType || ''));

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
      ...customComponents.marks,
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<BaseBlockContent>) => (
        <ul className={styles.bulletList}>{children}</ul>
      ),
      ...customComponents.list,
    },
    listItem: {
      bullet: ({ children }: PortableTextComponentProps<BaseBlockContent>) => (
        <li className={styles.bulletListItem}>{children}</li>
      ),
      ...customComponents.listItem,
    },
  };

  return <PortableText value={content} components={defaultComponents} />;
}
