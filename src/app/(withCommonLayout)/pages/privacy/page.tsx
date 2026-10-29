import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
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

          <h1 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
           Privacy Protocol
          </h1>
        </section>

        {/* Support Information */}
        <section className="space-y-8 text-[14px] font-medium uppercase leading-[2] tracking-wide text-gray-500">
          <p>Fast, secure nationwide delivery across Bangladesh.</p>

          <div>
            <h2 className="font-bold text-gray-500">Delivery Timelines:</h2>
            <p>
              • Inside Dhaka Metro: 1–3 business days (৳80) • Outside Dhaka (All
              64 districts): 3–5 business days (৳150)
            </p>
          </div>
          <div>
            <h2 className="font-bold text-gray-500">Cash on Delivery (COD):</h2>
            <p>
              Available nationwide. Inspect your package upon arrival before
              paying the courier.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-gray-500">Tracking:</h2>
            <p>
              Once dispatched via Steadfast or Pathao courier, SMS tracking
              updates are transmitted directly to your mobile phone.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
