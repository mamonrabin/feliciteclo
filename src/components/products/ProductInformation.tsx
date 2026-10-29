
"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import SizeModel from "./SizeModel";

type ProductInformationProps = {
  product: {
    name: string;
    price: number;
    color: string;
    description: string;
  };
};

const sizes = [
  { label: "XS", disabled: true },
  { label: "S", disabled: true },
  { label: "M", disabled: false },
  { label: "L", disabled: false },
  { label: "XL", disabled: false },
  { label: "2XL", disabled: false },
  { label: "3XL", disabled: false },
];

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#dc2626" },
  { name: "Yellow", value: "#ca8a04" },
];

const ProductInformation = ({
  product,
}: ProductInformationProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const information = [
    {
      title: "Product Details",
      icon: Package,
      content: product.description,
    },
    {
      title: "Shipping Details",
      icon: Truck,
      content:
        "We deliver across Bangladesh. Delivery charges and estimated delivery dates are confirmed at checkout.",
    },
    {
      title: "Care Instructions",
      icon: Sparkles,
      content:
        "Wash inside out with similar colours. Use a gentle cycle and cold water. Avoid bleach and follow the garment care label.",
    },
    {
      title: "Returns & Exchange",
      icon: ShieldCheck,
      content:
        "Please contact our support team for return and exchange eligibility. Items must meet the store's return policy.",
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    // Connect your cart context, Zustand store, or API here.
    console.log("Add to cart:", {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
  };

  return (
    <section className="w-full space-y-8 p-6 md:space-y-12 md:px-12 md:py-8 lg:w-[40%]">
      {/* Title and Price */}
      <div className="flex items-start justify-between gap-4 md:gap-8">
        <h1 className="max-w-md text-xl font-black uppercase tracking-tight md:text-2xl">
          {product.name}
        </h1>

        <p className="shrink-0 text-lg font-black md:text-2xl">
          ৳{product.price.toLocaleString("en-US")}
        </p>
      </div>

      {/* Color Selection */}
      <div className="space-y-6">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
          Select Color
        </span>

        <div className="flex flex-wrap gap-4 rounded-sm bg-gray-50 p-4 md:p-6">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              aria-label={color.name}
              aria-pressed={selectedColor === color.value}
              title={color.name}
              onClick={() => setSelectedColor(color.value)}
              style={{ backgroundColor: color.value }}
              className={`h-14 w-12 cursor-pointer border border-white transition-all duration-200 hover:scale-105 md:h-16 md:w-14 ${
                selectedColor === color.value
                  ? "ring-2 ring-black ring-offset-2"
                  : "ring-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            Select Size
          </span>

          <SizeModel />
        </div>

        <div className="grid grid-cols-7 border border-gray-100">
          {sizes.map((size) => (
            <button
              key={size.label}
              type="button"
              disabled={size.disabled}
              aria-pressed={selectedSize === size.label}
              onClick={() => setSelectedSize(size.label)}
              className={`relative flex h-16 items-center justify-center border-r border-gray-50 text-[11px] font-black transition last:border-r-0 md:h-20 ${
                size.disabled
                  ? "cursor-not-allowed text-gray-200 italic"
                  : selectedSize === size.label
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
              }`}
            >
              {size.label}

              {size.disabled && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden bg-white/30">
                  <span className="h-px w-[120%] rotate-[35deg] bg-gray-200" />
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="text-[10px] font-black uppercase leading-loose tracking-widest text-gray-300">
          <span className="text-black">Male</span> model is 6&apos; and 70kg,
          wearing size M.{" "}
          <span className="text-black">Female</span> model is 5&apos;9&quot;
          and 48kg, wearing size S.
        </p>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full bg-black py-7 text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-2xl shadow-black/20 transition hover:scale-[1.01] active:scale-[0.99] md:py-8 md:tracking-[0.6em]"
      >
        Add To Cart
      </button>

      {/* Information Accordions */}
      <div className="border-t border-gray-100">
        {information.map((item, index) => {
          const Icon = item.icon;
          const isOpen = activeAccordion === index;

          return (
            <div key={item.title} className="border-b border-gray-100">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setActiveAccordion(isOpen ? null : index)
                }
                className="group flex w-full items-center justify-between gap-4 py-7 text-left text-gray-600 transition-colors hover:text-black md:py-8"
              >
                <span className="flex items-center gap-4 md:gap-6">
                  <Icon className="h-5 w-5 shrink-0" />

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">
                    {item.title}
                  </span>
                </span>

                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-gray-400" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:rotate-90" />
                )}
              </button>

              {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="whitespace-pre-wrap pb-8 text-[11px] font-medium uppercase leading-relaxed text-gray-500">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductInformation;
