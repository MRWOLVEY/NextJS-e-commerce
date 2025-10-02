import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import OurPolicy from "@/components/Policy";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <div className=" flex flex-col h-fit">
      {/* navbar */}
      {/* body */}
      <div className="Body flex flex-col gap-10 py-10 flex-auto">
        <Hero />
        <h1 className="flex justify-center text-3xl sm:text-5xl text-neutral-500 uppercase font-stretch-expanded tracking-widest font-medium border-b-2 pb-2 border-b-neutral-300">
          {t("categories_heading")}
        </h1>
        <Categories />
        <h1 className="flex text-center justify-center text-5xl text-neutral-500 uppercase font-stretch-expanded tracking-widest font-medium border-b-2 pb-2 border-b-neutral-300">
          {t("best_sellers_heading")}
        </h1>
        <BestSellers />
        <OurPolicy />
      </div>
      {/* footer */}
    </div>
  );
}
