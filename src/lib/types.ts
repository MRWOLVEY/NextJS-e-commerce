export interface Product {
  _id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  image: string[];
  type: "apparel" | "glasses";
  category: "Men" | "Women" | "Kids" | "Sunglasses" | "Eyeglasses";
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}
