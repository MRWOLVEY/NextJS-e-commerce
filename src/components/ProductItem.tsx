"use client";
import React, { use, useContext } from "react";
// import { ShopContext } from '../contexts/ShopContext'
import Link from "next/link";
import Image from "next/image";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    <Link
      className="text-gray-700 bg-neutral-50 rounded cursor-pointer"
      href={`/product/${_id}`}
    >
      <div className="overflow-hidden rounded">
        {/* <img
          className="hover:scale-110 transition duration-300 ease-in-out"
          src={image ? image[0] : ""}
        /> */}
        <Image
          src={image ? image[0] : ""}
          alt={name}
          width={500}
          height={500}
          className="hover:scale-110 transition duration-300 ease-in-out"
        />
      </div>
      <div className="h-[4.8rem] flex flex-col justify-between px-1">
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {/* {currency} */}
          {price}$
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
