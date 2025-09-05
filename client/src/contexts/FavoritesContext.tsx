import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { fetchDataFromApi } from "../api/Api";
import { useUser } from "./UserContext";
import { FavoriteItem, FavoritesContextType } from "../types";

// Initial empty context value
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: false,
  refreshFavorites: () => {},
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const fetchFavorites = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const data = await fetchDataFromApi<FavoriteItem[]>(
        `/api/myList?userId=${user.id}`
      );

      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Refetch favorites when user logs in or out
  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      favorites,
      loading,
      refreshFavorites: fetchFavorites,
    }),
    [favorites, loading]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook to use context safely
export const useFavorites = (): FavoritesContextType => {
  return useContext(FavoritesContext);
};
