"use client";

import  AddProductButton  from "./AddProductButton";
import  TotalProductsCard  from "./TotalProductsCard";

interface ProductsHeaderProps {
  totalProducts: number;
  onAddProduct: () => void;
}

export function ProductsHeader({ totalProducts, onAddProduct }: ProductsHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-6 px-1 lg:px-6 pt-6 my-6">      
      <AddProductButton onClick={onAddProduct} />
      <TotalProductsCard total={totalProducts} />
    </div>
  );
}
