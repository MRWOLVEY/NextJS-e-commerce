"use client";
import React, { use, useContext } from "react";
// import { ShopContext } from '../contexts/ShopContext'
import Link from "next/link";

const ProductItem = ({
  _id,
  image,
  name,
  price,
}: {
  _id?: number;
  image?: string;
  name: string;
  price?: number;
}) => {
  //   const { currency } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer" href={`/product/${_id}`}>
      <div className="overflow-hidden rounded">
        <img
          className="hover:scale-110 transition duration-300 ease-in-out"
          src={image ? image[0] : ""}
        />
      </div>
      <div className="h-[4.8rem] flex flex-col justify-between">
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {/* {currency} */}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
