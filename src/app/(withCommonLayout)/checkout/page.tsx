
"use client";

import Checkout, {
  type CartItem,
  type OrderData,
} from "@/components/checkout/Checkout";
import { useRouter } from "next/navigation";

import p1 from "@/assets/allproducts/p1.jpg"
import p2 from "@/assets/allproducts/p2.jpg"
import p3 from "@/assets/allproducts/p3.jpg"

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Play to win",
    image: p1,
    size: "S",
    color: "#eff1eb",
    price: 989,
    quantity: 1,
  },
  {
    id: "2",
    name: "The Last Peak",
    image:p2,
    size: "S",
    color: "#e8eae2",
    price: 949,
    quantity: 1,
  },
  {
    id: "3",
    name: "Above The Ordinary Royal Blue",
    image: p3,
    size: "S",
    color: "#0538ad",
    price: 989,
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  const handleConfirmOrder = async (order: OrderData) => {
    // Connect your backend API here.
    console.log("Order details:", order);
  };

  return (
    <Checkout
      items={cartItems}
      onClose={() => router.push("/shop")}
      onConfirm={handleConfirmOrder}
    />
  );
}
