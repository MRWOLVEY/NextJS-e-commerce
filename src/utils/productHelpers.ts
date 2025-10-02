import { Product } from "@/data/products";

/**
 * Get the localized product name based on the current locale
 */
export const getProductName = (product: Product, locale: string): string => {
  return locale === "ar" ? product.name_ar : product.name_en;
};

/**
 * Get the localized product description based on the current locale
 */
export const getProductDescription = (
  product: Product,
  locale: string
): string => {
  return locale === "ar" ? product.description_ar : product.description_en;
};

/**
 * Search products by name in both languages
 */
export const searchProducts = (
  products: Product[],
  searchTerm: string
): Product[] => {
  if (!searchTerm.trim()) return products;

  const lowerSearchTerm = searchTerm.toLowerCase();

  return products.filter(
    (product) =>
      product.name_en.toLowerCase().includes(lowerSearchTerm) ||
      product.name_ar.includes(searchTerm) // Arabic search might be case-sensitive
  );
};

/**
 * Get display name for any product-like object that has name_en and name_ar
 */
export const getLocalizedName = (
  item: { name_en?: string; name_ar?: string; name?: string },
  locale: string
): string => {
  if (item.name_en && item.name_ar) {
    return locale === "ar" ? item.name_ar : item.name_en;
  }
  return item.name || "";
};

/**
 * Translate category names based on locale
 */
export const getLocalizedCategoryName = (
  category: string,
  locale: string
): string => {
  const categoryTranslations: Record<string, { en: string; ar: string }> = {
    Men: { en: "Men", ar: "رجال" },
    Women: { en: "Women", ar: "نساء" },
    Kids: { en: "Kids", ar: "أطفال" },
    Sunglasses: { en: "Sunglasses", ar: "نظارات شمسية" },
    Eyeglasses: { en: "Eyeglasses", ar: "نظارات طبية" },
    Topwear: { en: "Topwear", ar: "ملابس علوية" },
    Bottomwear: { en: "Bottomwear", ar: "ملابس سفلية" },
    Winterwear: { en: "Winterwear", ar: "ملابس شتوية" },
    Gucci: { en: "Gucci", ar: "غوتشي" },
    Prada: { en: "Prada", ar: "برادا" },
    "Ray-Ban": { en: "Ray-Ban", ar: "راي بان" },
  };

  const translation = categoryTranslations[category];
  if (translation) {
    return locale === "ar" ? translation.ar : translation.en;
  }
  return category;
};
