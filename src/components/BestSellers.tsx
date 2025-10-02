"use client";
import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../contexts/ShopContext";
// import Title from "./Title";
import ProductItem from "@/components/ProductItem";
import { products } from "@/data/products";
import CardSkeleton from "./CardSkeleton";

const BestSellers = () => {
  interface Product {
    _id: string;
    name_en: string;
    name_ar: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    bestseller: boolean;
    [key: string]: any;
  }
  //   const { products } = useContext(ShopContext);
  const [BestSellers, setBestSellers] = useState<Product[]>([]);

  const skeletonCards = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    const BestSellers = products.filter((item) => (item.bestseller = true));
    setBestSellers(BestSellers.slice(12, 23));
  }, []);
  return (
    <div className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {BestSellers.length === 0
          ? skeletonCards.map((card) => <CardSkeleton key={card} />)
          : BestSellers.map((product, index) => (
              <ProductItem
                key={index}
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
