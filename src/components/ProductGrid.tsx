"use client";
import React, { useMemo, useState } from "react";
import ProductItem from "@/components/ProductItem";
import Title from "@/components/Title";
import { useTranslations } from "next-intl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./CardSkeleton";

interface Product {
  _id: string;
  name_en: string;
  name_ar: string;
  price: number;
  image: string[];
  type: string;
  category: string;
  subCategory: string;
  [key: string]: any;
}
type SortType = "relevant" | "low-high" | "high-low";

const ProductGrid = ({
  categoryType,
  filteredProducts,
  setSortType,
}: {
  categoryType: string;
  filteredProducts: Product[];
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
}) => {
  const t = useTranslations("Filters");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const lastProductIndex = useMemo(
    () => currentPage * productsPerPage,
    [currentPage, productsPerPage]
  );
  const firstProductIndex = useMemo(
    () => lastProductIndex - productsPerPage,
    [lastProductIndex, productsPerPage]
  );
  const filteredProductsPaginated = useMemo(
    () => filteredProducts.slice(firstProductIndex, lastProductIndex),
    [filteredProducts, firstProductIndex, lastProductIndex]
  );

  const pages = Array.from(
    { length: Math.ceil(filteredProducts.length / productsPerPage) },
    (_, i) => i + 1
  );
  const skeletonCards = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title t1="" t2={categoryType + "s"} />
        {/* product sort */}
        <div className="flex items-center gap-2">
          <p className="hidden sm:block text-base">{t("sort_by")}</p>
          <select
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="border border-gray-300 text-base rounded-sm"
            aria-placeholder={t("sort_by")}
          >
            <option value="relevant">{t("relevant")}</option>
            <option value="low-high">{t("low_to_high")}</option>
            <option value="high-low">{t("high_to_low")}</option>
          </select>
        </div>
      </div>
      {/* map products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filteredProductsPaginated.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
        {filteredProducts.length === 0 &&
          skeletonCards.map((card) => (
            // <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500 text-lg">
            //   no products found
            // </div>
            <CardSkeleton key={card} />
          ))}
      </div>
      {/* pagination */}
      <div className="flex justify-center mt-6 gap-3 flex-wrap">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3 py-1 border rounded hover cursor-pointer ${
              currentPage === page
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
