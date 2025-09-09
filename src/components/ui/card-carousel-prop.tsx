'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SparklesIcon } from 'lucide-react';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;

  // متن‌ها از والد
  title?: string;
  description?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
}

export const CardCarouselProp: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  title = 'Card Carousel',
  description = 'Seamless Images carousel animation.',
  badge = 'Latest component',
  badgeIcon = (
    <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />
  ),
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className="w-ace-y-4">
      <style>{css}</style>
      <div className="border-secondary/50 mx-auto w-full max-w-4xl rounded-[24px] border p-2 shadow-sm md:rounded-t-[44px]">
        <div className="from-secondary/10 to-card relative mx-auto flex w-full flex-col rounded-[24px] border bg-gradient-to-b p-2 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] md:items-start md:gap-8 md:rounded-t-[40px] md:rounded-b-[20px] md:p-2">
          {badge ? (
          <Badge
            variant="outline"
            className="absolute top-6 right-4 rounded-[14px] border text-base md:right-6"
          >
            <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{' '}
            {badge}
          </Badge>
          ) : null}
          <div className="flex flex-col justify-center pt-14 pb-2 pr-4 md:items-center">
            <div className="flex gap-2">
              <div>
                <h3 className="text-4xl font-bold tracking-tight opacity-85">
                  {title}
                </h3>
                {description ? (
                  <p className="text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={200}
                        height={200}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};