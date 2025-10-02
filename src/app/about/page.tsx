import React from "react";
import Title from "@/components/Title";
import { assets } from "@/data/assets";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { generateMetadata as generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const t = await getTranslations({ locale, namespace: "SEO" });

  return generateSEOMetadata(
    {
      title: t("about.title"),
      description: t("about.description"),
      keywords: t("about.keywords"),
    },
    locale
  );
}

const About = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <div className="bg-gray-50">
      <div className="text-2xl text-center pt-8 border-t">
        <Title t1={t("title_part1")} t2={t("title_part2")} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            laborum aperiam molestias quidem ut libero eveniet, similique earum
            voluptas quasi sunt quos assumenda doloremque quibusdam aliquid quia
            blanditiis doloribus ipsam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            deleniti expedita sequi, error accusantium explicabo mollitia hic
            voluptas fugit, harum officia, repellat fuga repudiandae placeat
            ullam adipisci atque provident delectus.
          </p>
          <b className="text-gray-800">{t("our_mission")}</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi enim
            eveniet iste saepe minima provident a eos sint molestias quae, ex
            mollitia esse non obcaecati ducimus deleniti laboriosam? Tempore,
            ea.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title t1={t("why_title_part1")} t2={t("why_title_part2")} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>{t("quality_assurance")}</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            vel.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>{t("convenience")}</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            vel.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>{t("exceptional_service")}</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            vel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
