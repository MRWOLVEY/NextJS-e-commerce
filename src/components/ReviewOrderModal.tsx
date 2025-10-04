"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "@/context/ShopContext";
import { useProducts } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getProductName } from "@/utils/productHelpers";
import { set } from "zod";

const ReviewOrderModal = ({
  setShowModal,
  setConfirmed,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { state, dispatch } = useContext(ShopContext);
  const { products, loading } = useProducts();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("OrderReview");
  const cartT = useTranslations("Cart");
  const handleDivClick = () => {
    setShowModal(false);
  };

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleConfirm = (e: React.MouseEvent) => {
    setShowModal(false);
    setConfirmed(true);
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      router.push("/");
    }, 5000);
  };

  const cartItemsList = useMemo(() => {
    if (!products || loading) return [];

    const items = Object.entries(state.cart).map(([productId, sizeData]) => {
      const product = products.find((p: any) => p._id === productId);

      if (!product) return null;

      const totalPrice = Object.entries(sizeData).reduce(
        (total, [size, count]) => {
          return total + product.price * count;
        },
        0
      );

      return {
        id: productId,
        name: getProductName(product, locale),
        image: product.image[0],
        sizeCount: sizeData,
        price: product.price,
        totalPrice: totalPrice,
      };
    });

    return items.filter(
      (item): item is NonNullable<typeof item> => item !== null
    );
  }, [state.cart, products, loading, locale]);

  useEffect(() => {
    console.log("state in review order modal", state);
    console.log("cartItemsList", cartItemsList);
  }, [state, cartItemsList]);
  return (
    <div
      onClick={handleDivClick}
      className="BG fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
    >
      <div
        onClick={handleChildClick}
        className="Modal flex flex-col gap-4 min-w-96 h-fit bg-white p-4 rounded-md"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-center">
            {t("review_order")}
          </h1>
          <div className="bg-gray-50 flex flex-col p-4 gap-4 max-h-80 overflow-y-auto">
            {cartItemsList.length === 0 ? (
              <p className="text-gray-500 text-center">{cartT("cart_empty")}</p>
            ) : (
              cartItemsList.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer"
                >
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      ${item.price} {t("each")}
                    </p>

                    <div className="flex justify-between gap-2 mb-2">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(item.sizeCount).map(([size, count]) => (
                          <span
                            key={size}
                            className="bg-gray-100 px-2 py-1 rounded text-xs"
                          >
                            {size}: {count}
                          </span>
                        ))}
                      </div>
                      <p className="font-semibold text-sm text-right">
                        Total: ${item.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className=" flex px-4 justify-between">
          <div className="flex flex-col gap-1 w-fit">
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">
                {cartT("subtotal")}:
              </span>
              <span className="font-bold">${state.total}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">
                {t("shipping")}:
              </span>
              <span className="font-bold">$10</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">
                {cartT("total")}:
              </span>
              <span className="font-bold text-lg">${state.total + 10}</span>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleConfirm}
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              {t("confirm_order")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderModal;
