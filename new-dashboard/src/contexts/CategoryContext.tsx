import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { fetchDataFromApi } from "../api/Api";
import { Category, CategoryContextType } from "../types";

// --- Context ---
const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: false,
  error: null,
  refetch: () => {},
});

// --- State Provider ---
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //  make getCategories stable so it can be registered
  const getCategories = useCallback(async () => {
    setLoading(true);
    const data = await fetchDataFromApi<Category[]>("/api/category");

    if (Array.isArray(data)) {
      setCategories(data);
      setError(null);
    } else {
      setCategories([]);
      setError("Failed to fetch categories");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, error, refetch: getCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// --- Category Types Extractor ---
export const categoryTypes = (
  categories: Category[]
): { id: string; name: string }[] => {
  return categories.map(({ id, _id, name }) => ({
    id: id || _id,
    name,
  }));
};

// --- Export All as Object ---
export default {
  CategoryContext,
  CategoryProvider,
  categoryTypes,
};
