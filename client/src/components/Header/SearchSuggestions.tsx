import React from "react";
import RecentSearchList from "./Other/RecentSearches";
import PopularSearchList from "./Other/PopularSearchList";
import SearchSuggestionList from "./Other/SearchSuggestionList";
import { SearchSug } from "../../types";

interface SearchSuggestionsProps {
  query: string;
  handleSuggestionSelect: (search: SearchSug) => void;
}

const tabTitleStyles =
  "text-sm font-semibold text-gray-400 mb-1 block border-b pb-2 mb-2 border-gray-400";

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  handleSuggestionSelect,
}) => {
  const trimmedQuery = query.trim();

  return (
    <div className="absolute z-40 w-full mt-1 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg py-4 px-6 space-y-4">
      {trimmedQuery === "" ? (
        <>
          <RecentSearchList
            setQuery={handleSuggestionSelect}
            styleTitle={tabTitleStyles}
          />
          <PopularSearchList
            onSelect={handleSuggestionSelect}
            styleTitle={tabTitleStyles}
          />
        </>
      ) : (
        <SearchSuggestionList
          trimmedQuery={trimmedQuery}
          onSelect={handleSuggestionSelect}
          styleTitle={tabTitleStyles}
        />
      )}
    </div>
  );
};

export default SearchSuggestions;
