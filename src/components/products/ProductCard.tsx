
import { Star } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
    id: number;
    frontImage: StaticImageData;
    backimage: StaticImageData;
    title: string;
    color: number;
    price: number;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="group w-full border border-gray-100 transition-colors hover:bg-gray-50">
      {/* Product Images */}
      <div className="relative aspect-[2/3] w-full overflow-hidden border-b border-gray-200 bg-[#f9f9f9] md:aspect-[3/4] lg:aspect-auto lg:h-[470px]">
        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 block"
        >
          {/* Front Image */}
          <Image
            src={product.frontImage}
            alt={product.title}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
            className="object-contain transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />

          {/* Back Image */}
          <Image
            src={product.backimage}
            alt={`${product.title} back view`}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
            className="object-contain opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {/* New Arrival Badge */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-1 bg-black px-3 py-1 text-[8px] font-bold uppercase tracking-tight text-white">
          <Star className="size-2.5" />
          New Arrival
        </div>

        {/* Image Indicator */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
          <span className="h-1 w-5 rounded-full bg-black" />
          <span className="h-1 w-3 rounded-full bg-gray-300" />
        </div>

        {/* Add to Bag */}
        <button
          type="button"
          onClick={() => {
            // Connect cart action here
          }}
          className="absolute bottom-4 left-4 right-4 z-20 translate-y-3 cursor-pointer bg-black py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Bag
        </button>
      </div>

      {/* Product Information */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="space-y-1.5 px-3 pb-4 pt-3 md:px-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="min-w-0 flex-1 truncate text-[10px] font-black uppercase leading-tight tracking-tight md:text-[11px]">
              {product.title}
            </h3>

            <p className="shrink-0 text-[10px] font-black tracking-tighter md:text-xs">
              ৳{product.price.toLocaleString("en-BD")}
            </p>
          </div>

          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {product.color} In Colors
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
