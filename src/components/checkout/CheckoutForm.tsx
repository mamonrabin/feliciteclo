
"use client";

import { useState, type ReactNode } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import type {
  CartItem,
  DeliveryZone,
  ShippingDetails,
} from "./Checkout";

type ExtraOption = {
  id: string;
  title: string;
  description: string;
  price: number;
  emoji: string;
  badge: string;
};

type CheckoutFormProps = {
  items: CartItem[];
  register: UseFormRegister<ShippingDetails>;
  errors: FieldErrors<ShippingDetails>;
  handleConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleWhatsAppOrder: () => void;
  deliveryZone: DeliveryZone;
  setDeliveryZone: (zone: DeliveryZone) => void;
  selectedExtras: string[];
  toggleExtra: (id: string) => void;
  extrasOptions: ExtraOption[];
  paymentNumber: string;
  advancePayment: number;
  formatPrice: (price: number) => string;
  submitting: boolean;
};

const StepNumber = ({ number }: { number: number }) => (
  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
    {number}
  </div>
);

const SectionHeading = ({
  number,
  title,
}: {
  number: number;
  title: string;
}) => (
  <div className="flex items-center gap-3">
    <StepNumber number={number} />
    <h3 className="text-[11px] font-black uppercase tracking-widest">
      {title}
    </h3>
  </div>
);

