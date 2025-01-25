import styles from './clubCrestDesc.module.css';
import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { NewsBlock } from '../../../../../sanity.types';
import { PortableTextComponentProps } from '@portabletext/react';
import { BaseBlockContent } from '@/types/PortableText.type';

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
  const customComponents = {
    block: {
      h3: ({ children }: PortableTextComponentProps<BaseBlockContent>) => {
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
    },
  };

  return (
    <div className={styles.descriptionContainer}>
      <PortableTextRenderer
        content={content}
        styles={{ ...baseStyles, ...styles }}
        enableSocialLinks={false}
        customComponents={customComponents}
      />
    </div>
  );
}
