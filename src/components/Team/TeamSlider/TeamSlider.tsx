'use client';

import Image from 'next/image';
import styles from './teamSlider.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Pagination } from 'swiper/modules';
import { teamImagesSlider } from './teamImagesSlider-data';

export default function TeamSlider() {
  return (
    <div className={styles.teamSliderWrapper}>
      <Swiper
        modules={[Scrollbar, A11y, Pagination]}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }}
        scrollbar={{ draggable: true }}
        autoHeight={true}
        className={styles.teamSliderSwiper}
      >
        {teamImagesSlider.map((imgSlider) => (
          <SwiperSlide key={imgSlider.id} className={styles.sliderSwiperSlide}>
            <Image
              src={imgSlider.path}
              alt={imgSlider.title}
              className={styles.teamSliderImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}