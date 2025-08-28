import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {},
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Define fetchProducts outside useEffect so it can be called anywhere
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
