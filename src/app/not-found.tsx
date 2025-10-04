"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Title from "@/components/Title";

export default function NotFound() {
  const t = useTranslations("Error");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <Title t1={t("not_found_title_1")} t2={t("not_found_title_2")} />
      </div>

      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {t("page_not_found")}
      </h2>

      <p className="text-gray-500 mb-8 max-w-md">
        {t("not_found_description")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          {t("back_to_home")}
        </Link>

        <Link
          href="/contact"
          className="border border-gray-300 px-6 py-3 rounded hover:bg-gray-50 transition-colors"
        >
          {t("contact_support")}
        </Link>
      </div>
    </div>
  );
}
