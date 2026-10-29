
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import CheckoutProducts from "./CheckoutProducts";

export type CartItem = {
  id: string;
  name: string;
  image: StaticImageData;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

export type ShippingDetails = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  alternativePhone: string;
  notes: string;
  transactionId: string;
};

export type DeliveryZone = "inside" | "outside";

export type OrderData = {
  shipping: ShippingDetails;
  deliveryZone: DeliveryZone;
  extras: string[];
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  extrasTotal: number;
  total: number;
  advancePayment: number;
};

type CheckoutProps = {
  items: CartItem[];
  onClose: () => void;
  onConfirm?: (order: OrderData) => Promise<void> | void;
};

const PAYMENT_NUMBER = "01974004221";
const WHATSAPP_NUMBER = "8801746770324";
const ADVANCE_PAYMENT = 250;

const extrasOptions = [
  {
    id: "gift",
    title: "Premium Gift Packaging",
    description: "Luxury matte-black box, gold-foil seal, satin ribbon",
    price: 100,
    emoji: "🎁",
    badge: "BESTSELLER",
  },
  {
    id: "rose",
    title: "Rose Bouquet + Wish Letter",
    description: "Hand-tied fresh roses & a personally printed note",
    price: 80,
    emoji: "🌹",
    badge: "ROMANTIC",
  },
];

const initialShipping: ShippingDetails = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  phone: "",
  alternativePhone: "",
  notes: "",
  transactionId: "",
};

const formatPrice = (price: number) =>
  `৳${price.toLocaleString("en-BD")}`;

const Checkout = ({ items, onClose, onConfirm }: CheckoutProps) => {
  const [deliveryZone, setDeliveryZone] =
    useState<DeliveryZone>("inside");

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingDetails>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialShipping,
  });

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = deliveryZone === "inside" ? 80 : 150;

  const extrasTotal = extrasOptions
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const total = subtotal + deliveryCharge + extrasTotal;

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getOrderData = (shipping: ShippingDetails): OrderData => ({
    shipping,
    deliveryZone,
    extras: selectedExtras,
    items,
    subtotal,
    deliveryCharge,
    extrasTotal,
    total,
    advancePayment: ADVANCE_PAYMENT,
  });

  // Confirm Order
  const onSubmit: SubmitHandler<ShippingDetails> = async (shipping) => {
    if (submitting || items.length === 0) return;

    if (!onConfirm) {
      alert("Connect your order API before confirming an order.");
      return;
    }

    try {
      setSubmitting(true);
      await onConfirm(getOrderData(shipping));
    } catch (error) {
      console.error("Order confirmation failed:", error);
      alert("Unable to submit your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp Order
  const handleWhatsAppOrder = handleSubmit((shipping) => {
    if (submitting || items.length === 0) return;

    const productDetails = items
      .map(
        (item) =>
          `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const selectedExtraNames = extrasOptions
      .filter((extra) => selectedExtras.includes(extra.id))
      .map((extra) => extra.title)
      .join(", ");

    const message = [
      "NEW ORDER",
      "",
      productDetails,
      "",
      `Customer: ${shipping.firstName} ${shipping.lastName}`,
      `Phone: ${shipping.phone}`,
      `Alternative: ${shipping.alternativePhone}`,
      `Address: ${shipping.address}, ${shipping.city}`,
      `Delivery: ${deliveryZone === "inside" ? "Inside Dhaka" : "Outside Dhaka"}`,
      `Extras: ${selectedExtraNames || "None"}`,
      `Notes: ${shipping.notes || "None"}`,
      `Transaction ID: ${shipping.transactionId}`,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery: ${formatPrice(deliveryCharge)}`,
      `Extras: ${formatPrice(extrasTotal)}`,
      `Total: ${formatPrice(total)}`,
      `Advance: ${formatPrice(ADVANCE_PAYMENT)}`,
      `Remaining: ${formatPrice(Math.max(total - ADVANCE_PAYMENT, 0))}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Navigate in the same tab to avoid popup blockers
    window.location.assign(url);
  });

  return (
    <div className="fixed inset-0 z-[500] overflow-y-auto bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest">
            Checkout
          </span>

          <span className="text-[10px] font-bold text-gray-400">
            — {itemCount} items
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <X className="size-5" />
        </button>
      </header>

      {/* Checkout Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: Form */}
          <CheckoutForm
            items={items}
            register={register}
            errors={errors}
            handleConfirm={handleSubmit(onSubmit)}
            handleWhatsAppOrder={handleWhatsAppOrder}
            deliveryZone={deliveryZone}
            setDeliveryZone={setDeliveryZone}
            selectedExtras={selectedExtras}
            toggleExtra={toggleExtra}
            extrasOptions={extrasOptions}
            paymentNumber={PAYMENT_NUMBER}
            advancePayment={ADVANCE_PAYMENT}
            formatPrice={formatPrice}
            submitting={submitting}
          />

          {/* Right: Summary */}
          <CheckoutProducts
            items={items}
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            extrasTotal={extrasTotal}
            total={total}
            advancePayment={ADVANCE_PAYMENT}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
