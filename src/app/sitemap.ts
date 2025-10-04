import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  const lastModified = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/category/apparel",
    "/category/glasses",
  ];

  const urls: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    });
  });

  return urls;
}
