"use client";
import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "@/context/ShopContext";
import { assets } from "@/data/assets";
import { products } from "@/data/products";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Product as ProductsType } from "@/data/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import RelatedProducts from "../components/RelatedProducts";
// import { toast } from "react-toastify";

const Product = ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = React.use(params);
  const { state, dispatch, actions } = useContext(ShopContext);
  const [productData, setProductData] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  // const location = usePathname();

  const skeletonImages = Array.from({ length: 4 }, (_, i) => i + 1);

  //   const fetchProduct = async () => {
  //     setLoading(true);
  //     setError(false);
  //     products.map((item) => {
  //
  //     });
  //     setLoading(false);
  //   };

  useEffect(() => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        setLoading(false);
      }
    });
  }, [productId, products]);

  //   useEffect(() => {
  //     setSize("");
  //   }, [location]);

  // useEffect(() => {
  //   console.log('state', state)
  // }, [state])

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (data: any, size: any) => {
    if (isAdding) return; // Prevent double clicks

    setIsAdding(true);
    console.log("Adding to cart:", data._id, size);

    if (size) {
      dispatch({
        type: actions.addToCart,
        payload: { id: data._id, price: data.price, size: size },
      });
    }

    // Reset after 500ms
    setTimeout(() => setIsAdding(false), 500);
  };
  const handleAddToWhishlist = (data: any, size: any) => {
    size
      ? dispatch({
          type: actions.addToWishlist,
          payload: { id: data._id, price: data.price, size: size },
        })
      : //   : toast.error("Please select a size");
        null;
  };

  return loading ? (
    <div className="flex flex-col sm:flex-row h-12s0 gap-10 pt-10 mb-10">
      <Skeleton
        height={100}
        width={100}
        containerClassName="flex w-full justify-center items-center"
      />
      <Skeleton
        height={20}
        width={500}
        count={7}
        containerClassName="flex flex-col h-100 w-full justify-between"
      />
    </div>
  ) : productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex flex-1 pt-4 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col hide-scrollbar overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <Image
                alt={productData.name}
                width={500}
                height={500}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-2.5 flex shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full h-full sm:w-[80%]">
            <Image
              alt={productData.name}
              src={image}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-1">
            {/* rating stars and count */}
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <p className="pls-2">(122)</p>
          </div>
          {/* currency and price */}
          <p className="mt-2 text-2xl font-medium">${productData.price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item: any, index: number) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <button
              onClick={() => handleAddToCart(productData, size)}
              disabled={isAdding}
              className={`text-white text-xs px-8 py-3 rounded-sm shadow-lg shadow-gray-500 ${
                isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cursor-pointer bg-black hover:opacity-85 active:bg-gray-700"
              }`}
            >
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>
            <button
              onClick={() => handleAddToWhishlist(productData, size)}
              className="hover cursor-pointer bg-black hover:opacity-85 text-white text-xs px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-500"
            >
              Add To wishlist
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery</p>
            <p>Easy return and exchange within 30 days</p>
          </div>
        </div>
      </div>
      {/* description and review */}
      {/* <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iure,
            ipsam beatae obcaecati atque mollitia dolores temporibus incidunt
            cupiditate distinctio ea asperiores necessitatibus esse eos vero
            quas molestiae fugit consequatur.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            consectetur quo consequuntur! Nobis eaque, odio, nam dolores
            quibusdam totam, maxime atque facere non error accusamus molestiae
            corporis quae placeat? Sequi.
          </p>
        </div>
      </div> */}
      {/* realated products */}
      {/* <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      /> */}
    </div>
  ) : null;
};

export default Product;
