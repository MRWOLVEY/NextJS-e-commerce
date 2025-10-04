"use client";
import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "@/context/ShopContext";
import { useProduct, useAssets } from "@/hooks/useApi";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getProductName, getProductDescription } from "@/utils/productHelpers";
import RelatedProducts from "@/components/RelatedProducts";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/utils/seo";

import { Product as ProductsType } from "@/data/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = React.use(params);
  const { state, dispatch, actions } = useContext(ShopContext);
  const locale = useLocale();
  const t = useTranslations("Product");

  const {
    product: productData,
    relatedProducts,
    loading,
    error,
  } = useProduct(productId);
  const { assets, loading: assetsLoading } = useAssets();

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const skeletonImages = Array.from({ length: 4 }, (_, i) => i + 1);

  useEffect(() => {
    if (productData && !loading) {
      setImage(productData.image[0]);

      const getCategoryName = (type: string) => {
        if (type === "apparel") {
          return locale === "ar" ? "الملابس" : "Apparel";
        } else if (type === "glasses") {
          return locale === "ar" ? "النظارات" : "Glasses";
        }
        return type.charAt(0).toUpperCase() + type.slice(1);
      };

      const breadcrumbItems: BreadcrumbItem[] = [
        { name: locale === "ar" ? "الرئيسية" : "Home", url: "/" },
        {
          name: getCategoryName(productData.type),
          url: `/category/${productData.type}`,
        },
        {
          name: getProductName(productData, locale),
          url: `/product/${productId}`,
        },
      ];
      setBreadcrumbs(breadcrumbItems);
    } else if (error) {
      notFound();
    }
  }, [productData, loading, error, locale, productId]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (data: any, size: any) => {
    if (isAdding) return;

    setIsAdding(true);
    console.log("Adding to cart:", data._id, size);

    if (size) {
      dispatch({
        type: actions.addToCart,
        payload: { id: data._id, price: data.price, size: size },
      });
    }

    setTimeout(() => setIsAdding(false), 500);
  };
  const handleAddToWhishlist = (data: any, size: any) => {
    size
      ? dispatch({
          type: actions.addToWishlist,
          payload: { id: data._id, price: data.price, size: size },
        })
      : null;
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
      <Breadcrumb items={breadcrumbs} className="mb-6" />

      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex flex-1 pt-4 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col hide-scrollbar overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item: string, index: number) => (
              <Image
                alt={getProductName(productData, locale)}
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
            {image ? (
              <Image
                alt={getProductName(productData, locale)}
                src={image}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            ) : (
              <div
                className="w-full h-auto bg-gray-200 animate-pulse rounded"
                style={{ aspectRatio: "1/1" }}
              >
                <div className="flex items-center justify-center h-full text-gray-400">
                  Loading...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {getProductName(productData, locale)}
          </h1>
          <div className="flex items-center gap-1 mt-1">
            {assets?.star_icon ? (
              <>
                <img src={assets.star_icon} alt="" className="w-3" />
                <img src={assets.star_icon} alt="" className="w-3" />
                <img src={assets.star_icon} alt="" className="w-3" />
                <img src={assets.star_icon} alt="" className="w-3" />
                <img src={assets.star_icon} alt="" className="w-3" />
              </>
            ) : (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                  ></div>
                ))}
              </div>
            )}
            <p className="pls-2">{t("rating_count")}</p>
          </div>

          <p className="mt-2 text-2xl font-medium">${productData.price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {getProductDescription(productData, locale)}
          </p>
          <div className="flex flex-col gap-4 my-4">
            <p>{t("select_size")}</p>
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
              {isAdding ? t("adding") : t("add_to_cart")}
            </button>
            <button
              onClick={() => handleAddToWhishlist(productData, size)}
              className="hover cursor-pointer bg-black hover:opacity-85 text-white text-xs px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-500"
            >
              {t("add_to_wishlist")}
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>{t("original_product")}</p>
            <p>{t("cash_on_delivery")}</p>
            <p>{t("easy_return")}</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : null;
};

export default Product;
