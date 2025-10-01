"use client";
import React, { useContext, useState } from "react";
import Title from "@/components/Title";
import CartTotal from "@/components/CartTotal";
import { assets } from "@/data/assets";
import { ShopContext } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { SubmitHandler } from "react-hook-form";
import { on } from "events";
import z from "zod";
import ReviewOrderModal from "@/components/ReviewOrderModal";

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };
  return (
    <div>
      {!confirmed ? (
        <div className="checkout flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
          {/* left side */}
          <Form />
          {/* right side */}
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>
            <div className="mt-12">
              <Title t1={"payment"} t2={"method"} />
            </div>
            {/* paymnet methods selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-500 border-gray-400" : ""
                  }`}
                ></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div
                onClick={() => setMethod("vadafone")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "vadafone" ? "bg-green-500 border-gray-400" : ""
                  }`}
                ></p>
                <img className="h-5 mx-4" src={assets.vadafone_logo} alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-500 border-gray-400" : ""
                  }`}
                ></p>
                <p className="uppercase text-gray-500 text-sm font-medium mx-4">
                  cash on delivery
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={() => {
                  // router.push("/orders");
                  setShowModal(true);
                }}
                className="bg-black hover:opacity-85 text-white text-xs my-5 px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-200 uppercase transition-all duration-100"
              >
                review order
              </button>
              {showModal && (
                <ReviewOrderModal
                  setShowModal={setShowModal}
                  setConfirmed={setConfirmed}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-semibold">Order Confirmed</h1>
          <p className="text-gray-500">Thank you for your order!</p>
          <p className="text-gray-500">redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
