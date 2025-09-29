"use client";
import React from "react";
import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "@/context/ShopContext";
import Title from "@/components/Title";
import { assets } from "@/data/assets";
import CartTotal from "@/components/CartTotal";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

type CartItem = {
  [size: string]: number; // size is a string, value is quantity
};

type CartState = {
  [productId: string]: CartItem;
};

const Cart = () => {
  const { state, dispatch, actions } = useContext(ShopContext) as unknown as {
    state: {
      wishlist: CartState;
      wishlistProductsCount: number;
      cart: CartState;
      cartProductsCount: number;
    };
    dispatch: Function;
    actions: any;
  };
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const delivery_fee = 10;

  const getTotal = (cart: any) => {
    let t = 0;
    for (let item in cart) {
      t += cart[item].data.price * cart[item].quantity;
    }
    dispatch({ type: actions.updateTotal, payload: { total: t } });
  };

  const cartData = useMemo(() => {
    const result: any[] = [];
    Object.keys(state.wishlist).forEach((key: string) => {
      Object.keys(state.wishlist[key]).forEach((size: string) => {
        if (size !== "total") {
          const product = products.find((p) => p._id === key);
          if (product) {
            result.push({
              id: key,
              size,
              quantity: state.wishlist[key][size],
              data: product,
            });
          }
        }
      });
    });
    return result;
  }, [state.wishlist, products]);

  useEffect(() => {
    getTotal(cartData);
  }, [cartData]);

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title t1={"your"} t2={"wishlist"} />
        {state.wishlistProductsCount == 0 ? (
          <div className=" w-full min-h-16.5 flex justify-center items-center">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        ) : null}
        {cartData.map((item, index) => {
          // console.log('item', item)
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row items-center justify-start"
            >
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={item.data.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium ">
                      {item.data.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>${item.data.price}</p>
                    </div>
                  </div>
                </div>
                <img
                  onClick={() =>
                    dispatch({
                      type: actions.removeFromWishlist,
                      payload: { id: item.id, size: item.size },
                    })
                  }
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
              <div className="w-full flex justify-end mt-4 sm:mt-0">
                <button
                  onClick={() => router.push("/product/" + item.id)}
                  className="bg-black hover:opacity-85 text-white text-sm text-nowrap p-2 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-200 uppercase transition-all duration-100"
                >
                  See Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20"></div>
    </div>
  );
};

export default Cart;
