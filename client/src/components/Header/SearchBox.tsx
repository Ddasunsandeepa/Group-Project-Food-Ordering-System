import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi"; // FiX added here
import SearchSuggestions from "./SearchSuggestions";
import { SearchSug } from "../../types";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/GlobalContext";

const SearchBar: React.FC = () => {
  const [searchStr, setSearchStr] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addRecentSearch } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalized =
      value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    setSearchStr(capitalized);
  };

  const handleClearBtn = () => {
    setSearchStr("");
    setIsFocused(true);
  }

  const handleSuggetionSelect = (search: SearchSug) => {
    setSearchStr(search.name);
    addRecentSearch(search);
    setIsFocused(false);
    navigate(`/product/${search.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition">
        <input
          type="text"
          placeholder="Search for products"
          value={searchStr}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          className="flex-grow bg-gray-100 outline-none text-gray-700 placeholder-gray-500 text-lg"
        />

        {/* Clear button */}
        {searchStr && (
          <button
            type="button"
            onClick={handleClearBtn}
            className="ml-2 p-1 rounded-full hover:bg-red-100 transition-colors"
            aria-label="Clear"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        )}

        <button
          type="button"
          className="ml-2 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <FiSearch className="text-xl text-gray-800" />
        </button>
      </div>

      {isFocused && (
        <SearchSuggestions
          query={searchStr}
          handleSuggestionSelect={handleSuggetionSelect}
        />
      )}
    </div>
  );
};

export default SearchBar;
