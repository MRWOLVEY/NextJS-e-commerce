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
