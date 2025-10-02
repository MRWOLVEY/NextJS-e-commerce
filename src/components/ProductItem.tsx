"use client";
import React, { use, useContext } from "react";
// import { ShopContext } from '../contexts/ShopContext'
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getLocalizedName } from "@/utils/productHelpers";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductItem = ({
  _id,
  image,
  name_en,
  name_ar,
  name, // Keep for backward compatibility
  price,
}: {
  _id?: string;
  image?: string[];
  name_en?: string;
  name_ar?: string;
  name?: string; // Fallback for backward compatibility
  price?: number;
}) => {
  const locale = useLocale();

  // Get the appropriate name based on locale
  const displayName = getLocalizedName({ name_en, name_ar, name }, locale);

  //   const { currency } = useContext(ShopContext)

  return (
    <Link
      className="text-gray-700 bg-neutral-50 rounded cursor-pointer border-gray-100 border"
      href={`/product/${_id}`}
    >
      <div className="overflow-hidden rounded flex justify-center items-center h-60">
        {/* <img
          className="hover:scale-110 transition duration-300 ease-in-out"
          src={image ? image[0] : ""}
        /> */}
        <Image
          src={image ? image[0] : ""}
          alt={displayName || "Product image"}
          width={500}
          height={500}
          className="hover:scale-110 transition duration-300 ease-in-out flex-1"
        />
      </div>
      <div className="h-[4.8rem] flex flex-col justify-between px-1">
        <p className="pt-3 pb-1 text-sm">{displayName}</p>
        <p className="text-sm font-medium">
          {/* {currency} */}
          {price}$
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
