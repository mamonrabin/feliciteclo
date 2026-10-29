"use client"
import ProductCard from "./ProductCard";
import { productList } from "@/api/productApi";

const RelativeProducts = () => {
  return (
    <div className="site-container">
      <h2 className="text-center uppercase text-sm font-bold tracking-[6px] text-primary/40">
        Complementary Pieces
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:mt-16 mt-12">
        {productList.slice(0,8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelativeProducts;
