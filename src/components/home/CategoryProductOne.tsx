"use client";

import { useRef, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import { productList } from "@/api/productApi";
import ProductCard from "../products/ProductCard";
import SectionHeader from "../common-section/reuseble/SectionHeaderProps";

const CategoryProductOne = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="w-full border-t border-gray-100 pt-16">
      <div className="site-container">
        {/* Section Heading */}
        <SectionHeader
          title="Boxy Fit T-Shirts"
          subtitle="Boxy Fit T-Shirts"
          icon="👕"
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
          isBeginning={isBeginning}
          isEnd={isEnd}
        />

        {/* Product Slider */}
        <Swiper
          modules={[FreeMode]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onResize={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={{
            enabled: true,
            sticky: true,
          }}
          className="w-full"
        >
          {productList.slice(3,10).map((product) => (
            <SwiperSlide
              key={product.id}
              className="!w-[180px] md:!w-[220px] lg:!w-[260px]"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryProductOne;
