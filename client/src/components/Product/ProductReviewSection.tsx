import React, { useEffect, useState } from "react";
import { Product, Review } from "../../types";
import DescriptionTab from "./DescriptionTab";
import IngredientsAllergensTab from "./IngredientsAllergensTab";
import ReviewsTab from "./ReviewsTab";
import { fetchDataFromApi } from "../../api/Api";

interface ProductReviewSectionProps {
  product: Product;
  ingredients?: string[];
  allergens?: string[];
}

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  product,
  ingredients = [],
  allergens = [],
}) => {
  const [activeTab, setActiveTab] = React.useState<
    "description" | "ingredients" | "reviews"
  >("description");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    try {
      const res = await fetchDataFromApi<Review[]>(
        `/api/productReviews?productId=${product._id}`
      );
      if (res) {
        setReviews(res);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product._id]);

  const TabButton: React.FC<{
    tabKey: "description" | "ingredients" | "reviews";
    children: React.ReactNode;
    isActive: boolean;
  }> = ({ tabKey, children, isActive }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-green-500 text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full mx-auto mt-12 mb-12 px-6 bg-gray-50 h-fit">
      <div className="rounded-lg shadow-lg p-8 bg-app-bannerbtnhover/15">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Product Details
          <span className="text-green-500/80 font-semibold ml-2">
            {product.name}
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          <TabButton
            tabKey="description"
            isActive={activeTab === "description"}
          >
            Description
          </TabButton>
          <TabButton
            tabKey="ingredients"
            isActive={activeTab === "ingredients"}
          >
            Ingredients & Allergens
          </TabButton>
          <TabButton tabKey="reviews" isActive={activeTab === "reviews"}>
            Reviews ({reviews.length})
          </TabButton>
        </div>

        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "ingredients" && (
          <IngredientsAllergensTab
            ingredients={ingredients}
            allergens={allergens}
          />
        )}
        {activeTab === "reviews" && (
          <ReviewsTab
            productID={product._id}
            reviews={reviews}
            loading={loading}
            onReviewSubmitted={() => fetchReviews()}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviewSection;
