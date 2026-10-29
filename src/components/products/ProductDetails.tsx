"use client";

import p1 from "@/assets/allproducts/p1.jpg";
import p2 from "@/assets/allproducts/p2.jpg";
import p3 from "@/assets/allproducts/p3.jpg";
import p4 from "@/assets/allproducts/p4.jpg";
import p5 from "@/assets/allproducts/p5.webp";
import p6 from "@/assets/allproducts/p6.webp";

import { useState } from "react";

import {
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import ProductGallary from "./ProductGallary";
import ProductInformation from "./ProductInformation";
import ProductReviews from "./productreviews/ProductReviews";

const product = {
  name: "Heavyweight Double Zip Pullover (Black)",
  price: 1499,
  color: "#000000",
  images: [p1, p2, p3, p4, p5, p6],
  video: "", // Add your product video URL here.
  description: `GSM: 450 GSM, Heavyweight maintained
MATERIAL: 80/20 COTTON, Wrinkle-Free Material
HOOD: DOUBLE LAYERED 16 inches LONG HOOD. 3-PART HOOD.
FIT: OVERSIZED BOXY-FITTED
SHAPE: V Shape (narrower to the bottom)
STITCH: American Double Needle Topsins

Design and print customisation are available.
Our patterns are unique. If it's gone, it's gone.`,
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

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    // Connect this to your cart context, Zustand store, or API.
    console.log("Add to cart:", {
      product: product.name,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div>
      <main className="flex flex-col lg:flex-row md:mt-14">
        {/* Product gallery */}
        <ProductGallary
          images={product.images}
          name={product.name}
          video={product.video}
        />

        {/* Product information */}
        <ProductInformation product={product} />
      </main>

      <ProductReviews />
    </div>
  );
}