const Field = ({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div className={`space-y-1 ${className}`}>
    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </label>

    {children}

    {error && (
      <p role="alert" className="text-[10px] font-medium text-red-500">
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  "w-full border-b-2 border-gray-100 bg-transparent py-2 text-sm font-bold text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-black";

const CheckoutForm = ({
  items,
  register,
  errors,
  handleConfirm,
  handleWhatsAppOrder,
  deliveryZone,
  setDeliveryZone,
  selectedExtras,
  toggleExtra,
  extrasOptions,
  paymentNumber,
  advancePayment,
  formatPrice,
  submitting,
}: CheckoutFormProps) => {
  const [copied, setCopied] = useState(false);

  const copyPaymentNumber = async () => {
    try {
      await navigator.clipboard.writeText(paymentNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form
      id="checkout-form"
      noValidate
      onSubmit={handleConfirm}
      className="space-y-10"
    >
      {/* 1. Shipping */}
      <section className="space-y-6">
        <SectionHeading number={1} title="Shipping Details" />

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="First Name"
            error={errors.firstName?.message}
          >
            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="First Name"
              className={inputClass}
            />
          </Field>

          <Field
            label="Last Name"
            error={errors.lastName?.message}
          >
            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Last Name"
              className={inputClass}
            />
          </Field>

          <Field
            label="Street Address"
            className="col-span-2"
            error={errors.address?.message}
          >
            <input
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="House No, Road, Area"
              className={inputClass}
            />
          </Field>

          <Field
            label="City / District"
            className="col-span-2"
            error={errors.city?.message}
          >
            <input
              {...register("city", {
                required: "City or district is required",
              })}
              placeholder="City / District"
              className={inputClass}
            />
          </Field>

          {/* Phone Instructions */}
          <div className="col-span-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-[10px] leading-relaxed font-semibold text-blue-800">
            <p className="mb-1 font-bold uppercase tracking-wider">
              📱 Phone Number Instructions
            </p>

            <p>
              Your primary and alternative numbers must be different.
              Use your WhatsApp number as your primary contact.
              The alternative number should belong to someone who
              can receive delivery calls if you are unavailable.
            </p>
          </div>

          <Field
            label="Phone"
            className="col-span-2 sm:col-span-1"
            error={errors.phone?.message}
          >
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid 11-digit phone number",
                },
              })}
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="01XXXXXXXXX"
              className={inputClass}
            />
          </Field>

          <Field
            label="Alternative Number (Mandatory)"
            className="col-span-2"
            error={errors.alternativePhone?.message}
          >
            <input
              {...register("alternativePhone", {
                required: "Alternative number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid 11-digit phone number",
                },
                validate: (value, formValues) =>
                  value !== formValues.phone ||
                  "Alternative number must be different",
              })}
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="01XXXXXXXXX"
              className={inputClass}
            />
          </Field>

          <Field
            label="Customisation Notes"
            className="col-span-2"
          >
            <input
              {...register("notes")}
              placeholder="Any custom details..."
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* 2. Delivery Zone */}
      <section className="space-y-4">
        <SectionHeading number={2} title="Delivery Zone" />

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                id: "inside",
                name: "Inside Dhaka",
                price: 80,
              },
              {
                id: "outside",
                name: "Outside Dhaka",
                price: 150,
              },
            ] as const
          ).map((zone) => {
            const active = deliveryZone === zone.id;

            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setDeliveryZone(zone.id)}
                aria-pressed={active}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <p
                  className={`mb-1 text-[10px] font-black uppercase tracking-widest ${
                    active ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  {zone.id}
                </p>

                <p className="text-xs font-black uppercase">
                  {zone.name}
                </p>

                <p
                  className={`mt-1 text-[11px] font-bold ${
                    active ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {formatPrice(zone.price)}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Gift Extras */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <StepNumber number={3} />

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest">
              Gift & Premium Extras
            </h3>

            <p className="mt-0.5 text-[9px] font-bold text-gray-400">
              Make someone feel extraordinary
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {extrasOptions.map((extra) => {
            const active = selectedExtras.includes(extra.id);

            return (
              <button
                key={extra.id}
                type="button"
                onClick={() => toggleExtra(extra.id)}
                aria-pressed={active}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-black bg-gray-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                    {extra.emoji}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="text-[11px] font-black uppercase">
                        {extra.title}
                      </p>

                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[7px] font-black tracking-widest text-gray-500">
                        {extra.badge}
                      </span>
                    </div>

                    <p className="text-[10px] leading-relaxed font-medium text-gray-400">
                      {extra.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="text-sm font-black">
                      +{formatPrice(extra.price)}
                    </p>

                    <div
                      className={`flex size-6 items-center justify-center rounded-full border-2 ${
                        active
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {active && <Check className="size-3" />}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Payment */}
      <section className="space-y-4">
        <SectionHeading number={4} title="Payment" />

        <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 leading-relaxed text-red-700">
          <p className="text-[11px] font-black uppercase">
            Advance payment of {formatPrice(advancePayment)} is
            required to confirm your order.
          </p>

          <p className="text-[11px] font-bold">
            Send Money via bKash / Nagad / Rocket to{" "}
            {paymentNumber}.
          </p>

          <p className="text-[10px] text-red-600">
            Orders without advance payment will not be confirmed.
            Please provide the correct payment details and
            transaction ID. Incorrect information may result in
            order cancellation.
          </p>

          <p className="border-t border-red-100 pt-2 text-[10px] font-black uppercase">
            Please verify your size before confirmation.
          </p>

          <p className="text-[10px] text-red-600">
            Exchange is available only for non-printed products
            with the original tag intact and the product unused.
          </p>
        </div>

        {/* Payment Number */}
        <div className="space-y-3 rounded-xl bg-gray-50 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Send to (bKash/Nagad/Rocket)
          </p>

          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xl font-black sm:text-2xl">
              {paymentNumber}
            </span>

            <button
              type="button"
              onClick={copyPaymentNumber}
              aria-label="Copy payment number"
              className="rounded-lg border border-gray-200 bg-white p-2 hover:border-black"
            >
              {copied ? (
                <Check className="size-4 text-green-600" />
              ) : (
                <Copy className="size-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <Field
          label="Transaction ID / Last 4 digits"
          error={errors.transactionId?.message}
        >
          <input
            {...register("transactionId", {
              required: "Transaction ID is required",
              setValueAs: (value: string) =>
                value.trim().toUpperCase(),
            })}
            placeholder="e.g. 8821 or TXN123456"
            className={`${inputClass} font-mono uppercase`}
          />
        </Field>
      </section>

      {/* Actions */}
      <div className="space-y-3 pb-8">
        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-black py-5 text-[11px] font-black uppercase tracking-[0.25em] text-white transition-colors hover:bg-gray-900 disabled:opacity-40"
        >
          <ShieldCheck className="size-5" />
          {submitting ? "Processing..." : "Confirm Order"}
        </button>

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          disabled={submitting || items.length === 0}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black bg-white py-4 text-[11px] font-black uppercase tracking-[0.25em] text-black transition-colors hover:bg-gray-50 disabled:opacity-40"
        >
          <MessageCircle className="size-5" />
          Order via WhatsApp
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
