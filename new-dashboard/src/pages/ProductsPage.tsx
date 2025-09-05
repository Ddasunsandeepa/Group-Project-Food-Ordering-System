"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ProductsHeader } from "@/components/products/ProductsHeader";
import { useProductContext } from "@/contexts/ProductContext";
import ProductTable from "@/components/products/ProductTable";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const { products } = useProductContext();
  const totalProducts = products.length;
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/dashboard/products/add");
  };

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductsHeader
        totalProducts={totalProducts}
        onAddProduct={handleAddProduct}
      />
      <ProductTable products={products} />
    </div>
  );
}
