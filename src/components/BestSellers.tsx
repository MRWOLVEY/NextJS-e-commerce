"use client";
import React from "react";
import ProductItem from "@/components/ProductItem";
import { useProducts } from "@/hooks/useApi";
import CardSkeleton from "./CardSkeleton";

const BestSellers = () => {
  const {
    products: bestSellers,
    loading,
    error,
  } = useProducts({
    bestseller: true,
    limit: 10,
  });

  const skeletonCards = Array.from({ length: 10 }, (_, i) => i + 1);

  if (error) {
    return (
      <div className="my-10 text-center">
        <p className="text-red-500">Error loading bestsellers: {error}</p>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading || bestSellers.length === 0
          ? skeletonCards.map((card) => <CardSkeleton key={card} />)
          : bestSellers.map((product: any, index: number) => (
              <ProductItem
                key={product._id || index}
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
};

export default BestSellers;
