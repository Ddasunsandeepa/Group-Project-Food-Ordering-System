import React, { useEffect, useState } from "react";
import { Product, SearchSug } from "../../../types";
import { fetchDataFromApi } from "../../../api/Api";

interface PopularSearchListProps {
  onSelect?: (query: SearchSug) => void;
  styleTitle?: string;
}

const PopularSearchList: React.FC<PopularSearchListProps> = ({
  onSelect,
  styleTitle = "",
}) => {
  const [popularSearches, setPopularSearches] = useState<SearchSug[]>([]);

  useEffect(() => {
    const fetchPopularSearches = async () => {
      const data = await fetchDataFromApi<Product[]>("/api/products/featured");
      if (data) {
        const suggestions: SearchSug[] = data.map((item) => ({
          name: item.name,
          id: item._id,
        }));
        setPopularSearches(suggestions);
      }
    };
    fetchPopularSearches();
  }, []);

  return (
    <div>
      <div className={`${styleTitle} flex items-center`}>
        Popular Searches
      </div>
      <ul className="text-gray-700 space-y-1 pb-2 mt-2">
        {popularSearches.slice(0, 5).map((item, index) => (
          <li
            key={`popular-${index}`}
            className="flex flex-row justify-start items-center gap-x-2 hover:underline cursor-pointer text-sm"
            onClick={() => onSelect?.(item)}
          >
            <span className="text-gray-500 font-semibold text-lg">#</span>
            <span className="text-gray-600 hover:text-gray-800">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularSearchList;
