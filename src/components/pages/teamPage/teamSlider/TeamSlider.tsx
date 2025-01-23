'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './teamSlider.module.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GetTeamPageDataQueryResult } from '../../../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

type TeamSliderProps = {
  images: NonNullable<GetTeamPageDataQueryResult>['teamSliderImages'];
};

export default function TeamSlider({ images }: TeamSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      }}
      autoHeight={true}
      autoplay={{ delay: 5000 }}
      className={styles.sliderBart}
    >
      {images.map((image) => (
        <SwiperSlide key={image.asset?._id} className={styles.slide}>
          {image.asset?.url && (
            <Image
              src={urlFor(image).url()}
              alt="HC Wroclaw"
              width={1920}
              height={1080}
              priority
              className={styles.image}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
