import React, { useContext } from "react";
import CategoryModule from "../../contexts/CategoryContext";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import MealTypeFilter from "./MealTypeFilter";

const { CategoryContext } = CategoryModule;

type Props = {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  resetCategories: () => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetPriceRange: () => void;
    selectedMealTypes: string[];
    toggleMealType: (type: string) => void;
    resetMealTypes: () => void;
};

const CategorySidebar: React.FC<Props> = ({
  selectedCategories,
  toggleCategory,
  resetCategories,
  priceRange,
  setPriceRange,
  resetPriceRange,
    selectedMealTypes,
    toggleMealType,
    resetMealTypes,
}) => {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="w-80 bg-white shadow-lg p-6 min-h-screen">
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        resetCategories={resetCategories}
      />
      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        resetPriceRange={resetPriceRange}
      />
      <MealTypeFilter
        selectedTypes={selectedMealTypes}
        toggleType={toggleMealType}
        resetTypes={resetMealTypes}
        />
    </div>
  );
};

export default CategorySidebar;
