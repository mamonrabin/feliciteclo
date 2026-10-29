import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SupportPage() {
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

          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Support
          </h1>
        </section>

        {/* Support Information */}
        <section className="space-y-8 text-[14px] font-medium uppercase leading-[2] tracking-wide text-gray-500">
          <p>
            Our support collective is available to assist with your order
            requirements.
          </p>

          <div>
            <h2 className="font-bold text-black">Dispatch Status:</h2>
            <p>Orders are processed within 24-48 hours.</p>
          </div>

          <div>
            <h2 className="font-bold text-black">Sizing Consultation:</h2>
            <p>Review the Size Chart on each product page.</p>
          </div>

          <div>
            <h2 className="font-bold text-black">Payment:</h2>
            <p>
              We support Cash on Delivery for all regions in Bangladesh.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}