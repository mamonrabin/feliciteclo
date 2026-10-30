"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock3,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import Membership from "./Membership";
import ServiceBenefits from "./ServiceBenefits";
import Copyright from "./Copyright";

const EMAIL = "almamon757@gmail.com";
const PHONE = "8801746770324";

const shopLinks = [
  { label: "Boxy Fit T-Shirts", href: "/shop" },
  { label: "Heavyweight Hoodies", href: "/shop" },
  { label: "Pants & Bottoms", href: "/shop" },
  { label: "Stone Wash Tees", href: "/shop" },
  { label: "Palestine Capsule", href: "/shop" },
  { label: "View All Products", href: "/shop", featured: true },
];

const careLinks = [
  { label: "Support & Assistance", href: "/pages/support" },
  { label: "Returns & 3-Day Exchange", href: "/pages/returns" },
  { label: "Shipping Rates & Timelines", href: "/pages/shipping" },
  { label: "Sizing & Fit Consultation", href: "/pages/size-guide" },
  { label: "Garment Care & Wash Guide", href: "/pages/garment-care" },
  { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative z-20 mt-20 border-t border-white/10 bg-[#080808] font-sans text-neutral-300 antialiased md:mt-32"
    >
      {/* Archive Membership */}
      <Membership />

      {/* Service Benefits */}
      <ServiceBenefits />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="space-y-6 lg:col-span-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-block text-3xl font-black tracking-[0.18em] text-white uppercase transition-opacity hover:opacity-80 sm:text-4xl"
              >
                TITASWÉB
              </Link>

              <p className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
                Contemporary Ready-to-Wear
              </p>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Architectural cuts, heavyweight textiles, and progressive
              streetwear. Every garment is developed with a focus on
              contemporary silhouettes and considered design.
            </p>

            <div className="space-y-4 pt-1 text-xs">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <MapPin className="size-4 shrink-0 text-neutral-500" />
                <span>Dhaka, Bangladesh · Worldwide Dispatch</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-neutral-300">
                <Mail className="size-4 shrink-0 text-neutral-500" />

                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all font-medium transition-colors hover:text-white hover:underline hover:underline-offset-4"
                >
                  {EMAIL}
                </a>

                <button
                  type="button"
                  title="Copy email address"
                  aria-label="Copy email address"
                  onClick={copyEmail}
                  className="rounded p-1 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>

                {copied && (
                  <span className="text-[10px] text-emerald-400">Copied</span>
                )}
              </div>

              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="size-4 shrink-0 text-neutral-500" />
                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium tracking-wide transition-colors hover:text-white"
                >
                  +880 1746770324
                </a>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Archive & Shop
            </h4>

            <ul className="space-y-3 text-xs font-medium text-neutral-400 sm:text-[13px]">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center transition-all duration-200 hover:translate-x-1 hover:text-white ${
                      item.featured ? "font-semibold text-white" : ""
                    }`}
                  >
                    {item.label}
                    {item.featured && (
                      <span className="ml-1.5" aria-hidden="true">
                        →
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Client Care
            </h4>

            <ul className="space-y-3 text-xs font-medium text-neutral-400 sm:text-[13px]">
              {careLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex text-left transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-xs font-bold tracking-[0.18em] text-white uppercase">
              Direct Concierge
            </h4>

            <div className="space-y-3 rounded-xl border border-white/10 bg-linear-to-br from-white/[0.06] to-white/[0.02] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                    Live Concierge
                  </span>
                </div>

                <span className="text-[10px] font-medium tracking-wide text-neutral-400 uppercase">
                  BST (UTC+6)
                </span>
              </div>

              <p className="text-xs leading-relaxed text-neutral-300">
                Connect with our team for size recommendations, parcel tracking,
                styling advice, or custom requests.
              </p>

              <a
                href={`https://wa.me/${PHONE}?text=Hello%20titasweb%2C%20I%20have%20an%20inquiry%20regarding%20an%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase shadow-sm transition-colors hover:bg-emerald-500"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
                <ExternalLink className="size-3 opacity-70" />
              </a>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-neutral-400">
                <Clock3 className="size-3 shrink-0 text-neutral-500" />
                <span>10:00 AM – 10:00 PM Daily</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-neutral-400">
              <Link
                href="/pages/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <span>·</span>
              <Link
                href="/pages/terms"
                className="transition-colors hover:text-white"
              >
                Terms
              </Link>
              <span>·</span>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Methods */}
      <Copyright />
    </footer>
  );
};

export default Footer;
