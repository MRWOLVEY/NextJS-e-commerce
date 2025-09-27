import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className=" flex flex-col h-fit">
      {/* navbar */}
      <Navbar />
      {/* body */}
      <div className="Body px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col gap-10 py-10 flex-auto">
        <Hero />
        <h1 className="flex justify-center text-5xl font-bold border-b-2 pb-2 border-b-neutral-300">
          categories
        </h1>
        <Categories />
      </div>
      {/* footer */}
      {/* <div className="Footer w-full flex"> */}
      {/* </div> */}
      <Footer />
    </div>
  );
}
