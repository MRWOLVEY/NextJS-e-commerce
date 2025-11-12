import { products } from "@/data/products";

// Server-side product fetching
export async function getProducts(
  query: {
    category?: string;
    bestseller?: boolean;
    limit?: number;
  } = {}
) {
  let filteredProducts = products;

  if (query.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === query.category
    );
  }

  if (query.bestseller) {
    filteredProducts = filteredProducts.filter((p) => p.bestseller);
  }

  if (query.limit) {
    filteredProducts = filteredProducts.slice(0, query.limit);
  }

  return filteredProducts;
}

export async function getProduct(id: string) {
  const product = products.find((p) => p._id === id);

  if (!product) {
    return null;
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return {
    product,
    relatedProducts,
  };
}
