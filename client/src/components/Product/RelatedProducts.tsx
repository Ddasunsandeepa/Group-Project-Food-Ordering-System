import React, { useContext, useEffect, useState } from "react";
import HomeSwiper from "../../components/Home/HomeSwiper";
import { Product } from "../../types";
import { useProductContext } from "@/contexts/ProductContext";
import CategoryModule from "@/contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

interface RelatedProductsProps {
  categoryId: string;
}

const { CategoryContext } = CategoryModule;

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }) => {
  const { products } = useProductContext();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { categories } = useContext(CategoryContext);
  const navigate = useNavigate();

  const onViewAllClick = () => {
    navigate(`/categories/${categoryId}`);
  };

  useEffect(() => {
    setLoading(true);
    try {
      const filtered = products.filter(
        (product) => product.category?._id === categoryId
      );
      setRelatedProducts(filtered);
    } catch (err) {
      setError("Failed to filter related products.");
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  }, [products, categoryId]);

  return (
    <div className="bg-gray-50 px-10 w-full">
      <div className="w-full mx-auto">
        <HomeSwiper
          title="RELATED PRODUCTS"
          subtitle="Explore products related to this category"
          showTabs={false}
          categories={categories}
          showViewAllButton={true}
          onViewAllClick={onViewAllClick}
          products={relatedProducts}
          autoplay={false}
          autoplayDelay={0}
          className="mb-6"
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

export default RelatedProducts;
