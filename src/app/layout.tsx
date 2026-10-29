import type { Metadata, Viewport } from "next";

import "./globals.css";
import { plusjakartasans } from "./font";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "My Store | Online Shopping",
    template: "%s | My Store",
  },
  description:
    "Shop quality products at great prices. Discover our latest collections and enjoy a smooth online shopping experience.",
  applicationName: "My Store",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "My Store | Online Shopping",
    description:
      "Discover quality products and shop online with ease.",
    siteName: "My Store",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", plusjakartasans.className, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}