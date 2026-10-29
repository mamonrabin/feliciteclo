"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

import product1 from "@/assets/products/p1.webp";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type CartSideBarProps = {
  scrolled: boolean;
  onClose: () => void;
};

const CartSideBar = ({ scrolled, onClose }: CartSideBarProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [itemRemoved, setItemRemoved] = useState(false);

  const price = 989;
  const subtotal = itemRemoved ? 0 : price * quantity;

  const formatPrice = (amount: number) => `৳${amount.toLocaleString("en-BD")}`;

  const handleOpenChange = (open: boolean) => {
    setIsCartOpen(open);

    if (!open) {
      onClose();
    }
  };

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (itemRemoved) {
      e.preventDefault();
      return;
    }

    handleOpenChange(false);
  };

  return (
    <Drawer
      open={isCartOpen}
      onOpenChange={handleOpenChange}
      swipeDirection="right"
    >
      {/* Trigger */}
      <DrawerTrigger
        render={
          <button
            type="button"
            aria-label="Open shopping bag"
            className={`relative p-2 transition-opacity hover:opacity-60 ${
              scrolled ? "text-primary" : "text-white/80"
            }`}
          >
            <ShoppingBag size={22} strokeWidth={1.7} />

            {!itemRemoved && (
              <span
                className={`absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                  scrolled ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                {quantity}
              </span>
            )}
          </button>
        }
      />

      {/* Side Drawer */}
      <DrawerContent
        className="
          !inset-y-0 !inset-x-auto !right-0 !left-auto
          !mt-0 h-dvh w-full max-w-md
          !rounded-none border-0 bg-white p-0
          text-black shadow-2xl
        "
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Header */}
          <DrawerHeader className="flex shrink-0 flex-row items-center justify-between border-b border-gray-50 px-6 py-6 md:px-8">
            <div>
              <DrawerTitle className="text-xs font-black tracking-[0.3em] uppercase">
                Your Bag ({itemRemoved ? 0 : quantity})
              </DrawerTitle>

              <DrawerDescription className="sr-only">
                Review your shopping bag, update quantities, or proceed to
                checkout.
              </DrawerDescription>
            </div>

            <DrawerClose
              render={
                <button
                  type="button"
                  aria-label="Close shopping bag"
                  className="group cursor-pointer rounded-full p-1"
                >
                  <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              }
            />
          </DrawerHeader>

          {/* Cart Items */}
          <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
            {itemRemoved ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <ShoppingBag className="h-10 w-10 text-gray-300" />

                <h3 className="text-xs font-black tracking-[0.2em] uppercase">
                  Your bag is empty
                </h3>

                <p className="max-w-xs text-[11px] leading-relaxed text-gray-400">
                  Discover your next favorite piece from the Félicité
                  collection.
                </p>
              </div>
            ) : (
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative h-32 w-24 shrink-0 bg-gray-50">
                  <Image
                    src={product1}
                    alt="Burn like a star OffWhite"
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[12px] leading-tight font-black tracking-tight uppercase">
                        Burn like a star OffWhite
                      </h4>

                      <button
                        type="button"
                        onClick={() => setItemRemoved(true)}
                        aria-label="Remove Burn like a star OffWhite"
                        className="shrink-0 cursor-pointer"
                      >
                        <X className="h-4 w-4 text-gray-300 transition-colors hover:text-black" />
                      </button>
                    </div>

                    <span className="inline-block border border-gray-100 px-2 py-0.5 text-[8px] font-black uppercase text-gray-400">
                      Size: S
                    </span>

                    <p className="text-[11px] font-bold text-gray-500">
                      {formatPrice(price)}
                    </p>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-sm border border-gray-100">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => Math.max(1, current - 1))
                        }
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="min-w-8 px-2 py-1.5 text-center text-[11px] font-black">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuantity((current) => current + 1)}
                        aria-label="Increase quantity"
                        className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-gray-50"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="text-[12px] font-black">
                      {formatPrice(price * quantity)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 space-y-6 border-t border-gray-50 bg-gray-50/50 p-6 md:p-8">
            <div className="flex justify-between text-xs font-black tracking-[0.2em] uppercase">
              <span>Bag Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {/* Checkout */}
            <Link
              href="/checkout"
              aria-disabled={itemRemoved}
              tabIndex={itemRemoved ? -1 : undefined}
              onClick={handleCheckout}
              className={`
                block w-full bg-black py-5 text-center
                text-[11px] font-black tracking-[0.3em]
                text-white uppercase transition-colors
                hover:bg-black/90
                ${
                  itemRemoved
                    ? "pointer-events-none cursor-not-allowed opacity-30"
                    : "cursor-pointer"
                }
              `}
            >
              Proceed to Checkout
            </Link>

            <p className="text-center text-[9px] font-bold tracking-widest text-gray-400 uppercase">
              Free delivery on orders over ৳5,000
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSideBar;
