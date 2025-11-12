import React from "react";
import ProductItem from "@/components/ProductItem";
import { getProducts } from "@/lib/data";
import CardSkeleton from "./CardSkeleton";

const BestSellers = async () => {
  const bestSellers = await getProducts({ bestseller: true, limit: 10 });

  const skeletonCards = Array.from({ length: 10 }, (_, i) => i + 1);

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
};

export default BestSellers;
