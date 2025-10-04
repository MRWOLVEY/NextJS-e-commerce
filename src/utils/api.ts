const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.com"
    : "http://localhost:3000";

import { products as staticProducts } from "@/data/products";
import { assets as staticAssets } from "@/data/assets";

export async function getProducts(query: ProductsQuery = {}) {
  let filteredProducts = [...staticProducts];

  if (query.type) {
    filteredProducts = filteredProducts.filter((p) => p.type === query.type);
  }
  if (query.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === query.category
    );
  }
  if (query.bestseller) {
    filteredProducts = filteredProducts.filter((p) => p.bestseller);
  }
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name_en.toLowerCase().includes(searchLower) ||
        p.name_ar.includes(searchLower) ||
        p.description_en.toLowerCase().includes(searchLower) ||
        p.description_ar.includes(searchLower)
    );
  }

  filteredProducts.sort((a, b) => b.date - a.date);

  if (query.limit) {
    filteredProducts = filteredProducts.slice(0, query.limit);
  }

  return {
    success: true,
    count: filteredProducts.length,
    data: filteredProducts,
  };
}

export async function getProduct(id: string) {
  const product = staticProducts.find((p) => p._id === id);

  if (!product) {
    return {
      success: false,
      error: "Product not found",
    };
  }

  const relatedProducts = staticProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return {
    success: true,
    data: {
      product,
      related: relatedProducts,
    },
  };
}

export async function getAssets() {
  return {
    success: true,
    data: staticAssets,
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export interface ProductsQuery {
  type?: "apparel" | "glasses";
  category?: string;
  bestseller?: boolean;
  limit?: number;
  search?: string;
}

export async function fetchProducts(
  query: ProductsQuery = {}
): Promise<ApiResponse<any[]>> {
  try {
    const searchParams = new URLSearchParams();

    if (query.type) searchParams.append("type", query.type);
    if (query.category) searchParams.append("category", query.category);
    if (query.bestseller) searchParams.append("bestseller", "true");
    if (query.limit) searchParams.append("limit", query.limit.toString());
    if (query.search) searchParams.append("search", query.search);

    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}/api/products${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProduct(
  id: string
): Promise<ApiResponse<{ product: any; related: any[] }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function fetchAssets(): Promise<
  ApiResponse<Record<string, string>>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
}

export async function fetchProductsClient(query: ProductsQuery = {}) {
  try {
    const searchParams = new URLSearchParams();

    if (query.type) searchParams.append("type", query.type);
    if (query.category) searchParams.append("category", query.category);
    if (query.bestseller) searchParams.append("bestseller", "true");
    if (query.limit) searchParams.append("limit", query.limit.toString());
    if (query.search) searchParams.append("search", query.search);

    const queryString = searchParams.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductClient(id: string) {
  try {
    const response = await fetch(`/api/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function fetchAssetsClient() {
  try {
    const response = await fetch("/api/assets");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
}
