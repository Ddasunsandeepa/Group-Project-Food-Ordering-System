import React from "react";
import HomeSwiper from "./HomeSwiper";
import { useProductContext } from "@/contexts/ProductContext";
import { useNavigate } from "react-router-dom";

interface ProductSectionProps {
  title?: string;
  subtitle?: string;
  categoryFilter: string[];
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title = "Special Offers",
  subtitle = "",
  categoryFilter,
}) => {
  const { products, loading, error } = useProductContext();
  const navigate = useNavigate();

  // Filter products based on categoryFilter prop
  const filteredProducts = products.filter((product) =>
    categoryFilter.some(
      (cat) => product.category.name.toLowerCase() === cat.toLowerCase().trim()
    )
  );

  const onViewAllClick = () => {
    if (filteredProducts.length > 0) {
      navigate(`/categories/${filteredProducts[0].category._id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <HomeSwiper
          title={title}
          subtitle={subtitle}
          showTabs={false}
          categories={[]}
          products={filteredProducts}
          autoplay={true}
          autoplayDelay={5000}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={5}
          spaceBetween={8}
          loading={loading}
          error={error}
          showViewAllButton={true}
          onViewAllClick={onViewAllClick}
        />
      </div>
    </div>
  );
};

export default ProductSection;
