"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { assets } from "@/data/assets";

interface FiltersProps {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCat: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSubCat: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryType: string;
  categories: string[];
  subcategories: string[];
}

const Filters = ({
  showFilter,
  setShowFilter,
  toggleCat,
  toggleSubCat,
  categoryType,
  categories,
  subcategories,
}: FiltersProps) => {
  const t = useTranslations("Filters");

  return (
    // <div>
    <div className="min-w-60 h-fit transition duration-100 ease-in-out">
      <p className="my-2 text-xl flex items-center gap-2 cursor-pointer">
        {t("filters").toUpperCase()}
        <img
          src={assets.dropdown_icon}
          alt=""
          className={classNames(
            "h-3 sm:hidden transition duration-100 ease-in-out cursor-pointer",
            {
              "rotate-90": showFilter,
            }
          )}
          onClick={() => setShowFilter(!showFilter)}
        />
      </p>
      {/* category filter */}
      <div
        className={classNames(
          "transition duration-300 ease-in-out h-100 overflow-hidden opacity-100",
          {
            "max-[400px]:h-0 max-[400px]:opacity-0": !showFilter,
          }
        )}
      >
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">{t("categories")}</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.length > 0 &&
              categories.map((cat, i) => (
                <p key={i} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    className="w-3"
                    onChange={toggleCat}
                  />
                  {cat}
                </p>
              ))}
          </div>
        </div>
        {/* subcategory filter */}
        <div
          className={classNames("border border-gray-300 pl-5 py-3 my-5", {
            "": !showFilter,
          })}
        >
          <p className="mb-3 text-sm font-medium">{t("type")}</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subcategories.length > 0 &&
              subcategories.map((subcat, i) => (
                <p key={i} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={subcat}
                    className="w-3"
                    onChange={toggleSubCat}
                  />{" "}
                  {subcat}
                </p>
              ))}
            {/* <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                className="w-3"
                onChange={toggleSubCat}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                className="w-3"
                onChange={toggleSubCat}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                className="w-3"
                onChange={toggleSubCat}
              />
              Winterwear
            </p> */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Filters;
