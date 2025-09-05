import React, { useContext, useEffect, useState } from "react";
import CategoryModule from "@/contexts/CategoryContext";
import HomeSwiper from "./HomeSwiper";
import { Category, Product } from "../../types";

const { CategoryContext } = CategoryModule;

const HomeSwiperDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { categories } = useContext(CategoryContext);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {   

      const res = await fetch(`${baseUrl}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      const specialOfferProducts = data.filter(
        (product: Product) => (product.discount ?? 0) > 0
      );

      setProducts(specialOfferProducts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const tabCategories = [
    { name: "All", color: "#f4f4f4" },
    ...categories.map((cat: Category) => ({
      name:
        cat.name.split(" ")[0].charAt(0).toUpperCase() +
        cat.name.split(" ")[0].slice(1).toLowerCase(),
      color: cat.color,
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <HomeSwiper
          title="SPECIAL OFFERS"
          subtitle="Do not miss the current offers until the end of March"
          showTabs={true}
          categories={tabCategories}
          products={products}
          autoplay={true}
          autoplayDelay={5000}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={5}
          spaceBetween={8}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default HomeSwiperDemo;
