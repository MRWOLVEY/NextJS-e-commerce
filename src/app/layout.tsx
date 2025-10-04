import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHreflang from "@/components/SEOHreflang";
import { generateOrganizationSchema } from "@/utils/seo";

import ShopContextProvider from "@/context/ShopContext";

// Default metadata - will be enhanced per page with generateMetadata
export const metadata: Metadata = {
  title: {
    template: "%s | Premium Fashion Store",
    default: "Premium Fashion Store - Best Quality Apparel & Glasses",
  },
  description:
    "Discover the finest collection of premium apparel and designer glasses. Quality guaranteed, easy returns, and 24/7 customer support.",
  keywords:
    "fashion, apparel, glasses, premium quality, online shopping, designer wear",
  authors: [{ name: "Premium Fashion Store" }],
  creator: "Premium Fashion Store",
  publisher: "Premium Fashion Store",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    siteName: "Premium Fashion Store",
    title: "Premium Fashion Store - Best Quality Apparel & Glasses",
    description:
      "Discover the finest collection of premium apparel and designer glasses. Quality guaranteed, easy returns, and 24/7 customer support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema("en")),
          }}
        />
      </head>
      <body>
        <ShopContextProvider>
          <NextIntlClientProvider>
            <SEOHreflang />
            <div className="h-screen flex flex-col justify-between">
              <Navbar />
              <div className="py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                {children}
              </div>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ShopContextProvider>
      </body>
    </html>
  );
}
