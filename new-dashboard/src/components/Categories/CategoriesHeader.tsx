"use client";

import AddCategoryButton from "./AddCategoryButton";
import TotalCategoriesCard from "./TotalCategoriesCard";

interface CategoriesHeaderProps {
  totalCategories: number;
  onAddCategory: () => void;
}

export function CategoriesHeader({ totalCategories, onAddCategory }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-6 px-1 lg:px-6 pt-6 my-6">
      <AddCategoryButton onClick={onAddCategory} />
      <TotalCategoriesCard total={totalCategories} />
    </div>
  );
}
