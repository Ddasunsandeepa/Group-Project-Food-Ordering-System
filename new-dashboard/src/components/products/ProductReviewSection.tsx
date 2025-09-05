"use client";

import React, { useEffect, useState } from "react";
import { Product, Review } from "../../types";
import { fetchDataFromApi } from "../../api/Api";
import ReviewsTab from "./ReviewsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductReviewSectionProps {
  product: Product;
}

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({ product }) => {
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

  return (
    <div className="w-full mx-auto mt-10 mb-16 lg:px-4">
      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-100 text-xl">
            Reviews <span className="text-green-400 ml-1">({reviews.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsTab
            productID={product._id}
            reviews={reviews}
            loading={loading}
            onReviewSubmitted={fetchReviews}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviewSection;
