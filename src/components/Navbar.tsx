"use client";
import React, { useState, useContext, useEffect } from "react";
import { assets } from "@/data/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShopContext } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const setLocaleCookie = (locale: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
  document.cookie = `locale=${locale}; path=/; expires=${expires.toUTCString()}`;
};

const Navbar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showCats, setShowCats] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { state, setShowSearch, dispatch } = useContext(ShopContext);
  const pathname: string = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const authT = useTranslations("Auth");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [visible]);

  return (
    <div className="flex items-center justify-around py-4 font-medium border-b-2 mb-2">
      <Link href={"/"}>
        <img src={assets.logo} className="w-36 cursor-pointer" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-10 text-sm text-gray-700">
        <Link
          href="/"
          className="underlinedLink flex flex-col items-center gap-1"
        >
          <p>{t("home")}</p>
          <hr className="w-0 border-none h-[1.5px] bg-gray-700" />
        </Link>
        <div className="flex flex-col items-center gap-1 group relative">
          <p className="">{t("collection")}</p>
          <div className="hidden group-hover:flex absolute top-full left-0 bg-white shadow-lg flex-col p-4 gap-2 rounded w-full items-center">
            <Link
              href="/category/apparel"
              className="hover:text-black text-sm tracking-wider text-gray-500"
            >
              {t("apparels")}
            </Link>
            <Link
              href="/category/glasses"
              className="hover:text-black text-sm tracking-wider text-gray-500"
            >
              {t("glasses")}
            </Link>
          </div>
        </div>
        <Link
          href="/about"
          className="underlinedLink flex flex-col items-center gap-1"
        >
          <p>{t("about")}</p>
          <hr className="w-0 border-none h-[1.5px] bg-gray-700" />
        </Link>
        <Link
          href="/contact"
          className="underlinedLink flex flex-col items-center gap-1"
        >
          <p>{t("contact")}</p>
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
        <div className="border flex gap-0.5 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 cursor-pointer"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="m6.93 6.93 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="m14.83 14.83 4.24 4.24" />
            <path d="m6.93 17.07 4.24-4.24" />
          </svg>
          <div className="h-4 border-l" />
          <select
            value={locale}
            onChange={(e) => {
              const selectedLocale = e.target.value;
              setLocaleCookie(selectedLocale);
              router.refresh(); // Refresh to apply the new locale
            }}
            className="outline-none bg-transparent text-sm cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>
        {mounted && !visible && !state.isLoggedIn && (
          <button
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm cursor-pointer hidden sm:block"
            onClick={() => router.push("/login")}
          >
            {authT("login")}
          </button>
        )}
        {mounted && !visible && state.isLoggedIn && (
          <div className="group hidden sm:block relative">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-5 cursor-pointer"
            />
            <div className="group-hover:block hidden absolute dropdown-menu pt-4">
              <div className="flex flex-col gap-2 w-36  py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => router.push("/wishlist")}
                  className="cursor-pointer hover:text-black"
                >
                  {t("wishlist")}
                </p>
                <p
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    router.push("/login");
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  {t("logout")}
                </p>
              </div>
            </div>
          </div>
        )}
        <Link href="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <span className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {state.cartProductsCount}
          </span>
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
            <p className="text-slate-100">{t("back")}</p>
          </div>
          <Link
            onClick={() => setVisible(false)}
            href="/"
            className="py-2 pl-6 border"
          >
            {t("home")}
          </Link>
          <div
            onClick={() => {
              setShowCats(() => !showCats);
            }}
            className="py-2 pl-6 border"
          >
            <span>{t("collection")}</span>
            {showCats && (
              <div className="flex flex-col mt-2 gap-2 pl-4">
                <Link
                  onClick={() => setVisible(false)}
                  href="/category/apparel"
                  className="hover:text-black text-sm tracking-wider text-gray-500"
                >
                  {t("apparel")}
                </Link>
              </div>
            )}
            {showCats && (
              <div className="flex flex-col mt-2 gap-2 pl-4">
                <Link
                  onClick={() => setVisible(false)}
                  href="/category/glasses"
                  className="hover:text-black text-sm tracking-wider text-gray-500"
                >
                  {t("glasses_lowercase")}
                </Link>
              </div>
            )}
          </div>
          <Link
            onClick={() => setVisible(false)}
            href="/about"
            className="py-2 pl-6 border"
          >
            {t("about")}
          </Link>
          <Link
            onClick={() => setVisible(false)}
            href="/contact"
            className="py-2 pl-6 border"
          >
            {t("contact")}
          </Link>
          {mounted && state.isLoggedIn ? (
            <div className="">
              <div
                onClick={() => {
                  setVisible(false);
                  router.push("/wishlist");
                }}
                className="py-2 pl-6 border "
              >
                {t("wishlist").toUpperCase()}
              </div>
              <div
                onClick={() => {
                  setVisible(false);
                  dispatch({ type: "LOGOUT" });
                  router.push("/login");
                }}
                className="py-2 pl-6 border"
              >
                {t("logout").toUpperCase()}
              </div>
            </div>
          ) : mounted ? (
            <Link
              onClick={() => setVisible(false)}
              href="/login"
              className="py-2 pl-6 border"
            >
              {authT("login").toUpperCase()}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
