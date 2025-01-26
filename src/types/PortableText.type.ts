import { PortableTextBlock } from '@portabletext/types';
import { Image as SanityImage } from 'sanity';

export type BaseCustomPortableTextComponents = {
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
};

export type BaseBlockContent = PortableTextBlock & {
  _type: string;
  style?: string;
  children?: any[];
};

export type BaseLinkMarkDef = {
  _type: string;
  href: string;
  linkType:
    | 'external'
    | 'internal'
    | 'whatsapp'
    | 'messenger'
    | 'phone'
    | 'email';
};

export type StylesConfig = {
  imageWrapper?: string;
  image?: string;
  imageContainer?: string;
  textWithImage?: string;
  textContent?: string;
  heading3?: string;
  paragraph?: string;
  blockquote?: string;
  link?: string;
  bulletList?: string;
  bulletListItem?: string;
};
