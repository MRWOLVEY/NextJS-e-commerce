"use client";
import { useState, useEffect, use } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useRouter } from "next/navigation";

import React from "react";
import Image from "next/image";
import { assets } from "@/data/assets";
import TextType from "./text-type/TextType";
import { fa } from "zod/locales";

const Hero = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   const timer: NodeJS.Timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // });
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row border border-gray-400 `}
    >
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex flex-col gap-1 items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <TextType
            className="text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            text={["Best Products", "Best Quality", "We Sell Style"]}
            typingSpeed={60}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
        <div>
          <button
            className="flex items-center gap-2 cursor-pointer bg-amber-200 hover:bg-amber-100 transition-colors duration-100 p-2 rounded-2xl"
            onClick={() => {
              router.push("/category/apparel");
            }}
          >
            <p className="font-semibold text-sm md:text-2xl">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </button>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-full sm:w-1/2">
        {loading && (
          <Skeleton
            width={200}
            height={200}
            containerClassName="flex flex-1 h-[26rem] justify-center items-center"
          />
        )}
        {!loading && (
          <Image
            className="w-full h-full object-cover"
            src={assets.hero_img}
            alt="hero"
            width={500}
            height={500}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
