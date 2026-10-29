"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

type ProductGallaryProps = {
  images: (StaticImageData | string)[];
  name: string;
  video?: string;
};

const ProductGallary = ({ images, name, video }: ProductGallaryProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const mediaCount = images.length + (video ? 1 : 0);

  return (
    <section className="relative aspect-[4/5] w-full select-none overflow-hidden border-b border-gray-100 bg-[#f9f9f9] lg:sticky lg:top-20 lg:h-[calc(100dvh-5rem)] lg:w-[60%] lg:shrink-0 lg:aspect-auto lg:border-r lg:border-b-0">
      <Swiper
        modules={[A11y]}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveSlide(instance.activeIndex)}
        className="h-full w-full"
      >
        {/* Product Video */}
        {video && (
          <SwiperSlide>
            <div className="relative flex h-full w-full items-center justify-center p-4 md:p-12">
              <video
                src={video}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        )}

        {/* Product Images */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${name} - Image ${index + 1}`}
                width={800}
                height={1000}
                priority={index === 0 && !video}
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="pointer-events-none h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      {mediaCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous product image"
            onClick={() => swiper?.slidePrev()}
            disabled={activeSlide === 0}
            className="absolute top-1/2 left-5 z-10 -translate-y-1/2 rounded-full p-2 text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 md:left-8"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next product image"
            onClick={() => swiper?.slideNext()}
            disabled={activeSlide === mediaCount - 1}
            className="absolute top-1/2 right-5 z-10 -translate-y-1/2 rounded-full p-2 text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 md:right-8"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image Counter */}
          <div className="pointer-events-none absolute bottom-8 left-6 z-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 md:bottom-12 md:left-12">
            {activeSlide + 1} / {mediaCount}
          </div>

          {/* Custom Pagination */}
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-md">
            {Array.from({ length: mediaCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                onClick={() => swiper?.slideTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-6 bg-black"
                    : "w-1.5 bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductGallary;
