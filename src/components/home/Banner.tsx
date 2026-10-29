
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import banner01 from "@/assets/banner/banner_1.webp";
import banner02 from "@/assets/banner/banner _2.webp";
import banner03 from "@/assets/banner/banner _3.webp";

type BannerItem = {
  id: number;
  image: StaticImageData;
  season: string;
  title: string;
  collectionLink: string;
  shopLink: string;
};

const banners: BannerItem[] = [
  {
    id: 1,
    image: banner01,
    season: "AUTUMN'26",
    title: "COLLECTION IS LIVE",
    collectionLink: "/collections/autumn-26",
    shopLink: "/shop",
  },
  {
    id: 2,
    image: banner02,
    season: "NEW SEASON",
    title: "DEFINE YOUR STYLE",
    collectionLink: "/collections/new",
    shopLink: "/shop",
  },
  {
    id: 3,
    image: banner03,
    season: "FÉLICITÉ 2026",
    title: "MODERN LUXURY",
    collectionLink: "/collections/luxury",
    shopLink: "/shop",
  },
];

const SLIDE_DURATION = 5000;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  return (
    <section className="relative h-dvh min-h-[500px] w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1000}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper: SwiperType) => {
          setActiveIndex(swiper.realIndex);
          setProgress(0);
        }}
        onAutoplayTimeLeft={(_, __, percentage) => {
          setProgress((1 - percentage) * 100);
        }}
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full bg-[#101113]">
              {/* Background Image */}
              <Image
                src={banner.image}
                alt={`Félicité Collection ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={85}
                className="pointer-events-none select-none object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="relative h-[2px] overflow-hidden bg-white/30 transition-[width] duration-500"
            style={{
              width: activeIndex === index ? 48 : 24,
            }}
          >
            {activeIndex === index && (
              <div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Banner Content */}
      <div className="pointer-events-none absolute bottom-12 left-6 z-20 text-white md:bottom-16 md:left-24">
        <div
          key={activeIndex}
          className="animate-[fadeUp_0.8s_ease-out_both] space-y-4 md:space-y-6"
        >
          <p className="text-sm font-bold uppercase tracking-tight md:text-lg">
            {banners[activeIndex].season}
          </p>

          <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-5xl lg:text-7xl">
            {banners[activeIndex].title}
          </h2>

          <div className="pointer-events-auto mt-4 flex flex-col gap-6 text-[14px] font-bold uppercase tracking-tight sm:flex-row md:gap-10 md:text-xl">
            <Link
              href="/shop"
              className="w-fit cursor-pointer underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70"
            >
              Surf Autumn&apos;26
            </Link>

            <Link
              href={banners[activeIndex].shopLink}
              className="w-fit cursor-pointer underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
