
"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import c01 from "@/assets/category/ct1.webp";
import c02 from "@/assets/category/ct2.webp";
import c03 from "@/assets/category/ct3.webp";
import c04 from "@/assets/category/ct4.webp";
import c05 from "@/assets/category/ct5.webp";
import c06 from "@/assets/category/ct6.webp";

type CategoryItem = {
  id: number;
  image: StaticImageData;
  title: string;
  slug: string;
};

const categories: CategoryItem[] = [
  {
    id: 1,
    image: c01,
    title: "BOXY FIT T-SHIRTS",
    slug: "boxy-fit-t-shirts",
  },
  {
    id: 2,
    image: c02,
    title: "Hoodies",
    slug: "hoodies",
  },
  {
    id: 3,
    image: c03,
    title: "Shirts",
    slug: "shirts",
  },
  {
    id: 4,
    image: c04,
    title: "Shoes",
    slug: "shoes",
  },
  {
    id: 5,
    image: c05,
    title: "Accessories",
    slug: "accessories",
  },
  {
    id: 6,
    image: c06,
    title: "Woman T-SHIRTS",
    slug: "woman-t-shirts",
  },
];

const Categories = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="h-[90vh] md:h-screen"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link
              href={`/shop?category=${category.slug}`}
              className="group relative block h-full w-full overflow-hidden"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/40" />

              {/* Category Title */}
              <div className="absolute bottom-8 left-8 z-10 text-white md:bottom-12 md:left-12">
                <h3 className="text-2xl font-black uppercase tracking-widest md:text-3xl">
                  {category.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Categories;
