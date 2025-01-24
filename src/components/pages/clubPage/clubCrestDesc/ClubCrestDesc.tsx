import styles from './ClubCrestDesc.module.css';
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import Image from 'next/image';
import { VideoPlayer } from '@/components/reactPlayer/ReactPlayer';
import { urlFor } from '@/sanity/lib/image';
import {
  BlockContent,
  CustomPortableTextComponents,
  LinkMarkDef,
} from '../types';
import { NewsBlock } from '../../../../../sanity.types';

type ClubCrestDescProps = {
  content: NewsBlock;
  onElementClick: (elementId: string) => void;
  activeElementId: string | null;
};

export default function ClubCrestDesc({
  content,
  onElementClick,
  activeElementId,
}: ClubCrestDescProps) {
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
      h3: ({ children }: PortableTextComponentProps<BlockContent>) => {
        if (!children) return null;

        const elementId = children
          .toString()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ł/g, 'l')
          .replace(/ą/g, 'a')
          .replace(/ę/g, 'e')
          .replace(/ś/g, 's')
          .replace(/ć/g, 'c')
          .replace(/ż|ź/g, 'z')
          .replace(/ó/g, 'o')
          .replace(/ń/g, 'n')
          .replace(/[„""]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/[^a-z0-9-\s]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        return (
          <h3
            className={`${styles.heading3} ${
              activeElementId === elementId ? styles.active : ''
            }`}
            onClick={() => onElementClick(elementId)}
          >
            {children}
          </h3>
        );
      },
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
    <div className={styles.descriptionContainer}>
      <PortableText value={content} components={components} />
    </div>
  );
}
