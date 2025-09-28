import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import OurPolicy from "@/components/Policy";

export default function Page() {
  return (
    <div className=" flex flex-col h-fit">
      {/* navbar */}
      {/* body */}
      <div className="Body px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col gap-10 py-10 flex-auto">
        <Hero />
        <h1 className="flex justify-center text-5xl text-neutral-500 uppercase font-stretch-expanded tracking-widest font-medium border-b-2 pb-2 border-b-neutral-300">
          categories
        </h1>
        <Categories />
        <h1 className="flex text-center justify-center text-5xl text-neutral-500 uppercase font-stretch-expanded tracking-widest font-medium border-b-2 pb-2 border-b-neutral-300">
          best sellers
        </h1>
        <BestSellers />
        <OurPolicy />
      </div>
      {/* footer */}
    </div>
  );
}
