
"use client";

import { ArrowUp } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const WHATSAPP_NUMBER = "8801746770324";

const socialLinks = [
  {
    label: "Titasweb Facebook",
    href: "https://facebook.com/Titaswebclo",
    icon: FaFacebookF,
  },
  {
    label: "Titasweb Instagram",
    href: "https://instagram.com/Titaswebclo",
    icon: FaInstagram,
  },
  {
    label: "Titasweb WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: FaWhatsapp,
  },
  {
    label: "Titasweb X / Twitter",
    href: "https://twitter.com/Titaswebclo",
    icon: FaXTwitter,
  },
];

const Copyright = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="border-t border-white/[0.08] bg-black">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Copyright */}
          <div className="space-y-1 text-center lg:text-left">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase sm:text-[11px]">
              © {new Date().getFullYear()} FELICITÉ CLOTHING CO.
              All rights reserved.
            </p>

            <p className="text-[9px] font-medium tracking-[0.14em] text-neutral-500 uppercase sm:text-[10px]">
              Haute Ready-to-Wear · Dhaka · Contemporary Streetwear
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="hidden pr-1 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase sm:inline">
              Accepted:
            </span>

            <span className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-300 uppercase">
              Cash on Delivery
            </span>

            <span className="rounded border border-[#E2136E]/30 bg-[#E2136E]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#E2136E]">
              bKash
            </span>

            <span className="rounded border border-[#F7931E]/30 bg-[#F7931E]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#F7931E]">
              Nagad
            </span>

            <span className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold tracking-wide text-neutral-300">
              VISA
            </span>

            <span className="rounded border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold tracking-wide text-neutral-300">
              Mastercard
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition-all hover:scale-105 hover:bg-white/15 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold tracking-[0.18em] text-neutral-300 uppercase transition-all hover:border-white/30 hover:bg-white/15 hover:text-white"
            >
              Top
              <ArrowUp className="size-3 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
