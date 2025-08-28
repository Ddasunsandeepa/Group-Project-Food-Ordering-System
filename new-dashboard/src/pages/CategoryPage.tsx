"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CategoryModule from "../contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

// import CategoryTable from "@/components/categories/CategoryTable"; // Uncomment when ready
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoriesHeader } from "@/components/Categories/CategoriesHeader";
import CategoryTable from "@/components/Categories/CategoryTable";

export default function CategoriesPage() {
  const { categories } = useContext(CategoryContext);
  const totalCategories = categories.length;
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("/dashboard/categories/add");
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoriesHeader
        totalCategories={totalCategories}
        onAddCategory={handleAddCategory}
      />

      <CategoryTable categories={categories} />
    </div>
  );
}
