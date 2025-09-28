"use client";
import React, { useState, useContext, useEffect } from "react";
import { assets } from "@/data/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShopContext } from "@/context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { state, setShowSearch } = useContext(ShopContext);
  const pathname: string = usePathname();

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [visible]);
  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <div className="flex items-center justify-around py-4 font-medium border-b-2 mb-2">
      <Link href={"/"}>
        <img src={assets.logo} className="w-36 cursor-pointer" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-10 text-sm text-gray-700 pr-20">
        <Link href="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-0 border-none h-[1.5px] bg-gray-700" />
        </Link>
        <Link href="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-0 border-none h-[1.5px] bg-gray-700" />
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT </p>
          <hr className="w-0 border-none h-[1.5px] bg-gray-700" />
        </Link>
      </ul>
      <div className="flex items-center gap-6">
        {/* {pathname.includes("/category") && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
          />
        )} */}
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36  py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link href="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          {/* <p className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {state.cartProductsCount}
          </p> */}
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 bg-black cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" />
            <p className="text-slate-100">Back</p>
          </div>
          <Link
            onClick={() => setVisible(false)}
            href="/"
            className="py-2 pl-6 border"
          >
            HOME
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/collection"
            className="py-2 pl-6 border"
          >
            COLLECTION
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/about"
            className="py-2 pl-6 border"
          >
            ABOUT
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/contact"
            className="py-2 pl-6 border"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
