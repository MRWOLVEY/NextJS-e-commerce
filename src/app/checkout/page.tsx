"use client";
import React, { useContext, useState } from "react";
import Title from "@/components/Title";
import CartTotal from "@/components/CartTotal";
import { useTranslations } from "next-intl";
import { useAssets } from "@/hooks/useApi";
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
  const { assets, loading } = useAssets();
  const router = useRouter();
  const t = useTranslations("Checkout");
  const productT = useTranslations("Product");
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };
  return (
    <div>
      {!confirmed ? (
        <div className="checkout flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
          <Form />
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>
            <div className="mt-12">
              <Title
                t1={t("payment_method").split(" ")[0]}
                t2={t("payment_method").split(" ")[1]}
              />
            </div>

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
                <img
                  className="h-5 mx-4"
                  src={assets?.stripe_logo || "/images/stripe_logo.png"}
                  alt=""
                />
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
                <img
                  className="h-5 mx-4"
                  src={assets?.vadafone_logo || "/images/vadafone_logo.png"}
                  alt=""
                />
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
                  {productT("cash_on_delivery")}
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-black hover:opacity-85 text-white text-xs my-5 px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-200 uppercase transition-all duration-100"
              >
                {t("place_order")}
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
          <h1 className="text-4xl font-semibold">{t("order_confirmed")}</h1>
          <p className="text-gray-500">{t("thank_you")}</p>
          <p className="text-gray-500">{t("redirecting")}</p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
