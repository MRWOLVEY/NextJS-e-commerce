"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";

const CategoryProduct = ({ product }: { product: Product }) => {
  return (
    <div className="block bg-white/80 hover:bg-white/90 transition-all duration-75 hover:cursor-pointer rounded">
      <div className="w-fit h-fit rounded">
        <Image
          src={product.image[0]}
          alt="product preview"
          width={100}
          height={100}
          className="rounded border border-neutral-300"
        />
      </div>
      <div className="text-base w-24 pl-2">
        {product.price}${" "}
        <span className="ml-1 text-red-600 text-xs">50% off</span>
      </div>
    </div>
  );
};

export default CategoryProduct;
