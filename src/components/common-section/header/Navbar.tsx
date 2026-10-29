"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Sparkles, ChevronDown } from "lucide-react";
import MobileBar from "./MobileBar";
import AiSystem from "./AiSystem";
import LogIn from "./LogIn";
import CartSideBar from "@/components/cart/CartSideBar";

const categories = [
  { label: "All Collections", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "T-Shirts", href: "/shop?category=t-shirts" },
  { label: "Hoodies", href: "/shop?category=hoodies" },
  { label: "Pants", href: "/shop?category=pants" },
];

const Navbar = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // White navbar on all other pages,
  // or when homepage is scrolled.
  const isWhiteNavbar = !isHomePage || scrolled;

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 w-full
        transition-[background-color,padding,box-shadow,backdrop-filter]
        duration-500 ease-in-out
        ${
          isWhiteNavbar
            ? "bg-white py-3 text-primary shadow backdrop-blur-md md:py-4"
            : "bg-transparent py-14 text-white"
        }
      `}
    >
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-2 md:px-8 lg:px-14">
        {/* Left Navigation */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="p-2 transition-opacity hover:opacity-50 lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.7} />
          </button>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] lg:flex xl:gap-10">
            <Link href="/shop" className="transition-opacity hover:opacity-50">
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="flex cursor-pointer items-center gap-1.5 uppercase transition-opacity hover:opacity-50"
              >
                Categories
                <ChevronDown
                  size={12}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>

              <div
                className="
                  invisible absolute top-full left-0 z-50
                  w-52 translate-y-3 pt-6 opacity-0
                  transition-all duration-300
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                  group-focus-within:visible
                  group-focus-within:translate-y-0
                  group-focus-within:opacity-100
                "
              >
                <div className="border border-white/10 bg-white p-5 shadow-xl">
                  {categories.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="
                        block py-2.5 text-[10px]
                        tracking-[0.15em] text-primary/80
                        transition-all
                        hover:translate-x-1
                        hover:text-primary
                      "
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="group flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              <Sparkles
                size={13}
                className="transition-transform group-hover:scale-125"
              />
              AI Stylist
            </Link>
          </nav>
        </div>

        {/* Center Logo */}
        <Link
          href="/"
          aria-label="Félicité homepage"
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-[21px] leading-none font-black tracking-[-0.06em] uppercase md:text-3xl">
            Titasweb
            <sup className="ml-0.5 text-[9px] font-bold tracking-normal md:text-[10px]">
              ™
            </sup>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* AI Stylist */}
          <AiSystem scrolled={isWhiteNavbar} />

          {/* Account */}
          <LogIn scrolled={isWhiteNavbar} />

          {/* Shopping Bag */}
          <CartSideBar
            scrolled={isWhiteNavbar}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileBar
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        setCategoriesOpen={setCategoriesOpen}
        categoriesOpen={categoriesOpen}
      />
    </header>
  );
};

export default Navbar;
