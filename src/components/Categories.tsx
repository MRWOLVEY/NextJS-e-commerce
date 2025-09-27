"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/data/assets";
import { products, Product } from "@/data/products";
import CategoryProduct from "./CategoryProduct";

const Categories = () => {
  const [apparels, setApparels] = useState<Product[]>([]);
  useEffect(() => {
    const items = products.filter((item) => item.type === "apparel");
    setApparels(items.slice(0, 6));
  }, []);
  return (
    <div className=" flex flex-col sm:flex-row gap-4 w-full ">
      <div
        style={{ backgroundImage: `url(${assets.apparel_bg})` }}
        className=" rounded flex-1 hover:scale-[102%] duration-200 bg-cover bg-center bg-no-repeat"
      >
        <div className="flex gap-1 justify-around items-center h-full w-full flex-col py-1 flex-1 bg-white/30">
          <h1 className="w-full text-center sm:text-start sm:pl-2 text-xl sm:text-2xl">
            Apparels
          </h1>
          <div className="py-1 grid grid-cols-3 gap-3 w-fit">
            {apparels.map((item, i) => (
              <CategoryProduct key={i} product={item} />
            ))}
          </div>
          <div className="flex justify-center items-center w-full h-fit">
            <button className="bg-amber-100/50 p-1 rounded text-center cursor-pointer hover:bg-amber-100/80 duration-200">
              Browse more!
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${assets.glasses_bg})` }}
        className="rounded flex-1 hover:scale-[102%] duration-200 bg-cover bg-center bg-no-repeat"
      >
        <div className="flex gap-1 justify-around items-center h-full w-full flex-col py-1 flex-1 bg-white/30">
          <h1 className="w-full text-center sm:text-start sm:pl-2 text-xl sm:text-2xl">
            Glasses
          </h1>
          <div className="py-1 grid grid-cols-3 gap-3 w-fit">
            {apparels.map((item, i) => (
              <CategoryProduct key={i} product={item} />
            ))}
          </div>
          <div className="flex justify-center items-center w-full h-fit">
            <button className="bg-amber-100/50 p-1 rounded text-center cursor-pointer hover:bg-amber-100/80 duration-200">
              Browse more!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
