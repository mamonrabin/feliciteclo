
import Image from "next/image";
import type { CartItem } from "./Checkout";

type CheckoutProductsProps = {
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  extrasTotal: number;
  total: number;
  advancePayment: number;
};

const formatPrice = (price: number) =>
  `৳${price.toLocaleString("en-BD")}`;

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
    <span>{label}</span>
    <span>{formatPrice(value)}</span>
  </div>
);

const CheckoutProducts = ({
  items,
  subtotal,
  deliveryCharge,
  extrasTotal,
  total,
  advancePayment,
}: CheckoutProductsProps) => {
  return (
    <aside>
      <div className="sticky top-24 space-y-6 rounded-2xl bg-gray-50 p-5 sm:p-8">
        <h3 className="font-serif text-xl italic text-gray-900">
          Inventory
        </h3>

        {/* Products */}
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />

                <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-black text-[9px] font-black text-white">
                  {item.quantity}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-black uppercase">
                  {item.name}
                </p>

                <p className="mt-0.5 text-[10px] font-bold text-gray-400">
                  Size: {item.size}
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="size-3 shrink-0 rounded-sm border border-gray-200"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-[10px] font-bold text-gray-400">
                    Color: {item.color}
                  </span>
                </div>

                <p className="mt-1 text-xs font-black">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-sm text-gray-400">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-3 border-t border-gray-200 pt-5">
          <SummaryRow label="Subtotal" value={subtotal} />

          <SummaryRow
            label="Delivery"
            value={deliveryCharge}
          />

          {extrasTotal > 0 && (
            <SummaryRow
              label="Gift Extras"
              value={extrasTotal}
            />
          )}

          <div className="flex items-center justify-between border-t border-gray-300 pt-4">
            <span className="font-serif text-lg italic">
              Total
            </span>

            <span className="font-mono text-2xl font-black">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-gray-500">
            <span>Advance Required</span>
            <span>{formatPrice(advancePayment)}</span>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-gray-500">
            <span>Remaining Balance</span>
            <span>
              {formatPrice(Math.max(total - advancePayment, 0))}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutProducts;
