"use server";
import { Metadata } from "next";
import { getProduct } from "@/utils/api";
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
  const response = await getProduct(productId);
  const product =
    response.success && response.data ? response.data.product : null;

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const locale = "en";
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
  const response = await getProduct(productId);
  const product = response.success ? response.data?.product : null;

  if (!product) {
    return <>{children}</>;
  }

  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

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
