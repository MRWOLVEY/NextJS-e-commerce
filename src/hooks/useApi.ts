import { useState, useEffect } from "react";
import {
  fetchProductsClient,
  fetchProductClient,
  fetchAssetsClient,
  ProductsQuery,
} from "@/utils/api";

export function useProducts(query: ProductsQuery = {}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchProductsClient(query);

        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.error || "Failed to fetch products");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [JSON.stringify(query)]);

  return {
    products,
    loading,
    error,
    refetch: () => {
      const loadProducts = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetchProductsClient(query);

          if (response.success) {
            setProducts(response.data);
          } else {
            setError(response.error || "Failed to fetch products");
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch products"
          );
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    },
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchProductClient(id);

        if (response.success) {
          setProduct(response.data.product);
          setRelatedProducts(response.data.related);
        } else {
          setError(response.error || "Failed to fetch product");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return { product, relatedProducts, loading, error };
}

export function useAssets() {
  const [assets, setAssets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchAssetsClient();

        if (response.success) {
          setAssets(response.data);
        } else {
          setError(response.error || "Failed to fetch assets");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  return { assets, loading, error };
}
