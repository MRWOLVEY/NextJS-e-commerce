"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Title from "@/components/Title";
import ProductItem from "@/components/ProductItem";
import { products } from "@/data/products";
import { getProductName } from "@/utils/productHelpers";

export default function ProductNotFound() {
  const t = useTranslations("Error");
  const locale = useLocale();

  // Show some featured products as alternatives
  const featuredProducts = products
    .filter((product) => product.bestseller)
    .slice(0, 4);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <Title
          t1={t("product_not_found_title_1")}
          t2={t("product_not_found_title_2")}
        />
      </div>

      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {t("product_not_found")}
      </h2>

      <p className="text-gray-500 mb-8 max-w-md">
        {t("product_not_found_description")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          {t("back_to_home")}
        </Link>

        <Link
          href="/category/apparel"
          className="border border-gray-300 px-6 py-3 rounded hover:bg-gray-50 transition-colors"
        >
          {t("browse_products")}
        </Link>
      </div>

      {/* Alternative Products */}
      {featuredProducts.length > 0 && (
        <div className="w-full max-w-6xl">
          <h3 className="text-xl font-semibold mb-6">{t("you_might_like")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={getProductName(product, locale)}
                price={product.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
