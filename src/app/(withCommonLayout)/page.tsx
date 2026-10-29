import Archive from "@/components/home/Archive";
import Banner from "@/components/home/Banner";
import BestSell from "@/components/home/BestSell";
import Campaing from "@/components/home/Campaing";
import Categories from "@/components/home/Categories";
import CategoryProductOne from "@/components/home/CategoryProductOne";
import HomeOverlayer from "@/components/home/HomeOverlayer";
import MustBuyProducts from "@/components/home/MustBuyProducts";
import TrendingProduct from "@/components/home/TrendingProduct";

import React from "react";

const page = () => {
  return (
    <div>
      <HomeOverlayer />
      <Banner />
      <Categories />
      <TrendingProduct />
      <BestSell />
      <CategoryProductOne />
      <MustBuyProducts />

      <div className="flex items-center justify-center py-12">
        <button className="text-white text-xs font-bold tracking-[4px] uppercase bg-primary px-12 py-5 cursor-pointer hover:scale-105 duration-300">
          View All Products
        </button>
      </div>

      <Campaing />
      <Archive />
    </div>
  );
};

export default page;
