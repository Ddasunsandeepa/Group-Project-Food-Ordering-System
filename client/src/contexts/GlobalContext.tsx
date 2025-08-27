import { Product, SearchSug } from "../types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GlobalContextType {
  recentlyVisited: Product[];
  addRecentlyVisited: (product: Product) => void;
  recentsLoading: boolean;

  recentSearches: SearchSug[];
  addRecentSearch: (search: SearchSug) => void;
  clearRecentSearches: () => void;

  isVeg: boolean; 
  setIsVeg: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchSug[]>([]);
  const [recentsLoading, setRecentsLoading] = useState<boolean>(true);
  const [isVeg, setIsVeg] = useState<boolean>(false); 

  useEffect(() => {
    const storedVisited = localStorage.getItem("recentlyVisited");
    const storedSearches = localStorage.getItem("recentSearches");
    const storedIsVeg = localStorage.getItem("isVeg");

    try {
      if (storedVisited) {
        setRecentlyVisited(JSON.parse(storedVisited));
      }
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
      if (storedIsVeg !== null) {
        setIsVeg(storedIsVeg === "true");
      }
    } catch (err) {
      console.error("Failed to parse localStorage:", err);
    }

    setRecentsLoading(false);
  }, []);

  useEffect(() => {
    if (!recentsLoading) {
      localStorage.setItem("recentlyVisited", JSON.stringify(recentlyVisited));
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      localStorage.setItem("isVeg", String(isVeg)); 
    }
  }, [recentlyVisited, recentSearches, isVeg, recentsLoading]);

  const addRecentlyVisited = (product: Product) => {
    setRecentlyVisited((prev) => {
      const filtered = prev.filter((p) => p._id !== product._id);
      const updated = [product, ...filtered];
      console.log("Updating recentlyVisited:", product._id);
      return updated.slice(0, 10);
    });
  };

  const addRecentSearch = (search: SearchSug) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.name.toLowerCase() !== search.name.toLowerCase()
      );
      const updated = [search, ...filtered];
      return updated.slice(0, 10);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        recentlyVisited,
        addRecentlyVisited,
        recentsLoading,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isVeg,      
        setIsVeg,   
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
