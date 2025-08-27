import React from "react";
import { Clock } from "lucide-react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { SearchSug } from "../../../types";

interface RecentSearchListProps {
  setQuery: (query: SearchSug) => void;
  styleTitle?: string;
}

const RecentSearchList: React.FC<RecentSearchListProps> = ({
  setQuery,
  styleTitle = "",
}) => {
  const { recentSearches, clearRecentSearches } = useGlobalContext();

  const handleClick = (item: SearchSug) => {
    setQuery(item);
  };

  if (recentSearches.length === 0) return null;

  return (
    <div>
      <div className={`${styleTitle} flex items-center justify-between`}>
        <div className="flex items-center text-sm font-semibold text-gray-400">
          Recent Searches
        </div>
        <button
          onClick={clearRecentSearches}
          className="text-xs text-blue-500 hover:underline cursor-pointer"
        >
          Clear History
        </button>
      </div>

      <ul className="flex flex-wrap gap-2 list-none p-0 m-0 pb-2">
        {recentSearches.map((item, index) => (
          <li
            key={`recent-${index}`}
            className="flex flex-row justify-start items-center text-sm hover:underline cursor-pointer bg-gray-200 pr-4 pl-2 py-1 rounded-xl"
            onClick={() => handleClick(item)}
          >
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600 hover:text-gray-800">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchList;
