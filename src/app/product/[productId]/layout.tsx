"use server";
import { Metadata } from "next";
import { products } from "@/data/products";
import {
  generateProductWithBreadcrumbSchema,
  BreadcrumbItem,
} from "@/utils/seo";
import { getProductName, getProductDescription } from "@/utils/productHelpers";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ productId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const locale = "en"; // Default locale for metadata generation
  const productName = getProductName(product, locale);
  const productDescription = getProductDescription(product, locale);
  const baseUrl = "http://localhost:3000";

  return {
    title: `${productName} | Premium Fashion Store`,
    description: productDescription,
    keywords: `${product.category}, ${product.subCategory}, fashion, ${productName}`,
    openGraph: {
      title: productName,
      description: productDescription,
      images: [
        {
          url: `${baseUrl}${product.image[0]}`,
          width: 800,
          height: 600,
          alt: productName,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductLayout({ params, children }: Props) {
  const { productId } = await params;
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return <>{children}</>;
  }

  // Get locale from cookies
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  // Generate breadcrumbs based on actual site structure
  const getCategoryName = (type: string, locale: string) => {
    if (type === "apparel") {
      return locale === "ar" ? "الملابس" : "Apparel";
    } else if (type === "glasses") {
      return locale === "ar" ? "النظارات" : "Glasses";
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: "/" },
    {
      name: getCategoryName(product.type, locale),
      url: `/category/${product.type}`,
    },
    { name: getProductName(product, locale), url: `/product/${productId}` },
  ];

  // Generate structured data
  const structuredData = generateProductWithBreadcrumbSchema(
    product,
    breadcrumbs,
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
}
