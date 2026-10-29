"use client";

import {
  ChevronDown,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type MobileBarProps = {
  menuOpen: boolean;
  closeMenu: () => void;
  setCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesOpen: boolean;
};

const MobileBar = ({
  menuOpen,
  closeMenu,
  setCategoriesOpen,
  categoriesOpen,
}: MobileBarProps) => {
  return (
    <div
      aria-hidden={!menuOpen}
      className={`fixed inset-0 z-[9999] md:hidden ${
        menuOpen
          ? "visible pointer-events-auto"
          : "invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
        className={`absolute inset-0 h-full w-full bg-black/70 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Full-screen drawer */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`absolute inset-y-0 left-0 flex h-dvh w-[85%] max-w-sm flex-col overflow-hidden bg-[#111111] text-white shadow-2xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-black uppercase tracking-[-0.06em]"
          >
            TITASWÉB<sup className="ml-0.5 text-[9px]">™</sup>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 transition-opacity hover:opacity-50"
          >
            <X size={23} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 text-xs font-semibold uppercase tracking-[0.2em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/shop"
            onClick={closeMenu}
            className="block border-b border-white/10 py-5"
          >
            Shop All
          </Link>

          <button
            type="button"
            onClick={() => setCategoriesOpen((open) => !open)}
            aria-expanded={categoriesOpen}
            className="flex w-full items-center justify-between border-b border-white/10 py-5 text-left"
          >
            Categories
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${
                categoriesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ${
              categoriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-5 py-4 pl-4 text-[10px] text-white/65">
                <Link
                  href="/shop?sort=newest"
                  onClick={closeMenu}
                  className="block transition-colors hover:text-white"
                >
                  New Arrivals
                </Link>

                <Link
                  href="/shop?category=t-shirts"
                  onClick={closeMenu}
                  className="block transition-colors hover:text-white"
                >
                  T-Shirts
                </Link>

                <Link
                  href="/shop?category=hoodies"
                  onClick={closeMenu}
                  className="block transition-colors hover:text-white"
                >
                  Hoodies
                </Link>

                <Link
                  href="/shop?category=pants"
                  onClick={closeMenu}
                  className="block transition-colors hover:text-white"
                >
                  Pants
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="#"
            onClick={closeMenu}
            className="flex items-center gap-3 border-b border-white/10 py-5"
          >
            <Sparkles size={16} />
            AI Stylist
          </Link>

          <Link
            href="/account"
            onClick={closeMenu}
            className="flex items-center gap-3 border-b border-white/10 py-5"
          >
            <UserRound size={16} />
            Account
          </Link>

          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center gap-3 border-b border-white/10 py-5"
          >
            <ShoppingBag size={16} />
            Shopping Bag
          </Link>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 px-5 py-5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
          Contemporary Luxury Wear
          <p className="mt-2">PARIS · DHAKA · TOKYO</p>
        </div>
      </aside>
    </div>
  );
};

export default MobileBar;