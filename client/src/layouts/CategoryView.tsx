import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySidebar from "../components/Category/CategorySidebar";
import ProductList from "../components/Category/ProductList";
import GridControl from "../components/Category/GridControl";
import { useProductContext } from "../contexts/ProductContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const CategoryView = () => {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const { products } = useProductContext();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      setSelectedCategories([id]);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategories, selectedMealTypes]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((cat) => cat !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleMealType = (type: string) => {
    setSelectedMealTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by categories if selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category.id)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by meal types if any selected
    if (selectedMealTypes.length > 0) {
      filtered = filtered.filter((p) => selectedMealTypes.includes(p.type));
    }
    // If selectedMealTypes is empty, treat as "All", so no filtering here

    return filtered;
  }, [products, selectedCategories, priceRange, selectedMealTypes]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavbar={false} />
      <div className="flex">
        <CategorySidebar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          resetCategories={() => setSelectedCategories(id ? [id] : [])}
          resetPriceRange={() => setPriceRange([0, 1000])}
          selectedMealTypes={selectedMealTypes}
          toggleMealType={toggleMealType}
          resetMealTypes={() => setSelectedMealTypes([])}
        />
        <div className="flex-1">
          <div className="p-6">
            <GridControl viewMode={viewMode} setViewMode={setViewMode} />
            <ProductList products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryView;
