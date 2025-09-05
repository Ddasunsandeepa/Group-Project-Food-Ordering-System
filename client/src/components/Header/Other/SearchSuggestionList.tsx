import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch } from "react-icons/fi";
import NoResultsSuggestions from "./NoResultsSuggestions";
import { useProductContext } from "../../../contexts/ProductContext";
import { SearchSug } from "../../../types";

interface SearchSuggestionListProps {
  trimmedQuery: string;
  onSelect: (search: SearchSug) => void;
  styleTitle?: string;
}


const SearchSuggestionList: React.FC<SearchSuggestionListProps> = ({
  trimmedQuery,
  onSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredProductSuggestions, setFilteredProductSuggestions] = useState<SearchSug[]>([]);

  const { products } = useProductContext();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const productSuggestions: SearchSug[] = products
        .filter((product) =>
          product.name.toLowerCase().includes(trimmedQuery.toLowerCase())
        )
        .map((product) => ({
          id: product._id,
          name: product.name,
        }));

      setFilteredProductSuggestions(productSuggestions);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [trimmedQuery, products]);

  return (
    <div>
      {loading ? (
        <ul className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div className="flex flex-row items-center gap-3" key={i}>
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-8 w-3/4 rounded-xl" />
            </div>
          ))}
        </ul>
      ) : filteredProductSuggestions.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-1">Products</div>
            <ul className="space-y-3">
              {filteredProductSuggestions.map((item, index) => (
                <li
                  key={`product-${item.id}-${index}`}
                  className="text-gray-700 hover:underline cursor-pointer text-sm flex flex-row items-center gap-x-3"
                  onClick={() => onSelect(item)}
                >
                  <FiSearch size={18} />
                  <span className="text-[16px]">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <NoResultsSuggestions />
      )}
    </div>
  );
};

export default SearchSuggestionList;
