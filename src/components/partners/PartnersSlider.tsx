'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './partners.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { GetPartnersQueryResult } from '../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

type PartnersSliderProps = {
  partners: NonNullable<GetPartnersQueryResult>['partners'];
};

export default function PartnersSlider({ partners }: PartnersSliderProps) {
  const shouldUseSlider = partners.length > 2;

  const renderPartnerLogo = (
    partner: NonNullable<GetPartnersQueryResult>['partners'][0]
  ) => (
    <div className={styles.logoWrapper}>
      {partner.logo.asset && (
        <Image
          src={urlFor(partner.logo).format('webp').quality(80).url()}
          alt={partner.name}
          fill
          sizes="33vw"
          className={styles.partnersImage}
        />
      )}
    </div>
  );

  const renderPartnerItem = (
    partner: NonNullable<GetPartnersQueryResult>['partners'][0],
    index: number
  ) => {
    const content =
      partner.hasWebsite && partner.url ? (
        <Link
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerLink}
        >
          {renderPartnerLogo(partner)}
        </Link>
      ) : (
        renderPartnerLogo(partner)
      );

    return shouldUseSlider ? (
      <SwiperSlide
        key={`partner-${partner.name}-${index}`}
        className={styles.slide}
      >
        {content}
      </SwiperSlide>
    ) : (
      <div
        key={`partner-${partner.name}-${index}`}
        className={styles.staticSlide}
      >
        {content}
      </div>
    );
  };

  if (!shouldUseSlider) {
    return (
      <div className={styles.staticWrapper}>
        {partners.map((partner, index) => renderPartnerItem(partner, index))}
      </div>
    );
  }

  return (
    <div className={styles.partnersLogoSlider}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={32}
        slidesPerView={1}
        speed={5000}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          420: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        className={styles.swiper}
      >
        {[...partners, ...partners].map((partner, index) =>
          renderPartnerItem(partner, index)
        )}
      </Swiper>
    </div>
  );
}
