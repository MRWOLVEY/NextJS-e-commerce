# Getting Started with E-commerce Platform Refactoring

## Overview

This guide provides step-by-step instructions for implementing the refactoring plan for your Next.js e-commerce platform. Follow this guide to systematically address all identified issues and improve your application's performance, SEO, and user experience.

## Prerequisites

Before starting the refactoring process, ensure you have:

1. **Backup your current codebase**

   ```bash
   git checkout -b current-implementation
   git add .
   git commit -m "Backup: Current implementation before refactoring"
   git checkout main
   git checkout -b refactoring-implementation
   ```

2. **Set up development environment**

   ```bash
   npm install
   npm run dev
   ```

3. **Install additional dependencies for refactoring**
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   npm install clsx tailwind-merge
   ```

## Phase 1: Foundation (Week 1-4)

### Step 1: Server-Side Rendering Implementation

#### 1.1 Create Server-Side Data Fetching Utilities

Create `src/lib/data.ts`:

```typescript
import { products } from "@/data/products";

// Server-side product fetching
export async function getProducts(
  query: {
    category?: string;
    bestseller?: boolean;
    limit?: number;
  } = {}
) {
  let filteredProducts = products;

  if (query.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === query.category
    );
  }

  if (query.bestseller) {
    filteredProducts = filteredProducts.filter((p) => p.bestseller);
  }

  if (query.limit) {
    filteredProducts = filteredProducts.slice(0, query.limit);
  }

  return filteredProducts;
}

