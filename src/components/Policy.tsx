"use client";
import React from "react";
import { useAssets } from "@/hooks/useApi";
import { useTranslations } from "next-intl";

const OurPolicy = () => {
  const t = useTranslations("Policy");
  const { assets, loading } = useAssets();

  return (
    <div
      id="lol"
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700"
    >
      <div>
        <img
          src={assets?.exchange_icon || "/images/exchange_icon.png"}
          alt="exchange"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold uppercase">{t("exchange_title")}</p>
        <p className="text-gray-400">{t("exchange_description")}</p>
      </div>
      <div>
        <img
          src={assets?.quality_icon || "/images/quality_icon.png"}
          alt="return"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold uppercase">{t("return_title")}</p>
        <p className="text-gray-400">{t("return_description")}</p>
      </div>
      <div>
        <img
          src={assets?.support_img || "/images/support_img.png"}
          alt="support"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold uppercase">{t("support_title")}</p>
        <p className="text-gray-400">{t("support_description")}</p>
      </div>
    </div>
  );
};

export default OurPolicy;
