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
import { useState } from "react";

export default function ProductsPage() {
  const [totalProducts, setTotalProducts] = useState(123); // Example number

  const handleAddProduct = () => {
    console.log("Add Product clicked");
    // Open modal or navigate to add product page
    setTotalProducts((prev) => prev + 1); // just for demo
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
      {/* Other sections like product list/table can go here */}
    </div>
  );
}
