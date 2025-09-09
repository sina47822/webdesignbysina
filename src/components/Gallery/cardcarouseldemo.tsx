import React from 'react';

import { CardCarousel } from '../ui/card-carousel';
import { CardCarouselProp } from '../ui/card-carousel-prop';
const CardCaroursalDemo = () => {
  const images = [
    { src: '/assets/images/gallery/1.webp', alt: 'Image 1' },
    { src: '/assets/images/gallery/2.webp', alt: 'Image 2' },
    { src: '/assets/images/gallery/3.webp', alt: 'Image 3' },
  ];

  return (
    <div className="w-full">
      <CardCarouselProp
        images={images}
        title="نمونه کارها"
        description="گلچینی از اسکرین‌شات‌های پروژه‌های اخیر."
        badge="Portfolio"
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default CardCaroursalDemo;