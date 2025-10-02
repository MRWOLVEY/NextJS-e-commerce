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

export const categories: Record<string, string[]> = {
  apparel: ["Men", "Women", "Kids"],
  glasses: ["Sunglasses", "Eyeglasses"],
};

export const subcategories: Record<string, string[]> = {
  apparel: ["Topwear", "Bottomwear", "Winterwear"],
  glasses: ["Gucci", "Prada"],
};

export const products: Product[] = [
  {
    _id: "aaaaa",
    name_en: "Women Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للنساء",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 100,
    image: ["/images/p_img1.png"],
    type: "apparel",
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "aaaab",
    name_en: "Men Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت رجالي قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 200,
    image: [
      "/images/p_img2_1.png",
      "/images/p_img2_2.png",
      "/images/p_img2_3.png",
      "/images/p_img2_4.png",
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716621345448,
    bestseller: true,
    type: "apparel",
  },
  {
    _id: "aaaac",
    name_en: "Girls Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للبنات",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 220,
    image: ["/images/p_img3.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716234545448,
    bestseller: true,
    type: "apparel",
  },
  {
    _id: "aaaad",
    name_en: "Men Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت رجالي قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 110,
    image: ["/images/p_img4.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: 1716621345448,
    bestseller: true,
    type: "apparel",
  },
  {
    _id: "aaaae",
    name_en: "Women Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للنساء",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 130,
    image: ["/images/p_img5.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716622345448,
    bestseller: true,
    type: "apparel",
  },
  {
    _id: "aaaaf",
    name_en: "Girls Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للبنات",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 140,
    image: ["/images/p_img6.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716623423448,
    bestseller: true,
    type: "apparel",
  },
  {
    _id: "aaaag",
    name_en: "Men Tapered Fit Flat-Front Trousers",
    name_ar: "بنطلون رجالي مخروطي الشكل بواجهة مسطحة",
    description_en:
      "Comfortable tapered fit trousers with flat front design, perfect for both casual and formal occasions.",
    description_ar:
      "بنطلون مريح بقصة مخروطية وتصميم أمامي مسطح، مثالي للمناسبات العادية والرسمية.",
    price: 190,
    image: ["/images/p_img7.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: 1716621542448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaah",
    name_en: "Men Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت رجالي قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 140,
    image: ["/images/p_img8.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716622345448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaai",
    name_en: "Girls Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للبنات",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 100,
    image: ["/images/p_img9.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716621235448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaaj",
    name_en: "Men Tapered Fit Flat-Front Trousers",
    name_ar: "بنطلون رجالي مخروطي الشكل بواجهة مسطحة",
    description_en:
      "Comfortable tapered fit trousers with flat front design, perfect for both casual and formal occasions.",
    description_ar:
      "بنطلون مريح بقصة مخروطية وتصميم أمامي مسطح، مثالي للمناسبات العادية والرسمية.",
    price: 110,
    image: ["/images/p_img10.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: 1716622235448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaak",
    name_en: "Men Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت رجالي قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 120,
    image: ["/images/p_img11.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716623345448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaal",
    name_en: "Men Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت رجالي قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 150,
    image: ["/images/p_img12.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716624445448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaam",
    name_en: "Women Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للنساء",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 130,
    image: ["/images/p_img13.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716625545448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaan",
    name_en: "Boy Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت أولاد قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 160,
    image: ["/images/p_img14.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716626645448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaao",
    name_en: "Men Tapered Fit Flat-Front Trousers",
    name_ar: "بنطلون رجالي مخروطي الشكل بواجهة مسطحة",
    description_en:
      "Comfortable tapered fit trousers with flat front design, perfect for both casual and formal occasions.",
    description_ar:
      "بنطلون مريح بقصة مخروطية وتصميم أمامي مسطح، مثالي للمناسبات العادية والرسمية.",
    price: 140,
    image: ["/images/p_img15.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716627745448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaap",
    name_en: "Girls Round Neck Cotton Top",
    name_ar: "بلوزة قطنية دائرية الرقبة للبنات",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 170,
    image: ["/images/p_img16.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716628845448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaaq",
    name_en: "Men Tapered Fit Flat-Front Trousers",
    name_ar: "بنطلون رجالي مخروطي الشكل بواجهة مسطحة",
    description_en:
      "Comfortable tapered fit trousers with flat front design, perfect for both casual and formal occasions.",
    description_ar:
      "بنطلون مريح بقصة مخروطية وتصميم أمامي مسطح، مثالي للمناسبات العادية والرسمية.",
    price: 150,
    image: ["/images/p_img17.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716629945448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaar",
    name_en: "Boy Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت أولاد قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 180,
    image: ["/images/p_img18.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716631045448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "aaaas",
    name_en: "Boy Round Neck Pure Cotton T-shirt",
    name_ar: "تي شيرت أولاد قطني خالص دائري الرقبة",
    description_en:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    description_ar:
      "قميص خفيف الوزن، منسوج عادة، بأكمام قصيرة ورقبة دائرية، يُلبس كقميص داخلي أو خارجي.",
    price: 160,
    image: ["/images/p_img19.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716632145448,
    bestseller: false,
    type: "apparel",
  },
  {
    _id: "glass1",
    name_en: "Premium Designer Sunglasses",
    name_ar: "نظارة شمسية مصمم فاخرة",
    description_en:
      "Stylish and protective sunglasses with UV protection, perfect for outdoor activities and fashion-forward looks.",
    description_ar:
      "نظارة شمسية أنيقة وواقية مع حماية من الأشعة فوق البنفسجية، مثالية للأنشطة الخارجية والإطلالات العصرية.",
    price: 250,
    image: ["/images/sg11.jpeg", "/images/sg12.jpeg", "/images/sg13.jpeg"],
    category: "Sunglasses",
    subCategory: "Prada",
    sizes: ["One Size"],
    date: 1716633245448,
    bestseller: true,
    type: "glasses",
  },
  {
    _id: "glass2",
    name_en: "Classic Eyeglasses Frame",
    name_ar: "إطار نظارة طبية كلاسيكية",
    description_en:
      "Elegant and comfortable eyeglasses frame with premium quality materials, suitable for daily wear and professional settings.",
    description_ar:
      "إطار نظارة طبية أنيق ومريح مصنوع من مواد عالية الجودة، مناسب للارتداء اليومي والبيئات المهنية.",
    price: 180,
    image: ["/images/ng11.jpeg", "/images/ng12.jpeg", "/images/ng13.jpeg"],
    category: "Eyeglasses",
    subCategory: "Gucci",
    sizes: ["One Size"],
    date: 1716634345448,
    bestseller: false,
    type: "glasses",
  },
  {
    _id: "glass3",
    name_en: "Modern Eyeglasses Collection",
    name_ar: "مجموعة نظارات طبية عصرية",
    description_en:
      "Contemporary eyeglasses design with lightweight frame and superior comfort for extended wear throughout the day.",
    description_ar:
      "تصميم نظارة طبية عصري بإطار خفيف الوزن وراحة فائقة للارتداء المطول طوال اليوم.",
    price: 200,
    image: ["/images/ng21.jpeg", "/images/ng22.jpeg", "/images/ng23.jpeg"],
    category: "Eyeglasses",
    subCategory: "Prada",
    sizes: ["One Size"],
    date: 1716635445448,
    bestseller: true,
    type: "glasses",
  },
];
