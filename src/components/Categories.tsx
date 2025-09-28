"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/data/assets";
import { products, Product } from "@/data/products";
import CategoryProduct from "./CategoryProduct";
import { useRouter } from "next/navigation";

const Categories = () => {
  interface Category {
    name: string;
    imageUrl: string;
    url: string;
  }

  const router = useRouter();
  const [apparels, setApparels] = useState<Product[]>([]);

  const categories: Category[] = [
    {
      name: "Apparels",
      imageUrl: assets.apparel_bg,
      url: "/category/apparel",
    },
    {
      name: "Glasses",
      imageUrl: assets.glasses_bg,
      url: "/category/glasses",
    },
  ];

  useEffect(() => {
    const items = products.filter((item) => item.type === "apparel");
    setApparels(items.slice(0, 6));
  }, []);
  return (
    <div className=" flex flex-col sm:flex-row gap-4 w-full ">
      {categories.map((cat, i) => (
        <div
          key={i}
          style={{ backgroundImage: `url(${cat.imageUrl})` }}
          className="rounded flex-1 bg-cover bg-center bg-no-repeat min-h-40 flex items-center"
        >
          <div
            onClick={() => {
              router.push(cat.url);
            }}
            className="w-full h-full rounded hover:bg-white/30 hover:cursor-pointer duration-200 flex justify-center items-center"
          >
            <h1 className="text-center font-semibold text-4xl text-neutral-700">
              {cat.name}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
