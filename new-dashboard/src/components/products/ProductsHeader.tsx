"use client";

import  AddProductButton  from "./AddProductButton";
import  TotalProductsCard  from "./TotalProductsCard";

interface ProductsHeaderProps {
  totalProducts: number;
  onAddProduct: () => void;
}

export function ProductsHeader({ totalProducts, onAddProduct }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <TotalProductsCard total={totalProducts} />
      <AddProductButton onClick={onAddProduct} />
    </div>
  );
}
