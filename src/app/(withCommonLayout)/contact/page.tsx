import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-40 pt-32 text-black md:px-8">
      <div className="mx-auto max-w-3xl space-y-10">
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
            Contact
          </h1>
        </section>

        {/* Support Information */}
        <section className="space-y-4 text-[14px] font-medium uppercase leading-[2] tracking-wide text-gray-500">
          <p>Reach us at:almamon757@gmail.com</p>
          <p>WhatsApp: 01746770324</p>
          <p>We respond within 24-48 hours.</p>
        </section>
      </div>
    </main>
  );
}
