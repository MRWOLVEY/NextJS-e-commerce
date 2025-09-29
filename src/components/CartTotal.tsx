"use client";
import React, { useContext } from "react";
import { ShopContext } from "@/context/ShopContext";
import Title from "@/components/Title";

function CartTotal() {
  const { state } = useContext(ShopContext);
  const delivery_fee = 10;
  return (
    <div>
      <div className="w-full">
        <div className="text-2xl">
          <Title t1={"cart"} t2={"total"} />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$ {state.total}.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>$ {delivery_fee}.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <b>Total</b>
            <b>$ {state.total == 0 ? 0 : state.total + delivery_fee}.00</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
