"use client";
import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from '../contexts/ShopContext'
import classNames from "classnames";
import { assets } from "@/data/assets";
import {
  products as productsList,
  categories,
  subcategories,
} from "@/data/products";
import Title from "@/components/Title";
import ProductItem from "@/components/ProductItem";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";
import { searchProducts } from "@/utils/productHelpers";

const Page = ({ params }: { params: Promise<{ categoryType: string }> }) => {
  const { categoryType } = React.use(params);
  const products = productsList.filter((p) => p.type === categoryType);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  //   const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>("relevant");

  interface Product {
    _id: string;
    name_en: string;
    name_ar: string;
    price: number;
    image: string[];
    type: string;
    category: string;
    subCategory: string;
    [key: string]: any;
  }

  type Category = string;
  type Subcategory = string;
  type SortType = "relevant" | "low-high" | "high-low";

  const toggleCat = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory((prev: Category[]) =>
        prev.filter((item) => item != e.target.value)
      );
    } else {
      setCategory((prev: Category[]) => [...prev, e.target.value]);
    }
  };
  interface ToggleSubCatEvent extends React.ChangeEvent<HTMLInputElement> {}

  const toggleSubCat = (e: ToggleSubCatEvent) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev: Subcategory[]) =>
        prev.filter((item) => item != e.target.value)
      );
    } else {
      setSubcategory((prev: Subcategory[]) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = searchProducts(productsCopy, search);
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subcategory.includes(product.subCategory)
      );
    }
    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* filter options */}
      <Filters
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        toggleCat={toggleCat}
        toggleSubCat={toggleSubCat}
        categoryType={categoryType}
        categories={categories[categoryType] || []}
        subcategories={subcategories[categoryType] || []}
      />
      {/* right side */}
      <ProductGrid
        categoryType={categoryType}
        filteredProducts={filteredProducts}
        setSortType={setSortType}
      />
    </div>
  );
};

export default Page;