export async function getProduct(id: string) {
  const product = products.find((p) => p._id === id);

  if (!product) {
    return null;
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return {
    product,
    relatedProducts,
  };
}
```

#### 1.2 Convert Hero Component to Server Component

Modify `src/components/Hero.tsx`:

```typescript
// Remove "use client" directive
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import TextType from "./text-type/TextType";
import Link from "next/link";

// This is now a server component
export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <div className="flex flex-col-reverse sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex flex-col gap-1 items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <TextType
            className="text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            text={t.raw("typewriter_messages") as string[]}
            typingSpeed={60}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
        <div>
          <Link
            href="/category/apparel"
            className="flex items-center gap-2 cursor-pointer bg-amber-200 hover:bg-amber-100 transition-colors duration-100 p-2 rounded-2xl"
          >
            <p className="font-semibold text-sm md:text-2xl">{t("shop_now")}</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </Link>
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <Image
          className="w-full h-full object-cover"
          src="/images/hero_img.png"
          alt="hero"
          width={500}
          height={500}
          priority
        />
      </div>
    </div>
  );
}
```

#### 1.3 Convert BestSellers Component to Server Component

Modify `src/components/BestSellers.tsx`:

```typescript
// Remove "use client" directive
import ProductItem from "@/components/ProductItem";
import { getProducts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export default async function BestSellers() {
  const bestSellers = await getProducts({ bestseller: true, limit: 10 });

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((product) => (
          <ProductItem
            key={product._id}
            _id={product._id}
            image={product.image}
            name_en={product.name_en}
            name_ar={product.name_ar}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 1.4 Update Product Page for SSR

Modify `src/app/product/[productId]/page.tsx`:

```typescript
import { getProduct } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { BreadcrumbItem } from "@/utils/seo";
import { generateMetadata as generateSEOMetadata } from "@/utils/seo";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const data = await getProduct(productId);

  if (!data) {
    return {
      title: "Product Not Found",
    };
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const t = await getTranslations({ locale, namespace: "SEO" });

  return generateSEOMetadata(
    {
      title: `${data.product.name_en} | Premium Fashion Store`,
      description: data.product.description_en,
      keywords: `fashion, ${data.product.category}, ${data.product.name_en}`,
    },
    locale
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const data = await getProduct(productId);

  if (!data) {
    notFound();
  }

  return (
    <ProductClient
      product={data.product}
      relatedProducts={data.relatedProducts}
    />
  );
}
```

Create `src/app/product/[productId]/ProductClient.tsx`:

```typescript
"use client";
import { useState, useContext } from "react";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getProductName, getProductDescription } from "@/utils/productHelpers";
import RelatedProducts from "@/components/RelatedProducts";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/utils/seo";

interface ProductClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductClient({
  product,
  relatedProducts,
}: ProductClientProps) {
  const { state, dispatch, actions } = useContext(ShopContext);
  const locale = useLocale();
  const t = useTranslations("Product");

  const [image, setImage] = useState(product.image[0]);
  const [size, setSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: "/" },
    {
      name: product.category,
      url: `/category/${product.type}`,
    },
    {
      name: getProductName(product, locale),
      url: `/product/${product._id}`,
    },
  ];

  const handleAddToCart = async (data: any, size: any) => {
    if (isAdding) return;

    setIsAdding(true);

    if (size) {
      dispatch({
        type: actions.addToCart,
        payload: { id: data._id, price: data.price, size: size },
      });
    }

    setTimeout(() => setIsAdding(false), 500);
  };

  const handleAddToWhishlist = (data: any, size: any) => {
    size
      ? dispatch({
          type: actions.addToWishlist,
          payload: { id: data._id, price: data.price, size: size },
        })
      : null;
  };

  return (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <Breadcrumb items={breadcrumbs} className="mb-6" />

      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex flex-1 pt-4 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col hide-scrollbar overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item: string, index: number) => (
              <Image
                alt={getProductName(product, locale)}
                width={500}
                height={500}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-2.5 flex shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full h-full sm:w-[80%]">
            <Image
              alt={getProductName(product, locale)}
              src={image}
              width={500}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {getProductName(product, locale)}
          </h1>

          <div className="flex items-center gap-1 mt-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-yellow-400 rounded-full"
                ></div>
              ))}
            </div>
            <p className="pls-2">{t("rating_count")}</p>
          </div>

          <p className="mt-2 text-2xl font-medium">${product.price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {getProductDescription(product, locale)}
          </p>

          <div className="flex flex-col gap-4 my-4">
            <p>{t("select_size")}</p>
            <div className="flex gap-2">
              {product.sizes.map((item: any, index: number) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <button
              onClick={() => handleAddToCart(product, size)}
              disabled={isAdding}
              className={`text-white text-xs px-8 py-3 rounded-sm shadow-lg shadow-gray-500 ${
                isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cursor-pointer bg-black hover:opacity-85 active:bg-gray-700"
              }`}
            >
              {isAdding ? t("adding") : t("add_to_cart")}
            </button>
            <button
              onClick={() => handleAddToWhishlist(product, size)}
              className="hover cursor-pointer bg-black hover:opacity-85 text-white text-xs px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-500"
            >
              {t("add_to_wishlist")}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>{t("original_product")}</p>
            <p>{t("cash_on_delivery")}</p>
            <p>{t("easy_return")}</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
}
```

### Step 2: SEO Implementation

#### 2.1 Fix Hreflang Implementation

Modify `src/components/SEOHreflang.tsx`:

```typescript
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SEOHreflang() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate hreflang tags
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Remove locale from pathname if it exists
    const cleanPath = pathname.replace(/^\/(en|ar)/, "");

    // Create hreflang tags
    const hreflangTags = [
      `<link rel="alternate" hreflang="en" href="${baseUrl}/en${cleanPath}" />`,
      `<link rel="alternate" hreflang="ar" href="${baseUrl}/ar${cleanPath}" />`,
      `<link rel="alternate" hreflang="x-default" href="${baseUrl}/en${cleanPath}" />`,
    ];

    // Add hreflang tags to head
    hreflangTags.forEach((tag) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hrefLang = tag.match(/hreflang="([^"]+)"/)?.[1] || "";
      link.href = tag.match(/href="([^"]+)"/)?.[1] || "";
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup hreflang tags
      const links = document.querySelectorAll('link[rel="alternate"]');
      links.forEach((link) => link.remove());
    };
  }, [pathname]);

  return null;
}
```

#### 2.2 Enhance Sitemap

Modify `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  const lastModified = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/category/apparel",
    "/category/glasses",
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Add static pages
  staticPages.forEach((page) => {
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    });

    // Add locale variations
    urls.push({
      url: `${baseUrl}/en${page}`,
      lastModified,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    });

    urls.push({
      url: `${baseUrl}/ar${page}`,
      lastModified,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    });
  });

  // Add product pages
  products.forEach((product) => {
    const productUrl = `/product/${product._id}`;

    urls.push({
      url: `${baseUrl}${productUrl}`,
      lastModified: new Date(product.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    urls.push({
      url: `${baseUrl}/en${productUrl}`,
      lastModified: new Date(product.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    urls.push({
      url: `${baseUrl}/ar${productUrl}`,
      lastModified: new Date(product.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return urls;
}
```

### Step 3: Bilingual Support

#### 3.1 Implement Locale-based Routing

Modify `src/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "ar"];
const defaultLocale = "en";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // Always show locale in URL
});

const protectedRoutes = ["/checkout", "/wishlist"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip locale middleware for API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Apply internationalization middleware
  const response = intlMiddleware(req);

  // Handle auth logic
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route)
  );
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));
  const token = req.cookies.get("token")?.value;
  const isLoggedIn = token && token !== "";

  if (isProtectedRoute && !isLoggedIn) {
    const locale = req.nextUrl.locale || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isPublicRoute && isLoggedIn) {
    const locale = req.nextUrl.locale || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

#### 3.2 Update Layout for RTL Support

Modify `src/app/layout.tsx`:

```typescript
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHreflang from "@/components/SEOHreflang";
import { generateOrganizationSchema } from "@/utils/seo";
import ShopContextProvider from "@/context/ShopContext";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SEO");

  return {
    title: {
      template: "%s | Premium Fashion Store",
      default: "Premium Fashion Store - Best Quality Apparel & Glasses",
    },
    description: t("home.description"),
    keywords: t("home.keywords"),
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
      description: t("home.description"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getTranslations();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema(locale)),
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
```

## Testing Your Changes

After implementing each step, test your changes:

1. **Run the development server**:

   ```bash
   npm run dev
   ```

2. **Check for TypeScript errors**:

   ```bash
   npm run type-check
   ```

3. **Run ESLint**:

   ```bash
   npm run lint
   ```

4. **Test SEO improvements**:

   - Use browser dev tools to check meta tags
   - Test structured data with Google's Rich Results Test
   - Verify sitemap at `http://localhost:3000/sitemap.xml`

5. **Test internationalization**:
   - Test both English and Arabic versions
   - Check RTL layout for Arabic
   - Verify language switching functionality

## Next Steps

After completing Phase 1, proceed to Phase 2 (Optimization) following the implementation plan. Each phase builds upon the previous one, so ensure Phase 1 is fully tested and working before moving forward.

## Common Issues and Solutions

### Issue: "use client" directive still needed for some components

**Solution**: Keep the directive only for components that:

- Use browser APIs (window, document)
- Use event handlers (onClick, onChange)
- Use React hooks (useState, useEffect)
- Use context

### Issue: SEO meta tags not updating

**Solution**: Ensure you're using the `generateMetadata` function correctly and that your data fetching is happening on the server side.

### Issue: RTL layout not working properly

**Solution**: Check that:

1. The `dir` attribute is set on the HTML element
2. CSS classes are properly handling RTL
3. Tailwind CSS is configured for RTL support

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
