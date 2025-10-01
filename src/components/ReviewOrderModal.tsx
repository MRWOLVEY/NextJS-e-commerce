"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "@/context/ShopContext";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";
import { set } from "zod";

const ReviewOrderModal = ({
  setShowModal,
  setConfirmed,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { state, dispatch } = useContext(ShopContext);
  const router = useRouter();
  const handleDivClick = () => {
    setShowModal(false);
  };

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the parent div
  };

  const handleConfirm = (e: React.MouseEvent) => {
    setShowModal(false);
    setConfirmed(true); 
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      router.push("/");
    }, 5000);
  };

  // Map through cart items and create list with product details
  const cartItemsList = useMemo(() => {
    const items = Object.entries(state.cart).map(([productId, sizeData]) => {
      // Find the product from products array
      const product = products.find((p) => p._id === productId);

      if (!product) return null;

      // Calculate total price for this product (all sizes combined)
      const totalPrice = Object.entries(sizeData).reduce(
        (total, [size, count]) => {
          return total + product.price * count;
        },
        0
      );

      return {
        id: productId,
        name: product.name,
        image: product.image[0],
        sizeCount: sizeData, // Object with size as key and count as value
        price: product.price,
        totalPrice: totalPrice,
      };
    });

    // Filter out null entries and return typed array
    return items.filter(
      (item): item is NonNullable<typeof item> => item !== null
    );
  }, [state.cart]);

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
            Review Your Order
          </h1>
          <div className="bg-gray-50 flex flex-col p-4 gap-4 max-h-80 overflow-y-auto">
            {cartItemsList.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              cartItemsList.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      ${item.price} each
                    </p>

                    {/* Size and Count Details */}
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

                    {/* Total Price for this product */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className=" flex px-4 justify-between">
          <div className="flex flex-col gap-1 w-fit">
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">Subtotal:</span>
              <span className="font-bold">${state.total}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">Shipping:</span>
              <span className="font-bold">$10</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="font-bold text-lg">${state.total + 10}</span>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleConfirm}
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderModal;
