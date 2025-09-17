'use client';

import styles from './gallery.module.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { GetGalleryPageQueryResult } from '../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

type GalleryProps = {
  data: NonNullable<GetGalleryPageQueryResult>;
};

export default function Gallery({ data }: GalleryProps) {
  const images =
    data.images?.map((img) => ({
      original: urlFor(img).format('webp').quality(80).url() || '',
      thumbnail: urlFor(img).format('webp').quality(80).url() || '',
      originalAlt: 'HC Wrocław hockey player during game or training',
      thumbnailAlt: 'HC Wrocław hockey player during game or training',
    })) || [];

  return (
    <div className={styles.galleryWrapper}>
      <ImageGallery
        items={images}
        showPlayButton={true}
        showFullscreenButton={true}
        slideInterval={4000}
        slideDuration={450}
        showThumbnails={true}
        showBullets={false}
        autoPlay={false}
        lazyLoad={true}
      />
    </div>
  );
}
