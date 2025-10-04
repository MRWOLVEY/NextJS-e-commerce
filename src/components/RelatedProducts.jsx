"use client";
import React, { useState, useContext, useEffect } from "react";

import Title from "@/components/Title";
import ProductItem from "@/components/ProductItem";
import { useProducts } from "@/hooks/useApi";
import { useTranslations, useLocale } from "next-intl";
import { getProductName } from "@/utils/productHelpers";

function RelatedProducts({ category, subCategory }) {
  const { products, loading, error } = useProducts();
  const [related, setRelated] = useState([]);
  const t = useTranslations("RelatedProducts");
  const locale = useLocale();

  useEffect(() => {
    if (products && products.length > 0) {
      let relatedProducts = [];
      relatedProducts = products.filter((item) => {
        return item.category === category && item.subCategory === subCategory;
      });
      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title t1={t("title_part1")} t2={t("title_part2")} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            _id={item._id}
            image={item.image}
            name={getProductName(item, locale)}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
