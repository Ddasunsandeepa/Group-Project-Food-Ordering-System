import React from "react";

type Props = {
  categories: { id: string; name: string }[];
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  resetCategories: () => void;
};

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategories,
  toggleCategory,
  resetCategories,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">PRODUCT CATEGORIES</h2>
        <button
          onClick={resetCategories}
          className="text-sm text-gray-500 hover:underline"
        >
          Reset
        </button>
      </div>
      <div className="space-y-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <div
              key={category.id}
              className={`flex items-center space-x-3 cursor-pointer ${
                isSelected
                  ? "font-normal text-header-catbtn/75"
                  : "text-gray-500"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                className="accent-header-catbtn"
              />
              <span className="capitalize">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
