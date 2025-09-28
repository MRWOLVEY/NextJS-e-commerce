"use client";
import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../contexts/ShopContext";
// import Title from "./Title";
import ProductItem from "@/components/ProductItem";
import { products } from "@/data/products";

const BestSellers = () => {
  interface Product {
    name: string;
    price: number;
    category: string;
    subCategory: string;
    [key: string]: any;
  }
  //   const { products } = useContext(ShopContext);
  const [BestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const BestSellers = products.filter((item) => (item.bestseller = true));
    setBestSellers(BestSellers.slice(0, 10));
  }, []);
  return (
    <div className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {BestSellers.map((product, index) => (
          <ProductItem
            key={index}
            _id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
