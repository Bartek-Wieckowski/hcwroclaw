import { PortableTextBlock } from '@portabletext/types';
import { Image as SanityImage } from 'sanity';

export interface CustomPortableTextComponents {
  image: {
    asset: SanityImage;
    alt?: string;
  };
  youtube: {
    url: string;
  };
  textWithImage: {
    text: string;
    image: {
      asset: SanityImage;
      alt?: string;
    };
  };
}

export type BlockContent = PortableTextBlock & {
  _type: string;
  style?: string;
  children?: any[];
};

export interface LinkMarkDef {
  _type: 'link';
  href: string;
  linkType: 'external' | 'internal';
} 