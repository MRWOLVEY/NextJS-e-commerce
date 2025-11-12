import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonLoader } from "react-loadly";
import HeroButton from "./HeroButton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Image from "next/image";
import { assets } from "@/data/assets";
import { products } from "@/data/products";
import TextType from "./text-type/TextType";
import { useTranslations } from "next-intl";

const Hero = async () => {
  const t = useTranslations("Hero");

  return (
    <div
      className={`flex flex-col-reverse sm:flex-row border border-gray-400 `}
    >
      <div className="w-full sm:w-1/2 flex flex-col gap-1 items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <TextType
            className="text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            text={t.raw("typewriter_messages") as string[]}
            typingSpeed={60}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
        <div>
          <HeroButton />
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <Suspense
          fallback={
            <Skeleton
              width={200}
              height={200}
              containerClassName="flex flex-1 h-[26rem] justify-center items-center"
            />
          }
        >
          <Image
            className="w-full h-full object-cover"
            src={assets?.hero_img || "/images/hero_img.png"}
            alt="hero"
            width={500}
            height={500}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
