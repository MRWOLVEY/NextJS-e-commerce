"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
export default function HeroButton() {
  const router = useRouter();
  const t = useTranslations("Hero");

  return (
    <button
      className="flex items-center gap-2 cursor-pointer bg-amber-200 hover:bg-amber-100 transition-colors duration-100 p-2 rounded-2xl"
      onClick={() => {
        router.push("/category/apparel");
      }}
    >
      <p className="font-semibold text-sm md:text-2xl">{t("shop_now")}</p>
      <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
    </button>
  );
}
