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
    image: product.image ? `${baseUrl}${product.image[0]}` : undefined,
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: locale === "ar" ? "متجر الأزياء المميز" : "Premium Fashion Store",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/${locale}/product/${product._id}`,
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 1,
        }
      : undefined,
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
