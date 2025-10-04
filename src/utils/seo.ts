import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}

export function generateMetadata(
  seoConfig: SEOConfig,
  locale: string = "en"
): Metadata {
  const baseUrl = "http://localhost:3000";
  const currentUrl = seoConfig.canonical || baseUrl;

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,

    // Basic SEO
    robots: seoConfig.noindex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: currentUrl,
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: seoConfig.title,
      description: seoConfig.description,
      url: currentUrl,
      siteName:
        locale === "ar" ? "متجر الأزياء المميز" : "Premium Fashion Store",
      images: [
        {
          url: seoConfig.ogImage || `${baseUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: seoConfig.title,
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: seoConfig.title,
      description: seoConfig.description,
      images: [seoConfig.ogImage || `${baseUrl}/images/og-default.jpg`],
    },

    // Additional meta tags
    other: {
      "theme-color": "#f59e0b", // Amber color from your design
      "msapplication-TileColor": "#f59e0b",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

export function generateHreflangLinks(
  currentPath: string,
  availableLocales: string[] = ["en", "ar"]
): Record<string, string> {
  const baseUrl = "http://localhost:3000";
  const hreflangs: Record<string, string> = {};

  availableLocales.forEach((locale) => {
    hreflangs[locale] = `${baseUrl}/${locale}${currentPath}`;
  });

  // Add x-default for international users
  hreflangs["x-default"] = `${baseUrl}/en${currentPath}`;

  return hreflangs;
}

export function generateProductSchema(product: any, locale: string = "en") {
  const baseUrl = "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: locale === "ar" ? product.name_ar : product.name_en,
    description:
      locale === "ar" ? product.description_ar : product.description_en,
    image: product.image
      ? product.image.map((img: string) => `${baseUrl}${img}`)
      : [],
    sku: product._id,
    mpn: product._id, // Manufacturer Part Number
    brand: {
      "@type": "Brand",
      name: locale === "ar" ? "متجر الأزياء المميز" : "Premium Fashion Store",
    },
    category: product.category,
    color: product.color || "Various",
    size: product.sizes || [],
    material: product.material || "Premium Quality",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.bestseller
        ? "https://schema.org/InStock"
        : "https://schema.org/InStock",
      url: `${baseUrl}/product/${product._id}`,
      seller: {
        "@type": "Organization",
        name: locale === "ar" ? "متجر الأزياء المميز" : "Premium Fashion Store",
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 1 year from now
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviewCount || 122,
      bestRating: 5,
      worstRating: 1,
    },
    review: product.reviews || [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.rating || 4.5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Customer Review",
        },
        reviewBody:
          locale === "ar"
            ? "منتج ممتاز وجودة عالية"
            : "Excellent product with great quality",
      },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Category",
        value: product.category,
      },
      {
        "@type": "PropertyValue",
        name: "Subcategory",
        value: product.subCategory,
      },
    ],
  };
}

export function generateOrganizationSchema(locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ar" ? "متجر الأزياء المميز" : "Premium Fashion Store",
    url: "http://localhost:3000",
    logo: "/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  breadcrumbs: BreadcrumbItem[],
  locale: string = "en"
) {
  const baseUrl = "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}

export function generateProductWithBreadcrumbSchema(
  product: any,
  breadcrumbs: BreadcrumbItem[],
  locale: string = "en"
) {
  return [
    generateProductSchema(product, locale),
    generateBreadcrumbSchema(breadcrumbs, locale),
  ];
}
