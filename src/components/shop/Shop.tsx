"use client";

import { useMemo, useState } from "react";

import { categories, productList } from "@/api/productApi";
import ProductCard from "../products/ProductCard";
import Campaing from "../home/Campaing";
import Archive from "../home/Archive";

const PRODUCTS_PER_PAGE = 10;

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return productList;

    return productList.filter(
      (product) => product.category === activeCategory,
    );
  }, [activeCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white md:pt-32 pt-20">
      <section className="md:mb-12 mb-8 w-full site-container">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
            Archives
          </h1>

          <span className="mb-1 text-xs font-black text-gray-400">
            [{filteredProducts.length} PRODUCTS]
          </span>
        </div>

        <nav
          aria-label="Product categories"
          className="sticky  top-[72px] z-40 -mx-1 flex flex-wrap gap-x-6 gap-y-3  bg-white/80 px-1 pb-4 pt-2 backdrop-blur-md md:top-24 md:gap-x-8"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => changeCategory(category)}
                aria-pressed={isActive}
                className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors md:tracking-[0.3em] ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent text-gray-300 hover:text-black"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </section>

      <section aria-label="Archive products" className="w-full site-container">
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 py-24 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              No products found in this category.
            </p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="Product pagination"
          className="mt-16 flex flex-wrap items-center justify-center gap-5 border-t border-gray-100 md:pt-20 pt-12 pb-10 md:gap-8"
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-current={currentPage === page ? "page" : undefined}
                className={`border-b-2 pb-1 text-[11px] font-black transition-colors ${
                  currentPage === page
                    ? "border-black text-black"
                    : "border-transparent text-gray-300 hover:text-black"
                }`}
              >
                {String(page).padStart(2, "0")}
              </button>
            ),
          )}
        </nav>
      )}

      <Campaing/>
      <Archive/>
    </main>
  );
}