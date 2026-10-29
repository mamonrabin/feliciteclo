import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-40 pt-32 text-black md:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        {/* Header */}
        <section>
          <Link
            href="/"
            className="group mb-8 flex items-center gap-2 text-gray-400 transition-colors hover:text-black"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Back
            </span>
          </Link>

          <h1 className="text-2xl font-black uppercase tracking-tight md:text-6xl">
            Returns & Exchanges
          </h1>
        </section>

        {/* Support Information */}
        <section className="space-y-8 text-[14px] font-medium uppercase leading-[2] tracking-wide text-gray-500">
          <p>
            We want you to love your purchase! To help us process your return or
            exchange smoothly, please review our policy below:
          </p>

          <div>
            <h2 className="font-bold text-gray-500">Eligibility:</h2>
            <p>
              Items must be in their original, unused condition with all
              original tags attached. Exchange requests must be submitted within
              3 days of delivery.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-gray-500">Printed & Custom Items:</h2>
            <p>
              Because our printed products are made specifically for you after
              order confirmation, we only offer exchanges on printed items if
              they arrive defective. Non-printed items in original condition are
              fully eligible for exchange.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-gray-500">Size Verification:</h2>
            <p>
              To avoid unnecessary exchanges, please carefully verify your size
              using our sizing guide before finalizing your order.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-gray-500">Sale Items:</h2>
            <p>
              Items purchased on sale are final sale and cannot be returned or
              exchanged.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
